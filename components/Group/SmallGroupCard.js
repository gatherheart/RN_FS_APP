import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import SmallPoster from "../common/SmallPoster";
import PropTypes from "prop-types";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { trimText } from "../../utils/String";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Small Horizontal Components

/*
                Title
  [ Picture ]   Description
                Tags
                Applicable date
*/

const CardContainer = styled.View`
  width: ${(WIDTH * 100) / 100}px;
  height: ${(HEIGHT * 13) / 100}px;
  border-style: solid;
  border-top-color: ${(props) => props.theme.moreLightGreyColor};
  border-top-width: 1px;
  margin: 0px 0px 0px 0px;
  padding: 5px 10px 0px 0px;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin: 0px 0px 2px 5px;
`;

const Data = styled.View`
  justify-content: flex-start;
  margin: 0px 0px 0px 20px;
`;

const HashContainer = styled.View`
  flex-direction: row;
`;

const PosterContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  border-radius: 75px;
  border-width: 1px;
  border: #e1e1e1;
  margin: 0px 0px 0px 20px;
`;

const Hash = styled.View`
  border-radius: 15px;
  margin-right: 2px;
`;

const HashText = styled.Text`
  color: #005f26;
`;

const DescText = styled.Text`
  margin: 0px 0px 2px 5px;
`;

const HorizontalGroup = ({
  id,
  groupName,
  description,
  tags,
  applicable,
  applicableDate,
  poster,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const goToGroup = () => {
    navigation.navigate("GroupNav", { id, groupName });
  };
  return (
    <CardContainer theme={themeContext}>
      <TouchableOpacity onPress={goToGroup}>
        <Container>
          <PosterContainer>
            <SmallPoster url={poster} />
          </PosterContainer>
          <Data>
            {groupName ? <Title>{trimText(groupName, 30)}</Title> : null}
            {description ? <DescText>{description}</DescText> : null}
            <HashContainer>
              {tags
                ? tags.map((tag, index) => (
                    <Hash key={id + index}>
                      <HashText> #{trimText(tag, 7)} </HashText>
                    </Hash>
                  ))
                : null}
            </HashContainer>
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

HorizontalGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  applicable: PropTypes.bool.isRequired,
};

export default HorizontalGroup;
