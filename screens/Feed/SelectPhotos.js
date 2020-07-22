import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/common/Loader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { BG_COLOR } from "../../constants/Color";
import CustomHeader from "../../components/common/CustomHeader";
import { AntDesign } from "@expo/vector-icons";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: blue;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export default ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    const _ids = selected.map((img) => img.id);
    if (_ids.includes(photo.id)) {
      setSelected(selected.filter((img) => img.id !== photo.id));
      return;
    }
    if (selected.length > 4) return;

    setSelected((prev) => [...prev, photo]);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      console.log(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };
  const handleSelected = () => {
    navigation.navigate("Upload", { photo: selected });
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      <CustomHeader
        title={"사진 선택"}
        rightButtonEnabled={true}
        rightButton={
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={handleSelected}
          >
            <Text style={{ color: "black" }}>완료</Text>
          </TouchableOpacity>
        }
      ></CustomHeader>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {hasPermission ? (
            <>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => {
                  const _isIncluded = selected
                    .map((img) => img.id)
                    .includes(photo.id);

                  return (
                    <TouchableOpacity
                      key={photo.id}
                      onPress={() => changeSelected(photo)}
                      style={styles.imageContainer}
                    >
                      <Image
                        source={{ uri: photo.uri }}
                        style={{
                          width: WIDTH / 3,
                          height: undefined,
                          aspectRatio: 1,
                          opacity: _isIncluded ? 0.5 : 1,
                        }}
                      />
                      <AntDesign
                        style={{
                          position: "absolute",
                          alignSelf: "flex-end",
                          opacity: _isIncluded ? 0.5 : 0,
                        }}
                        name="checkcircle"
                        size={24}
                        color={BG_COLOR}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: { paddingTop: HeaderHeight, backgroundColor: BG_COLOR },
  contentContainerStyle: {},
  imageContainer: {
    flexDirection: "row",
  },
});
