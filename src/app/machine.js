const { fork } = require('child_process');
const runWorld = require('./machine/world');

class ManagerMachine{

    constructor(){}
    

}

module.exports = ManagerMachine;

// Função para criar um processo de mundo
const createWorldProcess = (worldId) => {
    const worldProcess = fork('./machine/world.js', [worldId]);

    worldProcess.on('message', (message) => {
        console.log(`Mundo ${worldId}: ${message}`);
    });
    
    // send mensage

    return worldProcess;
};

// Criar múltiplos mundos, por exemplo 3 mundos
const worlds = [];
for (let i = 1; i <= 3; i++) {
    worlds.push(createWorldProcess(i));
}
