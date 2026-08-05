const OWNER_EMAIL = "atul.sharmas2806@gmail.com";

const FACULTY_EMAILS = (import.meta.env.VITE_FACULTY_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

export function getOwnerEmail() {
  return OWNER_EMAIL;
}

export function getTrustedRole(user) {
  const email = user?.email?.trim().toLowerCase();

  if (!email) {
    return null;
  }

  if (email === OWNER_EMAIL) {
    return "owner";
  }

  const metadataRole =
    user?.app_metadata?.role || user?.user_metadata?.role || null;

  if (metadataRole === "faculty" || FACULTY_EMAILS.includes(email)) {
    return "faculty";
  }

  return null;
}

export function isAdminRole(role) {
  return role === "owner" || role === "faculty";
}

export function sanitizeFileName(fileName) {
  const cleanedName = (fileName || "file")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^\.+/, "");

  return cleanedName || "file";
}

// Allowed upload extensions, grouped by purpose. MIME types are spoofable,
// so the real extension is always validated too and the final stored name is
// forced to the whitelisted extension — a double-extension attack like
// "notes.pdf.html" is impossible because everything after the first dot is
// replaced by the safe extension.
const ALLOWED_EXTENSIONS = {
  pdf: ["pdf"],
  image: ["jpg", "jpeg", "png", "webp", "gif"],
};

const MIME_PREFIXES = {
  pdf: ["application/pdf"],
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
};

// Returns { ok: true } or { ok: false, reason }.
export function validateUploadFile(file, kind = "pdf", maxBytes) {
  if (!file) {
    return { ok: false, reason: "No file selected." };
  }

  if (maxBytes && file.size > maxBytes) {
    return { ok: false, reason: "file-too-large" };
  }

  if (file.size === 0) {
    return { ok: false, reason: "empty-file" };
  }

  const allowedMimes = MIME_PREFIXES[kind] || [];
  if (!allowedMimes.includes(file.type?.toLowerCase())) {
    return { ok: false, reason: "invalid-type" };
  }

  const name = (file.name || "").toLowerCase();
  const dotIndex = name.lastIndexOf(".");
  const extension = dotIndex >= 0 ? name.slice(dotIndex + 1) : "";

  if (!(ALLOWED_EXTENSIONS[kind] || []).includes(extension)) {
    return { ok: false, reason: "invalid-extension" };
  }

  return { ok: true };
}

// Builds a timestamped, sanitized storage filename with a forced safe
// extension (see validateUploadFile). Uniqueness comes from the timestamp +
// a random suffix, so repeated uploads of the same file never collide.
export function buildSafeFileName(file, kind = "pdf") {
  const ext = (ALLOWED_EXTENSIONS[kind] || ["bin"])[0];
  const base = sanitizeFileName(file.name).replace(/\.[^.]+$/, "");
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${unique}-${base}.${ext}`;
}

export function clampRating(value, min = 1, max = 5) {
  const num = Number(value);
  if (!Number.isFinite(num)) return max;
  return Math.min(max, Math.max(min, Math.round(num)));
}

// Turns a failed AI edge-function response into a friendly user message.
// 429 = rate limited by the server; 5xx/network = generic failure.
export async function friendlyAiError(response) {
  try {
    const data = await response.json();
    if (response.status === 429 && data?.output) {
      return data.output;
    }
    if (response.status === 413) {
      return "Your request was too large. Please shorten it and try again.";
    }
    if (data?.output && typeof data.output === "string") {
      return data.output;
    }
  } catch {
    // Non-JSON error body — fall through to the generic message.
  }
  return "Something went wrong while generating the response. Please try again.";
}

export function isSafeExternalUrl(value) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

export function openSafeExternalUrl(url, options = {}) {
  if (!isSafeExternalUrl(url)) {
    return false;
  }

  if (options.download) {
    const link = document.createElement("a");
    link.href = url;
    link.rel = "noopener noreferrer";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
  }

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export function normalizeTextInput(value, maxLength = 500) {
  return (value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function canSubmitWithCooldown(key, cooldownMs) {
  const now = Date.now();
  const previous = Number(localStorage.getItem(key) || 0);

  if (previous && now - previous < cooldownMs) {
    return false;
  }

  localStorage.setItem(key, String(now));
  return true;
}
