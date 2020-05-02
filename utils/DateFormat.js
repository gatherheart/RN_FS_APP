export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
