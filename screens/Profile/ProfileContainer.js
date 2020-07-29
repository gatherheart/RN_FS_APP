import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Loader from "../../components/common/Loader";
import ProfilePresenter from "./ProfilePresenter";

export default ({ navigation }) => {
  const [data, setData] = useState({
    loading: true,
  });

  const getData = async () => {
    setData({
      loading: false,
      profile,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data.loading ? (
    <Loader></Loader>
  ) : (
    <ProfilePresenter {...data}></ProfilePresenter>
  );
};

const profile = {
  name: "장안구",
  id: "gadfgda8",
  avatar:
    "https://images.unsplash.com/photo-1595770655731-9a1dc07b4184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=240&q=80",
  type: 2,
  association: {
    range: "COLLEGE_LEVEL",
    school: "성균관대학교",
    campus: "자연과학캠퍼스",
    college: "공과대학",
    major: "화학공학/고분자공학부",
  },
  admissionYear: "16",
};
