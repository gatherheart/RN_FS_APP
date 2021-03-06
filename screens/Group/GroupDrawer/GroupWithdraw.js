import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../../components/common/CustomHeader";
import { BG_COLOR, RED_COLOR } from "../../../constants/Color";
import {
  HeaderHeight,
  BottomSafeAreaHeight,
} from "../../../utils/HeaderHeight";
import GoodByeIcon from "../../../components/common/svg/GoodByeIcon";
import { scale } from "react-native-size-matters";
import AlertModal from "../../../components/common/AlertModal";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    message: "탈퇴하시겠습니까?",
    callback: () => {},
  });
  const [completed, setCompleted] = useState(false);

  return (
    <>
      <CustomHeader
        title={"모임 탈퇴"}
        styles={{ borderWidth: 1 }}
      ></CustomHeader>
      <AlertModal
        modalVisible={!!modalVisible.visible}
        setModalVisible={setModalVisible}
        body={modalVisible.message}
        cancleEnabled
        callback={() => {}}
        onModalHide={() => {
          console.log("onModalHide");
          setCompleted(true);
        }}
      ></AlertModal>
      <AlertModal
        modalVisible={completed}
        setModalVisible={setCompleted}
        body={"완료되었습니다."}
        callback={() => {
          navigation.navigate("Home", {});
        }}
      ></AlertModal>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}
      >
        <View style={styles.contents}>
          <View style={styles.icon}>
            <GoodByeIcon width={WIDTH / 2} height={WIDTH / 2}></GoodByeIcon>
          </View>
          <Text style={styles.notice}>모임이 탈퇴됩니다 {"\n"}</Text>
          <Text style={styles.info}>
            작성한 게시글 및 댓글은 유지됩니다. {"\n"}
            필요하다면 삭제 후 탈퇴하시기 바랍니다.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setModalVisible((prev) => {
              return { ...prev, visible: true };
            })
          }
        >
          <Text style={styles.text}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    paddingTop: HeaderHeight,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  contents: {
    flex: 1,
    height: HEIGHT / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginVertical: 10,
  },
  notice: {
    fontWeight: "600",
  },
  info: {
    textAlign: "center",
    fontWeight: "300",
  },
  buttonContainer: {
    bottom: BottomSafeAreaHeight,
    position: "absolute",
    backgroundColor: RED_COLOR,
    height: (HEIGHT * 8) / 100,
    width: WIDTH,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: BG_COLOR, fontSize: scale(15), fontWeight: "bold" },
});
