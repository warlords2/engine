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

    static async find(uuid) {
        let repository = await WorldService.getRepository(World);
        return repository.find({
            where: {
                id: uuid
            },
            relations: [
                'worldConfig',
                'worldConfig.marketConfig',
                'worldConfig.resourceConfig',
                'worldConfig.resourceConfig.resourcesType',
                'worldConfig.unitConfig',
                'worldConfig.unitConfig.unitsType',
                'worldConfig.unitConfig.unitsType.cost',
                'worldConfig.buildingConfig',
                'worldConfig.buildingConfig.buildingsType',
                'worldConfig.provinceConfig.size',
                'worldConfig.provinceConfig.cityConfig',
                'worldConfig.provinceConfig.cityConfig.initialSize',
                'worldConfig.provinceConfig.cityConfig.initialBuildings',
                'worldConfig.provinceConfig.cityConfig.initialResources',
                'worldConfig.provinceConfig.cityConfig.initialUnits',
                'worldConfig.npcConfig',
                'worldConfig.npcConfig.npcTypes',
                'worldConfig.playerConfig',
                'provinces',
                'provinces.position',
                'provinces.cities'
            ]
        });
    }

    static async create( worldData ) {

        let repository = await WorldService.getRepository(World);

        return repository.save(new World(worldData));

    }
}

module.exports = { WorldService };