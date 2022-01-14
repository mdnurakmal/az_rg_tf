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
    console.log(secret["api-key"]);
    axios
        .post('https://management.azure.com/subscriptions/f51924a0-0777-4c94-8948-867871c84397/resourcegroups/ak?api-version=2021-04-01', {
            headers: {
                Authorization: 'Bearer ' + secret["api-key"]
            }
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