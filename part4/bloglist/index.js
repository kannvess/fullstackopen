const http = require('http');
const app = require('./app');
const { PORT } = require('./utils/config');
const { logInfo } = require('./utils/logger');

const server = http.createServer(app);

server.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});
