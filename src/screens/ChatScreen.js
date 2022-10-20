import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView ,Platform} from 'react-native';
import { Avatar, Bubble, GiftedChat ,Send } from 'react-native-gifted-chat';
import { Text ,IconButton} from 'react-native-paper';
import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import ImageUpload from '../components/ImageUpload';
import { AuthContext } from '../navigation/AuthProvider';

export default function ChatScreen({ route, navigation, showNotification }) {
  const { user } = useContext(AuthContext);
  const { channel } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
          GiftedChat.append(currentMessages, [mapMessage(message ,<ImageUpload />)],)
        );
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
          <ImageUpload />
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },


      onParticipantEnteredChat: (participant) => {
        showNotification({
          title: `${participant.displayName} entered the chat`,
        });
      },
      onParticipantLeftChat: (participant) => {
        showNotification({
          title: `${participant.displayName} left the chat`,
        });
      },
     });

    kitty
      .getMessages({
        channel: channel,
      })
      .then((result) => {
        setMessages(result.paginator.items.map(mapMessage));

        setMessagePaginator(result.paginator);
        setLoadEarlier(result.paginator.hasNextPage);

        setLoading(false);
      });

    return startChatSessionResult.session.end;
  }, [user, channel, showNotification]);

  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  }

 async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);
     return;
    }

    setIsLoadingEarlier(true);

    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);

    setMessages((currentMessages) =>
      GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );

    setIsLoadingEarlier(false);
  }

  function handleInputTextChanged(text) {
    kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  }

  function renderSend(props) {
    return (
      <>
       <View style={styles.sendingContainer}>
       {/* <ImageUpload /> */}
      <IconButton icon='camera' size={30} color='#5b3a70'/>
      <IconButton icon='file' size={30} color='#5b3a70'/>
      </View>
      <Send {...props}>
        <View style={styles.sendingContainer}>
         <IconButton icon='send-circle' size={30} color='#5b3a70' />
        </View>
        </Send>
      </>
    );
  }





  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }


  function renderBubble(props) { // for message box background color set 
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#d3d3d3',
          },
        }}
      />
    );
  }

  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
        onPressAvatar={(clickedUser) => {
          kitty
            .createChannel({
              type: 'DIRECT',
              members: [{ id: clickedUser._id }],
            })
            .then((result) => {
              navigation.navigate('Chat', { channel: result.channel });
            });
        }}
      />
    );
  }

  function renderFooter() {  //for showing who is typing 
    
    if (typing) {
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
          >
        <View style={styles.footer}>
        <Text>{typing.displayName} is typing</Text>
          </View>
          </KeyboardAvoidingView>
    
      
      );
    }

    return null;
  }

   if (loading) {
    return <Loading />;
  }

  return (
    <>
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={mapUser(user)}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={handleLoadEarlier}
      onInputTextChanged={handleInputTextChanged}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
      renderFooter={renderFooter}
      renderSend={renderSend}
      //  renderImageSend={renderImageSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      
    />
    {/* <ImageUpload /> */}
    </>
  );
}

function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user),
  };
}

function mapUser(user) {
  return {
    _id: user.id,
    name: user.displayName,
    avatar: user.displayPictureUrl,
  };
}

const styles = StyleSheet.create({
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  sendingContainer: {
    justifyContent: 'center',
    flexDirection : 'row',
    alignItems: 'center',
    // paddingLeft: 0,
  },
  sendingContainers: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
