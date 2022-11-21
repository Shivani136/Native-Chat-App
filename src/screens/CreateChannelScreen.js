import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import useStatsBar from '../utils/useStatusBar';
import { kitty } from '../chatkitty';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import colors from '../config/colors';
import firestore from '@react-native-firebase/firestore';
import {firebase} from 'react-native-firebase';

export default function CreateChannelScreen({ navigation }) {
  
Platform.OS === "ios" ? useStatsBar('dark-content'): useStatsBar('light-content')
const [channelName, setChannelName] = useState('');

  function handleButtonPress() {

    if (channelName.length > 0) {
       kitty
      firestore()
      .collection('THREADS')
      .createChannel({
      // kitty
      // .createChannel({
        // type: 'PUBLIC',
        name: channelName,
      
      })
      .then(() => {
      navigation.navigate('Home')
      });
    }
  }

  return (
      <View style={styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
          <IconButton
              icon="close-circle"
              size={36}
              color={colors.purple}
              onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.innerContainer}>
          <Title style={styles.title}>Create a new channel</Title>
          <FormInput
              labelName="Channel Name"
              value={channelName}
              onChangeText={(text) => setChannelName(text)}
              clearButtonMode="while-editing"
          />
          <FormButton
              title="Create"
              modeValue="contained"
              labelStyle={styles.buttonLabel}
              onPress={() => handleButtonPress()}
              disabled={channelName.length === 0}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});