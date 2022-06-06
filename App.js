import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import reduxStore from "./src/redux/Store/index";
import RootNavigation from "./src/Navigation/index";
import EStyleSheet from "react-native-extended-stylesheet";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Loader from "./src/components/Loader/Spinner";
import {View} from 'react-native';


export const reduxPersistStore = persistStore(reduxStore);


const App = () => {
  const setUpGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "962840701417-82kj83r34hh8np08j5p15fsj4govn2do.apps.googleusercontent.com",
      offlineAccess: false,
    });
  };

  // componentDidMount() {
  //   EStyleSheet.build();
  //   this.setUpGoogleSignIn();
  // }


   // NetInfo.addEventListener(state => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
  //   if(!state.isConnected) {
  //     return (
  //       <Text>Not Connected</Text>
  //     )
  //   }
  // });

  useEffect(() => {
    EStyleSheet.build();
    setUpGoogleSignIn();
  }, []);
  

  const renderLoader = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
    </View>
    )
};

return (
  <Provider store={reduxStore}>
    <PersistGate loading={renderLoader()}  persistor={reduxPersistStore}
              onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 2000))}
    >
      <RootNavigation />
    </PersistGate>
  </Provider>
);
}



export default App;
