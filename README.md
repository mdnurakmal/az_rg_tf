
# Instructions

Install node on vm
Clone this repo
cd

run the following command to get tenant id , client id , client secret
```
az ad sp create-for-rbac --name osba -o table 
```

run the following command to run the backend server to attach webhook from woocommerce
```
sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 node app.js
```


# Extra

Set the following environment variables

AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET

Get information regarding service principle
```
az ad sp create-for-rbac --name osba -o table 
```

Useful azure cli commands
```
az account list
az login --service-principal -u xxx -p xxx--tenant xxx --allow-no-subsciptions
az login --service-principal -u xxx -p xxx --tenant xxx

sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 node app.js
sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 forever start app.js
```


# Reference
https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal


Use sharedaccess for normal rest api

Use bearer token for deploying resources using management api
https://social.technet.microsoft.com/wiki/contents/articles/53488.azure-rest-api-how-to-create-bearer-token.aspx