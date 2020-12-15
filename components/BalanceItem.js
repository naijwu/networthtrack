import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const BalanceItem = (props) => {
  let textColor = '';
  
  if(parseFloat(props.change) == Math.abs(parseFloat(props.change))) {
    // if it's positive

    textColor = 'green';

  } else if (parseFloat(props.change) != Math.abs(parseFloat(props.change))) {
    textColor = 'red';
  }

 return (
     <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
        <View style={{
          backgroundColor:"#eee",
          elevation:1,
          marginVertical: 7,
          padding: 10,
        }}>
            <Text>{props.date}</Text>
            <Text>Type: {props.side}</Text>
            <Text>Class: {props.type}</Text>
            <Text style={{
                color: textColor,
                fontSize: 20,
                fontFamily: "helvetica-neue-bold",
              }}>
                ${props.change}
            </Text>
        </View>
     </TouchableOpacity>
  );
}


export default BalanceItem