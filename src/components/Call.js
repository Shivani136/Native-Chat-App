import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { Constants } from 'expo';

// export default class App extends Component {
    export default function renderSend(props) {
//   render() {
    return (
      <View style={styles.container}>
       <Button title="Click me" onPress={ ()=>{ Linking.openURL('https://voicecallingapp.herokuapp.com/')}} />
      </View>
    );
//   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
