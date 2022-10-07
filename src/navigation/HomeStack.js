import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { IconButton } from 'react-native-paper';

import { kitty } from '../chatkitty';
import BrowseChannelsScreen from '../screens/BrowseChannelsScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import HomeScreen from '../screens/HomeScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  return (
      <ModalStack.Navigator 
      presentation="modal" screenOptions={{ headerShown: false }}>
        <ModalStack.Screen
            name="ChatApp"
            component={withInAppNotification(ChatComponent)}
        />
        <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
      </ModalStack.Navigator>
  );
}

function ChatComponent({ navigation, showNotification }) {
  useEffect(() => {
    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
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
              backgroundColor: '#5b3a70',
            },
            headerTintColor: '#ffffff',
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
                      icon="plus"
                      size={28}
                      color="#ffffff"
                      onPress={() => options.navigation.navigate('BrowseChannels')}
                  />
              ),
            })}
        />
        <ChatStack.Screen
            name="BrowseChannels"
            component={BrowseChannelsScreen}
            options={(options) => ({
              headerRight: () => (
                  <IconButton
                      icon="plus"
                      size={28}
                      color="#ffffff"
                      onPress={() => options.navigation.navigate('CreateChannel')}
                  />
              ),
            })}
        />
        <ChatStack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.channel.name,
            })}
        />
      </ChatStack.Navigator>
  );
}