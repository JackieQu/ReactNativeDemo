import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions,
  	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';

const kOneMinute = 60000;       // 1000       * 60
const kOneHour   = 3600000;     // kOneMinute * 60
const kOneDay    = 86400000;    // kOneHour   * 24
const kOneMonth  = 2592000000;	// kOneDay    * 30

const kArticleTypePlain   = 0;	// 普通
const kArticleTypeImage   = 1;  // 组图
const kArticleTypeVideo   = 2;	// 视频
const kArticleTypeSpecial = 3;  // 专题
const kArticleTypeLink 	  = 4;	// 链接
const kArticleTypeLive    = 6;	// 直播

export default class Index extends Component {

	constructor(props) {
        super(props);
		this.state = {
			isLoading: true
		}
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		var url = 'http://xy6.gzcankao.com:8081/app_if/getArticles?columnId=74&page=0&lastFileId=0&adv=1&version=0';
		fetch(url,{
				// method: 'POST',
				// headers: {
				// 	'Accept': 'application/json',
				// 	'Content-Type': 'application/json',
				// 	'Authorization': 'Token ' + this.state.token
				// },
				// body: JSON.stringify({
				// 	columnId: 74
				// })
			})
			.then((response) => {
				if (response.ok) {
					return response.json();	
				} else {
					return null;
				}
			})
			.then((responseJson) => {
				if (responseJson == null) {
					alert('请求失败')
					return;
				}
				// console.log(responseJson);
				var dataList = responseJson['list'];
				if (dataList) {
					for (let i = 0; i < dataList.length; i++) {
						dataList[i].colName = this.getSourseName(dataList[i].colName);
						dataList[i].publishtime = this.getTimeInterval(dataList[i].publishtime);
					}
				}
			
				this.setState({
			  		isLoading: false,
			  		dataSource: responseJson['list'],
				});
			})
			.catch((error) =>{
				this.setState({isLoading: false});
				console.log(error);
			}
		);
	}

	reloadData() {
		if (this.state.isLoading) return;

		this.setState({isLoading: true});
		this.loadData();
	}

	getSourseName(name) {
		if (!name) return '';
		components = name.split('~');
		if (components.length !== 2) return '';
		return components[1];
	}

	getStandardDate(time) {
		var components = time.split('.')[0].split(' ')
        var y = components[0].split('-')[0];
        var M = components[0].split('-')[1] - 1;
        var d = components[0].split('-')[2];
        var H = components[1].split(':')[0];
        var m = components[1].split(':')[1];
		var s = components[1].split(':')[2];

		return new Date(y, M, d, H, m, s);
	}

	getTimeInterval(time) {
		// var timeInterval = Date.parse(new Date()) - Date.parse(new Date(time)); // 时区问题，非 debug 模式下 NaN
		var timeInterval = Date.parse(new Date()) - this.getStandardDate(time);

		if (timeInterval < 0) {
			return '未知时间';
		} else if (timeInterval <= kOneMinute) {
			return '刚刚';
		} else if (timeInterval <= kOneHour) {
			return String(Math.floor(timeInterval / kOneMinute)) + '分钟前';
		} else if (timeInterval <= kOneDay) {
			return String(Math.floor(timeInterval / kOneHour)) + '分钟前';
		} else if (timeInterval <= kOneMonth) {
			return String(Math.floor(timeInterval / kOneDay)) + '天前';
		} else {
			return time.split('.')[0].split(' ')[0];
		}
	}

	hudView() {
		return (
            <View style={styles.hudView}>
                <ActivityIndicator color='white' size='large' />
                <Text style={{marginTop: 20, color: 'white'}}>请稍候...</Text>
            </View>
		)
	}

	// 底部信息，角标、来源、时间
	bottomInfoView = (article) => {
		return (
			<View style={styles.bottomInfoView}>
				{article.mark ? (
					<View style={[styles.bottomInfoLabel, styles.markLabel]}>
						<Text style={{color: 'white'}}>{article.mark}</Text> 
					</View>
				) : (null)}
				{article.colName ? (
					<View style={[styles.bottomInfoLabel, styles.colLabel, {marginLeft: article.mark ? kMargin : 0}]}>
						<Text style={{color: 'gray'}}>{article.colName}</Text> 
					</View> 
				) : (null)}
				{article.publishtime ? (
					<View style={[styles.bottomInfoLabel, styles.timeLabel, {marginLeft: article.colName ? kMargin : 0}]}>
						<Text style={{color: 'white'}}>{article.publishtime}</Text> 
					</View>
				) : (null)}
			</View>
		)
	}
	
	// 无图稿件
	articleNoImageView = (article, index) => {
		return (
			<TouchableOpacity style={styles.itemView} key={index}>
				<View style={{flex: 1}}>
					<Text style={styles.titleText} numberOfLines={2}>{article.title}</Text>				
					{this.bottomInfoView(article)}
				</View>
			</TouchableOpacity>
		)
	}

