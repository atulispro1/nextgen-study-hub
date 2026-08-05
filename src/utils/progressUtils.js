const getStoredProgress = () => {
  try {
    return JSON.parse(localStorage.getItem("progress")) || {};
  } catch {
    // Corrupted or unreadable stored progress must never crash the app.
    return {};
  }
};

export const getProgress = (subject) => {
  const data = getStoredProgress();
  return data[subject] || {};
};

export const toggleUnitProgress = (subject, unitId) => {
  const data = getStoredProgress();

  if (!data[subject]) {
    data[subject] = {};
  }

  data[subject][unitId] = !data[subject][unitId];

  localStorage.setItem("progress", JSON.stringify(data));
};