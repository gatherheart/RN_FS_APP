import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Animated,
  View,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Group/ArgonButton";
import Images from "../../constants/ArgonImages";
import PropTypes from "prop-types";
import { HeaderHeight, UnderHeader } from "../../utils/HeaderHeight";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../components/AnimatedCustomHeader";
import { trimText } from "../../utils/String";
import ImageGrid from "../../components/ImageGrid";
import GroupActionButton from "../../components/GroupActionButton";
import NoticeList from "../../components/Group/NoticeList";

const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: 150px;
`;

const backgroundImg =
  "https://images.unsplash.com/photo-1588780530902-bbc23735248c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650";

const profileImg =
  "https://images.unsplash.com/photo-1588785392665-f6d4a541417d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320";

const HEADER_SCROLL_DISTANCE = 100;

const GroupName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 0px 0px 5px 0px;
`;

const SchoolName = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.greyColor};
  opacity: 0.6;
`;

const CountText = styled.Text`
  color: ${(props) => props.theme.greyColor};
  font-size: 18px;
  margin-bottom: 4px;
`;

/**
 * 공지 히스토리 버튼
 * @param {String} title
 * @param {Number} page
 * @param {Function} setPage
 * @param {Number} clickedPage
 * @param {String} color
 *
 */
const PageButton = ({ title, page, setPage, clickedPage, color }) => {
  const underBar =
    clickedPage == page
      ? { borderBottomColor: color, borderBottomWidth: 2.3 }
      : null;
  const changePage = () => {
    if (page == clickedPage) return;
    setPage(clickedPage);
  };
  return (
    <TouchableOpacity
      style={{ ...styles.pageButton, ...underBar }}
      onPress={() => changePage()}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const position = new Animated.ValueXY(0);
const gradient = new Animated.ValueXY(0);

const profileOpacity = position.y.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [1.5, 0],
  extrapolate: "clamp",
});

const headerPosition = position.y.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [-UnderHeader, 0],
  extrapolate: "clamp",
});

const headerOpacity = position.y.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, 1],
  extrapolate: "clamp",
});

export default ({ id, group, loading, refreshFn }) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const [page, setPage] = useState(0);

  navigation.navigate("GroupWriteVote", { id: id });

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
          <CustomHeader
            headerPosition={headerPosition}
            headerOpacity={headerOpacity}
            style={{ zIndex: 4 }}
          ></CustomHeader>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: WIDHT,
              paddingTop: "25%",
              borderRadius: 8,
              zIndex: 3,
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: position.y } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={1}
            contentContainerStyle={{ zIndex: 3 }}
          >
            <Block flex style={styles.profileCard}>
              <Animated.View style={{ opacity: profileOpacity }}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: profileImg }} style={styles.avatar} />
                </View>
              </Animated.View>
              <Block
                middle
                height={60}
                style={{ borderColor: "black", borderWidth: 1 }}
              >
                <GroupName>{group?.groupName}</GroupName>
                <SchoolName>
                  {group?.school?.name + " " + group?.campus?.name}
                </SchoolName>
              </Block>
              <Block style={styles.info}>
                <Block row space="around">
                  <Block middle>
                    <CountText>{group?.memberCount}</CountText>
                    <Text size={12}>Members</Text>
                  </Block>
                  <Block middle>
                    <CountText>{group?.followerCount}</CountText>
                    <Text size={12}>Followers</Text>
                  </Block>
                </Block>
                <Block
                  middle
                  row
                  space="around"
                  style={{
                    marginTop: 40,
                    paddingBottom: 24,
                    marginHorizontal: -30,
                  }}
                >
                  <PageButton
                    title="공지"
                    page={page}
                    setPage={setPage}
                    clickedPage={0}
                    color={themeContext.lightGreenColor}
                  ></PageButton>
                  <PageButton
                    title="히스토리"
                    page={page}
                    setPage={setPage}
                    clickedPage={1}
                    color={themeContext.lightGreenColor}
                  ></PageButton>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={{ marginTop: 5, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block
                  row
                  style={{
                    paddingVertical: 14,
                    alignItems: "baseline",
                    borderWidth: 1,
                  }}
                >
                  <Block
                    style={{
                      backgroundColor: "#FF574D",
                      padding: 5,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text bold size={13} style={{ color: "white" }}>
                      필독
                    </Text>
                  </Block>
                  <Block
                    style={{
                      borderWidth: 1,
                      width: WIDHT / 3,
                      marginHorizontal: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity>
                      <Text size={13} style={{ color: "black" }}>
                        {trimText(group?.mandatoryNotice)}
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </Block>

                <Block style={{ paddingBottom: HeaderHeight, height: HEIGHT }}>
                  {page == 0 ? (
                    <Block>
                      <NoticeList
                        votes={group.votes}
                        notices={group.notices}
                        bills={group.bills}
                      ></NoticeList>
                    </Block>
                  ) : (
                    <>
                      <Block
                        row
                        style={{
                          marginTop: 20,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          small
                          color="transparent"
                          textStyle={{ color: "#5E72E4", fontSize: 13 }}
                        >
                          View all
                        </Button>
                      </Block>
                      <ImageGrid></ImageGrid>
                    </>
                  )}
                </Block>
              </Block>
            </Block>

            <EmptySpace></EmptySpace>
          </Animated.ScrollView>
        </ImageBackground>
      </Block>
      <GroupActionButton
        firstClicked={() =>
          navigation.navigate("GroupWriteVote", { id: group.id })
        }
        secondClicked={() =>
          navigation.navigate("GroupReadVote", { id: group.id })
        }
        thridClicked={() => console.log("Hello World")}
      ></GroupActionButton>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    borderColor: "black",
    borderWidth: 1,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: WIDHT,
    height: HEIGHT + HeaderHeight,
    padding: 0,
    zIndex: 0,
  },
  profileBackground: {
    width: WIDHT,
    height: HEIGHT / 2,
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
    zIndex: 1,
  },
  info: {
    marginTop: 8,
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
  pageButton: {
    width: (WIDHT * 3) / 10,
    fontSize: 12,
    alignItems: "center",
    paddingVertical: 10,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
});

PageButton.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  clickedPage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
