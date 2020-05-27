import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin: 20px 0px 20px 20px;
  font-family: ${(props) => props.theme.boldFont};
`;

const Body = styled.Text`
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  margin: 10px 0px 20px 10px;
  font-family: ${(props) => props.theme.regularFont};
`;

const OkButtonText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  font-family: ${(props) => props.theme.regularFont};
`;

export default ({
  modalVisible = false,
  setModalVisible,
  title = "",
  body = "",
}) => {
  const changeState = () => {
    setModalVisible((prev) => !prev);
  };
  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
      backdropColor={"black"}
      backdropOpacity={0.7}
      animationIn={{ from: { opacity: 1 }, to: { opacity: 1 } }}
      animationOut={{ from: { opacity: 0 }, to: { opacity: 0 } }}
      useNativeDriver={true}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Title>{title}</Title>
          <Body>{body}</Body>
          <TouchableOpacity
            style={{
              marginVertical: 20,
              paddingHorizontal: 30,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            onPress={changeState}
          >
            <OkButtonText>확인</OkButtonText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    opacity: 0,
  },
  modalContainer: {
    width: (WIDTH * 80) / 100,
    height: (HEIGHT * 15) / 100,
    margin: 0,
    backgroundColor: "white",
  },
  innerContainer: {
    backgroundColor: "white",
  },
});
