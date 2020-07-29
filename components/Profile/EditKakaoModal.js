import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { _pickImage } from "../../utils/FileSystem";
import { BarCodeScanner } from "expo-barcode-scanner";

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
const handleQrCode = async (image, setState, setMessage) => {
  const ret = await BarCodeScanner.scanFromURLAsync(image.uri, [
    BarCodeScanner.Constants.BarCodeType.qr,
  ]);
  console.log(ret);
  if (ret?.[0]?.data === undefined) {
    setState();
    setMessage("QR코드가 아닙니다");
    return;
  }
  if (!ret?.[0]?.data.includes("https://qr.kakaopay.com")) {
    setState();
    setMessage("카카오 QR코드가 아닙니다");
    return;
  }
  setState(ret?.[0]?.data);
  setMessage();
};
const EditProfileModal = ({
  modalVisible = false,
  setModalVisible,
  title = "",
  body = "",
  cancleEnabled = false,
  callback = () => {},
  onModalHide = () => {},
}) => {
  const [image, setImage] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrcode, setQrcode] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
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
          {qrcode && <Text style={styles.result}>{qrcode}</Text>}
          {message && <Text style={styles.result}>{message}</Text>}

          <TouchableOpacity
            style={styles.imageButton}
            onPress={async () => {
              const ret = await _pickImage();
              await handleQrCode(ret, setQrcode, setMessage);
              console.log("qrcode", qrcode);
            }}
          >
            <Text style={{ alignSelf: "center" }}>QR코드 올리기</Text>
            <FontAwesome
              name="photo"
              size={24}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <View style={styles.button}>
            {true ? (
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
                alignItems: "flex-end",
                justifyContent: "flex-end",
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

EditProfileModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  cancleEnabled: PropTypes.bool,
  callback: PropTypes.func,
  onModalHide: PropTypes.func,
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    opacity: 0,
    bottom: 100,
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
  imageButton: {
    flexDirection: "row",
    marginTop: 80,
    marginBottom: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 160,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  result: {
    paddingTop: 30,
    textAlign: "center",
    color: "#ce0000",
  },
});
