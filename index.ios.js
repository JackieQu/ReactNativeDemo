/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  	AppRegistry,
  	StyleSheet,
  	Text,
	View,
	Image,
} from 'react-native';

import MainNavigator from './ios_pages/MainNavigator'

export class Demo extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  	selectedTab:'电影'
		}
	}

  	render() {
		// let img = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
		return (
	  		<View style={styles.container}>
				{/* <Image source={{uri: img}} style={{width: 200, height: 110}}/> */}
				<Text style={styles.welcome}>
		  			Welcome to React Native!
				</Text>
				<Text style={styles.instructions}>
					To get started, edit index.ios.js
				</Text>
				<Text style={styles.instructions}>
		  			Press Cmd+R to reload,{'\n'}
		  			Cmd+D or shake for dev menu
				</Text>
	  		</View>
		);
  	}
}

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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
})

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true;

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);