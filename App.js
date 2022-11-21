// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
//   Linking
// } from '@react-navigation/drawer';

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function About() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>About Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props ) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       {/* <DrawerItem
//         label="Help"
//         onPress={() => Linking.openURL('https://mywebsite.com/help')}
//       /> */}
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
//       <Drawer.Screen name="Notifications" component={Notifications}/>
//       <Drawer.Screen name="About" component={About}/>
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }

import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import ImageUpload from './src/components/ImageUpload';
import ImagePicker from './src/components/ImagePicker';
import Call from './src/components/Call';
import CustomView from './src/components/CustomView';
import PdfFile from './src/components/PdfFile';
import Pdf from './src/components/Pdf';
import Providers from './src/navigation';



export default function App() {
return (
  <>
    {/* <StatusBar barStyle="dark-content" /> */}
    <StatusBar/>
    {/* <Pdf /> */}
    {/* <CustomView/> */}
    {/* <Call /> */}
    {/* <ImageUpload /> */}
    {/* <ImagePicker/> */}
     {/* <PdfFile /> */}
    <Providers/>
      {/* <View style={styles.root}>
      //<Home />
      //</View> */}
      
  </>
);
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
})


