import * as Updates from 'expo-updates';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const config = {
  apiUrl: 'https://api.lingolink.app/api/v1',
  environment: Updates.channel || 'development',
  release: `${Application.applicationName}@${Application.nativeApplicationVersion}` || '0.0.0',
  sentry: {
    dsn: 'https://c663726c368ae0c1f2081c10991dfe7e@o4506263491641344.ingest.us.sentry.io/4507848347287552',
    debug: true,
    authToken: process.env.SENTRY_AUTH_TOKEN || '',
  },
};

if (Updates.channel === 'production') {
  config.sentry.debug = false;
} else if (Updates.channel === 'preview') {
  config.sentry.debug = false;
}

export function getDeviceInfo() {
  return {
    appName: Application.applicationName,
    appVersion: Application.nativeApplicationVersion,
    deviceName: Device.deviceName,
    deviceType: Device.deviceType,
    osName: Device.osName,
    osVersion: Device.osVersion,
  };
}
