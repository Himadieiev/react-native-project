import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export function CreatePostsScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uriPhoto, setUriPhoto] = useState(null);
  const [namePhoto, setNamePhoto] = useState("");
  const [nameLocation, setNameLocation] = useState("");
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      const locationPermission =
        await Location.requestForegroundPermissionsAsync();

      if (locationPermission.status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

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
    navigation.goBack();
  };

  const clearInputs = () => {
    setNamePhoto("");
    setNameLocation("");
  };

  const checkFieldsEmpty = () => {
    if (namePhoto.trim() === "" || nameLocation.trim() === "") {
      setIsFieldsEmpty(true);
    } else {
      setIsFieldsEmpty(false);
    }
  };

  const onCreatePost = async () => {
    let currentLocation = null;
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      currentLocation = { latitude, longitude };
    } catch (error) {
      console.log("Помилка під час отримання місцезнаходження:", error);
    }

    navigation.navigate("PostsScreen", {
      uriPhoto,
      namePhoto,
      nameLocation,
      currentLocation,
    });

    clearInputs();
    setUriPhoto(null);
  };
  const onDeletePost = () => {
    setUriPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={back}>
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color="#212121"
            />
          </Pressable>
          <Text style={styles.title}>Створити публікацію</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.photoContainer}>
            {uriPhoto ? (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: uriPhoto }} style={styles.photo} />
              </View>
            ) : (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
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
                    <MaterialIcons
                      name="photo-camera"
                      size={20}
                      color="#BDBDBD"
                    />
                    <View style={styles.takePhotoOut}>
                      <View style={styles.takePhotoInner}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>
          {uriPhoto ? (
            <Text style={styles.uploadPhoto}>Редагувати фото</Text>
          ) : (
            <Text style={styles.uploadPhoto}>Завантажте фото</Text>
          )}
          <TextInput
            style={styles.namePhoto}
            placeholder="Назва..."
            value={namePhoto}
            onChangeText={setNamePhoto}
            onBlur={checkFieldsEmpty}
          />
          <View style={styles.line}></View>
          <View style={styles.locationInputContainer}>
            <SimpleLineIcons name="location-pin" size={15} color="#BDBDBD" />
            <TextInput
              style={styles.locationPhotoName}
              placeholder="Місцевість..."
              value={nameLocation}
              onChangeText={setNameLocation}
              onBlur={checkFieldsEmpty}
            />
          </View>
          <View style={styles.line}></View>
          <Pressable
            style={
              isFieldsEmpty
                ? styles.disabledButtonCreatePost
                : styles.buttonCreatePost
            }
            onPress={onCreatePost}
            disabled={isFieldsEmpty}
          >
            <Text
              style={
                isFieldsEmpty ? styles.disabledButtonText : styles.buttonText
              }
            >
              Опубліковати
            </Text>
          </Pressable>
          <Pressable
            style={
              !uriPhoto
                ? styles.disabledbuttonDeletePost
                : styles.buttonDeletePost
            }
            onPress={onDeletePost}
          >
            {!uriPhoto ? (
              <Feather name="trash-2" size={24} color="#DADADA" />
            ) : (
              <Feather name="trash-2" size={24} color="#FFFFFF" />
            )}
          </Pressable>
        </View>
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

  namePhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    marginTop: 32,
    marginBottom: 10,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#E8E8E8",
  },

  locationPhotoName: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    marginTop: 16,
    marginBottom: 10,
    width: "100%",
    marginLeft: 4,
  },

  buttonCreatePost: {
    width: "100%",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  disabledButtonCreatePost: {
    width: "100%",
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  disabledButtonText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  buttonDeletePost: {
    width: 70,
    height: 40,
    paddingHorizontal: 23,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
  },

  disabledbuttonDeletePost: {
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
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
