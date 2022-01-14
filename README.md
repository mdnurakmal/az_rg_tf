# az_rg_tf

run following to get 
AZURE_TENANT_ID
AZURE_CLIENT_ID
AZURE_CLIENT_SECRET
```
az ad sp create-for-rbac --name osba -o table 
```

useful azure cli commands
```
az account list
az login --service-principal -u xxx -p xxx--tenant xxx --allow-no-subsciptions
az login --service-principal -u xxx -p xxx --tenant xxx

sudo AZURE_CLIENT_ID=xxxAZURE_CLIENT_SECRET=xxx AZURE_TENANT_ID=xxx KEY_VAULT_NAME=kv14012022 node app.js
```


Reference
https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal


use sharedaccess for normal api

create bearer token if need to use management api
https://social.technet.microsoft.com/wiki/contents/articles/53488.azure-rest-api-how-to-create-bearer-token.aspx