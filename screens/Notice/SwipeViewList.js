import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import { defaultPoster } from "../../constants/Urls";
import Poster from "../../components/common/GroupPoster";

const ROW_HEIGHT = 78;
export default function SwipeViewList({ data }) {
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={styles.alarmContainer}>
        <Image
          source={{ uri: data.item.group?.poster || defaultPoster }}
          style={styles.image}
        ></Image>
        <View style={styles.info}>
          <Text style={styles.title}>{data.item.title} </Text>
          <Text>{data.item.body}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        onRowDidOpen={onRowDidOpen}
        closeOnScroll
        friction={6.5}
        tension={2}
        disableRightSwipe
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "#fff",
    borderBottomColor: "black",
    borderBottomWidth: 0.3,
    justifyContent: "center",
    height: ROW_HEIGHT,
    paddingLeft: 10,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  image: {
    width: 60,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 30,
  },
  alarmContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    marginLeft: 20,
  },
  title: {
    fontWeight: "bold",
  },
});
