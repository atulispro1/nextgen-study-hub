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
