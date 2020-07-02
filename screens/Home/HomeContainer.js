import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import HomePresenter from "./HomePresenter";
import Loader from "../../components/common/Loader";
import { useRoute } from "@react-navigation/native";

export default ({ navigation }) => {
  const [results, setResults] = useState({
    loading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
  });
  const getData = async () => {
    setResults({
      loading: false,
    });
    // To do things
  };
  useEffect(() => {
    getData();
  }, []);
  return !results.loading ? (
    <HomePresenter {...results} refreshFn={getData} navigation={navigation} />
  ) : (
    <Loader></Loader>
  );
};
/*
export default ({ navigation }) => {
  const logOut = useLogOut();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("GroupStack")}>
        <Text>Group Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupSearch")}>
        <Text>Group Search Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("GroupCreate")}>
        <Text>Group Create Button</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
*/
