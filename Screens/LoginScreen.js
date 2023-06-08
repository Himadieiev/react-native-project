import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./images/photo-bg.jpg")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior="height"
        >
          <View style={styles.topContentContainer}>
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              style={[styles.input, styles.firstInput]}
              placeholder="Адреса електронної пошти"
            />
            <View style={styles.passwordInputContainer}>
              <TextInput style={styles.input} placeholder="Пароль" />
              <Pressable>
                <Text style={styles.showPasswordButton}>Показати</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomContentContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Увійти</Text>
          </Pressable>
          <View style={styles.link}>
            <Text style={styles.textLink}>Немає акаунту? </Text>
            <Pressable>
              <Text style={[styles.underlineText, styles.textLink]}>
                Зареєструватися
              </Text>
            </Pressable>
          </View>
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
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topContentContainer: {
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 43,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 144,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  firstInput: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 51,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  link: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
  },
  textLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  passwordInputContainer: {
    width: "100%",
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    top: -38,
    right: 15,
  },
});
