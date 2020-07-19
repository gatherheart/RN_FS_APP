import React from "react";
import { Text, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BG_COLOR, LIGHT_GREY_COLOR } from "../../constants/Color";
import { UnderHeader, BottomSafeAreaHeight } from "../../utils/HeaderHeight";
import ChatUserCard from "../Chat/ChatUserCard";
import styled from "styled-components/native";

const RowContainer = styled.View`
  flex-direction: row;
`;

const MemberClassify = ({ members, type }) => {
  return (
    <View style={styles.memberContainer}>
      {members
        ? members
            .filter((member) => member.type === type)
            .map((member) => {
              return (
                <RowContainer key={"member-" + type + member.id}>
                  <ChatUserCard
                    name={member.name}
                    major={member.major}
                    avatar={member.avatar}
                  ></ChatUserCard>
                </RowContainer>
              );
            })
        : null}
    </View>
  );
};

const drawerContent = ({ participants: members }) => {
  return (
    <ScrollView
      style={styles.animatedBoxContainer}
      contentContainerStyle={styles.animatedBox}
    >
      <Text style={styles.memberType}>회장</Text>
      <MemberClassify members={members} type={0}></MemberClassify>

      <Text style={styles.memberType}>운영진</Text>
      <MemberClassify members={members} type={1}></MemberClassify>

      <Text style={styles.memberType}>멤버</Text>
      <MemberClassify members={members} type={2}></MemberClassify>
      <View style={styles.empty} />
    </ScrollView>
  );
};

export default drawerContent;
const styles = StyleSheet.create({
  animatedBoxContainer: {
    backgroundColor: BG_COLOR,
    paddingTop: UnderHeader,
  },
  animatedBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: BottomSafeAreaHeight,
  },
  drawerBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  memberType: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    paddingLeft: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  memberContainer: {
    marginTop: 15,
    backgroundColor: "#EAFECA",
  },
  empty: {
    height: 100,
  },
});
