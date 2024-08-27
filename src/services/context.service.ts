import * as Updates from 'expo-updates';
import * as Application from 'expo-application';


export const config = {
  apiUrl: 'https://localhost:3333',
  environment: Updates.channel || 'development',
  release: `${Application.applicationName}@${Application.nativeApplicationVersion}` || '0.0.0',
  sentry: {
    dsn: 'https://c663726c368ae0c1f2081c10991dfe7e@o4506263491641344.ingest.us.sentry.io/4507848347287552',
    debug: true,
    authToken: process.env.SENTRY_AUTH_TOKEN || '',
  },
};

if (Updates.channel === 'production') {
  config.apiUrl = 'https://api.lingolink.app';
  config.sentry.debug = false;
} else if (Updates.channel === 'preview') {
  config.apiUrl = 'https://api.lingolink.app';
  config.sentry.debug = false;
}
