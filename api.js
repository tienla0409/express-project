const axios = require("axios");

const data = axios.get("http://localhost:3000/users")
									.then(res => {
										data = res.data;
									}).catch(err => console.log(err));

module.exports = data;