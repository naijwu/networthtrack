import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, List } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AssetInput = (props) => {
    
  const[typeVal, updateType] = useState('');
  const[amountVal, updateAmount] = useState(0);

 return (
   <Modal visible={props.visibility}>
    <View style={{
      width: '100%',
    }}>
        <Text style={{
          marginTop: 40,
          fontSize: 20,
          fontFamily: 'helvetica-neue-bold',
        }}>
          Modify Assets
        </Text>

        
        <Text style={{
          marginTop: 40,
          fontSize: 10,
          fontFamily: 'helvetica-neue',
        }}>
          Asset Class
        </Text>
        <RNPickerSelect
            onValueChange={(value) => updateType(value)}
            items={[
                { label: 'Accounts', value: 'accounts' },
                { label: 'Investments', value: 'investments' },
                { label: 'Properties', value: 'properties' },
                { label: 'Cash/Chequing', value: 'Chequing' },
                { label: 'Other', value: 'other' },
            ]}
        />


          
        <Text style={{
          marginTop: 40,
          fontSize: 10,
          fontFamily: 'helvetica-neue',
        }}>
          Amount
        </Text>
        <TextInput 
          placeholder="Enter amount" 
          style={{
            backgroundColor: '#eee',
            width: '100%',
            height: 40,
            paddingLeft: 10,
          }} 
          onChangeText={(amountVal) => {
            updateAmount(amountVal)}} value={amountVal} />
    </View>
    <View style={{
      flexDirection: 'row',
      width: '100%',
      height: 35,
      justifyContent: 'flex-start',
    }}>
        <Button 
          style={{
            width: '100%',
            height: '100%',
          }} 
          title="Add" 
          onPress={() => {
            props.onModify(typeVal, true);
            props.closeModal();
            updateInput('');
          }} />
        <Button 
          style={{
            width: '100%',
            height: '100%',
          }} 
          title="Remove"
          onPress={()=>{
            props.onModify(amountVal, false);
            updateInput('');
            props.closeModal();
          }} />
    </View>
   </Modal>
  );
}

export default AssetInput;