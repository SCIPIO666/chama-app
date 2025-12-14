const domElements={
    hamburgerButton: document.querySelector(".hamburger-menu-button"),
    closeButton: document.querySelector(".menu-close-button"),
    navMenu: document.querySelector(".nav-menu"),
    menuItemAddMembers: document.querySelector(".add-members"),
    menuItemMemberProfiles: document.querySelector(".member-profiles"),
    menuItemContributions: document.querySelector(".contributions"),
    menuItemLoans: document.querySelector(".loans"),
    menuItemProfitLoss: document.querySelector(".profit-loss"),
    menuItemProfitShare: document.querySelector(".profit-share"),
    menuItemTransactionLedger: document.querySelector(".transactions-ledger"),
    menuItemNonPerformingLoans: document.querySelector(".non-performing-loans"),
    dashboard: document.querySelector(".dashboard-container"),
    yearSelection: document.querySelector("#year"),
    navigationRibbon: document.querySelector(".navigation-ribbon"),

}

class CreateElements{
    constructor(parentElem){
        this.parentElem=parentElem;
    }
    createElem(elem){

    }
    createTableHeaders(headersArray){

    }
    createTableRow(rowDataArray){

    }
    createForm(formFieldsArray){

    }
    createProfile(profileObject){

    }
    generateProfileGrid(profilesDataArray){

    }

}
const ctn=domElements.dashboard;
const components=new CreateElements(ctn);
export {domElements,components};