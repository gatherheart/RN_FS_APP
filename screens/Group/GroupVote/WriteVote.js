import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
  Modal,
  TextInput,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/CustomHeader";
import DateTimePicker from "../../../components/DateTimePicker";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
`;

const OptionContainer = styled.View`
  width: 100%;
  height: 55px;
  border-width: 1px;
`;

const VoteListContainer = styled.View`
  width: 100%;
  border-width: 1px;
`;

const Title = styled.Text``;

const VoteList = ({ idx, vote, onChangeText, onSubmitEditing }) => {
  return (
    <View>
      <TextInput
        value={vote}
        placeholder={"선택지를 입력하세요"}
        onChangeText={(text) => onChangeText(text, idx)}
        onSubmitEditing={() => onSubmitEditing(idx)}
        returnKeyType="next"
        style={{
          borderWidth: 2,
          height: 55,
          borderColor: "red",
        }}
      ></TextInput>
    </View>
  );
};

export default () => {
  console.log("WriteVote");

  const [modalVisible, setModalVisible] = useState(false);
  const [voteTitle, setVoteTitle] = useState("");
  const [voteList, setVoteList] = useState(["", ""]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deadline, setDeadline] = useState(null);

  const themeContext = useContext(ThemeContext);

  const onSubmitVoteTitle = () => {
    if (voteTitle === "") return;
  };
  const onChangeVoteTitle = (text) => setVoteTitle(text);
  const onSubmitVoteList = (idx) => {
    if (voteList[idx] === "") return;
  };
  const onChangeVoteList = (text, idx) => {
    let newArr = [...voteList];
    newArr[idx] = text;
    setVoteList(newArr);
  };

  const addVoteList = () => {
    let newArr = [...voteList];
    newArr.push("");
    setVoteList(newArr);
  };

  const changeModal = () => {
    setModalVisible((prev) => !prev);
  };

  useEffect(() => {
    console.log(deadline);
  }, [deadline]);

  return (
    <ScrollView
      style={{ backgroundColor: themeContext.backgroundColor }}
      contentContainerStyle={{
        fontFamily: themeContext.regularFont,
      }}
    >
      <CustomHeader title={"투표 작성"}></CustomHeader>

      <Container>
        <OptionContainer>
          <TouchableOpacity>
            <Text>투표 할 대상 선택</Text>
          </TouchableOpacity>
        </OptionContainer>
        <OptionContainer>
          <TextInput
            value={voteTitle}
            placeholder={"투표 제목"}
            onChangeText={onChangeVoteTitle}
            onSubmitEditing={onSubmitVoteTitle}
            returnKeyType="next"
            style={{ borderWidth: 2, height: "100%" }}
          ></TextInput>
        </OptionContainer>
        <VoteListContainer>
          {voteList.map((vote, idx) => {
            return (
              <VoteList
                key={"voteList-" + idx}
                idx={idx}
                value={voteList[idx]}
                placeholder={"선택지를 입력하세요"}
                onChangeText={onChangeVoteList}
                onSubmitEditing={onSubmitVoteList}
                returnKeyType="next"
                style={{ borderWidth: 2, height: "100%" }}
              ></VoteList>
            );
          })}
        </VoteListContainer>
        <OptionContainer>
          <TouchableOpacity style={{ height: "100%" }} onPress={addVoteList}>
            <Text>선택지를 추가하세요</Text>
          </TouchableOpacity>
        </OptionContainer>
        <OptionContainer>
          <TouchableOpacity
            style={{ height: "100%" }}
            onPress={() => setDatePickerVisibility((prev) => !prev)}
          >
            <Text>투표 마감 설정</Text>
          </TouchableOpacity>
          <DateTimePicker
            setDeadline={setDeadline}
            isDatePickerVisible={isDatePickerVisible}
            setDatePickerVisibility={setDatePickerVisibility}
          ></DateTimePicker>
        </OptionContainer>
        <OptionContainer>
          <TouchableOpacity>
            <Text></Text>
          </TouchableOpacity>
        </OptionContainer>
      </Container>
    </ScrollView>
  );
};
