export const getProgress = (subject) => {
  const data = JSON.parse(localStorage.getItem("progress")) || {};
  return data[subject] || {};
};

export const toggleUnitProgress = (subject, unitId) => {
  const data = JSON.parse(localStorage.getItem("progress")) || {};

  if (!data[subject]) {
    data[subject] = {};
  }

  data[subject][unitId] = !data[subject][unitId];

  localStorage.setItem("progress", JSON.stringify(data));
};