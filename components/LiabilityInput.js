import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, List } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const LiabilityInput = (props) => {
    
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
          Modify Liability
        </Text>
        
        <Text style={{
          marginTop: 40,
          fontSize: 15,
          fontFamily: 'helvetica-neue',
        }}>
          Liability Class
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
                  { label: 'Loans', value: 'loans' },
                  { label: 'Credit Card Debt', value: 'credit-card' },
                  { label: 'Mortgage', value: 'mortgage' },
                  { label: 'School Loans', value: 'school' },
                  { label: 'Other', value: 'other' },
              ]} >
            <Text
              style={{
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop:40,
      }}>
          <Button 
            style={{
              width: '100%',
              height: '100%',
            }} 
            title="Add to Liabilities" 
            color="red"
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
            title="Subtract from Liabilities"
            color="green"
            onPress={()=>{
              props.onModify(typeVal, amountVal, false);
              updateAmount(0);
              updateType('');
            }} />
      </View>
   </Modal>
  );
}

export default LiabilityInput;