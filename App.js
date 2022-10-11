import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Providers from './src/navigation';

export default function App() {
  // return (
  //   <View style={styles.root}>
    
  //     <Home />
  //   </View>
  // );
  return <Providers />;
}
const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
})

