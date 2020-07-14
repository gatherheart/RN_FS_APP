import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomHeader from "../../components/common/CustomHeader";
import { UnderHeader } from "../../utils/HeaderHeight";
import { useNavigation } from "@react-navigation/native";
/** 약관 동의 페이지 */

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUseChecked: false,
      isFirstChecked: false,
      isSecondChecked: false,
      isThirdChecked: false,
      isServiceChecked: false,
    };
  }

  render() {
    const {
      isUseChecked,
      isFirstChecked,
      isSecondChecked,
      isThirdChecked,
      isServiceChecked,
    } = this.state;

    return (
      <>
        <CustomHeader title={"약관 동의"}></CustomHeader>
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={{ ...styles.bar, borderBottomWidth: 1 }}>
              <View style={styles.checkBox}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState((prevState) => {
                      return {
                        isUseChecked: !prevState.isUseChecked,
                        isFirstChecked: isUseChecked ? false : true,
                        isSecondChecked: isUseChecked ? false : true,
                        isThirdChecked: isUseChecked ? false : true,
                      };
                    });
                  }}
                >
                  {isUseChecked ? (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.checkedButten}
                      color="#666666"
                    />
                  ) : (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.uncheckedButten}
                      color="#E4E4E4"
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  포레스틴 이용약관 전체 동의
                </Text>
              </View>
            </View>

            <View style={styles.bar}>
              <View style={styles.checkBox}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState((prevState) => {
                      return {
                        isFirstChecked: !prevState.isFirstChecked,
                      };
                    });
                  }}
                >
                  {isFirstChecked ? (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.checkedButten}
                      color="#666666"
                    />
                  ) : (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.uncheckedButten}
                      color="#E4E4E4"
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  포레스틴 서비스 이용약관
                </Text>
              </View>
              <View style={styles.arrow}>
                <Ionicons name="ios-arrow-forward" size={20} color="#666666" />
              </View>
            </View>

            <View style={styles.bar}>
              <View style={styles.checkBox}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState((prevState) => {
                      return {
                        isSecondChecked: !prevState.isSecondChecked,
                      };
                    });
                  }}
                >
                  {isSecondChecked ? (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.checkedButten}
                      color="#666666"
                    />
                  ) : (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.uncheckedButten}
                      color="#E4E4E4"
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  위치 기반서비스 이용약관
                </Text>
              </View>
              <View style={styles.arrow}>
                <Ionicons name="ios-arrow-forward" size={20} color="#666666" />
              </View>
            </View>

            <View style={styles.bar}>
              <View style={styles.checkBox}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState((prevState) => {
                      return {
                        isThirdChecked: !prevState.isThirdChecked,
                      };
                    });
                  }}
                >
                  {isThirdChecked ? (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.checkedButten}
                      color="#666666"
                    />
                  ) : (
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      style={styles.uncheckedButten}
                      color="#E4E4E4"
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  개인정보 처리방침
                </Text>
              </View>
              <View style={styles.arrow}>
                <Ionicons name="ios-arrow-forward" size={20} color="#666666" />
              </View>
            </View>
          </View>

          <View style={{ height: 24 }}></View>

          <View style={{ ...styles.bar, borderWidth: 1 }}>
            <View style={styles.checkBox}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState((prevState) => {
                    return {
                      isServiceChecked: !prevState.isServiceChecked,
                    };
                  });
                }}
              >
                {isServiceChecked ? (
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    style={styles.checkedButten}
                    color="#666666"
                  />
                ) : (
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    style={styles.uncheckedButten}
                    color="#E4E4E4"
                  />
                )}
              </TouchableWithoutFeedback>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                포레스틴 서비스 이용규칙 동의
              </Text>
            </View>
            <View style={styles.arrow}>
              <Ionicons name="ios-arrow-forward" size={20} color="#666666" />
            </View>
          </View>

          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("SelectSchool")}
          >
            <View style={styles.footer}>
              <Text>다음으로 이동</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: UnderHeader,
  },
  box: {
    width: 302,
    height: 182,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  bar: {
    width: 300,
    height: 45,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderColor: "#E1E1E1",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 3,
  },
  checkedButten: {
    borderRadius: 10,
    backgroundColor: "#8BEA73",
    marginHorizontal: 13,
  },
  uncheckedButten: {
    borderRadius: 10,
    backgroundColor: "#C1C1C1",
    marginHorizontal: 13,
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  arrow: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#8BEA73",
    height: 57,
    alignItems: "center",
    justifyContent: "center",
  },
});
