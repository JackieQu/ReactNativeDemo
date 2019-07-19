import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
    AsyncStorage
} from 'react-native';

export default class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
            dataSource: [1,2,3,4,5],
            score: 0
        }
    }

	componentWillMount() {
        var that = this;
        AsyncStorage.getItem('score', function(err, result) {
            if (result) {
                that.setState({score: Number(result)})
            }
        });
        console.log('componentWillMount: 组件将要装载');
    }

    componentDidMount() {

        console.log('componentDidMount: 组件已经装载');
    }

    componentWillUpdate() {
        console.log('componentWillUpdate: 组件将要更新');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate: 组件已经更新');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount: 组件将要卸载');
    }

    itemClickAction = (score) => {
        this.setState({score: score});
        AsyncStorage.setItem('score', String(score));
    }

    itemView = (item) => {
        var score = item.item;
        var index = item.index;
        var isSelected = this.state.score >= score;
        var borderColor = isSelected ? 'red' : 'lightgray';
        return (
            <TouchableOpacity style={{flex:1}} key={index} onPress={this.itemClickAction.bind(this, score)}>
                <View style={[styles.star, {borderTopColor: borderColor}]}></View>
                <View style={[styles.star, {borderTopColor: borderColor}, styles.before]}></View>
                <View style={[styles.star, {borderTopColor: borderColor}, styles.after]}></View>
            </TouchableOpacity>
        )
    }

  	render() {
		return(
			<View style = {{flex: 1}}>
                <FlatList
                    style = {{flex: 1, paddingTop: 100}}
                    horizontal = {true}
					data = {this.state.dataSource}
					renderItem = {this.itemView}
					keyExtractor = {(item, index) => index}
			  	/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, backgroundColor: 'red'}}/>
                    <View style={{flex: 5, backgroundColor: 'white'}}/>
                    <View style={{flex: 40, backgroundColor: 'yellow'}}/>
                    <View style={{flex: 4, backgroundColor: 'green'}}/>
                    <View style={{flex: 5, backgroundColor: 'cyan'}}/>
                    <View style={{flex: 6, backgroundColor: 'blue'}}/>
                    <View style={{flex: 7, backgroundColor: 'purple'}}/>
                </View>
			</View>
		);
  	}
}

const styles = StyleSheet.create({
    star: {
        width: 0,
        height: 0,
        marginLeft: 15,
        marginTop: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderTopWidth: 16.67,
        // borderBottomWidth: 16.67,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'lightgray',
        // borderBottomColor: 'transparent'
    },
    before: {
        position: 'absolute', 
        top: 0, 
        transform: [{rotate:'72deg'}],
    },
    after: {
        position: 'absolute', 
        top: 0, 
        transform: [{rotate:'-72deg'}],
    }
});