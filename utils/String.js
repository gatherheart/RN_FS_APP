export const trimText = (text = "", limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
