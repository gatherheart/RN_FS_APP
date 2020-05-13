import React from "react";
import { StyleSheet } from "react-native";

export default ({ modalVisible = false, changeState }) => {
  <View style={styles.container}>
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text>Hello World!</Text>

          <TouchableOpacity
            style={{ backgroundColor: "#2196F3" }}
            onPress={changeState}
          >
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "white",
  },
});
