import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = ({
  setDate,
  isDatePickerVisible,
  setDatePickerVisibility,
  mode = "datetime",
  headerTextIOS = "",
  handleConfirm: handleConfirmProp,
}) => {
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };

  return (
    <View>
      <DateTimePickerModal
        headerTextIOS={headerTextIOS}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirmProp ? handleConfirmProp : handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePicker;
