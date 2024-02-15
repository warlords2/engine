const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { Province, World, Position } = require('@warlords/storage');


class ProvinceService extends Service{

    static async findByWorldId({ id }) {

        let repository = await ProvinceService.getRepository(Province);

        return repository.find({
            relations: ['position' ,'cities'],
            where: {
                world: {
                    id
                }
            }
        });
    }

    static async create( worldId, provinceData ) {

        let repProvince = await ProvinceService.getRepository(Province);
        let repWorld = await ProvinceService.getRepository(World);
        let repPosition = await ProvinceService.getRepository(Position);

        provinceData.world = await repWorld.findOne( { where: { id: worldId } } );
        
        provinceData.position = await repPosition.save( new Position(provinceData.position))

        return repProvince.save(new Province(provinceData))

    }
}

module.exports = { ProvinceService };