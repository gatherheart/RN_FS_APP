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
DrawerNavigatorConfig = {
  drawerPosition: "right",
  drawerType: "slide",
  drawerWidth: 100,
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

/**
 *  Drawer Navigation in Group in page
 *
 */
const DrawerNav = () => {
  const route = useRoute();
  const themeContext = React.useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName="GroupDrawerMain"
      drawerContentOptions={{
        activeTintColor: themeContext.lightGreenColor,
        itemStyle: { marginVertical: 10 },
      }}
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerShown: false,
        };
      }}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="GroupDrawerMain"
        component={GroupScreen}
        initialParams={route.params}
      />
      <Drawer.Screen name="GroupDrawerSecond" component={GroupDrawer} />
    </Drawer.Navigator>
  );
};

export default () => {
  const route = useRoute();

  return (
    <Stack.Navigator
      initialRouteName="GroupDrawer"
      screenOptions={({ route, navigation }) => {
        return {
          gestureEnabled: true,
          headerShown: false,
        };
      }}
    >
      <Stack.Screen
        name="GroupDrawer"
        component={DrawerNav}
        initialParams={route.params}
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
        name="PostList"
        component={PostListContainer}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};
