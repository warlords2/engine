const  { queue: queueWorld } = require('../queue/world.js');
const { run : runProvince } = require('./province');
const { run : runNpc } = require('./npc');

// Logs audit
let { getLogger } = require('@warlords/audit');

// Manager Cache
let ManagerCache = require('./app/cache.js');

// Manager Database typeorm getRepository
let { ManagerDatabase } =  require('@warlords/storage');
let { WorldService } = require('../service/world.js');

globalThis.manager = { cache: new ManagerCache(), database: new ManagerDatabase() };
globalThis.manager.database.getConnection();


const worldId = process.argv[2];
const world = WorldService.find(worldId);

while(true){
    try{
        console.log('--- Starting game cycle  ---');
        // Run World lifecyle
        console.table(world)
        for(let province of world.provinces){
            runProvince(world, province);
        }
        //runNpc();
        
        // Save estate in world

        console.log('--- Game cycle complete ---');
        // Processar mensagens do RabbitMQ por um tempo determinado
        console.log('--- Starting message processing ---');
        queueWorld(world)
        console.log('--- Message processing complete ---');
    }catch(error){
        console.error('Error in lifecycle', error);
    }
}
