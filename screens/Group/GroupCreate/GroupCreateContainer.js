import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";
import GroupCreate1 from "./GroupCreate1";
import Loader from "../../../components/common/Loader";

export default () => {
  const [data, setData] = useState({
    loading: true,
  });

  const getData = async () => {
    //const [result, error] = await movieApi.nowPlaying();
    setData({
      loading: false,
    });
  };

  useEffect(() => {
    console.log("data.loading", data.loading);
    getData();
  }, []);

  return data.loading ? (
    <Loader></Loader>
  ) : (
    <GroupCreate1 {...data}></GroupCreate1>
  );
};
