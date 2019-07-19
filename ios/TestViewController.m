//
//  TestViewController.m
//  ReactNativeDemo
//
//  Created by JackieQu on 2019/7/18.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TestViewController.h"

@interface TestViewController ()

@end

@implementation TestViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
    [self initUI];
}

- (void)initUI {
  
    self.view.backgroundColor = [UIColor whiteColor];
  
    self.title = [self.dict valueForKey:@"title"];
  
    UILabel * label = [[UILabel alloc] initWithFrame:CGRectMake(100, 200, 200, 40)];
    label.backgroundColor = [UIColor blueColor];
    label.text = @"这是 OC 的界面";
    label.textColor = [UIColor whiteColor];
    label.textAlignment = NSTextAlignmentCenter;
  
    [self.view addSubview:label];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
