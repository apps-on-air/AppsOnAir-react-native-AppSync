#import "AppsonairReactNativeAppsync.h"
#import "AppsonairReactNativeAppsync-Swift.h"

@implementation AppsonairReactNativeAppsync {
  AppsonairReactNativeAppsyncImpl *moduleImpl;
}

- (instancetype) init {
  self = [super init];
  if (self) {
    moduleImpl = [AppsonairReactNativeAppsyncImpl new];
  }
  return  self;
}

RCT_EXPORT_MODULE()

- (void) sync:(JS::NativeAppsonairReactNativeAppsync::SyncOptions &)options
     resolve:(RCTPromiseResolveBlock)resolve
      reject:(nonnull RCTPromiseRejectBlock)reject {

  NSDictionary *optionsDict = @{
    @"showNativeUI": @(options.showNativeUI())
  };
  
  [moduleImpl syncWithDirectory:optionsDict
  result:^(NSDictionary * _Nonnull result) {
    resolve(result);
  } rejecter:^(NSString * _Nonnull code, NSString * _Nonnull message) {
    NSError *error = [NSError errorWithDomain:@"AppsonairReactNativeAppsync"
                      code:0
                      userInfo:@{NSLocalizedDescriptionKey: message}];
    reject(code, message, error);
  }];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAppsonairReactNativeAppsyncSpecJSI>(params);
}

@end
