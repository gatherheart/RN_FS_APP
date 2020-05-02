import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GroupSearchPrenster from "./GroupSearchPresenter";
import RightHeaderButton from "../../../components/Group/GroupRightHeader";

const result = {
  school: {
    school: "SKKU",
    campuses: ["All", "Natural", "Liberal Arts"],
    groups: [
      {
        groupName: "Golf Groups",
        id: 1,
        intro: "Hello It is Group",
        campus: "Natural Science",
        tag: ["Game", "Play", "Sports"],
        memberCount: 30,
        Applicable: true,
        ApplicationDate: "2004-03-22",
        poster: "",
      },
      {
        groupName: "Soccer Groups",
        id: 2,
        intro: "Hello It is Group",
        campus: "Liberal Arts",
        tag: ["Game", "Play", "Sports"],
        memberCount: 30,
        Applicable: true,
        ApplicationDate: "2004-03-22",
        poster: "",
      },
      {
        groupName: "Texas Groups",
        id: 3,
        intro: "Hello It is Group",
        campus: "Natural Science",
        tag: ["Game", "Play", "Sports"],
        memberCount: 33,
        Applicable: false,
        ApplicationDate: "2004-03-22",
        poster: "",
      },
    ],
  },

  unified: {
    groups: [],
  },
};

export default ({}) => {
  const [results, setResults] = useState({
    loading: true,
  });

  const [searchParam, setSearchParam] = useState(true);

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
    headerRight: () => <RightHeaderButton></RightHeaderButton>,
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <GroupSearchPrenster
      refreshFn={getData}
      loading={results.loading}
      results={results}
      selected={secondSelected}
    ></GroupSearchPrenster>
  );
};
