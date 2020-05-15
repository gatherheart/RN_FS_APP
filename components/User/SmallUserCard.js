import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";
import Avatar from "../ProfileAvatar";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Small Horizontal Components

/*
                Name
  [ Avatar ]    Major
*/

const CardContainer = styled.View`
  width: ${(WIDTH * 50) / 100}px;
  height: ${(HEIGHT * 8.5) / 100}px;
  margin: 0px 0px 0px 0px;
  padding: 5px 10px 5px 0px;
`;

const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Data = styled.View`
  justify-content: flex-start;
  margin: 0px 0px 0px 20px;
`;
const Name = styled.Text`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 3px;
  font-family: ${(props) => props.theme.regularFont};
`;

const Major = styled.Text`
  font-weight: 300;
  font-size: 12px;
  font-family: ${(props) => props.theme.regularFont};
`;

const SmallUserCard = ({ id, name, major, avatar, style }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const goToUser = () => {
    //navigation.navigate("GroupNav", { id, groupName });
  };
  return (
    <CardContainer style={style}>
      <TouchableOpacity onPress={goToUser}>
        <Container>
          <AvatarContainer>
            <Avatar url={avatar} />
          </AvatarContainer>
          <Data>
            {name ? <Name>{name}</Name> : null}
            {major ? <Major>{major}</Major> : null}
          </Data>
        </Container>
      </TouchableOpacity>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  withShadow: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      height: 2.5,
      width: 2.5,
    },
  },
});

SmallUserCard.propTypes = {
  name: PropTypes.string.isRequired,
  major: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

export default SmallUserCard;
