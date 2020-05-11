export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getMonth = (date) => {
  const theDate = new Date(date);
  return theDate.getMonth();
};

export const getYear = (date) => {
  const theDate = new Date(date);
  return theDate.getYear();
};
export const sortByDate = (target) => {
  target.sort((a, b) => {
    let dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateB - dateA;
  });
};
