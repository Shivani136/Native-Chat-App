import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import colors from '../config/colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Let's get started!</Title>
        <FormInput
            labelName="Display Name"
            value={displayName}
            autoCapitalize="none"
            onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
        />
        <FormInput
            labelName="Email"
            icon="email"
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName="Password"
            value={password}
            icon="lock"
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
       
        <FormButton
            title="Signup"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => register(displayName, email, password)}
        />
        <IconButton
            icon="keyboard-backspace"
            size={30}
            style={styles.navButton}
            color={colors.purple}
            onPress={() => navigation.goBack()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});