const https = require('https');
const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const router = express.Router();
const app = express();
const {
    SecretClient
} = require("@azure/keyvault-secrets");
const {
    DefaultAzureCredential
} = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();
var secret;
async function main() {

    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env.KEY_VAULT_NAME;
    const url = "https://" + keyVaultName + ".vault.azure.net";
    const client = new SecretClient(url, credential);


    // Read the secret we created
    secret = await client.getSecret("api-key").catch(function(err) {

        console.log(err);
        return;
    });;
}

main();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

router.post('/', (request, response) => {

});

router.get('/create', async (request, response) => {

    var user = request.query.name;
    console.log(secret["value"]);
    axios
        .put('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/aaa?api-version=2021-04-01', {
            headers: {
                "Authorization": 'Bearer ' + secret["value"],
                "Content-Type": "application/json"
            }
        },{
            //api_key: process.env.API_KEY,
            location: "Switzerland North"
        })
        .then(res => {
            response.status(200);
            response.send(res.data["Resource group created"]);
        })
        .catch(error => {
            console.error(error)
            response.statusCode = 401;
            response.send(error);
        })



});

app.use("/", router);

http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);