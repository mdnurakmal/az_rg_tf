
# Instructions

1. Install nodejs on vm
2. Clone repo
3. CD

4. Run the following command to get tenant id , client id , client secret
```
az ad sp create-for-rbac --name osba -o table 
```

5. Run the following command to run the backend server to attach webhook from woocommerce
```
sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 node app.js
```

# Extra

Create service principle , assign contributor role 
Create key vault to store service princile credentials

Set the following environment variables

- AZURE_TENANT_ID
- AZURE_CLIENT_ID
- AZURE_CLIENT_SECRET


# Change these in app.js
var REGION="Switzerland North"
var RG_REGION="swiss_";

Get information regarding service principle
```
az ad sp create-for-rbac --name osba -o table 
```

Useful azure cli commands
```
az account list
az login --service-principal -u xxx -p xxx --tenant xxx


sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 SENDGRID_API_KEY=xxx forever start app.js
```

export SENDGRID_API_KEY=<Your API Key>

Give registered app access to key vault

Change RG name when creating RG

# Reference
https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal


Use sharedaccess for normal rest api

Use bearer token for deploying resources using management api
https://social.technet.microsoft.com/wiki/contents/articles/53488.azure-rest-api-how-to-create-bearer-token.aspx