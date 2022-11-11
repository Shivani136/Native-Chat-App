import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import defaultStyle from '../config/styles';

const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...rest }) {
  return (
      <TextInput
          label={labelName}
          placeholderTextColor = { defaultStyle.colors.medium }
          style={styles.input}
          numberOfLines={1}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  input: {
     marginTop: 10,
    marginBottom: 10,
    // width: width / 1.3,
    // borderRadius: 15,
    width:'80%',
    height: height / 15,
  },
});