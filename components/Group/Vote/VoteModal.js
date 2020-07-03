import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import styled, { ThemeContext } from "styled-components/native";
import { simplifiedFormat } from "../../../utils/DateFormat";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin: 20px 0px 20px 20px;
  font-family: ${(props) => props.theme.boldFont};
`;
const Deadline = styled.Text`
  font-size: 13px;
  text-align: right;
  margin: 0px 10px 20px 0px;
  font-family: ${(props) => props.theme.regularFont};
`;

const Body = styled.Text`
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  margin: 10px 0px 20px 10px;
  font-family: ${(props) => props.theme.regularFont};
`;

const Option = styled.Text`
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  margin: 10px 0px 0px 10px;
  font-family: ${(props) => props.theme.regularFont};
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const OkButtonText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  font-family: ${(props) => props.theme.regularFont};
`;

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  top: 10px;
`;

const ChoiceButton = styled.TouchableOpacity`
  width: 80%;
  height: ${(HEIGHT * 4.5) / 100}px;
  margin-vertical: 10px;
  border-width: 0.5px;
  align-items: center;
  background-color: ${(props) => props.theme.pastelGreyColor}
  justify-content: center;
  border-radius: 7px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export default ({
  modalVisible = false,
  setModalVisible,
  voteTitle = "",
  voteMemo = "",
  voteList = [],
  deadline = "",
  multipleOption = false,
  anonymousOption = false,
}) => {
  const changeState = () => {
    setModalVisible((prev) => !prev);
  };

  const themeContext = useContext(ThemeContext);

  const [selection, setSelection] = useState(0);
  return (
    <Modal
      isVisible={modalVisible}
      onRequestClose={changeState}
      onBackdropPress={changeState}
      backdropColor={"black"}
      backdropOpacity={0.7}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      useNativeDriver={true}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Title>{voteTitle}</Title>
          <Deadline>{simplifiedFormat(deadline).slice(3)} 까지</Deadline>
          <Body>{voteMemo}</Body>
          <OptionContainer>
            {anonymousOption ? (
              <Option>익명 투표</Option>
            ) : (
              <Option>실명 투표</Option>
            )}
            {multipleOption ? (
              <Option>다중 투표</Option>
            ) : (
              <Option>단일 투표</Option>
            )}
          </OptionContainer>
          <ButtonContainer>
            {Object.keys(voteList).map((vote, idx) => {
              if (idx === 0) return null;

              return (
                <ChoiceButton
                  key={`vote-list-${idx}`}
                  style={{
                    backgroundColor:
                      selection === idx
                        ? themeContext.pastelGreenColor
                        : themeContext.pastelGreyColor,
                  }}
                  onPress={() => setSelection(idx)}
                >
                  <Text style={{ textAlign: "center" }}>{vote}</Text>
                </ChoiceButton>
              );
            })}
          </ButtonContainer>
          <RowContainer>
            <TouchableOpacity
              style={{
                marginVertical: 20,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
              onPress={changeState}
            >
              <OkButtonText>확인</OkButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 20,
                paddingHorizontal: 30,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
              onPress={changeState}
            >
              <OkButtonText>닫기</OkButtonText>
            </TouchableOpacity>
          </RowContainer>
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
    margin: 0,
    backgroundColor: "white",
  },
  innerContainer: {
    backgroundColor: "white",
  },
});
