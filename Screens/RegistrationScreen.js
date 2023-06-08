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

export function RegistrationScreen() {
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
            <View style={styles.avatarContainer}>
              <Pressable style={styles.addButton}>
                <Image source={require("./images/add.png")} />
              </Pressable>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput style={styles.input} placeholder="Логін" />
            <TextInput
              style={[styles.input, styles.secondaryInput]}
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
            <Text style={styles.buttonText}>Зареєстуватися</Text>
          </Pressable>
          <View style={styles.link}>
            <Text style={styles.textLink}>Вже є акаунт? </Text>
            <Pressable>
              <Text style={[styles.underlineText, styles.textLink]}>
                Увійти
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
    marginBottom: 33,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  topContentContainer: {
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
  },
  bottomContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 78,
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
  secondaryInput: {
    marginTop: 16,
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
  avatarContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -12,
    top: 80,
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
