
import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createExample, createGrayscaleBMP } from './bitmap';


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [b64png, setB64png] = useState('')

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
    const imageData = createExample();
    // const b64image = createGrayscaleBMP(dimensions.window.width, dimensions.window.height, imageData);
    const b64image = createGrayscaleBMP(200, 100, imageData);
    setB64png(b64image);
    // setB64png('iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==');
    // setB64png('');
  }, []);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#000222' : '#f3f3f3'
  };

  console.log(`Screen size ${dimensions.window.width} x ${dimensions.window.height}`);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}> */}
      <View style={{ width: 200, height: 100, borderWidth: 2, borderColor: 'black' }}>
        <Image source={{ uri: `data:image/bmp;base64,${b64png}` }}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default App;
