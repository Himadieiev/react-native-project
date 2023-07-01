import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsThunk } from "../redux/Posts/thunks";
import { logOutAuthThunk } from "../redux/Auth/thunks";
import { clearUser } from "../redux/Auth/authSlice";

export function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  onLogout = () => {
    dispatch(logOutAuthThunk());
    dispatch(clearUser());
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./images/photo-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <ImageBackground
              source={require("./images/avatar.jpg")}
              style={styles.avatarImage}
            ></ImageBackground>
            <Pressable style={styles.addButton}>
              <Image source={require("./images/close.png")} />
            </Pressable>
          </View>
          <Text style={styles.title}>Natali Romanova</Text>

          <Pressable style={styles.logOutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </Pressable>
          {posts && (
            <ScrollView>
              {posts.map((post, index) => (
                <View key={index} style={styles.postContainer}>
                  <View style={styles.post}>
                    <Image
                      source={{ uri: post.uriPhoto }}
                      style={styles.photo}
                    />
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 32,
  },
  contentContainer: {
    position: "relative",
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 43,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
    zIndex: 4,
  },
  addButton: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -7,
    top: 74,
    zIndex: 5,
  },
  logOutButton: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 16,
    top: 20,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    zIndex: 3,
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
