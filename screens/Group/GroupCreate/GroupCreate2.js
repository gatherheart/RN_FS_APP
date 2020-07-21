import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LeafIcon from "../../../components/common/svg/LeafIcon";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  HeaderHeight,
  isIPhoneX,
  BottomSafeAreaHeight,
} from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
  LIGHT_GREY_COLOR,
  GREY_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");
const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };
const Divider = styled.View`
  margin-vertical: 25px;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-color: black;
  width: 90%;
  opacity: 0.5;
`;
const EmptySpace = styled.View`
  height: ${(HEIGHT * 5) / 100}px;
`;

const NextButton = ({
  page,
  condSchoolList,
  condCollegeList,
  condMajorList,
  condYear,
  infoSchoolList,
  infoFieldList,
  infoAreaList,
}) => {
  const navigation = useNavigation();

  const goToNext = () => {
    navigation.navigate("GroupCreate3", {
      page,
      condSchoolList,
      condCollegeList,
      condMajorList,
      condYear,
      infoSchoolList,
      infoFieldList,
      infoAreaList,
    });
  };

  return (
    <View style={nextButtonStyle.container}>
      <TouchableOpacity
        style={nextButtonStyle.button}
        onPress={() => goToNext()}
      >
        <Text style={styles.text}>다음으로 이동 (2/3)</Text>
      </TouchableOpacity>
    </View>
  );
};
const nextButtonStyle = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: LIGHT_GREEN_COLOR,
    height: (HEIGHT * 8) / 100,
    width: WIDHT,
    bottom: BottomSafeAreaHeight,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
});
const Dropdown = ({ target = "from", state, setState, start = 0 }) => {
  const selectable = [...Array(100).keys()].filter((index) => index >= start);
  const _items = selectable.map((item, idx) => {
    return { label: item.toString(), value: item.toString(), color: "black" };
  });
  let placeholder = { label: "부터", value: "-1" };
  if (target === "from") {
    placeholder = placeholder;
  } else if (target === "to") {
    placeholder = { label: "까지", value: "1000" };
  }

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={_items}
      onValueChange={(value) => {
        setState(value);
      }}
      style={pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
      value={state}
      ref={(el) => {}}
    />
  );
};

Dropdown.propTypes = {
  target: PropTypes.string.isRequired,
  state: PropTypes.string,
  setState: PropTypes.func.isRequired,
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 4,
    color: "black",
    paddingLeft: "40%",
    fontSize: 13,
  },
  inputAndroid: {
    borderRadius: 8,
    color: "black",
    fontSize: 13,
    paddingHorizontal: 12,
    width: "100%",
    height: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingLeft: 30,
  },
});

const FROM_SELECT_SCHOOL = "SelectSchool";
const FROM_SELECT_COLLEGE = "SelectCollege";
const FROM_SELECT_MAJOR = "SelectMajor";

