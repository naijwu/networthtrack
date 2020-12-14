import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const TodoInput = (props) => {

 return (
     <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
        <View>
            <Text style={styles.listItem}>{props.title}</Text>
        </View>
     </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#eee',
  },
});
export default TodoInput