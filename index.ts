import app from './src/app'
import { APP_PORT } from './src/config'

app.listen(APP_PORT, () => console.log(`Server is listening on port ${APP_PORT}!`));

