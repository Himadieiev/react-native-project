import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export function CommentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const uriPhoto = route.params?.uriPhoto || null;

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
      {uriPhoto && (
        <ScrollView>
          <View style={styles.postContainer}>
            <View style={styles.post}>
              <Image source={{ uri: uriPhoto }} style={styles.photo} />
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}></Text>
            <Text style={styles.commentDate}></Text>
          </View>
        </ScrollView>
      )}
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
  post: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  postContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  commentContainer: {},
  commentText: {},
  commentDate: {},
});
