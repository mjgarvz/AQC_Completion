import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import CallButton from "../components/ButtonBasic";

import ChatScreen from "./ChatScreen";
import IncidentScreen from "./IncidentScreen";
import ProfileScreen from "./Profile";
import EditProfileScreen from "./EditProfileScreen";
import ActiveIncidentScreen from "./ActiveIncidentScreen";
import CompleteReportScreen from "./CompleteReportScreen";
import CompletedReportsScreen from "./CompletedReportsScreen";
import EquipmentRequestScreen from "./EquipmentRequestScreen";
import EditCompleteReportScreen from "./EditCompleteReportScreen";

//landing
import CreateChatScreen from "./CreateChatScreen";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//stacks of pages
const IncidentStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ActiveStack = createStackNavigator();

const Tab = createBottomTabNavigator();
//main tab for navigation all pages will be loaded here
const MainTabScreen = () => (
  //bottom navigation navigaot stack/main menus
  
  //Active page will be loaded first when app opens
  <Tab.Navigator initialRouteName="Active" options={{}}>
    <Tab.Screen
      name="Chat"
      component={ChatStackScreen}
      options={{
        tabBarLabel: "Chat",
        tabBarIcon: () => (
          <SimpleLineIcons name="speech" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Incident"
      component={IncidentStackScreen}
      options={{
        tabBarLabel: "Incident",
        tabBarIcon: () => (
          <SimpleLineIcons name="list" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Active"
      component={ActiveStackScreen}
      options={{
        tabBarLabel: "Active Report",
        tabBarIcon: () => (
          <SimpleLineIcons name="exclamation" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: () => (
          <SimpleLineIcons name="user" size={24} color="black" />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
//navigation stacks for pages on each stack, navigator for pages with pages inside

//incident list navigator
const IncidentStackScreen = ({ navigation }) => (
  <IncidentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <IncidentStack.Screen
      name="Incident"
      component={IncidentScreen}
      options={{
        title: "Incident List",
        headerTitleAlign: "center",
        headerLeft: () => (
          //log out button
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
  </IncidentStack.Navigator>
);
//active page navigator
const ActiveStackScreen = ({ navigation }) => (
  <ActiveStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ActiveStack.Screen
      name="ActiveIncident"
      component={ActiveIncidentScreen}
      options={{
        title: "Active Report Screen",
        headerTitleAlign: "center",
        headerLeft: () => (
          //log out button
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
    <ActiveStack.Screen
      name="CompleteReport"
      component={CompleteReportScreen}
      options={{
        title: "Complete Report",
        headerTitleAlign: "center",
        
      }}
    />
  </ActiveStack.Navigator>
);
//profile navigator
const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile Screen",
        headerTitleAlign: "center",
        headerLeft: () => (
          //log out button
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
    {/* //navigator for profile screen */}
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: "Edit Profile",
        headerTitleAlign: "center",
        
      }}
    />
    <ProfileStack.Screen
      name="ReportsCompleted"
      component={CompletedReportsScreen}
      options={{
        title: "Past Incidents",
        headerTitleAlign: "center",
        
      }}
    />
    <ProfileStack.Screen
      name="EditReportsCompleted"
      component={EditCompleteReportScreen}
      options={{
        title: "Edit Report",
        headerTitleAlign: "center",
        
      }}
    />
    <ProfileStack.Screen
      name="EquipmentRequest"
      component={EquipmentRequestScreen}
      options={{
        title: "Equipment Request",
        headerTitleAlign: "center",
        
      }}
    />
  </ProfileStack.Navigator>
);
//chat screen nav
const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#FF8000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ChatStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: "User Chatlist",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
    <ChatStack.Screen
      name="CreateChat"
      component={CreateChatScreen}
      options={{
        title: "User Chat",
        headerTitleAlign: "center",
        headerLeft: () => (
          <CallButton
            onPress={() => {
              Alert.alert("Log Out?", "Are you sure you want to Log Out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    {
                      AsyncStorage.clear();
                      navigation.popToTop();
                    }
                  },
                },
              ]);
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={24}
              color="black"
            ></SimpleLineIcons>
          </CallButton>
        ),
      }}
    />
  </ChatStack.Navigator>
);
