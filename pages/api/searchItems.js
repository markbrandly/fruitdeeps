import api from '../../lib/api.js'

export default function searchItems(req, res) {
    if(!req.query.like){
		res.end();
		return
	}
	var str = req.query.like
	var limit = 100
	if(req.query.lim)
		limit = parseInt(req.query.lim)
    res.setHeader('Content-Type', 'application/json');
	api.searchItems(str, limit, function(results){
		res.send(results)
	})
  }