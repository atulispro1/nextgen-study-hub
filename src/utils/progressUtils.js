import { useEffect, useState } from "react";

/* ============================================================
   UNIT PROGRESS (v2)
   ============================================================
   Progress is stored per *scope*, so completion state can never
   leak between courses, branches, semesters, categories or
   subjects:

     localStorage["nextgen-progress-v2"] = {
       [scopeKey]: { [unitId]: true }
     }

     scopeKey = course :: branch :: semester :: category :: subject
               e.g. "diploma::cs::3::Notes::Programming in C (DCS-301)"
                    "diploma::general::2::Assignments::Applied Chemistry (DCH-101)"

   Every material row belongs to exactly one scope, so marking a
   unit completed in one branch / semester / subject never affects
   any other — each scope has its own independent map.

   LEGACY STORAGE (v1)
   -------------------
   The old implementation stored progress under the "progress" key
   keyed by subject name only:

     localStorage["progress"] = { [subject]: { [unitId]: true } }

   v1 data is still read (so nothing users already marked is lost)
   and is lazily migrated into the scoped v2 format on the next
   toggle of that unit.

   REACTIVITY
   ----------
   toggleUnitProgress() dispatches a CustomEvent and every
   component using useProgressVersion() re-renders instantly — no
   database refetch is needed to update the UI.
   ============================================================ */

const STORAGE_KEY = "nextgen-progress-v2";
const LEGACY_STORAGE_KEY = "progress";
const PROGRESS_EVENT = "nextgen:progress-changed";

export const DEFAULT_COURSE = "diploma";
export const GENERAL_BRANCH = "general";

const joinScope = (...parts) => parts.filter(Boolean).join("::");

/** Build the storage scope key from a unit's context. */
export const buildScopeKey = ({
  course = DEFAULT_COURSE,
  branch = GENERAL_BRANCH,
  semester,
  category,
  subject,
} = {}) => joinScope(course, branch, semester, category, subject);

const readStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    // Corrupted or unreadable stored progress must never crash the app.
    return {};
  }
};

const writeStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full / private mode — never crash the app.
  }
};

const readLegacyStorage = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const writeLegacyStorage = (data) => {
  try {
    if (Object.keys(data).length === 0) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } else {
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(data));
    }
  } catch {
    // ignore
  }
};

const notifyProgressChanged = () => {
  try {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // ignore
  }
};

/**
 * Whether a unit is completed in its scope.
 *
 * @param {string} unitId  The material row id.
 * @param {object} scope
 * @param {string} [scope.scopeKey]  Prebuilt scoped key (v2).
 * @param {string} [scope.legacyKey]  v1 key used by this resource
 *   (subject name for study units, "last-minute-…" key for revision units).
 * @param {string} [scope.subject]  Subject name (v1 fallback lookup).
 */
export const isUnitCompleted = (unitId, { scopeKey, legacyKey, subject } = {}) => {
  if (!unitId) return false;

  if (scopeKey) {
    const scopeData = readStorage()[scopeKey];
    if (scopeData && scopeData[unitId]) return true;
  }

  const legacy = readLegacyStorage();
  if (legacyKey && legacy[legacyKey]?.[unitId]) return true;
  if (subject && legacy[subject]?.[unitId]) return true;

  return false;
};

/** Number of completed units in a list of materials for a given scope. */
export const countCompleted = (units, scope) => {
  if (!Array.isArray(units)) return 0;
  let done = 0;
  units.forEach((unit) => {
    if (unit && unit.id && isUnitCompleted(unit.id, scope)) done += 1;
  });
  return done;
};

/**
 * Toggle completion of a unit in its scope. Writes the scoped v2
 * entry and migrates the unit out of v1 storage so legacy data can
 * never override the new state. Returns the new completed state.
 */
export const toggleUnitProgress = (unitId, scopeKey, { legacyKey, subject } = {}) => {
  if (!unitId || !scopeKey) return false;

  const next = !isUnitCompleted(unitId, { scopeKey, legacyKey, subject });

  const data = readStorage();
  const scopeData = { ...(data[scopeKey] || {}) };
  if (next) {
    scopeData[unitId] = true;
  } else {
    delete scopeData[unitId];
  }
  if (Object.keys(scopeData).length === 0) {
    delete data[scopeKey];
  } else {
    data[scopeKey] = scopeData;
  }
  writeStorage(data);

  // Lazily migrate this unit out of the legacy (subject-keyed) storage.
  const legacy = readLegacyStorage();
  let migrated = false;
  [legacyKey, subject].forEach((key) => {
    if (key && legacy[key] && unitId in legacy[key]) {
      delete legacy[key][unitId];
      if (Object.keys(legacy[key]).length === 0) delete legacy[key];
      migrated = true;
    }
  });
  if (migrated) writeLegacyStorage(legacy);

  notifyProgressChanged();
  return next;
};

/**
 * React hook: bumps (and thus re-renders the calling component)
 * whenever any unit progress changes — in this tab via a CustomEvent,
 * and in other tabs via the browser "storage" event.
 */
export const useProgressVersion = () => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const bump = (e) => {
      // Only react to progress-related changes from other tabs, not to
      // unrelated localStorage writes (theme, todos, etc.).
      if (e && e.key && e.key !== STORAGE_KEY && e.key !== LEGACY_STORAGE_KEY) {
        return;
      }
      setVersion((v) => v + 1);
    };
    window.addEventListener(PROGRESS_EVENT, bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  return version;
};
