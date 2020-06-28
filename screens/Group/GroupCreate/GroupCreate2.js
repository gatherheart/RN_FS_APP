import React, { useEffect, useState } from "react";
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
import { HeaderHeight } from "../../../utils/HeaderHeight";
import {
  BG_COLOR,
  GREEN_COLOR,
  LIGHT_GREEN_COLOR,
} from "../../../constants/Color";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from "@react-navigation/native";
const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

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

const NextButton = ({}) => {
  const navigation = useNavigation();

  const goToNext = () => {
    navigation.navigate("GroupCreate3", {});
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
    bottom: 0,
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
const Dropdown = ({ target = "from" }) => {
  const [state, setState] = useState(0);
  const selectable = [...Array(100).keys()];
  const _items = selectable.map((item, idx) => {
    return { label: idx.toString(), value: idx.toString(), color: "black" };
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
  const navigation = useNavigation();

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

  return (
    <>
      <CustomHeader></CustomHeader>

      <ScrollView
        contentContainerStyle={{ ...styles.container }}
        style={{ backgroundColor: BG_COLOR }}
      >
        <View style={{ ...styles.logo }}>
          <LeafIcon></LeafIcon>
        </View>
        <View style={{ ...styles.titleContainer }}>
          <Text style={{ ...styles.title }}>우리의 숲을 만들어볼까요?</Text>
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
                          navigation.navigate("SelectSchool", {
                            from: "GroupCreate2",
                          });
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
                  height: schoolList.length * 40,
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
                          navigation.navigate("SelectCollege", {
                            from: "GroupCreate2",
                          });
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
                  height: schoolList.length * 40,
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
                          navigation.navigate("SelectMajor", {
                            from: "GroupCreate2",
                          });
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
                  <Dropdown target="from"></Dropdown>
                </View>
                <Text> ~ </Text>
                <View
                  style={{
                    ...styles.pageButton,
                  }}
                >
                  <Dropdown target="to"></Dropdown>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={{ ...styles.category }}>가입 조건</Text>
            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>학교</Text>
              </View>
              <View style={{ ...styles.optionContent }}>
                <TouchableOpacity
                  style={{ ...styles.optionContent }}
                  onPress={() => {
                    naviagtion.navigate("SelectSchool", {});
                  }}
                >
                  <Text style={{ ...styles.optionText }}>
                    학교 및 캠퍼스를 선택해주세요
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ ...styles.optionContainer }}>
              <View style={{ ...styles.optionName }}>
                <Text>학번</Text>
              </View>
              <View style={{ ...styles.optionContent }}>
                <TouchableOpacity
                  style={{
                    ...styles.pageButton,
                  }}
                  onPress={() => {}}
                >
                  <Text style={{ ...styles.optionText }}>부터</Text>
                </TouchableOpacity>
                <Text> ~ </Text>
                <TouchableOpacity
                  style={{
                    ...styles.pageButton,
                  }}
                  onPress={() => {}}
                >
                  <Text style={{ ...styles.optionText }}>까지</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <EmptySpace></EmptySpace>
        <EmptySpace></EmptySpace>
        <Text>{message}</Text>
      </ScrollView>

      <NextButton setMessage={setMessage}></NextButton>
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
