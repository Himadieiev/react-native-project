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

export function ProfileScreen() {
  const navigation = useNavigation();

  onLogout = () => {
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
          </View>
          <Text style={styles.title}>Natali Romanova</Text>
          <Pressable style={styles.addButton}>
            <Image source={require("./images/close.png")} />
          </Pressable>
          <Pressable style={styles.logOutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </Pressable>
          <ScrollView>
            <View style={styles.photoContainer}>
              <ImageBackground
                source={require("./images/rectangle-1.jpg")}
                style={styles.avatarImage}
              ></ImageBackground>
            </View>
            <Text style={styles.namePhoto}>Ліс</Text>
            <View style={styles.photoDetailsContainer}>
              <View style={styles.commentsPhoto}>
                <Image source={require("./images/message-circle.png")} />
                <Text style={styles.commentNumber}>8</Text>
              </View>
              <View style={styles.likesPhoto}>
                <Image source={require("./images/thumbs-up.png")} />
                <Text style={styles.likesNumber}>153</Text>
              </View>
              <View style={styles.locationPhoto}>
                <SimpleLineIcons
                  name="location-pin"
                  size={15}
                  color="#BDBDBD"
                />
                <Pressable onPress={() => navigation.navigate("MapScreen")}>
                  <Text style={styles.location}>Ukraine</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.photoContainer}>
              <ImageBackground
                source={require("./images/rectangle-2.jpg")}
                style={styles.avatarImage}
              ></ImageBackground>
            </View>
            <Text style={styles.namePhoto}>Захід на Чорному морі</Text>
            <View style={styles.photoDetailsContainer}>
              <View style={styles.commentsPhoto}>
                <Image source={require("./images/message-circle.png")} />
                <Text style={styles.commentNumber}>3</Text>
              </View>
              <View style={styles.likesPhoto}>
                <Image source={require("./images/thumbs-up.png")} />
                <Text style={styles.likesNumber}>200</Text>
              </View>
              <View style={styles.locationPhoto}>
                <SimpleLineIcons
                  name="location-pin"
                  size={15}
                  color="#BDBDBD"
                />
                <Pressable onPress={() => navigation.navigate("MapScreen")}>
                  <Text style={styles.location}>Ukraine</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.photoContainer}>
              <ImageBackground
                source={require("./images/rectangle-3.jpg")}
                style={styles.avatarImage}
              ></ImageBackground>
            </View>
            <Text style={styles.namePhoto}>Старий будиночок у Венеції</Text>
            <View style={styles.photoDetailsContainer}>
              <View style={styles.commentsPhoto}>
                <Image source={require("./images/message-circle.png")} />
                <Text style={styles.commentNumber}>500</Text>
              </View>
              <View style={styles.likesPhoto}>
                <Image source={require("./images/thumbs-up.png")} />
                <Text style={styles.likesNumber}>200</Text>
              </View>
              <View style={styles.locationPhoto}>
                <SimpleLineIcons
                  name="location-pin"
                  size={15}
                  color="#BDBDBD"
                />
                <Pressable onPress={() => navigation.navigate("MapScreen")}>
                  <Text style={styles.location}>Italy</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
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
  },
  addButton: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 129,
    top: 15,
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
  },
  photoContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    overflow: "hidden",
  },
  namePhoto: {
    marginRight: "auto",
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  photoDetailsContainer: {
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
  likesPhoto: {
    flexDirection: "row",
    marginRight: "auto",
    alignItems: "center",
  },
  likesNumber: {
    marginLeft: 6,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationPhoto: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: 4,
    textDecorationLine: "underline",
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
