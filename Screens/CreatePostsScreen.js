import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export function CreatePostsScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uriPhoto, setUriPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const back = () => {
    navigation.navigate("PostsScreen");
  };

  const onCreatePost = () => {
    console.debug("You have successfully created a post");
  };

  const onDeletePost = () => {
    setUriPhoto(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.logOutButton} onPress={back}>
          <MaterialIcons name="keyboard-backspace" size={24} color="#212121" />
        </Pressable>
        <Text style={styles.title}>Створити публікацію</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.photoContainer}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            {uriPhoto && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: uriPhoto }} style={styles.photo} />
              </View>
            )}

            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={{ fontSize: 12, color: "white" }}> Flip </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  hasPermission
                    ? styles.cameraContainerActive
                    : styles.cameraContainer
                }
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    console.log(uri);
                    setUriPhoto(uri);
                  }
                }}
              >
                <MaterialIcons name="photo-camera" size={20} color="#BDBDBD" />
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        <Text style={styles.uploadPhoto}>Завантажте фото</Text>
        <View style={styles.infoPhotoContainer}>
          <Text style={styles.namePhoto}>Назва...</Text>
          <View style={styles.line}></View>
          <View style={styles.location}>
            <SimpleLineIcons name="location-pin" size={15} color="#BDBDBD" />
            <Text style={styles.locationPhotoName}>Місцевість...</Text>
          </View>
          <View style={styles.line}></View>
          <Pressable style={styles.buttonCreatePost} onPress={onCreatePost}>
            <Text style={styles.buttonText}>Опубліковати</Text>
          </Pressable>
          <Pressable style={styles.buttonDeletePost} onPress={onDeletePost}>
            <Feather name="trash-2" size={24} color="#DADADA" />
          </Pressable>
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
    paddingLeft: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: " #E5E5E5",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    marginLeft: 80,
    marginRight: 109,
  },

  mainContent: {
    paddingTop: 32,
    paddingBottom: 34,
    paddingLeft: 16,
    paddingRight: 16,
  },

  photoContainer: {
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

  cameraContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  cameraContainerActive: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
  },

  uploadPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 8,
  },

  infoPhotoContainer: {},

  namePhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    marginTop: 48,
    marginBottom: 15,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#E8E8E8",
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 15,
  },

  locationPhotoName: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    marginLeft: 4,
  },

  buttonCreatePost: {
    width: "100%",
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  buttonText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  buttonDeletePost: {
    width: 70,
    height: 40,
    paddingHorizontal: 23,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
  },
  camera: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flipContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  photoView: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});
