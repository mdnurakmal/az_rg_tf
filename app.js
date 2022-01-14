const https = require('https');
const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const router = express.Router();
const app = express();
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();

async function main() {

    // DefaultAzureCredential expects the following three environment variables:
    // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // - AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();
  
    const keyVaultName = process.env.KEY_VAULT_NAME;
    const url = "https://" + keyVaultName + ".vault.azure.net";
  
    const client = new SecretClient(url, credential);
  

    // Read the secret we created
    const secret = await client.getSecret("api-token").catch(function(err) {

        console.log(err);
        return;
    });;

    console.log("secret: ", secret);
  }

  main();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

router.post('/', (request, response) => {

});

router.get('/create', async (request, response) => {

var user=request.query.name;
axios
    .post('https://management.azure.com/subscriptions/f51924a0-0777-4c94-8948-867871c84397/resourcegroups/ak?api-version=2021-04-01', {


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