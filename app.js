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

var SECRET;
var CLIENTID;
var CLIENTSECRET;


async function main() {

    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env.KEY_VAULT_NAME;
    const url = "https://" + keyVaultName + ".vault.azure.net";
    const client = new SecretClient(url, credential);

    SECRET = await client.getSecret("api-key").catch(function(err) {

        console.log(err);
        return;
    });;

    CLIENTID = await client.getSecret("CLIENTID").catch(function(err) {

        console.log(err);
        return;
    });;

    CLIENTSECRET = await client.getSecret("CLIENTSECRET").catch(function(err) {

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
    console.log(SECRET["value"]);


    await axios({
        method: 'post',
        url: 'https://login.microsoftonline.com/892d6304-9ee0-4129-bb11-4c98814808d3/oauth2/token',
        data: {
            "grant_type": "client_credentials",
            "client_id": CLIENTID,
            "client_secret": CLIENTSECRET,
            "resource": "https://management.azure.com"
        }
      })
      .catch(error => {
        console.error(error)
        response.statusCode = 401;
        response.send(error);
    });

    // await axios
    //     .post('https://login.microsoftonline.com/892d6304-9ee0-4129-bb11-4c98814808d3/oauth2/token',
    //     data: {
    //         "grant_type": "client_credentials",
    //             "client_id": CLIENTID,
    //             "client_secret": CLIENTSECRET,
    //             "resource": "https://management.azure.com"
    //       })
    //     .then(async res => {

    //         // await axios
    //         // .put('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/aaa?api-version=2021-04-01', {
    //         //     headers: {
    //         //         "Authorization": 'Bearer ' + res.data["access_token"],
    //         //         "Content-Type": "application/json"
    //         //     }
    //         // },{
    //         //     location: "Switzerland North"
    //         // })
    //         // .then(res => {
    //         //     response.status(200);
    //         //     response.send("Resource group created");
    //         // })
    //         // .catch(error => {
    //         //     console.error(error)
    //         //     response.statusCode = 401;
    //         //     response.send(error);
    //         // })
    

    //         response.status(200);
    //         response.send(res.data["access_token"]);
    //     })
    //     .catch(error => {
    //         console.error(error)
    //         response.statusCode = 401;
    //         response.send(error);
    //     })


   


});

app.use("/", router);

http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);