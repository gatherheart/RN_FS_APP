import React, { useState, useEffect } from "react";
import messagesData from "./Messages";
import Chat from "./ChatPresenter";
import { membersData } from "./Members";
import Loader from "../../components/common/Loader";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
export default () => {
  const [state, setState] = useState({
    loading: true,
    messages: [],
    participants: [],
  });
  const navigation = useNavigation();

  const getDate = async () => {};

  useEffect(() => {
    getDate();
    if (!state.messages?.length) {
      setState({
        loading: false,
        messages: [
          {
            _id: Math.round(Math.random() * 1000000),
            text: "0 message",
            createdAt: new Date(),
            system: true,
          },
        ],
      });
    }
    setState({
      loading: false,
      messages: messagesData,
      participants: membersData,
    });
    console.log("setParams");
    navigation.setParams({ participants: membersData });
  }, []);

  return state.loading ? (
    <Loader></Loader>
  ) : (
    <Chat {...state} setState={setState}></Chat>
  );
};
