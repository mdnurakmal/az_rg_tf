terraform {
  backend "azurerm" {
    resource_group_name  = "vm-org-win01-rg"
    storage_account_name = "akmal3m4"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
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