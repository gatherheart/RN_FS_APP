import React, { useState } from "react";
import { useLogIn } from "../../context/AuthContext";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";

export default () => {
  const login = useLogIn();
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        alwaysBounceVertical={false}
      >
        <View style={styles.logo}>{/*로고위치*/}</View>

        <View style={styles.inputContainer}>
          <View style={styles.textbar}>
            <TextInput
              value={id}
              style={styles.input}
              placeholder="아이디"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType={"emailAddress"}
              keyboardType={"email-address"}
              onChangeText={(id) => setId(id)}
            />
          </View>
          <View style={styles.textbar}>
            <TextInput
              value={pw}
              style={styles.input}
              placeholder="비밀번호"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(pw) => setPw(pw)}
            />
          </View>
        </View>

        <View style={styles.navigateContainer}>
          <View style={styles.find}>
            <TouchableOpacity>
              <Text style={{ fontSize: 11 }}>아이디찾기/비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUp}>
            <TouchableOpacity onPress={() => navigation.navigate("TermOfUse")}>
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableWithoutFeedback
            onPress={() => {
              login();
            }}
          >
            <View style={styles.login}>
              <Text style={{ color: "white" }}>로그인</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 130,
    paddingHorizontal: 50,
    paddingBottom: 153,
  },
  logo: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  navigateContainer: {
    flex: 1,
    width: 260,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  find: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  signUp: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-end",
    marginVertical: 4,
  },
  login: {
    backgroundColor: "#8BEA73",
    width: 260,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textbar: {
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    width: 260,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  info: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  input: {
    flex: 3,
    alignItems: "flex-start",
    marginLeft: 15,
  },
});
