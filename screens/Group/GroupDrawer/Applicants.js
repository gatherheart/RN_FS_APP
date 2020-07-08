import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  UnderHeader,
  HeaderHeight,
  StatusHeight,
  BottomSafeAreaHeight,
} from "../../../utils/HeaderHeight";
import {
  GREEN_COLOR,
  BLACK_COLOR,
  GREY_COLOR,
  BG_COLOR,
} from "../../../constants/Color";
import Loader from "../../../components/common/Loader";
import SmallUserCard from "../../../components/User/SmallUserCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertModal from "../../../components/common/AlertModal";
const avatarUrl =
  "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80";

const FirstRoute = ({ users }) => {
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    message: "",
    callback: () => {},
    idx: undefined,
  });
  const [message, setMessage] = useState("");
  const admitApplicant = (idx) => {
    console.log(idx, "admitted");
  };
  const showAlertModal = ({ message, idx }) => {
    let callback = () => {};
    if (message === "승인 하시겠습니까?") {
      console.log("승인");
      callback = admitApplicant;
    }

    setModalVisible((prev) => {
      return {
        visible: !prev.visible,
        message,
        callback: admitApplicant,
        idx,
      };
    });
  };

  return (
    <ScrollView
      style={[styles.scene, { backgroundColor: BG_COLOR }]}
      contentContainerStyle={styles.sceneContent}
    >
      <AlertModal
        modalVisible={modalVisible.visible}
        setModalVisible={setModalVisible}
        body={modalVisible.message}
        cancleEnabled
        callback={() => {
          admitApplicant(modalVisible.idx);
        }}
      ></AlertModal>
      {users.map((user, idx) => {
        return (
          <View key={`applicants-${idx}`} style={styles.userCardContainer}>
            <SmallUserCard {...user}></SmallUserCard>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  showAlertModal({ message: "승인 하시겠습니까?", idx })
                }
                style={[styles.button, { backgroundColor: "#92D050" }]}
              >
                <Text style={styles.buttonText}>승인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showAlertModal("거절 하시겠습니까?")}
                style={[styles.button, { backgroundColor: "#C0504D" }]}
              >
                <Text style={styles.buttonText}>거절</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showAlertModal("심사로 넘기시겠습니까?")}
                style={[styles.button, { backgroundColor: "#7CD6E2" }]}
              >
                <Text style={styles.buttonText}>심사</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <View style={styles.emptySpace}></View>
    </ScrollView>
  );
};

const SecondRoute = () => (
  <ScrollView style={[styles.scene, { backgroundColor: BG_COLOR }]}>
    <Text>H2</Text>
    <View style={styles.emptySpace}></View>
  </ScrollView>
);

const initialLayout = { width: Dimensions.get("window").width };

export default () => {
  console.log(BottomSafeAreaHeight);
  const [data, setData] = useState({
    loading: true,
  });

  const getData = async () => {
    setData({
      loading: false,
      users: membersData,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "가입 신청" },
    { key: "second", title: "심사 명단" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: GREY_COLOR }}
      style={{ backgroundColor: GREEN_COLOR }}
      activeColor={BG_COLOR}
      inactiveColor={GREY_COLOR}
    />
  );

  const renderScene = SceneMap({
    first: () => <FirstRoute {...data}></FirstRoute>,
    second: SecondRoute,
  });

  return data?.loading ? (
    <Loader></Loader>
  ) : (
    <>
      <CustomHeader
        title={"지원자 목록"}
        headerStyle={{}}
        rightButtonEnabled={false}
        rightButton={
          <Text
            onPress={() =>
              navigation.navigate(route.params.from, { memberList: memberList })
            }
          >
            완료
          </Text>
        }
      >
        >
      </CustomHeader>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ paddingTop: HeaderHeight }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  sceneContent: {
    marginHorizontal: 16,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  userCardContainer: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: GREY_COLOR,
  },
  emptySpace: {
    height: BottomSafeAreaHeight,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 18,
  },
  button: {
    width: 88,
    height: 30,
    marginLeft: 6,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: BG_COLOR,
  },
});

const membersData = [
  {
    name: "김영모",
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 0,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "이진우",
    id: "2",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "상미이",
    id: "3",
    avatar: avatarUrl,
    type: 1,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "김자운",
    id: "4",
    avatar: avatarUrl,
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "소프트웨어대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },

  {
    name: "이지훈",
    id: "6",
    avatar: avatarUrl,
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "문과대",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "원주캠퍼스",
      major: "소프트웨어학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "8",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "소프트웨어학괴",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "9",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "11",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "12",
    avatar: "",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "13",
    avatar:
      "https://images.unsplash.com/photo-1589411454940-67a017535ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
  {
    name: "장안구",
    id: "14",
    avatar: avatarUrl,
    type: 2,
    major: "소프트웨어학과",
    institution: {
      range: "MAJOR_LEVEL",
      school: "연세대학교",
      campus: "원주캠퍼스",
      college: "인문대학",
      major: "심리학과",
    },
    admissionYear: "2019",
  },
];
