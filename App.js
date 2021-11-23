import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import Vue1 from "./src/screens/vue1";
import Vue2 from "./src/screens/vue2";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import * as SQLite from "expo-sqlite";
import { Provider, connect } from "react-redux";
import store from "./src/redux/Store/configureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

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
      let persistor = persistStore(store);

      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <VueStack />
            </NavigationContainer>
          </PersistGate>
        </Provider>
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
