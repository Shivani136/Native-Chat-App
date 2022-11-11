import React, { useContext, useState } from 'react';
import {
  StyleSheet, 
  View ,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  } from 'react-native';
import { Title ,TextInput,Text ,IconButton } from 'react-native-paper';
import colors from '../config/colors';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import * as Yup from "yup";
import ErrorMessage  from "../components/form/ErrorMessage";
import LottieView from "lottie-react-native";
//import Screen from "../component/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (

     <View style={styles.container}>
       <LottieView
            autoPlay
            loop={true}
            // onAnimationFinish={onDone}
            source={ require('../assets/Animation/data.json')}
            style={styles.animation}
          />
        {/* <Title style={styles.titleText}>Welcome!</Title> */}
        <ErrorMessage error="Invalid Email or Password" visible={loginFailed} />

        <FormInput
            labelName="Email"
            //placeholder="Email"
            icon="email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
         {/* <IconButton icon='email' size={30} color= {colors.purple }/> */}
         {/* <Feather name="mail" size={24} color="black" />  */}
        <FormInput
            labelName="Password"
            icon="lock"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title="Login"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => login(email, password)}
        />
        <FormButton
            title="Sign up here"
            modeValue="text"
            uppercase={false}
            labelStyle={styles.navButtonText}
            onPress={() => navigation.navigate('Signup')}
        />
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    flex: 1,
     marginTop:55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // titleText: {
  //   fontSize: 24,
  //   marginBottom: 10,
  // },
  loginButtonLabel: {
    fontSize: 22,
    
  },
  navButtonText: {
    fontSize: 16,
   
  },
  animation : {
    marginBottom: 220,
  },
  
});