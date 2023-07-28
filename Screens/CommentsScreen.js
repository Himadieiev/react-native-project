import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { createCommentThunk, getPostsThunk } from "../redux/Posts/thunks";

export function CommentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const uriPhoto = route.params?.uriPhoto || null;
  const postId = route.params?.postId || null;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const comments = posts.find(({ id }) => id === postId).comments;

  const clearInputs = () => {
    setComment("");
  };

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  const back = () => {
    navigation.goBack();
  };

  const createComment = () => {
    dispatch(
      createCommentThunk({
        postId,
        userId: auth.currentUser.uid,
        date: new Date().toLocaleString(),
        text: comment,
      })
    );

    clearInputs();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.iconBackContainer} onPress={back}>
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color="#212121"
            />
          </Pressable>
          <Text style={styles.title}>Коментарі</Text>
        </View>
        {uriPhoto && (
          <View style={styles.contentContainer}>
            <View style={styles.postContainer}>
              <View style={styles.post}>
                <Image source={{ uri: uriPhoto }} style={styles.photo} />
              </View>
            </View>
            <ScrollView style={styles.comment}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  <View style={styles.avatarContainer}>
                    <Image />
                  </View>
                  <View style={styles.commentTextContainer}>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <Text style={styles.commentDate}>{comment.date}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Коментувати..."
                value={comment}
                onChangeText={setComment}
              />
              <Pressable style={styles.commentInputBtn} onPress={createComment}>
                <Image
                  source={require("./images/send.png")}
                  style={styles.btnIcon}
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  contentContainer: {
    flex: 1,
    flexDirection: "column",
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
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  comment: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 34,
    marginBottom: 31,
  },
  commentTextContainer: {
    width: "100%",
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    height: "auto",
    padding: 16,
    paddingRight: 32,
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    width: "100%",
    marginBottom: 8,
  },
  commentDate: {
    color: "#BDBDBD",
    textAlign: "right",
    fontSize: 10,
    marginRight: 32,
  },
  avatarContainer: {
    width: 28,
    height: 28,
    backgroundColor: "blue",
    marginRight: 16,
    borderRadius: 50,
    overflow: "hidden",
  },
  inputContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    width: "100%",
    height: 50,
    paddingLeft: 16,
    paddingRight: 8,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    position: "relative",
  },
  commentInputBtn: {
    width: 34,
    height: 34,
    position: "absolute",
    top: 7,
    right: 26,
  },
  btnIcon: {
    width: 34,
    height: 34,
  },
});
