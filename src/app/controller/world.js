const { ControllerError } = require('../errors/model/controller.error.js');

let { WorldService } = require('../service/world.js');
let { World } = require('@warlords/common');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/world', async (req, res) => {

		let listWorlds = await WorldService.find();

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": listWorlds,
			"path": req.url
		});
	});

	router.post('/world', async (req, res) => {

		let json = await req.readJson();
		
		let worldData = new World(json);
		
		let errors = await worldData.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}
		
		let world = await WorldService.create(worldData);

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": world,
			"path": req.url +'/'+ world.id
		});
	});

}