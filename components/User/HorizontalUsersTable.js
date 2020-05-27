import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";
import Avatar from "./InteractiveProfileAvatar";
import CustomIcon from "../common/CustomIcon";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Organization of Small Components
// Copied file of User Table
/*
  [ Avatar ]     
    name
  [ Avatar ]     
    name
*/

const CardContainer = styled.View`
  margin: 0px 0px 0px 5px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightGreyColor};
`;

const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 15px 5px 10px 0px;
  height: 100%;
  width: ${(WIDTH * 15) / 100}px;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const Data = styled.View`
  justify-content: flex-start;
  margin: 0px 0px 0px 20px;
`;
const Name = styled.Text`
  font-weight: 400;
  font-size: 12px;
  margin-vertical: 3px;
  font-family: ${(props) => props.theme.regularFont};
`;

const RemoveButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  right: 7%;
  top: 7%;
  z-index: 1;
`;
const UsersTable = ({ users, changeChecked, usersId, style = {} }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <CardContainer
      style={{
        ...style,
      }}
    >
      {users.map((user) => {
        const { avatar, name } = user;
        return usersId.includes(user.id) ? (
          <AvatarContainer key={"avatar-" + user.id}>
            <Avatar url={avatar} />
            {name ? <Name>{name}</Name> : null}
            <RemoveButton onPress={() => changeChecked(user.id)}>
              <CustomIcon
                name={"close-circle"}
                size={20}
                color={themeContext.greyColor}
              ></CustomIcon>
            </RemoveButton>
          </AvatarContainer>
        ) : null;
      })}
    </CardContainer>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersTable;
