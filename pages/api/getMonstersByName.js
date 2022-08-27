import api from '../../lib/api.js'

export default function getMonstersByName(req, res) {
	if(!req.query.name){
		res.end();
		return;
	}
	var name = req.query.name
  res.setHeader('Content-Type', 'application/json');
	api.getMonstersByName(name, function(results){
		res.send(results)
	})
  }