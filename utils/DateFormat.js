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
  const convertedDate =
    Number(theDate.getYear() + 1900) +
    "년 " +
    Number(theDate.getMonth() + 1) +
    "월 " +
    theDate.getDate() +
    "일";
  const convertedTime =
    theDate.getHours() + "시 " + theDate.getMinutes() + "분";

  return convertedDate + " " + convertedTime;
};

export const simplifiedFormat = (date) => {
  return timePickedConverter(date).slice(2);
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
