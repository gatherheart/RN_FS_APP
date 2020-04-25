import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GroupSearchPrenster from "./GroupSearchPresenter";
import RightHeaderButton from "../../../components/Group/GroupRightHeader";

export default ({}) => {
  const [results, setResults] = useState({
    loading: true,
  });

  const getData = async () => {
    //const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    setResults({
      loading: false,
    });
  };
  const route = useRoute();
  const navigation = useNavigation();
  const { firstSelected, secondSelected } = route.params;
  navigation.setOptions({
    title: secondSelected,
    headerRight: () => <RightHeaderButton></RightHeaderButton>,
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <GroupSearchPrenster
      refreshFn={getData}
      {...results}
      selected={secondSelected}
    ></GroupSearchPrenster>
  );
};
