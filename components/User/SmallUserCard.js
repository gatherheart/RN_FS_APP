import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";
import Avatar from "./ProfileAvatar";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Small Horizontal Components

/*
                Name
  [ Avatar ]    Major
*/

const CardContainer = styled.View`
  height: 100%;
  margin: 0px 0px 0px 0px;
  padding: 5px 10px 5px 0px;
  justify-content: center;
  height: ${(HEIGHT * 8.5) / 100}px;
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
const RowContainer = styled.View`
  flex-direction: row;
`;

const SmallUserCard = ({
  id,
  name,
  institution,
  major,
  admissionYear,
  phoneNumber,
  avatar,
  style,
  onPress,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <CardContainer style={style}>
      <TouchableOpacity onPress={onPress}>
        <Container>
          <AvatarContainer>
            <Avatar url={avatar} />
          </AvatarContainer>
          <Data>
            {name ? <Name>{name}</Name> : null}
            {institution ? (
              <RowContainer>
                {institution.major ? (
                  <Major>{institution.major}, </Major>
                ) : null}
                {institution.college ? (
                  <Major>{institution.college}, </Major>
                ) : null}
                {admissionYear ? (
                  <Major>{admissionYear.slice(2)}학번</Major>
                ) : null}
              </RowContainer>
            ) : null}
            <RowContainer></RowContainer>
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
  institution: PropTypes.shape({
    range: PropTypes.string,
    school: PropTypes.string,
    campus: PropTypes.string,
    college: PropTypes.string,
    major: PropTypes.string,
  }),
  admissionYear: PropTypes.string,
  onPress: PropTypes.func,
};

export default SmallUserCard;
