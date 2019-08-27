google = require("googleapis").google
search = google.customsearch('v1')
credentials = require("./cred")

async function pesqImage(query, n=10, type="image"){
	res = await search.cse.list({
		auth: credentials.auth,
		cx: credentials.cx,
		q: query,
		searchType: type,
		num: n
		})
	image = res.data.items.map((i) =>{ return i.link})
    return image
}

async function pesq(query){
	res = await search.cse.list({
		auth : credentials.auth,
		cx : credentials.cx,
		q: query,
		num: 10
		})
//		console.dir(res, { depth: null})
	//	process.exit(0)
		resp = res.data.items.map((i) =>{
			return i.link})
		return resp
	}

module.exports = { pesqImage, pesq }
