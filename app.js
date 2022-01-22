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

console.log("Running node");

// get service principle credentials
async function main() {

    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env.KEY_VAULT_NAME;
    const url = "https://" + keyVaultName + ".vault.azure.net";
    const client = new SecretClient(url, credential);

    SECRET = await client.getSecret("api-key").catch(function(err) {

        console.log(err);
        return;
    });

    CLIENTID = await client.getSecret("CLIENTID").catch(function(err) {

        console.log(err);
        return;
    });

    CLIENTSECRET = await client.getSecret("CLIENTSECRET").catch(function(err) {

        console.log(err);
        return;
    });


}

main();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

router.post('/webhook', (request, response) => {

    console.log(request.body)
    console.log(request.body["event"]["data"]["correlationId"])
    console.log(request.body["event"]["data"]["status"])
    response.statusCode = 200;
    response.send("Resource group created");
});

// create log analytics workspace

router.post('/create_logws', async (request, response) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENTID["value"]);
    params.append('client_secret', CLIENTSECRET["value"]);
    params.append('resource', 'https://management.azure.com');

    await axios.post('https://login.microsoftonline.com/892d6304-9ee0-4129-bb11-4c98814808d3/oauth2/token', params)
        .then(async res => {


            const config = {
                headers: {
                    "Authorization": 'Bearer ' + res.data["access_token"],
                    "Content-Type": "application/json"
                }
            }

            var postData = {
                email: "test@test.com",
                password: "password"
              };
              
            var resourceGroup = request.body["resourceGroup"]
            var orderid = request.body["orderid"]
            // await axios.put('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/' + resourceGroup + '/providers/Microsoft.OperationalInsights/workspaces/' + orderid + 'loganalytics?api-version=2021-06-01', {
            //         location: "Switzerland North"
            //     }, config)
            //     .then(async res2 => {
                    await axios.post('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/swiss_99/providers/Microsoft.OperationalInsights/workspaces/99loganalytics/sharedKeys?api-version=2020-08-01',
                    postData, config)
                    .then(async res3 => {
                        // send primary key to email
                        //console.log(res2.data["properties"]["customerId"])
                        
                        response.statusCode = 200;
                        // var rs = {
                        //     "primarySharedKey":res3.data["primarySharedKey"],
                        //     "workspaceid":res2.data["properties"]["customerId"]
                        // }
                        response.send("ok");
                    })
                    .catch(error => {
                        console.error(error)
                        response.statusCode = 440;
                        response.send(error);
                    })

                    // console.log(res2.data["properties"]["customerId"])
                    // response.send(res2.data["properties"]["customerId"]);

                // })
                // .catch(error => {
                //     console.error(error)
                //     response.statusCode = 440;
                //     response.send(error);
                // })


        })
        .catch(error => {
            console.error(error)
            response.statusCode = 200;
            response.send(error);
        });



});



router.post('/', (request, response) => {

});


// api listening to woocomerce webhook
router.post('/create', async (request, response) => {

    // get customer name from check out info
    var user = "swiss_" + request.body["id"];
    console.log(user);
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENTID["value"]);
    params.append('client_secret', CLIENTSECRET["value"]);
    params.append('resource', 'https://management.azure.com');

    await axios.post('https://login.microsoftonline.com/892d6304-9ee0-4129-bb11-4c98814808d3/oauth2/token', params)
        .then(async res => {


            const config = {
                headers: {
                    "Authorization": 'Bearer ' + res.data["access_token"],
                    "Content-Type": "application/json"
                }
            }

            await axios.put('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/' + user + '?api-version=2021-04-01', {
                    location: "Switzerland North"
                }, config)
                .then(async res1 => {

                    var orderid = request.body["id"] + "loganalytics"

                    await axios.put('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/' + user + '/providers/Microsoft.OperationalInsights/workspaces/' + orderid + '?api-version=2021-06-01', {
                            location: "Switzerland North"
                        }, config)
                        .then(async res2 => {

                            await axios.post('https://management.azure.com/subscriptions/b7c92367-e09f-49dd-b4d7-f9889803f853/resourcegroups/swiss_44/providers/Microsoft.OperationalInsights/workspaces/44loganalytics/sharedKeys?api-version=2020-08-01',
                            config)
                            .then(res3 => {
                                // send primary key to email
                                //console.log(res2.data["properties"]["customerId"])
                                
                                response.statusCode = 200;
                                // var rs = {
                                //     "primarySharedKey":res3.data["primarySharedKey"],
                                //     "workspaceid":res2.data["properties"]["customerId"]
                                // }
                                response.send("ok");
                            })
                            .catch(error => {
                                console.error(error)
                                response.statusCode = 440;
                                response.send(error);
                            })

                            // console.log(res2.data["properties"]["customerId"])
                            // response.send(res2.data["properties"]["customerId"]);
        
                        })
                        .catch(error => {
                            console.error(error)
                            response.statusCode = 440;
                            response.send(error);
                        })
        
                    // response.statusCode = 200;
                    // response.send("Resource group created");
                })
                .catch(error => {
                    console.error(error)
                    response.statusCode = 440;
                    response.send(error);
                })

        })
        .catch(error => {
            console.error(error)
            response.statusCode = 200;
            response.send(error);
        });

});

app.use("/", router);

http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);