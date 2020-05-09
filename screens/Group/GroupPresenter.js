import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  Animated,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/Icon";
import Button from "../../components/Group/ArgonButton";
import Images from "../../constants/ArgonImages";
import argonTheme from "../../constants/ArgonTheme";
import {
  HeaderHeight,
  StatusHeight,
  Sat,
  UnderHeader,
} from "../../utils/HeaderHeight";
import styled, { ThemeContext } from "styled-components/native";

const { width, height } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: 150px;
`;

const thumbMeasure = (width - 48 - 32) / 3;

const backgroundImg =
  "https://images.unsplash.com/photo-1588780530902-bbc23735248c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650";

const profileImg =
  "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320";

const HEADER_SCROLL_DISTANCE = 100;

const GroupName = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

export default ({ id, groupName, loading, refreshFn }) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const position = new Animated.ValueXY(0);

  const profileOpacity = position.y.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1.5, 0],
    extrapolate: "clamp",
  });

  const headerPosition = position.y.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [-UnderHeader * 1.5, 0],
    extrapolate: "clamp",
  });

  const headerOpacity = position.y.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Block
      flex
      style={{ ...styles.profile, fontFamily: themeContext.regularFont }}
    >
      <Block flex>
        <ImageBackground
          source={{ uri: backgroundImg }}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Animated.View
            style={{
              height: UnderHeader,
              backgroundColor: "white",
              opacity: headerOpacity,
            }}
          />
          <Animated.View
            style={{
              transform: [{ translateY: headerPosition }],
              opacity: headerOpacity,
              ...styles.header,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              title="goBack"
              style={{ marginHorizontal: 20 }}
            >
              <Icon
                name={"arrow-back"}
                color={themeContext.lightGreenColor}
                size={30}
              ></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
              title="goBack"
              style={{ marginHorizontal: 20 }}
            >
              <Icon
                name={"menu"}
                color={themeContext.lightGreenColor}
                size={30}
              ></Icon>
            </TouchableOpacity>
          </Animated.View>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, paddingTop: "25%" }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: position.y } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={1}
          >
            <Block flex style={styles.profileCard}>
              <Animated.View style={{ opacity: profileOpacity }}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: profileImg }} style={styles.avatar} />
                </View>
              </Animated.View>
              <Block
                middle
                height={50}
                style={{ borderColor: "black", borderWidth: 1 }}
              >
                <GroupName>{groupName}</GroupName>
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                  <Button
                    small
                    style={{ backgroundColor: argonTheme.COLORS.INFO }}
                  >
                    CONNECT
                  </Button>
                  <Button
                    small
                    style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                  >
                    MESSAGE
                  </Button>
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      2K
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Orders
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      10
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Photos
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      89
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Comments
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    Jessica Jones, 27
                  </Text>
                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    San Francisco, USA
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    An artist of considerable range, Jessica name taken by
                    Melbourne …
                  </Text>
                  <Button
                    color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Show more
                  </Button>
                </Block>
                <Block
                  row
                  style={{ paddingVertical: 14, alignItems: "baseline" }}
                >
                  <Text bold size={16} color="#525F7F">
                    Album
                  </Text>
                </Block>
                <Block
                  row
                  style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                >
                  <Button
                    small
                    color="transparent"
                    textStyle={{ color: "#5E72E4", fontSize: 12 }}
                  >
                    View all
                  </Button>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
              </Block>
            </Block>
            <EmptySpace></EmptySpace>
          </Animated.ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "absolute",
    width,
    height: StatusHeight * 1.15,
    top: UnderHeader,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  profile: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: width,
    height: height + HeaderHeight,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    borderColor: "black",
    borderWidth: 1,
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    borderColor: "blue",
    borderWidth: 1,
    paddingHorizontal: 40,
  },
  avatarContainer: {
    borderColor: "black",
    alignItems: "center",
    borderWidth: 1,
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    borderColor: "black",
    borderWidth: 1,
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});
