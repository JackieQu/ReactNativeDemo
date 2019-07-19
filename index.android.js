/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
  	StyleSheet,
	View,
} from 'react-native';

import MainNavigator from './android_pages/MainNavigator'

export default class ReactNativeDemo extends React.Component {
	render() {
		return (
			<View style={{flex: 1}} >  
				<MainNavigator />
      		</View>  
		);
	}
} 

const styles = StyleSheet.create({
})

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);