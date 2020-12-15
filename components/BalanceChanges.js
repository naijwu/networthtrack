import React, { useState } from 'react';
import { Modal, View, FlatList, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BalanceItem from './BalanceItem';

const BalanceChanges = (props) => {


 return (
   <Modal 
     animationType="slide" 
     visible={props.visibility}>
      <View style={{
          paddingHorizontal: 20,
          display:'flex',
          alignItems: 'stretch',
          paddingBottom: 80,
        }}>
        <Text style={{
          paddingTop: 40,
          fontSize: 20,
          fontFamily: 'helvetica-neue-bold',
        }}>
          Balance Changes
        </Text>


        <FlatList 
            inverted
            keyExtractor={(item) => item.id}
            data={props.data}
            renderItem={(itemData)=>( 
              <BalanceItem 
                  id={itemData.item.key} 
                  date={itemData.item.item.date} 
                  type={itemData.item.item.class} 
                  change={itemData.item.item.change} 
                  side={itemData.item.item.side} 
                  onDelete={props.onDelete} 
                  updateList={props.updateList}
                  />
            )}
            ></FlatList>
        </View>
   </Modal>
  );
}

export default BalanceChanges;