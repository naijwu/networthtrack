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
      paddingHorizontal: 20,
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
          fontSize: 15,
          fontFamily: 'helvetica-neue',
        }}>
          Asset Class
        </Text>
        <View 
          style={{
            color:'black',
            backgroundColor:'#eee',
            height:40,
          }}>
            <RNPickerSelect
              style={{
                height:40,
              }}
              onValueChange={(value) => updateType(value)}
              items={[
                  { label: 'Accounts', value: 'accounts' },
                  { label: 'Investments', value: 'investments' },
                  { label: 'Properties', value: 'properties' },
                  { label: 'Cash/Chequing', value: 'Chequing' },
                  { label: 'Other', value: 'other' },
              ]} >
                
              <Text style={{
                  padding:10,
                }}>{typeVal}</Text>
              </RNPickerSelect>
        </View>

        <Text style={{
          marginTop: 40,
          fontSize: 15,
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
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop:40,
      }}>
          <Button 
            style={{
              width: '100%',
              height: '100%',
            }} 
            title="Add to Assets" 
            color="green"
            onPress={() => {
              props.onModify(typeVal, amountVal, true);
              props.closeModal();
              updateAmount(0);
              updateType('');
            }} />
          <Button 
            style={{
              width: '100%',
              height: '100%',
            }} 
            title="Subtract from Assets"
            color="red"
            onPress={()=>{
              props.onModify(typeVal, amountVal, false);
              updateAmount(0);
              updateType('');
            }} />
      </View>
   </Modal>
  );
}

export default AssetInput;