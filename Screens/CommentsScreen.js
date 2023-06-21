import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function CommentsScreen() {
  const navigation = useNavigation();

  const back = () => {
    navigation.navigate("PostsScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconBackContainer} onPress={back}>
          <MaterialIcons name="keyboard-backspace" size={24} color="#212121" />
        </Pressable>
        <Text style={styles.title}>Коментарі</Text>
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
    paddingLeft: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: " #E5E5E5",
    justifyContent: "center",
    position: "relative",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginLeft: 80,
    marginRight: 109,
  },

  iconBackContainer: {
    position: "absolute",
    left: 16,
    top: 54,
  },
});
