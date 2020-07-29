import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { BG_COLOR } from "../../constants/Color";
import EditAccountModal from "../../components/Profile/EditAccountModal";
import EditKakaoModal from "../../components/Profile/EditKakaoModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default () => {
  const [modalVisible_account, setModalVisible_account] = useState({
    visible: false,
  });
  const [modalVisible_kakao, setModalVisible_kakao] = useState({
    visible: false,
  });

  return (
    <>
      <CustomHeader></CustomHeader>
      <ScrollView
        style={{ paddingTop: HeaderHeight, backgroundColor: BG_COLOR }}
      >
        <TouchableOpacity
          style={[styles.button, { borderTopWidth: 0.5 }]}
          onPress={() => {
            setModalVisible_account({ visible: true });
          }}
        >
          <Text>계좌 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            setModalVisible_kakao({ visible: true });
          }}
        >
          <Text>카카오페이 QR코드 등록</Text>
        </TouchableOpacity>
      </ScrollView>
      <EditAccountModal
        modalVisible={modalVisible_account.visible}
        setModalVisible={setModalVisible_account}
      ></EditAccountModal>
      <EditKakaoModal
        modalVisible={modalVisible_kakao.visible}
        setModalVisible={setModalVisible_kakao}
      ></EditKakaoModal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: WIDTH,
    height: 80,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingLeft: 30,
  },
});
