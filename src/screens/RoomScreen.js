// ... rest of the import statements
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({ route }) {
   const { user } = useContext(AuthContext);
    const currentUser = user.toJSON();
  
    useEffect(() => {
        console.log({ user });
      }, []);
    // ...
  }

  
  import React, { useState } from 'react';
  import { GiftedChat } from 'react-native-gifted-chat';
  
  export default function RoomScreen() {
    const [messages, setMessages] = useState([
      /**
       * Mock message data
       */
      // example of system message
      {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().getTime(),
        system: true
      },
      // example of chat message
      {
        _id: 1,
        text: 'Henlo!',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'Test User'
        }
      }
    ]);
  
    // helper method that is sends a message
    function handleSend(newMessage = []) {
      setMessages(GiftedChat.append(messages, newMessage));
    }
    return (
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: 1 }}
      />
    );
  }  