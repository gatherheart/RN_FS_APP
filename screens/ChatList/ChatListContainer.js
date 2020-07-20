import React, { useEffect, useState, useRef } from "react";
import ChatListPresenter from "./ChatListPresenter";
import { roomsData } from "./Rooms";
import Loader from "../../components/common/Loader";

export default ({ navigation }) => {
  const animation = useRef();
  const [data, setData] = useState({
    loading: true,
    rooms: [],
  });
  const getData = () => {
    setData({
      loading: false,
      rooms: roomsData,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return data.loading ? (
    <Loader></Loader>
  ) : (
    <ChatListPresenter {...data}></ChatListPresenter>
  );
};
