import React, { useState, useEffect } from "react";
import messagesData from "./Messages";
import Chat from "./ChatPresenter";
import { membersData } from "./Members";

export default () => {
  const [state, setState] = useState({
    loading: true,
    messages: [],
    participants: [],
  });
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
  }, []);

  return <Chat {...state} setState={setState}></Chat>;
};
