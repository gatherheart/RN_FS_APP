import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import GroupScreen from "../screens/Group";
import GroupDrawer from "../screens/Group/GroupDrawer";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "styled-components";
import GroupWriteVote from "../screens/Group/GroupVote/WriteVote";
import GroupReadVote from "../screens/Group/GroupVote/ReadVote";
import GroupWriteBill from "../screens/Group/GroupBill/WriteBill";
import GroupReadBill from "../screens/Group/GroupBill/ReadBill";
import GroupReadNotice from "../screens/Group/GroupNotice/ReadNotice";
import GroupWriteNotice from "../screens/Group/GroupNotice/WriteNotice";
import VoteMemberList from "../screens/Group/GroupVote/VoteMemberList";
import BillMemberList from "../screens/Group/GroupBill/BillMemberList";
import VoteResult from "../screens/Group/GroupVote/VoteResult";
import ReadPost from "../screens/Feed/PostContainer";
import WritePost from "../screens/Feed/WritePost";
import PostListContainer from "../screens/Feed/PostListContainer";
import GroupSchedule from "../screens/Group/GroupDrawer/GroupSchedule";
import { userIsLoggedIn } from "../context/AuthContext";
import Applicants from "../screens/Group/GroupDrawer/Applicants";
import GroupAuth from "../screens/Group/GroupDrawer/GroupAuth";
import Eviction from "../screens/Group/GroupDrawer/Eviction";
import GroupWithdraw from "../screens/Group/GroupDrawer/GroupWithdraw";
import GroupMember from "../screens/Group/GroupDrawer/GroupMember";
import GroupIntro from "../screens/Group/GroupIntro/GroupIntroContainer";
import UpdatePost from "../screens/Feed/UpdatePost";
import WriteQuestion from "../screens/Group/GroupQnA/WriteQuestion";
import ReadQnA from "../screens/Group/GroupQnA/ReadQnAContainer";
import GroupIntroEdit from "../screens/Group/GroupIntro/GroupIntroEdit";
import WriteAnswer from "../screens/Group/GroupQnA/WriteAnswer";
import GroupTestPage from "../screens/Group/GroupTestPage";
import ReadScheduleContainer from "../screens/Group/GroupSchedule/ReadScheduleContainer";
import WriteSchedule from "../screens/Group/GroupSchedule/WriteSchedule";

const Stack = createStackNavigator();

export default () => {
  const route = useRoute();

  return (
    <Stack.Navigator
      initialRouteName="GroupScreen"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        initialParams={route.params}
        options={{
          title: "그룹 페이지",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupIntro"
        component={GroupIntro}
        initialParams={route.params}
        options={{
          title: "모임 소개",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="GroupSchedule"
        component={ReadScheduleContainer}
        options={{
          title: "일정 관리",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="MemberList"
        component={GroupMember}
        options={{
          title: "멤버 목록",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="Applicants"
        component={Applicants}
        options={{
          title: "가입 신청 목록",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="GroupAuth"
        component={GroupAuth}
        options={{
          title: "운영진 권한 부여",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="Eviction"
        component={Eviction}
        options={{
          title: "내보내기",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="GroupRemove"
        component={Eviction}
        options={{
          title: "모임 삭제",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="GroupWithdraw"
        component={GroupWithdraw}
        options={{
          title: "모임 탈퇴",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="GroupWriteVote"
        component={GroupWriteVote}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupReadVote"
        component={GroupReadVote}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="VoteMemberList"
        component={VoteMemberList}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="VoteResult"
        component={VoteResult}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupWriteBill"
        component={GroupWriteBill}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupReadBill"
        component={GroupReadBill}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="GroupWriteNotice"
        component={GroupWriteNotice}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupReadNotice"
        component={GroupReadNotice}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="BillMemberList"
        component={BillMemberList}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PostRead"
        component={ReadPost}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PostWrite"
        component={WritePost}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PostUpdate"
        component={UpdatePost}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PostList"
        component={PostListContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupQuestionWrite"
        component={WriteQuestion}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupAnswerWrite"
        component={WriteAnswer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialParams={{ id: "0", question: "" }}
      />
      <Stack.Screen
        name="GroupQnARead"
        component={ReadQnA}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupIntroEdit"
        component={GroupIntroEdit}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupScheduleWrite"
        component={WriteSchedule}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="GroupTestPage"
        component={GroupTestPage}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
