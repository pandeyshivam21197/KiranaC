/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import RootNavigator from "./navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./reduxStore/store";
import { PersistGate } from "redux-persist/integration/react";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.headContainer} />
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={"light-content"} />
          <RootNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headContainer: { flex: 0 },
});

export default App;
