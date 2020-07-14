import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
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

const AlertModal = ({
  modalVisible = false,
  setModalVisible,
  title = "",
  body = "",
  cancleEnabled = false,
  callback = () => {},
  onModalHide = () => {},
}) => {
  const changeState = (_success) => {
    setModalVisible((prev) => {
      if (typeof prev === "boolean") return !prev;
      else if (typeof prev === "object")
        return { ...prev, visible: !prev.visible, success: _success };
      else return prev;
    });
  };
  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
      backdropColor={"black"}
      backdropOpacity={0.7}
      hasBackdrop={true}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationInTiming={100}
      animationOutTiming={100}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      useNativeDriver
      onModalHide={onModalHide}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Title>{title}</Title>
          <Body>{body}</Body>
          <View style={styles.button}>
            {cancleEnabled ? (
              <TouchableOpacity
                style={{
                  marginVertical: 20,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
                onPress={() => changeState(false)}
              >
                <OkButtonText>취소</OkButtonText>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={{
                marginVertical: 20,
                paddingHorizontal: 30,
              }}
              onPress={() => {
                callback();
                changeState(true);
              }}
            >
              <OkButtonText>확인</OkButtonText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

AlertModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  cancleEnabled: PropTypes.bool,
  callback: PropTypes.func,
  onModalHide: PropTypes.func,
};

export default AlertModal;

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
  button: {
    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
