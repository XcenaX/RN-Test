import React from 'react';
import { createAppContainer, createSwitchNavigator ,createMaterialTopTabNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(MainTabNavigator);
