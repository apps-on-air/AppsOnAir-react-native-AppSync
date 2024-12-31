#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppsonairReactNativeAppsync, NSObject)

RCT_EXTERN_METHOD(sync:(NSDictionary)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
