import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import ImageUpload from './src/components/ImageUpload';
import Providers from './src/navigation';

export default function App() {
return (
  <>
    {/* <StatusBar barStyle="dark-content" /> */}
    <StatusBar/>
    {/* <ImageUpload /> */}
    <Providers />
      {/* <View style={styles.root}>
      //<Home />
      //</View> */}
  </>
);
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
})


