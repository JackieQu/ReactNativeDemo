//
//  RNHelper.m
//  ReactNativeDemo
//
//  Created by JackieQu on 2019/7/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNHelper.h"

@implementation RNHelper

@synthesize bridge = _bridge;

// 可添加参数以指定 RN 访问 OC 的模块名，默认为类名
RCT_EXPORT_MODULE();

// 参数类型根据需要修改
RCT_EXPORT_METHOD(openTestVC:(NSDictionary *)dict){
  
  NSLog(@"RN 传入 OC 的数据为：%@", dict);
  
  // 这里需要使用主线程，否则可能会失效
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"openTestVC" object:dict];
  });
}

// test 为 RN 中调用的方法名
RCT_EXPORT_METHOD(test) {
  
  NSLog(@"\n**********\n这是 OC 的方法\n**********\n");
}

RCT_EXPORT_METHOD(shareAction:(NSDictionary *)shareData) {
  
  NSLog(@"这是RN的数据：%@", shareData);
  
  NSDictionary * dict = @{@"message": @"分享成功/失败"};
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"shareFinish" body:dict];
}

RCT_EXPORT_METHOD(getVersionInfo:(RCTResponseSenderBlock)callback) {
  
  NSDictionary * dict = [[NSBundle mainBundle] infoDictionary];
  
  NSString * versionStr = [dict objectForKey:@"CFBundleShortVersionString"];
  
  callback(@[versionStr, [NSNull null]]);
}

@end