export default () => {
  const route = useRoute();
  const {
    page,
    schoolList: infoSchoolList,
    fieldList,
    areaList,
  } = route.params;
  const [schoolList, setSchoolList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [message, setMessage] = useState("");
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const navigation = useNavigation();
  const flashRef = useRef(null);

  useEffect(() => {
    const { params } = route;
    console.log(params?.from);
    if (params?.from === FROM_SELECT_SCHOOL) {
      setSchoolList(params.args.schools);
    } else if (params?.from === FROM_SELECT_COLLEGE) {
      setCollegeList(params.args.colleges);
    } else if (params?.from === FROM_SELECT_MAJOR) {
      setMajorList(params.args.majors);
    }
  }, [route]);

  const validator = () => {
    if (schoolList.length > 1) {
      setMessage("세부 조건 설정은 학교를 하나만 선택해주세요");
      return false;
    } else if (collegeList.length > 1) {
      setMessage("세부 조건 설정은 단과 대학을 하나만 선택해주세요");
      return false;
    }
    return true;
  };

  const _removeItemFromState = (setter) => (list, index) => {
    let _newList = [...list];
    _newList.splice(index, 1);
    setter(_newList);
  };

  useEffect(() => {
    if (message === "") return;
    flashRef.current.showMessage({
      message: message,
      type: "",
    });
  }, [message]);

  return (
    <>
      <CustomHeader></CustomHeader>

      <ScrollView
        contentContainerStyle={{ ...styles.container }}
        style={{ backgroundColor: BG_COLOR, top: HeaderHeight }}
      >
        <View style={{ ...styles.logo }}>
          <LeafIcon></LeafIcon>
        </View>
        <View style={{ ...styles.titleContainer }}>
          <Text style={{ ...styles.title }}>우리의 숲을 만들어볼까요?</Text>
        </View>
        <View>
          <Text style={{ ...styles.info }}>
            조건을 선택하면 {"\n"}
            조건에 맞지 않는 유저의 가입 신청이 제한됩니다
          </Text>
        </View>
        {page === 0 ? (
          <>
            <Text style={{ ...styles.category }}>가입 조건</Text>
            {schoolList.length === 0 ? (
              <View style={{ ...styles.optionContainer }}>
                <View style={{ ...styles.optionName }}>
                  <Text>학교</Text>
                </View>
                <View style={{ ...styles.optionContent }}>
                  <TouchableOpacity
                    style={{ ...styles.optionContent }}
                    onPress={() => {
                      navigation.navigate("SelectSchool", {
                        from: "GroupCreate2",
                      });
                    }}
                  >
                    <Text style={{ ...styles.optionText }}>
                      학교 및 캠퍼스를 선택해주세요
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...styles.afterOptionContainer,
                  height: schoolList.length * 40,
                }}
              >
                <View style={{ ...styles.optionName }}>
                  <Text>학교</Text>
                </View>
                <View
                  style={{
                    ...styles.optionContent,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {schoolList.map((school, idx) => {
                    return (
                      <TouchableOpacity
                        key={`school-list-${idx}`}
                        style={{ ...styles.AfterOptionContent }}
                        onPress={() => {
                          _removeItemFromState(setSchoolList)(schoolList, idx);
                        }}
                      >
                        <Text style={{ ...styles.AfterOptionText }}>
                          {school}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            {collegeList.length === 0 ? (
              <View style={{ ...styles.optionContainer }}>
                <View style={{ ...styles.optionName }}>
                  <Text>단과 대학</Text>
                </View>
                <View style={{ ...styles.optionContent }}>
                  <TouchableOpacity
                    style={{ ...styles.optionContent }}
                    onPress={() => {
                      if (!validator()) return;
                      navigation.navigate("SelectCollege", {
                        from: "GroupCreate2",
                      });
                    }}
                  >
                    <Text style={{ ...styles.optionText }}>무관</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...styles.afterOptionContainer,
                  height: collegeList.length * 40,
                }}
              >
                <View style={{ ...styles.optionName }}>
                  <Text>단과 대학</Text>
                </View>
                <View
                  style={{
                    ...styles.optionContent,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {collegeList.map((college, idx) => {
                    return (
                      <TouchableOpacity
                        key={`college-list-${idx}`}
                        style={{ ...styles.AfterOptionContent }}
                        onPress={() => {
                          _removeItemFromState(setCollegeList)(
                            collegeList,
                            idx
                          );
                        }}
                      >
                        <Text style={{ ...styles.AfterOptionText }}>
                          {college}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            {majorList.length === 0 ? (
              <View style={{ ...styles.optionContainer }}>
                <View style={{ ...styles.optionName }}>
                  <Text>전공</Text>
                </View>
                <View style={{ ...styles.optionContent }}>
                  <TouchableOpacity
                    style={{ ...styles.optionContent }}
                    onPress={() => {
                      if (!validator()) return;

                      navigation.navigate("SelectMajor", {
                        from: "GroupCreate2",
                      });
                    }}
                  >
                    <Text style={{ ...styles.optionText }}>무관</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...styles.afterOptionContainer,
                  height: majorList.length * 40,
                }}
              >
                <View style={{ ...styles.optionName }}>
                  <Text>전공</Text>
                </View>
                <View
                  style={{
                    ...styles.optionContent,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {majorList.map((major, idx) => {
                    return (
                      <TouchableOpacity
                        key={`major-list-${idx}`}
                        style={{ ...styles.AfterOptionContent }}
                        onPress={() => {
                          _removeItemFromState(setMajorList)(majorList, idx);
                        }}
                      >
                        <Text style={{ ...styles.AfterOptionText }}>
                          {major}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>학번</Text>
              </View>
              <View style={{ ...styles.optionContent }}>
                <View style={{ ...styles.pageButton }}>
                  <Dropdown
                    target="from"
                    state={startYear}
                    setState={setStartYear}
                  ></Dropdown>
                </View>
                <Text> ~ </Text>
                <View
                  style={{
                    ...styles.pageButton,
                  }}
                >
                  <Dropdown
                    target="to"
                    state={endYear}
                    setState={setEndYear}
                    start={startYear}
                  ></Dropdown>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={{ ...styles.category }}>가입 조건</Text>
            {schoolList.length === 0 ? (
              <View style={{ ...styles.optionContainer }}>
                <View style={{ ...styles.optionName }}>
                  <Text>학교</Text>
                </View>
                <View style={{ ...styles.optionContent }}>
                  <TouchableOpacity
                    style={{ ...styles.optionContent }}
                    onPress={() => {
                      navigation.navigate("SelectSchool", {
                        from: "GroupCreate2",
                      });
                    }}
                  >
                    <Text style={{ ...styles.optionText }}>
                      학교 및 캠퍼스를 선택해주세요
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  ...styles.afterOptionContainer,
                  height: schoolList.length * 40,
                }}
              >
                <View style={{ ...styles.optionName }}>
                  <Text>학교</Text>
                </View>
                <View
                  style={{
                    ...styles.optionContent,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {schoolList.map((school, idx) => {
                    return (
                      <TouchableOpacity
                        key={`school-list-${idx}`}
                        style={{ ...styles.AfterOptionContent }}
                        onPress={() => {
                          _removeItemFromState(setSchoolList)(schoolList, idx);
                        }}
                      >
                        <Text style={{ ...styles.AfterOptionText }}>
                          {school}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>학번</Text>
              </View>
              <View style={{ ...styles.optionContent }}>
                <View style={{ ...styles.pageButton }}>
                  <Dropdown
                    target="from"
                    state={startYear}
                    setState={setStartYear}
                  ></Dropdown>
                </View>
                <Text> ~ </Text>
                <View
                  style={{
                    ...styles.pageButton,
                  }}
                >
                  <Dropdown
                    target="to"
                    state={endYear}
                    setState={setEndYear}
                  ></Dropdown>
                </View>
              </View>
            </View>
          </>
        )}
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
      </ScrollView>

      <NextButton
        page={page}
        condSchoolList={schoolList}
        condCollegeList={collegeList}
        condMajorList={majorList}
        condYear={{ start: startYear, end: endYear }}
        infoSchoolList={infoSchoolList}
        infoFieldList={fieldList}
        infoAreaList={areaList}
      ></NextButton>
      <FlashMessage
        ref={flashRef}
        position="bottom"
        titleStyle={{ fontSize: 14 }}
        textStyle={{ fontSize: 1 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },
  category: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 30,
    fontWeight: "500",
  },
  logo: {
    top: (HEIGHT * 6.6) / 100,
    height: HEIGHT / 18,
    aspectRatio: 1,
    left: "-25%",
    marginTop: (HEIGHT * 3) / 100,
    overflow: "hidden",
    borderWidth: 1,
  },
  titleContainer: {
    marginTop: (HEIGHT * 3) / 100,
    left: "5%",
    height: HEIGHT / 18,
  },
  title: {
    fontWeight: "500",
  },
  info: {
    color: GREY_COLOR,
    marginTop: 20,
    width: (WIDHT * 90) / 100,
    textAlign: "center",
    lineHeight: 25,
  },
  optionContainer: {
    marginTop: 25,
    flexDirection: "row",
    borderWidth: 1,
    height: 40,
    width: "90%",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  afterOptionContainer: {
    marginTop: 25,
    flexDirection: "row",
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  optionName: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "18%",
    backgroundColor: LIGHT_GREEN_COLOR,
    borderRadius: 8,
  },
  AfterOptionContent: {
    width: "82%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  optionContent: {
    height: "100%",
    width: "82%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
  },
  pageButton: {
    borderWidth: 1,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  optionText: {
    opacity: 0.5,
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
  },
  AfterOptionText: {
    opacity: 1,
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
  },
});
