import * as Updates from 'expo-updates';

export const config = {
  apiUrl: 'https://localhost:3333',
  sentry: {
    dsn: 'https://c663726c368ae0c1f2081c10991dfe7e@o4506263491641344.ingest.us.sentry.io/4507848347287552',
    debug: true,
  },
};

if (Updates.channel === 'production') {
  config.apiUrl = 'https://api.lingolink.app';
  config.sentry.debug = false;
} else if (Updates.channel === 'preview') {
  config.apiUrl = 'https://api.lingolink.app';
  config.sentry.debug = false;
}
