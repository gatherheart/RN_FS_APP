import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import { getYearMonthDayKr } from "../../utils/DateFormat";
import { isSameDay, StylePropType } from "react-native-gifted-chat/lib/utils";
import Color from "react-native-gifted-chat/lib/Color";
const DATE_FORMAT = "ll";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: "600",
  },
});
const Day = (props) => {
  const {
    dateFormat,
    currentMessage,
    previousMessage,
    containerStyle,
    wrapperStyle,
    textStyle,
  } = props;
  if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {getYearMonthDayKr(props.currentMessage.createdAt)}
          </Text>
        </View>
      </View>
    );
  }
  return null;
};
export default Day;

Day.contextTypes = {
  getLocale: PropTypes.func,
};
Day.defaultProps = {
  currentMessage: {
    createdAt: null,
  },
  previousMessage: {},
  nextMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  dateFormat: DATE_FORMAT,
};
Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  inverted: PropTypes.bool,
  containerStyle: StylePropType,
  wrapperStyle: StylePropType,
  textStyle: StylePropType,
  dateFormat: PropTypes.string,
};
//# sourceMappingURL=Day.js.map
