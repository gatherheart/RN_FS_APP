import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";
import Avatar from "../ProfileAvatar";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Organization of Small Components

/*
  [ Avatar ]     
    name
  [ Avatar ]     
    name
*/

const CardContainer = styled.View`
  margin: 0px 0px 0px 5px;
  padding: 5px 10px 5px 0px;
  flex-direction: row;
  width: ${(WIDTH * 90) / 100}px;
  align-items: center;
`;

const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 10px 10px 10px 10px;
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

const UsersTable = ({ users, style = {} }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <CardContainer style={{ flexWrap: "wrap", ...style }}>
      {users.map((user) => {
        const { avatar, name } = user;
        console.log(name);
        return (
          <AvatarContainer key={"avatar-" + user.id}>
            <Avatar url={avatar} />
            {name ? <Name>{name}</Name> : null}
          </AvatarContainer>
        );
      })}
    </CardContainer>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersTable;
