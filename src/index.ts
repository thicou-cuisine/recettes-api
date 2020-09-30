import app from './app';
import config from './config';

const main = () => {
  return app.listen(config.APP_PORT, () =>
    console.log(`Server is listening on port ${config.APP_PORT}!`)
  );
};

main();
