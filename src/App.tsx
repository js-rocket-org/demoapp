
import React, { useEffect, useState } from 'react';

import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createExample, createGrayscaleBMP } from './bitmap';

// const staticBmpImage = require("./src/image.bmp");


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const mcdlogo= `Qk3CNQAAAAAAAHoAAABsAAAAPgAAAMn///8BACAAAwAAAEg1
AAATCwAAEwsAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAA/yBu
aVcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAHAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HBNz/Bwrd/wcJ3P8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/Bwnc/wcK
3f8HBNz/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HBNv/BFnq/wKD
8v8AzP//Abz8/wRl7f8EXuv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BF7r/wRh7P8Buvz/AMz//wKE
8v8EWuv/Bw7d/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BhDe/wG2+/8Ay///AM3//wDN
//8Azf//AM3//wDN//8DfPH/Bwjc/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/Bwbc/wN28P8Azf//AM3//wDN//8Azf//AM3//wDM
//8BuPv/BhDe/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wYq4v8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8Ay/7/BS7j/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wUu
4/8Ay/7/AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//Biri/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8GJeH/Abn8/wDN//8Azf//AM3//wDD/f8EV+r/BFXq/wDN
//8Azf//AM3//wDN//8CnPb/Bwnc/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HB9z/Apv2/wDN
//8Azf//AM3//wDN//8EVer/BFLp/wC9/P8Azf//AM3//wDN
//8Bufz/BiXh/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wKS
9f8Azf//AM3//wDN//8BtPr/BwHb/wcB2/8HAdv/A2ru/wDN
//8Azf//AM3//wDN//8EU+n/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wRT6f8Azf//AM3//wDN
//8Azf//A2ru/wcB2/8HAdv/BwHb/wGz+v8Azf//AM3//wDN
//8Bw/3/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8EXuv/AM3//wDN
//8Azf//AM3//wYS3v8HAdv/BwHb/wcB2/8HAdv/BF7r/wDN
//8Azf//AM3//wDN//8EVur/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8EVur/AM3//wDN//8Azf//AM3//wRe
6/8HAdv/BwHb/wcB2/8HAdv/BhLe/wDN//8Azf//AM3//wDN
//8EXuv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wGp+f8Azf//AM3//wDN
//8Dau3/BwHb/wcB2/8HAdv/BwHb/wcB2/8HBNz/AM3//wDN
//8Azf//AM3//wG1+/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wG1+/8Azf//AM3//wDN//8Azf//BwTc/wcB
2/8HAdv/BwHb/wcB2/8HAdv/A2rt/wDN//8Azf//AM3//wGw
+v8HEN3/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8EVur/AM3//wDN//8Azf//AMb+/wU/
5v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8EWev/AM3//wDN
//8Azf//AM3//wRh7P8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8EYez/AM3//wDN//8Azf//AM3//wRZ6/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8FP+b/AMb+/wDN//8Azf//AM3//wNy
7/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wG3+/8Azf//AM3//wDN//8BvPz/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYY3/8Bt/v/AM3//wDN
//8Azf//Abj7/wcJ3P8HAdv/BwHb/wcB2/8HAdv/Bwnc/wG4
+/8Azf//AM3//wDN//8Btfv/BhLe/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8BvPz/AM3//wDN//8Azf//AMX+/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8FMOP/AM3//wDN//8Azf//AM3//wKS9f8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wGw+v8Azf//AM3//wDN
//8Azf//BTfk/wcB2/8HAdv/BwHb/wcB2/8FN+T/AM3//wDN
//8Azf//AM3//wGw+v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wKK8/8Azf//AM3//wDN//8Azf//BT7m/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDK
/v8Azf//AM3//wDN//8Azf//BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BUHm/wDN//8Azf//AM3//wDN
//8Azf//BwHb/wcB2/8HAdv/BwHb/wDN//8Azf//AM3//wDN
//8Azf//BT/m/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wDN//8Azf//AM3//wDN//8Ayv7/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8Dde//AM3//wDN
//8Azf//AM3//wDF/v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/AM3//wDN//8Azf//AM3//wDN
//8GHOD/BwHb/wcB2/8GHOD/AM3//wDN//8Azf//AM3//wDN
//8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/AMX+/wDN//8Azf//AM3//wDN//8Dde//BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wN17/8Azf//AM3//wDN
//8Azf//BUjo/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8Ayf7/AM3//wDN//8Azf//AM3//wOB
8v8HAdv/BwHb/wOB8v8Azf//AM3//wDN//8Azf//AL/9/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8FRuf/AM3//wDN//8Azf//AM3//wN38P8HAtv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8GG+D/AMT9/wDN//8Azf//AM3//wDN
//8FRuf/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wVH5/8Azf//AM3//wDN//8Azf//Abj7/wYg
4P8GIOD/Abj7/wDN//8Azf//AM3//wDN//8FRef/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wVG
5/8Azf//AM3//wDN//8Azf//AMX9/wYc4P8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wYe4P8Azf//AM3//wDN//8Azf//AL/9/wUz
5P8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BTnl/wDN//8Azf//AM3//wDN//8Azf//Bizj/wYs
4/8Azf//AM3//wDN//8Azf//AM3//wU55f8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BTDj/wG9
/P8Azf//AM3//wDN//8Azf//Bh/g/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/Ap/3/wDN//8Azf//AM3//wDN//8Cnff/BwPb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8FOeX/AM3//wDN//8Azf//AM3//wDN//8Dbu7/A3Hv/wDN
//8Azf//AM3//wDN//8AzP//BTjl/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/Apz2/wDN
//8Azf//AM3//wDN//8CoPf/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8Azf//AM3//wDN//8Azf//AM3//wKc9v8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcC
2/8CkPT/AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wKP9P8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8CnPb/AM3//wDN
//8Azf//AM3//wDN//8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BTjl/wDN
//8Azf//AM3//wDN//8Azf//Apz2/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wKP
9P8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//Ao/0/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wKc9v8Azf//AM3//wDN
//8Azf//AM3//wRT6v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8ClfX/AM3//wDN
//8Azf//AM3//wDN//8EWOr/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/Ao/0/wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Cj/T/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/Bwrd/wDN//8Azf//AM3//wDN
//8Azf//ApX1/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wKV9f8Azf//AM3//wDN
//8Azf//AM3//wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8DgfH/AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wNv
7v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/AM3//wDN//8Azf//AM3//wDN
//8ClfX/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8GGd//Aav5/wDN//8Azf//AM3//wDN
//8Azf//BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYU3v8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//Bwzd/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8Azf//AM3//wDN//8Azf//AM3//wDD
/f8FNOT/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wU/5v8Azf//AM3//wDN//8Azf//AM3//wDN
//8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wDN//8Azf//AM3//wDN//8Azf//AM3//wU/
5v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BT/m/wDN//8Azf//AM3//wDN//8Azf//AM3//wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/Aqb4/wDN//8Azf//AM3//wDN//8Azf//BT/m/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8FSej/AM3//wDN//8Azf//AM3//wDN//8FQeb/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8GJeH/AM3//wDN//8Azf//AM3//wDN//8EVOr/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDC
/f8Azf//AM3//wDN//8Azf//AM3//wYl4f8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wGu+f8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYl
4f8Azf//AM3//wDN//8Azf//AM3//wDN//8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/AM3//wDN
//8Azf//AM3//wDN//8Azf//BiXh/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BUjn/wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8Azf//BiPh/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BiXh/wDN
//8Azf//AM3//wDN//8Azf//AM3//wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8Azf//AM3//wDN
//8Azf//AM3//wDN//8GJeH/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8GGN//AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wDN
//8GGN//BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8GJeH/AM3//wDN
//8Azf//AM3//wDN//8Azf//BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDN//8Azf//AM3//wDN
//8Azf//AM3//wYl4f8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYY
3/8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wYY
3/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYl4f8Azf//AM3//wDN
//8Azf//AM3//wDN//8FOuX/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8CpPj/AM3//wDN//8Azf//AM3//wDN
//8Azf//BiXh/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/Bhjf/wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8Azf//Bhjf/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BiHh/wDF/v8Azf//AM3//wDN
//8Azf//AM3//wG2+/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wG2+/8Azf//AM3//wDN//8Azf//AM3//wGr
+f8GFt//BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8GGN//AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8GGN//BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HB9z/Aonz/wDN//8Azf//AM3//wDN
//8Azf//Abb7/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/Abb7/wDN//8Azf//AM3//wDN//8Azf//A3vx/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wYY3/8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wYY3/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8De/H/AM3//wDN//8Azf//AM3//wDN
//8Btvv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8Btvv/AM3//wDN//8Azf//AM3//wDN//8De/H/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/Bhjf/wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//Bhjf/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wN78f8Azf//AM3//wDN//8Azf//AM3//wG2
+/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wG2
+/8Azf//AM3//wDN//8Azf//AM3//wN78f8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8GGN//AM3//wDN//8Azf//AM3//wDN
//8Azf//AM3//wGw+v8GEd7/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/A3vx/wDN//8Azf//AM3//wDN//8Azf//Abb7/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8GJ+H/Ab/8/wDN
//8Azf//AM3//wDN//8Azf//A3vx/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcL3f8Cl/X/AM3//wDN//8Azf//AM3//wDN
//8Azf//A3Pv/wcC2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8De/H/AM3//wDN//8Azf//AM3//wDN//8Ayv7/BFLp/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wRe6/8AzP//AM3//wDN
//8Azf//AM3//wDN//8De/H/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwLb/wNw7/8Azf//AM3//wDN//8Azf//AM3//wDN
//8Dbe7/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wN7
8f8Azf//AM3//wDN//8Azf//AM3//wDN//8EYez/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BGHs/wDN//8Azf//AM3//wDN
//8Azf//AM3//wN78f8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/A23u/wDN//8Azf//AM3//wDN//8Azf//AM3//wNt
7v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/A3vx/wDN
//8Azf//AM3//wDN//8Azf//AM3//wRh7P8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8EYez/AM3//wDN//8Azf//AM3//wDN
//8Azf//A3vx/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8Dbe7/AM3//wDN//8Azf//AM3//wDN//8Azf//A23u/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8De/H/AM3//wDN
//8Azf//AM3//wDN//8Azf//BGHs/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wRh7P8Azf//AM3//wDN//8Azf//AM3//wDN
//8De/H/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wNt
7v8Azf//AM3//wDN//8Azf//AM3//wDN//8Dbe7/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wN78f8Azf//AM3//wDN
//8Azf//AM3//wDN//8EYez/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BGHs/wDN//8Azf//AM3//wDN//8Azf//AM3//wN7
8f8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/A23u/wDN
//8Azf//AM3//wDN//8Azf//AM3//wNt7v8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/A3vx/wDN//8Azf//AM3//wDN
//8Azf//AM3//wRh7P8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8EYez/AM3//wDN//8Azf//AM3//wDN//8Azf//A3vx/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8Dbe7/AM3//wDN
//8Azf//AM3//wDN//8Azf//A23u/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8EWOr/AM3//wDN//8Azf//AM3//wDN
//8Azf//BGHs/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wRh
7P8Azf//AM3//wDN//8Azf//AM3//wDN//8DdvD/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wNt7v8Azf//AM3//wDN
//8Azf//AM3//wDN//8Dbe7/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcZ3/8Azf//AM3//wDN//8Azf//AM3//wDN
//8EYez/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BGHs/wDN
//8Azf//AM3//wDN//8Azf//AM3//wVD5/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/A23u/wDN//8Azf//AM3//wDN
//8Azf//AM3//wNt7v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/Bwbc/wDN//8Azf//AM3//wDN//8Azf//AM3//wNt
7v8HAtv/BwHb/wcB2/8HAdv/BwHb/wcB2/8EYez/AM3//wDN
//8Azf//AM3//wDN//8Azf//Bg3d/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8Dbe7/AM3//wDN//8Azf//AM3//wDN
//8Azf//A23u/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/AM3//wDN//8Azf//AM3//wDN//8Azf//Aa35/wcI
3P8HAdv/BwHb/wcB2/8HAdv/BwTc/wKI8/8Azf//AM3//wDN
//8Azf//AM3//wDN//8HCNz/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wNt7v8Azf//AM3//wDN//8Azf//AM3//wDN
//8Dbe7/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8Azf//AM3//wDN//8Azf//AM3//wDN//8AyP7/Bwrd/wcB
2/8HAdv/BwHb/wcB2/8HCdz/Ab78/wDN//8Azf//AM3//wDN
//8Azf//AM3//wcD2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/A23u/wDN//8Azf//AM3//wDN//8Azf//AM3//wNt
7v8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDN
//8Azf//AM3//wDN//8Azf//AM3//wDN//8HC93/BwHb/wcB
2/8HAdv/BwHb/wcK3f8AyP7/AM3//wDN//8Azf//AM3//wDN
//8Azf//BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8ET+n/ApT1/wKU9f8ClPX/ApT1/wKU9f8ClPX/BE/p/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/AM3//wDN
//8Azf//AM3//wDN//8Azf//AM3//wcL3f8HAdv/BwHb/wcB
2/8HAdv/Bwrd/wDL/v8Azf//AM3//wDN//8Azf//AM3//wDN
//8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8Azf//AM3//wDN
//8Azf//AM3//wDN//8Azf//Bwvd/wcB2/8HAdv/BwHb/wcB
2/8HC93/AM3//wDN//8Azf//AM3//wDN//8Azf//AM3//wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wDN//8Azf//AM3//wDN
//8Azf//AM3//wDN//8HC93/BwHb/wcB2/8HAdv/BwHb/wcK
3f8Ayf7/AMn+/wDJ/v8Ayf7/AMn+/wDJ/v8Ayf7/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/AMv//wDL//8Ay///AMv//wDL
//8Ay///AMv//wcK3f8HAdv/BwHb/wcB2/8HAdv/BwHb/wcK
3f8HCt3/Bwrd/wcK3f8HCt3/Bwrd/wcK3f8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HCt3/Bwrd/wcK3f8HCt3/Bwrd/wcK
3f8HCt3/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB2/8HAdv/BwHb/wcB
2/8HAdv/BwHb/w==`

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
    // setB64png('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=');
    // setB64png('Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A');
    setB64png(mcdlogo.replaceAll('\n', ''))
  }, []);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#000222' : '#f3f3f3'
  };

  console.log(`Screen size ${dimensions.window.width} x ${dimensions.window.height}`);

  const onMoveEvent = (evt: unknown) => {
    const nevt = evt.nativeEvent
    console.log(`${nevt.locationX} x ${nevt.locationY}`);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}> */}

      <View style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'black', backgroundColor: 'green' }}
      onMoveShouldSetResponder={(evt) => true} onResponderMove={onMoveEvent}
      >
        <Image style={{ width: 200, height: 100, resizeMode: 'contain', backgroundColor: 'blue' }} source={{ uri: `data:image/bmp;base64,${b64png}`, width: 200, height: 100 }} />
        {/* <Image source={staticBmpImage}/> */}
      </View>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default App;
