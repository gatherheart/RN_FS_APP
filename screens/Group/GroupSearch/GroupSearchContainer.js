import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GroupSearchPrenster from "./GroupSearchPresenter";
import RightHeaderButton from "../../../components/Group/GroupRightHeader";

export default ({}) => {
  const [results, setResults] = useState({
    loading: true,
  });

  const [searchParam, setSearchParam] = useState(true);
  // Page type School Search 0 or Area Search 1
  const [pageType, setPageType] = useState(1);
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
  const route = useRoute();
  const navigation = useNavigation();
  const { firstSelected, secondSelected } = route.params;
  navigation.setOptions({
    title: firstSelected,
    headerRight: () => (
      <RightHeaderButton
        leftClick={() => setPageType(0)}
        rightClick={() => setPageType(1)}
      ></RightHeaderButton>
    ),
  });

  useEffect(() => {
    console.log(pageType, option);
    getData();
  }, [option]);

  return (
    <GroupSearchPrenster
      refreshFn={getData}
      loading={results.loading}
      results={results}
      selected={secondSelected}
      pageType={pageType}
      option={option}
      setOption={setOption}
    ></GroupSearchPrenster>
  );
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
        applicable: true,
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
        applicable: true,
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
    ],
  },

  unified: {
    groups: [],
  },
};
