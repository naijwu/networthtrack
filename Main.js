import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import TodoItem from './components/TodoItem';
import AssetInput from './components/AssetInput';
import {firebase} from './config';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


const Main = () => {
    const[netWorth, updateNetWorth] = useState(0.00);
    const[list, updateList] = useState([]); // array of strings
    const [assetModal, toggleAssetModal] = useState(false); // initial value of modal is false (which equals close)
  
    useEffect(() => {
      const db = firebase.database();
      db.ref('/todolist').on('value', (snapshot) => {
        let todolist = [];
        snapshot.forEach((snap) => {
          todolist.push({
            key: snap.key,
            item: snap.val(),
          }); // grabbing the data from the database
        })
  
        updateList(todolist)
      })
      
    }, []); // only if this [data] is updated, then refresh
  
    const cancelAdd = () => {
        toggleAssetModal(false);
    };
  
    const addItemHandle = (passedItem, isAdd) => {
        // if isAdd == false, then attach a negative value

      var db = firebase.database();

      if(isAdd === true) {
        db.ref('/todolist').push({
          value: passedItem,
        }); // pushing this object to the database
      } else if (isAdd === false) {
          passedItem = -Math.abs(passedItem);
          db.ref('/todolist').push({
            value: passedItem,
          }); 
      }
  
  
      toggleAssetModal(false);
    }
  
    const removeItemHandle = (id) => {
  
      var db = firebase.database(); 
      db.ref('todolist/' + id).remove();
  
      // updateList((list) => {
      //   return list.filter((item) => item.id !== id)
      // })
    }
  
    /*
  
      fire base
      Firebase.database()
      db.ref('location') 
        .on() or .once() to receive
        .set() to update
        .push() to add
        .remove() to delete
  
    */



    const onSwipeUp = () => {
        console.log("swiped up");
    }
    
    const onSwipeDown = () => {
        console.log("swiped down");
    }
    
    const onSwipeLeft = () => {
        console.log("swiped left");

        // close other modals

        // open modal
        if(!assetModal) {
            toggleAssetModal(true);
        }
    }
    
    const onSwipeRight = () => {
        console.log("swiped right");

        // close other modals
        if(assetModal) {
            toggleAssetModal(false);
        }

        // open other modal
    }
    
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
  


    return ( 
        <GestureRecognizer
          // onSwipe={onSwipeUp}
          onSwipeUp={onSwipeUp}
          onSwipeDown={onSwipeDown}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={config}
          style={{
            flex: 1,
          }}>

            <View style={{
                flex:1,
                backgroundColor: '#fff',
                alignItems: 'center',
                padding: 30,
                width: '100%',
            }}>
                <View style={{
                    marginTop:100,
                }}>
                    <Text style={{
                            fontSize:14,
                            letterSpacing: 1,
                            fontFamily:'helvetica-neue-bold',
                            textAlign:'center',
                        }}>
                        NET WORTH
                    </Text>
                    <Text style={{
                            fontSize:60,
                            letterSpacing: 2,
                            fontFamily:"helvetica-neue-bold",
                        }}>
                        ${netWorth}
                    </Text>
                </View>
        
                <AssetInput visibility={assetModal} closeModal={cancelAdd} onAdd={addItemHandle} />
        
                <View style={{
                    
                }}>
                {
                    // list.map((item, i) => <Text key={i}>{item}</Text>)
                }
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={list}
                    renderItem={(itemData)=>(
                    <TodoItem 
                        id={itemData.item.key} 
                        title={itemData.item.item.value} 
                        onDelete={removeItemHandle} 
                        updateList={updateList}
                        />
                    )}
                    ></FlatList>
                </View>
                <StatusBar style="auto" />
            </View>
        </GestureRecognizer>

    );
}

export default Main;