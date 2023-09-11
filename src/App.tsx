
import React, { useEffect, useState } from 'react';

import {
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  GestureResponderEvent,
} from 'react-native';
import { bmpCreate, bmpBase64, bmpFill, bmpSetPixel } from './bitmap';
import { mcdlogo, myimage } from './constants';

// const staticBmpImage = require("./src/image.bmp");

const IMAGE_SIZE = 300;
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const bmpImage = bmpCreate(16, IMAGE_SIZE, IMAGE_SIZE);
var oldImage = '';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [b64png, setB64png] = useState('');
  var timer: unknown = null;
  var ranOnce = false;

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });

  useEffect(() => {
    if (!ranOnce) {
      ranOnce = true;
      bmpFill(bmpImage, 0x00);
      for (let x = 5; x < IMAGE_SIZE >> 1; x++) bmpSetPixel(bmpImage, x, x, 0x0f0f0f)
      setB64png(`data:image/bmp;base64,${bmpBase64(bmpImage)}`);
      // setB64png(`data:image/bmp;base64,${myimage}`);
      // setB64png(mcdlogo.replaceAll('\n', ''))

      if (timer !== null) clearTimeout(timer);
      timer = setInterval(() => {
        const newImage = bmpBase64(bmpImage);
        if (newImage !== oldImage) setB64png(`data:image/bmp;base64,${newImage}`);
        oldImage = newImage;
      }, 500)
    }
  }, []);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#000222' : '#f3f3f3'
  };

  console.log(`Screen size ${dimensions.window.width} x ${dimensions.window.height}`);

  const onMoveEvent = (evt: GestureResponderEvent) => {
    const nevt = evt.nativeEvent
    const xPos = Math.floor(nevt.locationX)
    const yPos = Math.floor(IMAGE_SIZE - nevt.locationY)
    console.log(`${xPos} x ${yPos}`);

    bmpSetPixel(bmpImage, xPos, yPos, 0x0f0f0f);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, backgroundColor: 'black' }} onMoveShouldSetResponder={(evt) => true} onResponderMove={onMoveEvent}>
        {b64png && <Image source={{ uri: b64png, width: IMAGE_SIZE, height: IMAGE_SIZE }} />}
      </View>
    </SafeAreaView>
  );
}

export default App;
