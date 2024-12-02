#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppsonairReactNativeAppsync, NSObject)

// RCT_EXTERN_METHOD(sync)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
