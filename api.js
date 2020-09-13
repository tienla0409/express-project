const axios = require("axios");

module.exports = {
	getData: function() {
		return axios.get("http://localhost:3000/users")
 				 	.then(res => res.data)
	},

	postData: function(data) {
		return axios.post("http://localhost:3000/users", data).catch(err => console.log(`Errors when register: ${err}`));
	},
}