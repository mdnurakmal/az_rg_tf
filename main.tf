terraform {
  backend "azurerm" {
    resource_group_name  = "vm-org-win01-rg"
    storage_account_name = "akmal3m4"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
    use_msi              = true
    subscription_id      = "f51924a0-0777-4c94-8948-867871c84397"
    tenant_id            = "00000000-0000-0000-0000-000000000000"
  }
}


# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "example"
  location = "West Europe"
}