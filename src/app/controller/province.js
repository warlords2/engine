const { ControllerError } = require('../errors/model/controller.error.js');

let { ProvinceService } = require('../service/province.js');
let { Province } = require('@warlords/common');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/world/:worldId/province', async (req, res) => {

		let worldId = req.params.worldId;
		
		let provinces = await ProvinceService.findByWorldId({id: worldId});

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": provinces,
			"path": req.url
		});
	});

	router.post('/world/:worldId/province', async (req, res) => {

		let json = await req.readJson();
		
		let worldId = req.params.worldId;

		let provinceData = new Province(json);
		
		let errors = await provinceData.isValid();
		for(let erro of errors){
			for(let msg of Object.keys(erro.constraints) ){
				throw new ControllerError( erro.constraints[msg] ,'VALID');
			}
		}

		let province = await ProvinceService.create( worldId, provinceData );

		res.json({
			"timestamp": new Date(),
			"status": 200,
			"error": false,
			"message": province,
			"path": req.url +'/'+ province.id
		});
	});

}