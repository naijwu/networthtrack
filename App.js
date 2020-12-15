import React, { useState, useEffect } from 'react';
import Main from './Main';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = () => { 
    return Font.loadAsync({
        'helvetica-neue-bold': require('./assets/fonts/helvi-bold.ttf'),
        'helvetica-neue': require('./assets/fonts/helvi-med.ttf'),
        'cera-pro-bold': require('./assets/fonts/CeraProBold.otf'),
      })
  }

  if (!fontLoaded) {
    return(
      <AppLoading
        startAsync={loadFonts}
        onFinish={()=>setFontLoaded(true)}
        onError={(err)=>console.log(err)} />
    );
  }

  return <Main/>;
}
