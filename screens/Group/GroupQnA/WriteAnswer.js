import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import CustomHeader from "../../../components/common/CustomHeader";
import { BG_COLOR, GREY_COLOR } from "../../../constants/Color";
import { HeaderHeight } from "../../../utils/HeaderHeight";
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertModal from "../../../components/common/AlertModal";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, question, answer: answerProps } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState(answerProps);
  const onChangeText = (text) => {
    setAnswer(text);
  };
  const submit = () => {
    if (answer.length <= 5) {
      setMessage("답변을 작성해주세요.");
      setModalVisible((prev) => !prev);
    } else {
    }
  };

  return (
    <>
      <CustomHeader
        title={"답변 작성"}
        rightButton={
          <Text onPress={() => submit()} style={{ marginRight: 5 }}>
            완료
          </Text>
        }
      ></CustomHeader>
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={""}
        body={message}
      ></AlertModal>
      <ScrollView style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>질문</Text>
          <Text style={styles.question}>{question}</Text>
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.questionTitle}>답변</Text>
          <View style={styles.answer}>
            <TextInput
              value={answer}
              placeholder={"답변을 작성해주세요"}
              onChangeText={(text) => onChangeText(text)}
              underlineColorAndroid="transparent"
              returnKeyType="next"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              autoCorrect={false}
              scrollEnabled={true}
              autoFocus={true}
              multiline={true}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    top: HeaderHeight,
  },
  questionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: GREY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  questionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  question: {
    marginTop: 20,
  },
  answerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  answer: {
    borderWidth: 0.5,
    borderColor: GREY_COLOR,
    marginTop: 20,
    borderRadius: 8,
    height: (HEIGHT * 50) / 100,
  },
});
