import app from './app';
import config from './config';

const main = () => {
  if (config.APP_DEBUG === 'true' ? true : false) { console.warn('DEBUG MODE ACTIVE') }
  if (config.APP_DEBUG === 'true' && process.env.NODE_ENV === 'production') { console.error('PLEASE TURN OFF DEBUG'); return false }
  return app.listen(config.APP_PORT, () =>
    console.log(`Server is listening on port ${config.APP_PORT}!`)
  );
};

main();
