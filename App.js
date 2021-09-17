import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import Vue1 from "./src/screens/vue1";
import Vue2 from "./src/screens/vue2";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";

import * as SQLite from "expo-sqlite";

const AuthContext = React.createContext();

function Vue1Screen(props) {
  return <Vue1 navigation={props.navigation} route={props.route} />;
}

function Vue2Screen(props) {
  return <Vue2 navigation={props.navigation} route={props.route} />;
}

const Stack = createStackNavigator();

const VueStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Vue1" component={Vue1Screen} />
      <Stack.Screen name="Vue2" component={Vue2Screen} />
    </Stack.Navigator>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    const AppView = () => {
      return (
        <NavigationContainer>
          <VueStack />
        </NavigationContainer>
      );
    };

    return <AppView />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
