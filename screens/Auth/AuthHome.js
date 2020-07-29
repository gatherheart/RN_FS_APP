import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { BottomSafeAreaHeight } from "../../utils/HeaderHeight";
import { BG_COLOR, BLACK_COLOR } from "../../constants/Color";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [isVisible, setVisible] = useState(true);
  const [permissions, setPermissions] = useState(false);

  async function _getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  const _getPermissions = async () => {
    let { status: CAMERA_status } = await Permissions.getAsync(
      Permissions.CAMERA
    );
    let { status: CAMERA_ROLL_status } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );

    //const { CAMERA_status } = await Permissions.askAsync(
    //  Permissions.NOTIFICATIONS
    //);
    if (CAMERA_ROLL_status === "granted") {
      //let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
      //if (album === null) {
      //  album = await MediaLibrary.createAlbumAsync(ALBUM_NAME);
      //}

      if (CAMERA_status === "granted") {
        setPermissions(true);
      } else {
        await Permissions.askAsync(Permissions.CAMERA);
      }
    } else {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  };
  return (
    <View>
      <Text
        onPress={() => {
          setVisible((prev) => !prev);
        }}
      >
        Auth Home
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Go to Signup</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        onBackdropPress={() => setVisible(false)}
      >
        <ScrollView>
          {/* place your buttons here */}
          <View style={styles.modalContainer}>
            <Text style={styles.info}>필수 접근권한</Text>
            <View style={styles.contents}>
              <Text style={styles.permission}>위치권한</Text>
              <Text style={styles.brief}>예약 서비스 이용시 필요합니다.</Text>
              <Text style={styles.permission}>
                사진, 카메라, 미디어 파일 권한
              </Text>
              <Text style={styles.brief}>
                파일 업로드 및 프로필 수정 시 필요합니다.
              </Text>
              <Text style={styles.permission}>전화 권한</Text>
              <Text style={styles.brief}>멤버간 전화 이용시 필요합니다.</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setVisible(false);
            _getiOSNotificationPermission();
            _getPermissions();
            setTimeout(() => {
              navigation.navigate("LogIn");
            }, 300);
          }}
        >
          <Text style={styles.buttonText}>동의</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    margin: 0,
    backgroundColor: "white",
    flex: 0,
    height: HEIGHT / 2,
    bottom: 0,
    paddingBottom: BottomSafeAreaHeight,
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    fontSize: 18,
    color: "#0A9BBB",
    fontWeight: "bold",
  },
  contents: {
    marginTop: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  modalContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingTop: 20,
    paddingLeft: 20,
  },
  permission: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 30,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  brief: {
    fontSize: 17,
    marginTop: 5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: BottomSafeAreaHeight,
    height: HEIGHT / 15,
    borderWidth: 1,
    backgroundColor: BLACK_COLOR,
  },
  buttonText: {
    color: BG_COLOR,
    fontSize: 18,
    fontWeight: "bold",
  },
});
