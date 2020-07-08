import React, { useContext, createContext } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  BG_COLOR,
  GREEN_COLOR,
  GREY_COLOR,
  RED_COLOR,
} from "../../constants/Color";
import { useNavigation } from "@react-navigation/native";

const window = Dimensions.get("window");
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const DrawerContext = createContext();

const DrawerProvider = ({ onItemSelected, children }) => {
  return (
    <DrawerContext.Provider value={{ onItemSelected: onItemSelected }}>
      {children}
    </DrawerContext.Provider>
  );
};

// context variable
const useOnItemSelected = () => {
  const { onItemSelected } = useContext(DrawerContext);
  return onItemSelected;
};

const DrawerComponent = function ({ name, options }) {
  const navigation = useNavigation();
  const onItemSelected = useOnItemSelected();
  const goTo = (name) => {
    navigation.navigate(name, {});
  };
  return (
    <View style={compStyles.container}>
      <TouchableOpacity
        onPress={() => {
          goTo(name);
          setTimeout(() => {
            onItemSelected();
          }, 1000);
        }}
        style={compStyles.button}
      >
        <Text style={{ color: options.textColor }}>{options.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    borderBottomWidth: 0.2,
    borderColor: GREY_COLOR,
    height: (HEIGHT * 8) / 100,

    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

const Drawer = function ({ onItemSelected }) {
  return (
    <DrawerProvider onItemSelected={onItemSelected}>
      <ScrollView
        scrollsToTop={false}
        style={styles.menu}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.name}>PIXEL</Text>
        </View>

        <View style={styles.drawerComponent}>
          <DrawerComponent name="GroupIntro" options={{ title: "모임 소개" }} />
          <DrawerComponent
            name="GroupSchedule"
            options={{ title: "일정 관리" }}
          />
          <DrawerComponent name="MemberList" options={{ title: "멤버 목록" }} />
          <DrawerComponent
            name="Applicants"
            options={{ title: "가입 신청 목록" }}
          />
          <DrawerComponent
            name="GroupAuth"
            options={{ title: "운영진 권한 부여" }}
          />
          <DrawerComponent name="Eviction" options={{ title: "내보내기" }} />
          <DrawerComponent
            name="GroupRemove"
            options={{ title: "모임 삭제" }}
          />
          <DrawerComponent
            name="GroupWithdraw"
            options={{ title: "모임 탈퇴", textColor: RED_COLOR }}
          />
        </View>
      </ScrollView>
    </DrawerProvider>
  );
};
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: BG_COLOR,
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  drawerComponent: {
    borderTopWidth: 0.5,
    borderTopColor: GREEN_COLOR,
    marginTop: 20,
  },
  name: {
    width: "50%",
    textAlign: "center",
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5,
  },
});

Drawer.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default Drawer;
