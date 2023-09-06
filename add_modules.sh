#!/bin/sh

# extra packages usually added to a new project can be added here

# react-native-screens react-native-safe-area-context required by @react-navigation/native
# react-native-gesture-handler required by @react-navigation/stack

yarn add styled-components react-native-svg \
  react-native-screens react-native-safe-area-context react-native-gesture-handler \
  @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack \
  @react-native-async-storage/async-storage

yarn add -D @types/styled-components @types/styled-components-react-native \
  @svgr/cli


# Good extras to include in projects
# yarn add moment-timezone
# yarn add -D @types/moment
