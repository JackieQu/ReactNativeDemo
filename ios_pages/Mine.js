import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions,
  	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';

import { 
	NativeModules, 
	NativeAppEventEmitter,
} from 'react-native';

var RNHelper = NativeModules.RNHelper;

import LifeCycle from './LifeCycle';

export default class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
    }
    
	nextPage() {
        const { navigator } = this.props;
		// <Component {...route.params} navigator={navigator} />
		// 这里传递了 navigator 作为 props
		if (navigator) {
			navigator.push({
				name: 'LifeCycle',
				component: LifeCycle,
			})
		}
	}

	componentWillMount() {
		this.listenShareFinish = NativeAppEventEmitter.addListener('shareFinish', function(param) {
			if (param.message) {
				alert(param.message);
			}
		});
	}

	componentWillUnmount() {
		this.listenShareFinish.remove();
	}

	componentDidMount() {
        this.setState({
            dataSource: [
                {title: 'RN生命周期'},
                {title: '跳转OC界面'},
                {title: '调用OC方法'},
                {title: '监听OC事件'},
                {title: '获取OC回调'},
            ]
        })
	}
	
	itemClickAction = (index) => {
        switch (index) {
            case 0:
                this.nextPage();
                break;
            case 1:
                var dict = {'title': '这是RN的标题'};
                RNHelper.openTestVC(dict);
                break;
            case 2:
                RNHelper.test();
                break;
            case 3:
                var shareDate = {'title': '分享标题', 'content': '分享内容'};
		        RNHelper.shareAction(shareDate);
                break;
            case 4:
                RNHelper.getVersionInfo((callback, error) => {
                    if (callback) {
                        alert(callback);
                    }
                });
                break;
            default:
                break;
        }
	}

	itemView = (item) => {
        var rowItem = item.item;
        var index = item.index;
        
        var isLast = index === this.state.dataSource.length - 1;
        
		return (
            <TouchableOpacity key = {index} onPress={this.itemClickAction.bind(this, index)} style={{backgroundColor: 'white', padding: kMargin, borderBottomWidth: isLast ? 0 : 1, borderBottomColor: 'gray', flex: 1, justifyContent: 'center', alignItems: 'flex-start', minHeight: 60}}>
                <Text>{rowItem.title}</Text>
            </TouchableOpacity>
		)
    }
    
    headerView = () => {
        var img = 'https://cn.bing.com/th?id=OHR.LeatherbackTT_ZH-CN5495532728_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
        return (
            <Image source={{uri: img}} style={{width: kScreenWidth, height: kScreenWidth * 9 / 16, backgroundColor: 'lightgray'}}/>
        )
    }

  	render() {
		return(
			<View style = {{flex: 1}}>
			  	<FlatList
				  	style = {styles.listView}
                    data = {this.state.dataSource}
                    ListHeaderComponent = {this.headerView}
					renderItem = {this.itemView}
					keyExtractor = {(item, index) => index}
			  	/>
			</View>
		);
  	}
}

const kScreenWidth = Dimensions.get('window').width;
const kScreenHeight = Dimensions.get('window').height;
const kStatusBarHeight = 44;
const kNavigatorHeight = 44;
const kNavAndStatusBarHeight = kStatusBarHeight + kNavigatorHeight;
const kTabBarHeight = 83;
const kMargin = 10;

const styles = StyleSheet.create({
	listView: {
		flex: 1,
		marginTop: kNavAndStatusBarHeight,
		backgroundColor: 'lightgray'
	},
});