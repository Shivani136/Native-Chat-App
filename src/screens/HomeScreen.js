import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  View
} from "react-native";
import useStatsBar from '../utils/useStatusBar';

import { Button, Dialog, Divider, List, Portal } from 'react-native-paper'; 
import { getChannelDisplayName, kitty } from '../chatkitty';
import Loading from '../components/Loading';
import SearchBar from "../components/SearchBar";
//import ImageUpload from '../components/ImageUpload';
//import List from "../components/List";

export default function HomeScreen({ navigation }) {
  useStatsBar('light-content');
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [leaveChannel, setLeaveChannel] = useState(null); 
  const isFocused = useIsFocused();

  useEffect(() => {
    let isCancelled = false;

    kitty.getChannels({ filter: { joined: true } }).then((result) => {
      if (!isCancelled) {
        setChannels(result.paginator.items);

        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isFocused, loading]);

  if (loading) {
    return <Loading />;
  }


  function handleLeaveChannel() {
    kitty.leaveChannel({ channel: leaveChannel }).then(() => {
      setLeaveChannel(null);
  
      kitty.getChannels({ filter: { joined: true } }).then((result) => {
        setChannels(result.paginator.items);
      });
    });
  }
  
  function handleDismissLeaveChannel() {
    setLeaveChannel(null);
  }

 return(
 
        <View style={styles.item}>
         {/* {!clicked && <Text style={styles.title}>Programming Languages</Text>} */}
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
             
        <FlatList
           data={channels}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
               <List.Item
                    searchPhrase={searchPhrase}
                    setClicked={setClicked}
                      title={getChannelDisplayName(item)}
                    // description={item.type} //for hide public name
                    // titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    // descriptionStyle={styles.listDescription}
                   // descriptionNumberOfLines={1}
                    onPress={() => navigation.navigate('Chat', { channel: item })}
                    onLongPress={() => { /* Add this */
                     setLeaveChannel(item);
                   }}
              />
             )}
        />
         <Portal>
         <Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel}>
           <Dialog.Title>Leave channel?</Dialog.Title>
           <Dialog.Actions>
             <Button onPress={handleDismissLeaveChannel}>Cancel</Button>
             <Button onPress={handleLeaveChannel}>Confirm</Button>
           </Dialog.Actions>
         </Dialog>
       </Portal>
       </View>

  );
}

                        


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  item: {
    // margin: 30,
    flex: 1,
    // borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle : "Normal"
    // fontStyle: "italic",
  },
  listDescription: {
    fontSize: 16,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});