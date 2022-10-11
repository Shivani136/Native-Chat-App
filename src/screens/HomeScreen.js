import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FlatList, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import SearchBar from "../components/SearchBar";

export default function HomeScreen({ navigation }) {

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
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

  return (
    <SafeAreaView style={styles.root}>
    {/* {!clicked && <Text style={styles.title}>Programming Languages</Text>} */}
    {!clicked && <Text style={styles.title}></Text>}
    <SearchBar
      searchPhrase={searchPhrase}
      setSearchPhrase={setSearchPhrase}
      clicked={clicked}
      setClicked={setClicked}
    />
    
    <View style={styles.container}>
        <FlatList
            data={channels}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
                <List.Item
                    title={item.name}
                    description={item.type}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                    onPress={() => navigation.navigate('Chat', { channel: item })}
                />
            )}
        />
      </View>
  </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
});