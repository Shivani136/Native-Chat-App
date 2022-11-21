//import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { 
  Platform ,
  View, 
  Text, 
  Button ,
  StyleSheet,
  Linking
 } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getChannelDisplayName, kitty } from '../chatkitty';
import BrowseChannelsScreen from '../screens/BrowseChannelsScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigation from '../screens/DrawerNavigation';
import colors from '../config/colors';

// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';


const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

// function Notificationss() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.closeDrawer()}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.toggleDrawer()}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       useLegacyImplementation
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Notifications" component={Notifications} />
//     </Drawer.Navigator>
//   );
// }

export default function HomeStack() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      kitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };

        return user;
      });
    });
  }, []);

  return (
    <ModalStack.Navigator 
       presentation="modal" screenOptions={{ headerShown: false }}>
      <ModalStack.Screen
        name="ChatApp"
        component={(ChatComponent)}
        //component={withInAppNotification(ChatComponent)}
      />
      <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen}/>
      {/* <ModalStack.Screen name="Login" component={LoginScreen}/> */}
      <ModalStack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
      </ModalStack.Navigator>
  );
}

function ChatComponent({ navigation, showNotification }) {
  useEffect(() => {
    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
        //image : notification.image
        onPress: () => {
          switch (notification.data.type) {
            case 'USER:SENT:MESSAGE':
            case 'SYSTEM:SENT:MESSAGE':
              kitty.getChannel(notification.data.channelId).then((result) => {
                navigation.navigate('Chat', { channel: result.channel });
              });
              break;
          }
        },
      });
    });
  }, [navigation, showNotification]);

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
        backgroundColor: colors.purple,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
        fontSize: 22,
        },
      }}
    >
      <ChatStack.Screen
        name="Home"
        component={HomeScreen}
        options={(options) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color= {colors.white}
              onPress={() => options.navigation.navigate('CreateChannel')}
              // onPress={() => options.navigation.navigate('BrowseChannels')}
            />
          ),
       // })}
        //   name="Home"
        //   component={HomeScreen}
         // options={(options) => ({
          headerLeft: () => (
            <IconButton
              icon="home"
              size={28}
              color= {colors.white}
              onPress={() => options.navigation.navigate('DrawerNavigation')}
            />
          ),
        })}
      />
      <ChatStack.Screen
        name="BrowseChannels"
        component={BrowseChannelsScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color= {colors.white}
              onPress={() => navigation.navigate('CreateChannel')}
            />
          ),
        })}
      />
        
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        
        options={({ route }) => ({
          title: getChannelDisplayName(route.params.channel),

          headerRight: () => (
            <View  style={styles.sendingContainer}>
            <IconButton icon='phone' onPress={ ()=>{ Linking.openURL('https://voicecallingapp.herokuapp.com/')}}
            size={30} color= {colors.white} />
             <IconButton icon='video' size={30} color= {colors.white} />
            </View>
          ),
          })}
        />
    </ChatStack.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    flexDirection : 'row',
    alignItems: 'center',
    },
});
