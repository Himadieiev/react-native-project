import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { logInAuthThunk } from "../redux/Auth/thunks";
import { setUser } from "../redux/Auth/authSlice";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, async (token) => {
      if (token) {
        console.log("Користувач log in!", token.uid);
        navigation.navigate("Home");
      } else {
        console.log("Користувач log out!");
        navigation.navigate("LoginScreen");
      }
    });
  }, []);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const checkFieldsEmpty = () => {
    if (email.trim() === "" || password.trim() === "") {
      setIsFieldsEmpty(true);
    } else {
      setIsFieldsEmpty(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    setIsEmailValid(emailRegex.test(email));
  };

  const onLogin = () => {
    dispatch(logInAuthThunk({ email, password }))
      .then((response) => {
        if (response.type !== "auth/login/fulfilled") {
          alert("Вхід не виконано! Спробуйте ще раз або зареєструйтесь!");
          return;
        }

        dispatch(setUser({ email }));
        clearInputs();
        navigation.navigate("Home");
      })
      .catch((error) => {
        throw error;
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                }}
                onBlur={checkFieldsEmpty}
              />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onBlur={checkFieldsEmpty}
                />
                <Pressable onPress={toggleShowPassword}>
                  <Text style={styles.showPasswordButton}>
                    {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.bottomContentContainer}>
            <Pressable
              style={[
                styles.button,
                isFieldsEmpty || !isEmailValid ? styles.disabledButton : null,
              ]}
              onPress={onLogin}
              disabled={isFieldsEmpty || !isEmailValid}
            >
              <Text style={styles.buttonText}>Увійти</Text>
            </Pressable>
            <View style={styles.link}>
              <Text style={styles.textLink}>Немає акаунту? </Text>
              <Pressable
                onPress={() => navigation.navigate("RegistrationScreen")}
              >
                <Text style={[styles.underlineText, styles.textLink]}>
                  Зареєструватися
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
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
