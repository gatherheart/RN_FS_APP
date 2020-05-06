import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GroupSearchPrenster from "./GroupSearchPresenter";
import Proptypes from "prop-types";
import styled, { ThemeContext } from "styled-components/native";
import { firstCategory } from "../../../constants/Names";

const HeaderRightBtn = styled.View`
  border: ${(props) => props.theme.lightGreyColor};
  border-radius: 7px;
  flex-direction: row;
  margin: 4px 12.2px 0px 0px;
`;

const ButtonText = styled.Text`
  margin: 0px 3px 0px 3px;
  font-size: 14px;
`;

const LeftButton = styled.TouchableOpacity`
  border-radius: 7px;
`;

const RightButton = styled.TouchableOpacity`
  border-radius: 7px;
`;

/**
 * @param {Function} leftClick left button object
 * @param {Function} rightClick left button object
 * @return {node} View Component contains two row-direction button
 */
const RightHeaderButton = ({ leftClick, rightClick, pageType = 0 }) => {
  const themeContext = useContext(ThemeContext);
  const leftStyle =
    pageType == 0
      ? {
          border: themeContext.darkGreyColor,
          backgroundColor: themeContext.lightGreyColor,
        }
      : null;
  const rightStyle =
    pageType == 1
      ? {
          border: themeContext.darkGreyColor,
          backgroundColor: themeContext.lightGreyColor,
        }
      : null;
  return (
    <HeaderRightBtn>
      <LeftButton onPress={leftClick} style={leftStyle}>
        <ButtonText>대학</ButtonText>
      </LeftButton>
      <RightButton onPress={rightClick} style={rightStyle}>
        <ButtonText>연합</ButtonText>
      </RightButton>
    </HeaderRightBtn>
  );
};

export default ({}) => {
  const [results, setResults] = useState({
    loading: true,
  });

  // Query Type School Search true or Area Search false
  const [searchParam, setSearchParam] = useState(true);
  // Page type School Search 0 or Area Search 1
  const [pageType, setPageType] = useState(0);
  // selected option for school search or Area search
  const [option, setOption] = useState(0);

  const getData = async () => {
    //const [result, error] = await movieApi.nowPlaying();
    if (searchParam)
      setResults({
        loading: false,
        ...result.school,
      });
    else
      setResults({
        loading: false,
        ...result.unified,
      });
  };
  // Use Route and Navigation using Context
  const route = useRoute();
  const navigation = useNavigation();

  const { firstSelected, secondSelected } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: firstCategory[firstSelected],
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RightHeaderButton
          leftClick={() => {
            setPageType(0);
            setOption(0);
          }}
          rightClick={() => {
            setPageType(1);
            setOption(0);
          }}
          pageType={pageType}
        ></RightHeaderButton>
      ),
    });
    getData();
  }, [pageType, option]);

  return (
    <GroupSearchPrenster
      refreshFn={getData}
      loading={results.loading}
      results={results}
      firstSelected={firstSelected}
      secondSelected={secondSelected}
      pageType={pageType}
      option={option}
      setOption={setOption}
    ></GroupSearchPrenster>
  );
};

RightHeaderButton.proptypes = {
  leftClick: Proptypes.func.isRequired,
  rightClick: Proptypes.func.isRequired,
};

const result = {
  school: {
    school: "SKKU",
    campuses: ["All", "Natural", "Liberal Arts"],
    groups: [
      {
        groupName: "Golf Groups",
        id: 1,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Soccer Groups",
        id: 2,
        description: "Hello It is Group",
        campus: "Liberal Arts",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-03-22",
        poster: "",
      },
      {
        groupName: "Texas Groups",
        id: 3,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 33,
        applicable: false,
        applicableDate: "2020-03-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 4,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: false,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 5,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: false,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 6,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 7,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 8,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 9,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 10,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 11,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 12,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 13,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 14,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 15,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 16,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 8,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 17,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
      {
        groupName: "Golf Groups",
        id: 18,
        description: "Hello It is Group",
        campus: "Natural Science",
        tags: ["Game", "Play", "Sports"],
        memberCount: 30,
        applicable: true,
        applicableDate: "2020-07-22",
        poster: "",
      },
    ],
  },

  unified: {
    groups: [],
  },
};
