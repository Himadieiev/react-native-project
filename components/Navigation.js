import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { MapScreen } from "../Screens/MapScreen";
import { CommentsScreen } from "../Screens/CommentsScreen";
import { Home } from "../Screens/Home";
import { useSelector } from "react-redux";

const MainStack = createStackNavigator();

export default function Navigation() {
  const { email } = useSelector((state) => state.auth);
  const initialRoute = email ? "Home" : "LoginScreen";

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName={initialRoute}>
          <MainStack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
