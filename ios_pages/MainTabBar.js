import React, { Component } from 'react';
import {
  	AppRegistry,
  	StyleSheet,
  	Text,
	View,
	Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import News from './News';
import Mine from './Mine';

export default class TabBar extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
		  	selectedTab:'新闻'
		}
	}

	tabBarItem = (selectedTab, icon, selectedIcon, Component) => {
		const { navigator } = this.props;
		return (
		  	<TabNavigator.Item
				selected={this.state.selectedTab === selectedTab}  
				title={selectedTab} 
				titleStyle={styles.tabText}  
				selectedTitleStyle={styles.selectedTabText}  
				renderIcon={() => <Image style={styles.icon} source={icon}/>}  
				renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon}/>}  
				onPress={() => this.setState({ selectedTab: selectedTab })}
		  	>
			  	<Component navigator={navigator}/>
		  	</TabNavigator.Item>
		)
	}

	render() {
		return (
			<TabNavigator style={{flex: 1, marginBottom: 39}}>   
				{this.tabBarItem('新闻', require('../images/tab_home.png'), require('../images/tab_home_s.png'), News)}
				{this.tabBarItem('我的', require('../images/tab_mine.png'), require('../images/tab_mine_s.png'), Mine)}
			</TabNavigator> 
		);
	}
} 

const styles = StyleSheet.create({
	tabText: {
	  	color: 'lightgray',
	  	fontSize: 10
	},
	selectedTabText: {
	  	color: 'gray'
	},
	icon: {
	  	width: 20,
	  	height: 20
	}
})