import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, getPostsThunk } from "../redux/Posts/thunks";
import { logOutAuthThunk } from "../redux/Auth/thunks";
import { clearUser } from "../redux/Auth/authSlice";

export function PostsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const uriPhoto = route.params?.uriPhoto || null;
  const namePhoto = route.params?.namePhoto || null;
  const nameLocation = route.params?.nameLocation || null;
  const currentLocation = route.params?.currentLocation || null;
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  useEffect(() => {
    if (uriPhoto) {
      const newPost = {
        uriPhoto,
        namePhoto,
        nameLocation,
        currentLocation,
      };
      dispatch(createPostThunk(newPost));
    }
  }, [uriPhoto]);

  // const onDeletePost = (postId) => {
  //   dispatch(deletePostThunk(postId));
  // };

  // const deleteDocument = async (collectionName, documentId) => {
  //   const docRef = doc(collection(db, collectionName), documentId);

  //   try {
  //     await deleteDoc(docRef);
  //     console.log("їїї");
  //   } catch (error) {
  //     console.log("їїї", error);
  //   }
  // };

  onLogout = () => {
    dispatch(logOutAuthThunk());
    dispatch(clearUser());
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
      {posts && (
        <ScrollView>
          {posts.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.post}>
                <Image source={{ uri: post.uriPhoto }} style={styles.photo} />
              </View>
              <Text style={styles.namePhoto}>{post.namePhoto}</Text>
              <View style={styles.commentsContainer}>
                <View style={styles.commentsPhoto}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("CommentsScreen", {
                        uriPhoto: post.uriPhoto,
                        namePhoto: post.namePhoto,
                        nameLocation: post.nameLocation,
                      })
                    }
                  >
                    <Image
                      source={require("./images/message-circle-empty.png")}
                    />
                  </Pressable>

                  <Text style={styles.commentNumber}>0</Text>
                </View>
                <View style={styles.locationPhoto}>
                  <SimpleLineIcons
                    name="location-pin"
                    size={15}
                    color="#BDBDBD"
                  />
                  <Pressable
                    onPress={() => {
                      navigation.navigate("MapScreen", {
                        locationPhoto: post.currentLocation,
                      });
                    }}
                  >
                    <Text style={styles.location}>{post.nameLocation}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
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
    paddingRight: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: " #E5E5E5",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginLeft: 140,
    marginRight: "auto",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginLeft: 16,
    marginBottom: 32,
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
  },
  namePhoto: {
    marginRight: "auto",
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  commentsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  commentsPhoto: {
    flexDirection: "row",
    marginRight: 24,
    alignItems: "center",
  },
  commentNumber: {
    marginLeft: 6,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationPhoto: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  location: {
    marginLeft: 4,
    textDecorationLine: "underline",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
