import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { Constants } from 'expo';


export default class CustomView extends React.Component {
  constructor(props) {
      super(props);
        this.state = {
          currentMessage: " "
        }
    }

  renderPdf(currentMessage) {
      return (
        <View style={styles.container}>
        <TouchableOpacity style= 
            {[this.props.containerStyle]} >
      <Image
          {...this.props.imageProps}
         style={[styles.image, this.props.imageStyle]}
         source ={{
                 uri:""
              }}
     />
    </TouchableOpacity>
    </View>
    );
  }

render() {
  if (this.props.currentMessage.file_type == 'pdf') {
     return this.renderPdf();
  } else if (this.props.currentMessage.template && 
       this.props.currentMessage.template != 'none') {
     return this.renderHtml();
   }
    return null;
  }
 }