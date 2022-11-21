import React, { useContext, useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Button, 
  Linking,
  TextInput,
} from 'react-native';
import { Avatar, Bubble, GiftedChat ,Send ,Actions, Icon} from 'react-native-gifted-chat';
import { Text ,IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import ImageUpload from '../components/ImageUpload';
import { AuthContext } from '../navigation/AuthProvider';
import RNShareFile from 'react-native-share-pdf';
import * as DocumentPicker from 'expo-document-picker';
import * as ExpoFileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';
import colors from '../config/colors';
import { Constants } from 'expo';

 //console.log("AuthContext:", AuthContext);
//console.log("AuthContext.Provider:", AuthContext.Provider);

export default function ChatScreen({ route, navigation, showNotification }) {

  const { user } = useContext(AuthContext);
  const { channel } = route.params;
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    //const result = await chatkitty.reactToMessage({ message, emoji })


    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
          GiftedChat.append(currentMessages, [mapMessage(message , 
        )],)
        );
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
          // {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20, paddingTop: 20 }} />} 
          
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },

      onMessageReactionAdded: (message) => {
        // update UI
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


    kitty.onUserPresenceChanged((user) => {
      const status = user.presence.status;
   
      // Update UI
    })

  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
      file_type :pendingMessages[0].file_type,
      image : pendingMessages[0].image
      // body: pendingMessages[0].file,
      //image : image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 20, paddingTop: 20 }}/>,
      // file: file,
      // progressListener: {
      //   onStarted: () => {
      //     // Handle file upload started
      //   },
    
      //   onProgress: (progress) => {
      //     // Handle file upload process
      //   },
    
      //   onCompleted: (result) => {
      //     // Handle file upload completed
      //   },
      // },
      
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


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
     // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 20, paddingTop: 20 }} />}
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result.uri);

      {document && <Pdf source={{ uri: result.uri }} style={{ width: 200, height: 200, borderRadius: 20, paddingTop: 20 }} />}
   
      console.log(result);
      const fileContent = await ExpoFileSystem.readAsStringAsync(result.uri);
    
    if (!result.cancelled) {
      setDocument(result.uri);
    }
    };
  
// function renderActions(props: Readonly<ActionsProps>) {
  
//   return(
//       <Actions
//           {...props}
//             options={{
//             ['Document']: async (props) => {
//         try {
         
//           const result = await DocumentPicker.pick({
//              type: [DocumentPicker.types.pdf],
//            });
         
//          console.log("resulting file: "+result);
//          console.log("string result? "+JSON.stringify(result));
//          console.log("Filename at best: "+result[0].name)
         
//          let imageRef = storage().ref(`docFiles/${result[0].name}`);
//          let filename = result[0].uri;
//          const response = await fetch(filename);
//          const blob = await response.blob();
//          await imageRef.put(blob);
//           var dwnload = await imageRef.getDownloadURL();
         
//          console.log("Download file: "+dwnload);
         
//          global.pdfFile = dwnload;
//          console.log("pdf file: "+JSON.stringify(global.pdfFile));

//      } catch(error){
//          if(DocumentPicker.isCancel(error)){
//              console.log("User cancelled!")
//          } else {
//              throw error;
//          }
//      }
//  },
//  Cancel: (props) => {console.log("Cancel")}
//     }}
//     icon={() => (
//       <>
//        {/* <Ionicons
//            name={'add'}
//            size={28}
//            color={'#0077ff'}
//            style={{left:0, bottom:0}}
                 
//        /> */}

//        <Ionicons
//            name={'add'}
//            size={28}
//            color={'#0077ff'}
//            style={{left:0, bottom:0}}
//            onPress={pickDocument}
                 
//        />
        
