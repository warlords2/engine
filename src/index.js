let dotenv = require('dotenv');

dotenv.config({path:'./.env'});

// Logs audit
let { getLogger } = require('@warlords/audit');

// Manager Cache
let ManagerCache = require('./app/cache.js');

// Manager Database
let { ManagerDatabase } =  require('@warlords/storage');

globalThis.manager = { cache: new ManagerCache(), database: new ManagerDatabase() };
globalThis.manager.database.getConnection();

// WebSocket config 
let ServerBuilder  = require('./app/server.js');

const server = ServerBuilder();





