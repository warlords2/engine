let dotenv = require('dotenv');
dotenv.config({path:'./.env'});

// Manager Cache and Database
let ManagerCache = require('./app/cache.js');
let { ManagerDatabase } =  require('@warlords/storage');

globalThis.manager = {  cache: new ManagerCache(),   database: new ManagerDatabase() }

globalThis.manager.database.getConnection();


