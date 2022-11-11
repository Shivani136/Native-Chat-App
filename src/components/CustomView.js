import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { Constants } from 'expo';


export default class CustomView extends React.Component {
  
    renderPdf() {
        return (
          <TouchableOpacity style= 
              {[styles.container,this.props.containerStyle]} >
           <Image
            {...this.props.imageProps}
           style={[styles.image, this.props.imageStyle]}
           source ={{
                   uri:""
                }}
       />
      </TouchableOpacity>
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