/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "TestViewController.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ReactNativeDemo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  //  设置 UINavigationController 为 rootVC
  self.nav = [[UINavigationController alloc] initWithRootViewController:rootViewController];
  rootViewController.view = rootView;
  self.window.rootViewController = self.nav;
  [self.window makeKeyAndVisible];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(testNotification:) name:@"openTestVC" object:nil];
  
  return YES;
}

-(void)testNotification:(NSNotification *)notification {
  
  NSLog(@"成功收到通知：%@", notification);
  
  TestViewController * testVC = [[TestViewController alloc] init];
  testVC.dict = notification.object;
  [self.nav pushViewController:testVC animated:YES];
  //  注意不能在这里移除通知否则 push 进去后又 pop 将失效
}

@end
