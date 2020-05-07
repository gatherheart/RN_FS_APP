import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import styled from "styled-components/native";
import {
  Dimensions,
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { areasName, schoolNames } from "../../constants/Names";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const TitleContainer = styled.View`
  height: ${HEIGHT / 20}px;
  border-style: solid;
  border-bottom-color: ${(props) => props.theme.moreLightGreyColor};
  border-bottom-width: 1px;
  margin: 20px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: 400;
  font-size: 20px;
`;

const Name = styled.Text`
  width: 100%;
  font-weight: 200;
  font-size: 15px;
  margin: 0px 0px 0px 15px;
`;

const SearchModal = ({ pageType, setOption, changeModal, isModalVisible }) => {
  const [names, setNames] = useState(pageType == 0 ? areasName : schoolNames);

  useEffect(() => {
    setNames(pageType == 0 ? schoolNames : areasName);
  }, [pageType]);
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={changeModal}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      useNativeDriver
    >
      <View
        style={{
          flex: 0.5,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <TitleContainer>
          <Title>{pageType == 0 ? "학교 선택" : "지역 선택"}</Title>
        </TitleContainer>
        <ScrollView>
          {names
            ? names.map((name, idx) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    style={styles.ButtonContainer}
                    onPress={() => {
                      setOption(idx);
                      changeModal();
                    }}
                  >
                    <Name>{name}</Name>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 40,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

SearchModal.proptypes = {
  type: Proptypes.number.isRequired,
  setOption: Proptypes.func.isRequired,
  changeModal: Proptypes.func.isRequired,
  isModalVisible: Proptypes.bool.isRequired,
};

export default SearchModal;