	// 组图稿件
	articleGroupImageView = (article, index) => {
		var imgList = [];
		var img = 'https://cn.bing.com/th?id=OHR.LeatherbackTT_ZH-CN5495532728_1920x1080.jpg&rf=LaDigue_192x108.jpg&pid=hp';
		var imgW = (kScreenWidth - kMargin * 4) / 3;
		var imgH = imgW * 9 / 16;
		for (let i = 0; i < 3; i++) {
			imgList.push(
				<Image key={i} source={{uri: img}} style={{marginLeft: i === 0 ? 0 : kMargin, width: imgW, height: imgH, backgroundColor: 'lightgray'}}/>
			)
		}
		return (
			<TouchableOpacity style={styles.itemView} key={index}>
				<View style={{flex: 1, minHeight: 130}}>
					<Text style={styles.titleText} numberOfLines={1}>{article.title}</Text>				
					<View style={{flex:1, marginTop: kMargin, flexDirection: 'row'}}>
						{ imgList.map((elem, index) => {
							return elem;
						}) }
					</View>
					{this.bottomInfoView(article)}
				</View>
			</TouchableOpacity>
		)
	}

	// 普通稿件
	articlePlainView = (article, index) => {
		return (			
			<TouchableOpacity style={[styles.itemView, {flexDirection: 'row'}]} key={index} onPress={this.itemClickAction.bind(this, article)}>
				<View style={{flex: 1, margin: 0}}>
					<Text style={[styles.titleText, styles.plainTitle]} numberOfLines={2}>{article.title}</Text>
					{this.bottomInfoView(article)}
				</View>
				<Image style={styles.plainImage} source={{uri: article.picBig}}/>
			</TouchableOpacity>
		)
	}
	
	itemClickAction = (article) => {
		alert(article.title);
	}

	itemView = (item) => {
		var article = item.item;
		var index = item.index;

		// 判断稿件类型
		var isNoImage, isGroupImage, isPlain = false;
		if (index === 6 || index === 16) { // 组图稿件测试
			isGroupImage = true;
		} else if (!article.picBig || article.picBig === '') {
			isNoImage = true;
		} else if (article.articleType === kArticleTypeImage) {
			isGroupImage = true;
		} else if (article.articleType === kArticleTypePlain || article.articleType === kArticleTypeLink || article.articleType === kArticleTypeLive) {
			isPlain = true;
		} 
		return (
			isNoImage ? (
				this.articleNoImageView(article, index)
			) : (isGroupImage ? (
				this.articleGroupImageView(article, index)
			) : (isPlain ? (
				this.articlePlainView(article, index)
			) : null
			))
		)
	}

  	render() {
		return(
			<View style = {{flex: 1}}>
			  	<FlatList
				  	style = {styles.listView}
					data = {this.state.dataSource}
					renderItem = {this.itemView}
					keyExtractor = {(item, index) => item.fileId}
					refreshControl = {
						<RefreshControl
						  	refreshing={this.state.isLoading}
						  	onRefresh={this.reloadData.bind(this)}
						/>
					}
			  	/>
				{this.state.isLoading ? this.hudView() : null}
			</View>
		);
  	}
}

const kScreenWidth = Dimensions.get('window').width;
const kScreenHeight = Dimensions.get('window').height;
const kStatusBarHeight = 20;
const kNavigatorHeight = 44;
const kNavAndStatusBarHeight = kStatusBarHeight + kNavigatorHeight;
const kTabBarHeight = 49;
const kMargin = 10;

const styles = StyleSheet.create({
	hudView: {
		position: 'absolute',
		width: kScreenWidth / 3,
		height: kScreenWidth / 3,
		left: kScreenWidth / 2 - kScreenWidth / 3 / 2,
		top: (kScreenHeight - kTabBarHeight) / 2 - kScreenWidth / 3 / 2,
		borderRadius: kScreenWidth / 3 / 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	listView: {
		flex: 1,
		marginTop: kNavAndStatusBarHeight,
		// marginBottom: kTabBarHeight,
		backgroundColor: 'white'
	},
	itemView: {
		flex: 1, 
		margin: kMargin, 
		minHeight: 80,
		paddingBottom: kMargin, 
		borderBottomWidth: 1, 
		borderBottomColor: 'lightgray'
	},
	titleText: {
		width: kScreenWidth - kMargin * 2, 
		fontSize: 15,
	},
	plainTitle: {
		width: kScreenWidth - kMargin * 3 - 160
	},
	plainImage: {
		width: 160, 
		height: 160 * 9 / 16, 
		margin: 0, 
		backgroundColor: 'lightgray'
	},
	bottomInfoView: {
		position: 'absolute', 
		flex: 1, 
		flexDirection: 'row',
		left: 0, 
		bottom: 0
	},
	bottomInfoLabel: {		
		justifyContent: 'center',
		alignItems: 'center', 
		padding: 2, 
		borderRadius: 4, 
		backgroundColor: 'white',
	},
	markLabel: {
		backgroundColor: 'red'
	},
	colLabel: {	
	},
	timeLabel: {
		backgroundColor: 'lightgray'
	},
});