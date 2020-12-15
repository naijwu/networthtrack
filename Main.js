import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import AssetInput from './components/AssetInput';
import {firebase} from './config';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LiabilityInput from './components/LiabilityInput';
import BalanceChanges from './components/BalanceChanges';

const db = firebase.database();

const Main = () => {
    const[netWorth, updateNetWorth] = useState(0.00);
    const[response, updateResponse] = useState([]); // array of objects from database response

    const [assetModal, toggleAssetModal] = useState(false); // initial value of modal is false (which equals close)
    const [liabilityModal, toggleLiabilityModal] = useState(false); 
    const [balanceChangesModal, toggleBalanceChangesModal] = useState(false); 
  
    useEffect(() => {
      db.ref('/todolist').on('value', (snapshot) => {
        let res = [];
        snapshot.forEach((snap) => {
          res.push({
            key: snap.key,
            item: snap.val(),
          }); // grabbing the data from the database
        })
  
        updateWorth(res);
      })
       
    }, []); // only if this [data] is updated, then refresh


    const updateWorth = (res) => {
        updateResponse(res);

        let assets = [];
        let liabilities = []; // just for the future if we want to do anything more
        let nw = 0;

        res.forEach((el) => {
            if(el.item.side == "liability") {
                liabilities.push(el);
            }
            if(el.item.side == "asset") {
                assets.push(el);
            }
            nw += parseFloat(el.item.change);
        });

        nw = nw.toFixed(2);
        
        updateNetWorth(nw);
    }

  
    const cancelAsset = () => {
        toggleAssetModal(false);
    };
    const cancelLiability = () => {
        toggleLiabilityModal(false);
    };
  
    const modAssetHandle = (passedType, passedVal, isAdd) => {
        // if isAdd == false, then attach a negative value

      if (isAdd === false) {
        passedVal = -Math.abs(parseFloat(passedVal));
      }

      db.ref('/todolist').push({
        side: 'asset',
        class: passedType,
        change: passedVal,
        date: new Date().toDateString(),
      }); // pushing this object to the database
  
  
      toggleAssetModal(false);
    }

    // TODO: Combine top and bottom function -- pass the data thru the modal or find some other conditional variable or whateveaaaa
    const modLiabilityHandle = (passedType, passedVal, isAdd) => {
      if (isAdd === true) {
        passedVal = -Math.abs(parseFloat(passedVal));
      }

      db.ref('/todolist').push({
        side: 'liability',
        class: passedType,
        change: parseFloat(passedVal),
        date: new Date().toDateString(),
      }); 
  
      toggleLiabilityModal(false);
    }

  
    const removeItemHandle = (id) => {
  
      var db = firebase.database(); 
      db.ref('todolist/' + id).remove();
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
        if(!assetModal && !balanceChangesModal) {
            toggleBalanceChangesModal(true);
        }
    }
    
    const onSwipeDown = () => {
        if(balanceChangesModal) {
            toggleBalanceChangesModal(false);
        }
    }
    
    const onSwipeLeft = () => {
        if(liabilityModal) {
            toggleLiabilityModal(false);
        }

        if(!liabilityModal && !balanceChangesModal) {
            toggleAssetModal(true);
        }
    }
    
    const onSwipeRight = () => {
        if(assetModal) {
            toggleAssetModal(false);
        }

        if(!assetModal && !balanceChangesModal) {
            toggleLiabilityModal(true);
        }
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
        
                <AssetInput visibility={assetModal} closeModal={cancelAsset} onModify={modAssetHandle} />
                <LiabilityInput visibility={liabilityModal} closeModal={cancelLiability} onModify={modLiabilityHandle} />
        
                <BalanceChanges visibility={balanceChangesModal} data={response} onDelete={removeItemHandle} updateList={updateResponse} />
                
                <StatusBar style="auto" />
            </View>
        </GestureRecognizer>

    );
}

export default Main;