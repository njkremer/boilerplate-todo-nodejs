const app = require('./server');
const { PORT } = require('./config');

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));