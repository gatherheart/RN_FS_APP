import { isSameUser, isSameDay } from "react-native-gifted-chat/lib/utils";
export const isSmaeThread = (currentMessage, previousMessage) =>
  isSameUser(currentMessage, previousMessage) &&
  isSameDay(currentMessage, previousMessage);

const lessThanOneMinute = (date, prevDate) => {
  const theDate = new Date(date);
  const _thePrevDate = new Date(prevDate);
  const one_minute = 1000 * 60;
  const _diff =
    Math.round(theDate.getTime() - _thePrevDate.getTime()) / one_minute;
  return _diff < 1 && theDate.getMinutes() === _thePrevDate.getMinutes();
};

export const isSameTime = (currentMessage, previousMessage) =>
  lessThanOneMinute(currentMessage.createdAt, previousMessage.createdAt);
