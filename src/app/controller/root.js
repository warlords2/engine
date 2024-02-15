
let { WorldService } = require('../service/world.js');
let { UserService } = require('../service/user');

module.exports = (router) => {
	
	// Create User and Login
	router.get('/', async (req, res) => {

		let worlds	= await WorldService.find();
		let users = await UserService.find();

		res.json({
			worlds,
			users
		});

	});

}