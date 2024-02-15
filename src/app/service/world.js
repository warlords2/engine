const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { World } = require('@warlords/storage');

class WorldService extends Service{

    static async find() {
        let repository = await WorldService.getRepository(World);
        return repository.find({ 
            relations: ['provinces', 'provinces.position' ,'provinces.cities'] 
        });
    }

    static async create( worldData ) {

        let repository = await WorldService.getRepository(World);

        return repository.save(new World(worldData));

    }
}

module.exports = { WorldService };