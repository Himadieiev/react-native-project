import React from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function PostsScreen() {
  const navigation = useNavigation();

  onLogout = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable style={styles.logOutButton} onPress={onLogout}>
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Image
          source={require("./images/avatar-small.jpg")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <Text style={styles.emailUser}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    height: 88,
    paddingTop: 54,
    borderBottomWidth: 0.5,
    borderBottomColor: " #E5E5E5",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginLeft: 155,
    marginRight: 109,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginLeft: 16,
  },

  avatar: {
    marginRight: 8,
  },

  nameUser: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15.23,
  },

  emailUser: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
  },
});
