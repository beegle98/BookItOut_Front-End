/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MainNavigator from './src/Navigations/MainNavigator.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainNavigator);
