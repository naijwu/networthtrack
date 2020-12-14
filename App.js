import React, { useState, useEffect } from 'react';
import Main from './Main';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


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
