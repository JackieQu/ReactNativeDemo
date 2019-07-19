import React, { Component } from 'react';
import {
  	StyleSheet,
	View,
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
import TabBar from './MainTabBar'

export default class MainNavigator extends React.Component {

	render() {
		let defaultName = 'TabBar';
		let defaultComponent = TabBar;
		return ( 
			<Navigator
				initialRoute = {{name: defaultName, component: defaultComponent}}
				configureScene = {(route) => {
					return Navigator.SceneConfigs.FloatFromRight;
				}}
				renderScene = {(route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator = {navigator}/>
				}}
			/>
		);
	}
} 

const styles = StyleSheet.create({
})
