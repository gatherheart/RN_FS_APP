export const formatDate = (date) => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const dDayCalculator = (date) => {
  const theDate = new Date(date);
  const present_date = new Date();
  const one_day = 1000 * 60 * 60 * 24;
  const Result =
    Math.round(theDate.getTime() - present_date.getTime()) / one_day;
  return Result.toFixed(0);
};

// Calcuate current - target date
export const diffTime = (date) => {
  const theDate = new Date(date);
  const present_date = new Date();
  const one_minute = 1000 * 60;
  const one_hour = 1000 * 60 * 60;
  const one_day = 1000 * 60 * 60 * 24;
  const one_week = 1000 * 60 * 60 * 24 * 7;
  let unit = "week";

  if (present_date.getMonth() == 11 && present_date.getdate() > 25)
    theDate.setFullYear(theDate.getFullYear() + 1);

  // To Calculate the result in milliseconds and then converting into days
  let Result =
    Math.round(theDate.getTime() - present_date.getTime()) / one_week;
  let finalResult = -Result.toFixed(0);
  // Need to convert Week -> Day
  if (finalResult == 0) {
    Result = Math.round(theDate.getTime() - present_date.getTime()) / one_day;
    finalResult = -Result.toFixed(0);
    unit = "day";
  }
  // Need to convert Day -> Hour
  if (finalResult == 0) {
    Result = Math.round(theDate.getTime() - present_date.getTime()) / one_hour;
    finalResult = -Result.toFixed(0);
    unit = "hour";
  }
  // Need to convert Hour -> Minute
  if (finalResult === 0) {
    // To remove the decimals from the (Result) resulting days value
    Result =
      Math.round(theDate.getTime() - present_date.getTime()) / one_minute;
    finalResult = -Result.toFixed(0);
    unit = "minute";
  }
  return { unit: unit, time: finalResult };
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

export const getDate = (date) => {
  const theDate = new Date(date);
  return theDate.getDate();
};

export const getYearMonthDay = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const sortByDate = (target) => {
  target.sort((a, b) => {
    let dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateB - dateA;
  });
};
