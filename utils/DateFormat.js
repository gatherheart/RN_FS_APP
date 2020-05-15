export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const timePickedConverter = (date) => {
  const theDate = new Date(date);
  const convertedDate = formatDate(date);
  const convertedTime =
    theDate.getHours() + "시 " + theDate.getMinutes() + "분";
  return convertedDate + " " + convertedTime;
};

export const simplifiedFormat = (date) => {
  const theDate = new Date(date);
  const convertedDate = formatDate(date);
  const convertedTime = theDate.getHours() + ":" + theDate.getMinutes();
  return convertedDate.slice(2) + " " + convertedTime;
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