//         </>
//      )}
//     onSend={args => console.log(args)}
//     />
// )
// }


  const renderCustomView = (props) => {
    if (props?.currentMessage?.file_type == 'pdf') {
      return renderPdf();
    }
    else if (props.currentMessage.template && 
      props.currentMessage.template != 'none') {
        return renderHtml();
    }
    return null;
  }

  function renderBubble(props) { // for message box background color set 
    image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20, paddingTop: 20 }} />
    return (
     <Bubble
        {...props}
         wrapperStyle={{
          left: {
            backgroundColor: colors.darkgray,
          },
         }}
      />
    );
  }

  function renderActions(props) {
    return (
      <View
        {...props}
        options={{
          ['Send Image']: pickImage,
        }}
        icon={() => (
          <Icon name={'file'} size={28} color={colors.primary} />
        )}
        onSend={args => console.log(args)}
      />
    )
  }

  function renderSend(props) {
        
    return (
      <>
      <View style={styles.sendingContainer} >
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20, paddingTop: 20 }} />} 
      <IconButton icon='camera' size={30} color= {colors.purple}
        onPress={pickImage}
        />
          
      <IconButton icon='attachment' attachment 
      onPress={pickDocument}
      size={30} color= {colors.purple}/>
      </View>
      
      <Send {...props}>
      
      <View style={styles.sendingContainer}>
      {/* <IconButton icon='camera' size={30} color= {colors.purple}
        onPress={pickImage}
        /> */}
        <IconButton icon='send-circle' size={30} color= {colors.purple} />
        </View>
        </Send>
      </>
    );
}

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color= {colors.lightPurple} />
      </View>
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
      //onSend= { image="https://picsum.photos/id/237/200/300" }
      onSend={handleSend}
      user={mapUser(user)}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      renderActions={renderActions}
      renderCustomView={renderCustomView}
      onLoadEarlier={handleLoadEarlier}
     // loadAndSharePDF={loadAndSharePDF}
      onInputTextChanged={handleInputTextChanged}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
      renderFooter={renderFooter}
      renderSend={renderSend}
       // renderPdf={renderPdf}
      //  renderImageSend={renderImageSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      
    />
 
    </>
  );

 function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    //select : message.body,
    file_type : message.file_type,
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

//   const newMessage = {
//     _id: data.send_at,
//     text: data.messagetext,
//     createdAt: data.send_at,
//     // (...),
//     file_type: data?.file_type,
//     file_id: data?.file_id,
// }


  //
  // async function loadAndSharePDF() {
  //   const showError = await RNShareFile.sharePDF(mockData.document, mockData.filename);
  //   if (showError) {
  //     console.log("error");
  //     // Do something with the error
  //   }
  // }

   //   function renderPdf(props) {
    //     return (
    //       <View style={styles.container}>
    //       <TouchableOpacity style= 
    //           {props.containerStyle} >
    //       <Image
    //         {...props.imageProps}
    //        style={styles.image, props.imageStyle}
    //        source ={{
    //                uri:""
    //             }}
    //    />
    //   </TouchableOpacity>
    //   </View>
    //   );
    // }
    

    //  function renderActions(props) {
  //       let selectFile = async () => {
  //         //Opening Document Picker to select one file
  //         try {
  //           const res = await DocumentPicker.pick({
  //             //Provide which type of file you want user to pick
  //             type: [DocumentPicker.types.pdf],
  //             //There can me more options as well
  //             // DocumentPicker.types.allFiles
  //             // DocumentPicker.types.images
  //             // DocumentPicker.types.plainText
  //             // DocumentPicker.types.audio
  //             // DocumentPicker.types.pdf
  //           });
  //           //Printing the log realted to the file
  //           console.log('res : ' + JSON.stringify(res));
  //           props.onSend({pdf:res.uri,file_type:'pdf'});
  //           //Setting the state to show single file attributes
  //           singleFile = res;
  //           // setSingleFile(res);
  //         } catch (err) {
  //           singleFile = null;
  //           // setSingleFile(null);
  //           //Handling any exception (If any)
  //           if (DocumentPicker.isCancel(err)) {
  //             //If user canceled the document selection
  //             alert('Canceled from single doc picker');
  //           } else {
  //             //For Unknown Error
  //             alert('Unknown Error: ' + JSON.stringify(err));
  //             throw err;
  //           }
  //         }
  //       };
  //       const handlePicker = () => {
  //         // console.log('edit');
  //         ImagePicker.showImagePicker({}, (response) => {
  //           // console.log('Response = ', response);
        
  //           if (response.didCancel) {
  //             console.log('User cancelled image picker');
  //           } else if (response.error) {
  //             console.log('ImagePicker Error: ', response.error);
  //           } else if (response.customButton) {
  //             console.log('User tapped custom button: ', response.customButton);
  //           } else {
  //             setAvatar({uri: response.uri});
  //             console.log(response.uri);
  //             props.onSend({image:response.uri});
  //           //   onSend([{"_id": "f3fda0e8-d860-46ef-ac72-0c02b8ea7ca9", "createdAt": new Date(), "image": response.uri, "user": {"_id": 1}}])
  //             return response.uri
  //             // here we can call a API to upload image on server
  //           }
  //           return avatar;
  //         });
  //       };
        
  //       return (
  //         <Actions
  //           {...props}
  //           options={{
  //             ['Send Image']: () => handlePicker(),
  //             ['Send Files']: () => selectFile(),
  //           }}
  //           icon={() => (
  //             <Icon name='attachment' size={28}  />
  //           )}
  //            //onSend={onSend}
  //         />
  //       )}
  