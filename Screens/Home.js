import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

export function Home() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingRight: 81,
          paddingLeft: 81,
        },
        tabBarLabel: () => null,
        tabBarIcon: ({ focused, color }) => {
          let iconComponent;
          getFocusedRouteNameFromRoute(route);

          if (route.name === "PostsScreen") {
            iconComponent = (
              <Ionicons
                name="grid-outline"
                size={24}
                color={focused ? "#FF6C00" : "#212121"}
              />
            );
          } else if (route.name === "CreatePostsScreen") {
            iconComponent = (
              <View style={styles.addButton}>
                <Ionicons name="add-outline" size={24} color="#FFFFFF" />
              </View>
            );
          } else if (route.name === "ProfileScreen") {
            iconComponent = (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : "#212121"}
              />
            );
          }

          return iconComponent;
        },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addButton: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
