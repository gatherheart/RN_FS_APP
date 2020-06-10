import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Loader from "../../components/common/Loader";

export default ({ navigation }) => {
  const [data, setData] = useState({
    loading: true,
    billTitle: "",
    billId: "",
    billMemo: "",
    deadline: "",
    closed: false,
    memberList: [],
    createdAt: "",
    author: {},
    billAmount: 0,
    bank: "",
  });
  const getData = async () => {
    setData({
      loading: false,
      ...billData,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <View>
      <Text>Feed</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <Text>Post Button</Text>
      </TouchableOpacity>
    </View>
  );
};
