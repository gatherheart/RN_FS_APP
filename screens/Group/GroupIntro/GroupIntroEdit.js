import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useContext,
  useReducer,
} from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useNavigation, useRoute } from "@react-navigation/native";
import PropTypes from "prop-types";
import { HeaderHeight, UnderHeader } from "../../../utils/HeaderHeight";
import styled, { ThemeContext } from "styled-components/native";
import CustomHeader from "../../../components/common/AnimatedCustomHeader";
import { trimText, formatDate } from "../../../utils/String";
import {
  simplifiedFormat,
  dDayCalculator,
  timePickedConverter,
  getYearMonthDay,
} from "../../../utils/DateFormat";
import ImageGrid from "../../../components/common/ImageGrid";
import Icon from "../../../components/common/CustomIcon";
import AlertModal from "../../../components/common/AlertModal";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { _pickImage } from "../../../utils/FileSystem";
import DateTimePicker from "../../../components/common/DateTimePicker";
import { TextInput } from "react-native-gesture-handler";

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
const SCHOOL_FIELD = "school";
const DESCRIPTION_FIELD = "description";
export default ({}) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const { showActionSheetWithOptions } = useActionSheet();

  const route = useRoute();
  const { group: _group } = route.params;
  const initialState = {
    ..._group.joiningConditions,
    description: _group.description,
  };
  const [group, setGroup] = useState({ ...route.params.group });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
    false
  );
  const [startDate, setStartDate] = useState("");

  const onChangeInput = (text, _type) => {
    dispatch({ type: _type, payload: text });
  };
  const _changeImage = () => {
    let ret;
    showActionSheetWithOptions(
      {
        options: ["로고 변경", "배경 변경", "취소"],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          ret = await _pickImage();
        } else if (buttonIndex === 1) {
          ret = await _pickImage();
        } else if (buttonIndex === 2) {
          // cancel action
        }
      }
    );
  };

  const _changeStartDate = () => {
    setStartDatePickerVisibility(true);
  };
  const _setStartDate = (date) => {
    setGroup((prev) => {
      return {
        ...prev,
        applicableDate: {
          from: getYearMonthDay(date),
          to: prev.applicableDate.to,
        },
      };
    });
  };
  const _changeEndDate = () => {
    setEndDatePickerVisibility(true);
  };
  const _setEndDate = (date) => {
    setGroup((prev) => ({
      ...prev,
      applicableDate: {
        to: getYearMonthDay(date),
        from: prev.applicableDate.from,
      },
    }));
  };

  function reducer(state, action) {
    switch (action.type) {
      case TITLE_FIELD:
        return { ...state, title: action.payload };
      case BODY_FIELD:
        return { ...state, body: action.payload };
      case MANDATORY_FIELD:
        return { ...state, isMandatory: !state.isMandatory };
      default:
        return { ...state };
    }
  }

  useEffect(() => {}, []);
  return (
    <Block
      flex
      style={{ ...styles.profile, fontFamily: themeContext.regularFont }}
    >
      <AlertModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={""}
        body={message}
      ></AlertModal>

      <DateTimePicker
        setDate={_setStartDate}
        isDatePickerVisible={isStartDatePickerVisible}
        setDatePickerVisibility={setStartDatePickerVisibility}
        mode={"date"}
      ></DateTimePicker>
      <DateTimePicker
        setDate={_setEndDate}
        isDatePickerVisible={isEndDatePickerVisible}
        setDatePickerVisibility={setEndDatePickerVisibility}
        mode={"date"}
      ></DateTimePicker>

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
            rightButtonEnabled={false}
          ></CustomHeader>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
                <TouchableOpacity onPress={_changeImage}>
                  <Animated.View style={{ opacity: 0.8 }}>
                    <View style={styles.avatarContainer}>
                      <Image
                        source={{ uri: profileImg }}
                        style={styles.avatar}
                      />
                    </View>
                  </Animated.View>
                </TouchableOpacity>
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
                    <TouchableOpacity
                      style={{
                        ...styles.profileButton,
                        ...themeContext.withShadow,
                        backgroundColor: themeContext.pastelGreyColor,
                      }}
                      activeOpacity={1}
                    >
                      <Text>메세지</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.profileButton,
                        ...themeContext.withShadow,
                        backgroundColor: themeContext.pastelGreyColor,
                      }}
                      activeOpacity={1}
                    >
                      <Text>Q&A</Text>
                    </TouchableOpacity>
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
                      borderWidth: 1,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.tableTitle}>모집 기간</Text>
                    <Block
                      style={{
                        width: WIDHT / 3,
                        marginHorizontal: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {group?.applicableDate ? (
                        <Block row space="between">
                          <TouchableOpacity onPress={() => _changeStartDate()}>
                            <Text style={{ opacity: 0.4 }}>
                              {group.applicableDate.from} ~{" "}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => _changeEndDate()}>
                            <Text style={{ opacity: 0.4 }}>
                              {group.applicableDate.to}
                            </Text>
                          </TouchableOpacity>
                        </Block>
                      ) : null}
                    </Block>
                    {group?.applicableDate ? (
                      <Block
                        style={{
                          backgroundColor: themeContext.greenColor,
                          borderRadius: 5,
                          width: 50,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          D-{dDayCalculator(group.applicableDate.to)}
                        </Text>
                      </Block>
                    ) : null}
                  </Block>
                </Block>

                <Block flex>
                  <Block middle style={{ marginTop: 5, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    style={{
                      paddingVertical: 14,
                      alignItems: "baseline",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={styles.tableTitle}>가입 조건</Text>
                    <Block
                      row
                      space="between"
                      style={{ marginTop: 10, width: "100%", flexWrap: "wrap" }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          marginLeft: 10,
                        }}
                      >
                        학교
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={{ marginTop: 5, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block
                    style={{
                      paddingVertical: 14,
                      alignItems: "baseline",
                      borderWidth: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Text style={styles.tableTitle}>소개</Text>
                    <Block
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {group?.introTag
                        ? group?.introTag.map((intro, index) => (
                            <Text
                              key={`intro-${index}`}
                              style={{ color: themeContext.greenColor }}
                            >
                              #{intro}{" "}
                            </Text>
                          ))
                        : null}
                    </Block>
                    <Block
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        value={state.description}
                        placeholder={"투표 메모"}
                        onChangeText={(text) =>
                          onChangeInput(text, DESCRIPTION_FIELD)
                        }
                        underlineColorAndroid="transparent"
                        returnKeyType="none"
                        style={{}}
                        autoCorrect={false}
                        scrollEnabled={false}
                        autoFocus={false}
                        multiline={true}
                      ></TextInput>
                    </Block>
                  </Block>
                </Block>
              </Block>
              <EmptySpace></EmptySpace>
              <EmptySpace></EmptySpace>
            </Animated.ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Block>
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
  tableTitle: {
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
  },
  profileButton: {
    borderWidth: 0.5,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
