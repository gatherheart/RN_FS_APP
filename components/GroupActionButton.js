import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ActionButton from "react-native-action-button";
import CustumIcon from "./CustomIcon";
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

export default () => {
  if (Platform.OS === "android")
    return (
      <ActionButton
        offsetX={30}
        offsetY={10}
        buttonColor="#A6E971"
        hideShadow={true}
        useNativeFeedback={true}
      >
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log("notes tapped!")}
        >
          <CustumIcon name="create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}
        >
          <CustumIcon
            name="notifications-off"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}
        >
          <CustumIcon name="done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  else if (Platform.OS === "ios") {
    return (
      <View
        style={{
          left: WIDHT / 100,
          top: -(HEIGHT * 15) / 100,
          zIndex: 4,
        }}
      >
        <ActionButton buttonColor="rgb(166,233,113)" hideShadow={true}>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log("notes tapped!")}
          >
            <CustumIcon name="create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}
          >
            <CustumIcon
              name="notifications-off"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => {}}
          >
            <CustumIcon name="done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
