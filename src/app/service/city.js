const { ServiceError } = require('../errors/model/service.error');
const { Service } = require('./service');

let { City, Position, Province, World, Npc } = require('@warlords/storage');


class CityService extends Service{

    static async findByProvinceId({ id }) {

        let repository = await CityService.getRepository(City);

        return repository.find({
            where: {
                province:{
                    id
                }
            }
        });
    }

    static async create( worldId, provinceId, ownerId, cityData ) {
        
        let repCity = await CityService.getRepository(City);
        let repWorld = await CityService.getRepository(World);
        let repProvince = await CityService.getRepository(Province);
        let repOwner = await CityService.getRepository(Npc);
        
        // @todo review limit player create city

        let repPosition = await CityService.getRepository(Position);

        cityData.world = await repWorld.findOne( { where: { id: worldId } } );
        
        cityData.province = await repProvince.findOne( { where: { id: provinceId } } );

        cityData.owner = await repOwner.findOne( { where: { id: ownerId } } );

        cityData.position = await repPosition.save( new Position(cityData.position))

        // @todo valid position in province
        // @todo valid size

        // @todo valid owner npc or player

        return repCity.save(new City(cityData))

/*
        name: String;

        @ManyToOne(()=> Npc, (npc)=> npc.cities)
        owner: Npc;

        @OneToOne(() => Position)
        @JoinColumn()
        position: Position;

        @OneToMany(()=> Building, (building) => building.city)
        buildings: Building[];

        @OneToMany(()=> Resource, (resource) => resource.city)
        resources: Resource[];

        @ManyToOne(()=> Province, (province)=> province.cities)
        province: Province;
*/
        return ''

    }
}

module.exports = { CityService };