import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import { useNavigation } from "@react-navigation/native";
import { BG_COLOR } from "../../constants/Color";
import { HeaderHeight } from "../../utils/HeaderHeight";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export default ({ profile }) => {
  const navigation = useNavigation();
  return (
    <>
      <ProfileHeader></ProfileHeader>
      <View style={styles.container}>
        <Image
          source={{ uri: profile.avatar || defaultPoster }}
          style={styles.avatar}
        ></Image>
        <View style={styles.info}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.school}>
            {profile.association.school} {profile.association.campus}
          </Text>
          <Text style={styles.major}>
            {profile.association.major} {profile.admissionYear}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editProfile}
          onPress={() =>
            navigation.navigate("EditProfile", { from: "Profile" })
          }
        >
          <Text>내 정보 수정</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: HeaderHeight,
    alignItems: "center",
  },
  editProfile: {
    marginTop: 40,
    width: Math.round((WIDTH * 80) / 100),
    height: 40,
    borderRadius: 10,
    borderWidth: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginTop: Math.round((HEIGHT * 10) / 100),
    resizeMode: "cover",
    width: WIDTH / 2,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: WIDTH / 4,
  },
  info: {
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  school: {
    marginTop: 20,
    fontSize: 15,
  },
  major: {
    marginTop: 5,
    fontSize: 15,
  },
});
