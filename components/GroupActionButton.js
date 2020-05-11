import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import ActionButton from "react-native-action-button";
import CustumIcon from "./CustomIcon";

export default () => {
  if (Platform.OS === "android")
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" hideShadow={true}>
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
      <View style={{ flex: 1, backgroundColor: "#f3f3f3", zIndex: 4 }}>
        <ActionButton buttonColor="rgba(231,76,60,1)" hideShadow={true}>
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
