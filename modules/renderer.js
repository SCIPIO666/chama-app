import { domElements,components} from "./domComponents.js";

//add click events and render on click

class Render{
    constructor(elements,componentClass){
        this.elements=elements;
        this.componentClass=componentClass;
    }

    slideInNavigationOnClick(){

    }
    closeNavigationOnClick(){

    }
    renderAddMemberOnClick(){

    }
    renderMemberProfilesOnClick(){

    }
    renderContributionsOnClick(){

    }
    renderLoansOnClick(){

    }
    renderMonthlyProfitLossOnClick(){

    }
    renderProfitShareOnClick(){

    }
    renderTransactionsLedgerOnClick(){

    }
    renderNonPerformingLoansOnClick(){

    }

}

class ModalRenderer{
    constructor(elements,componentClass){
        this.elements=elements;
        this.componentClass=componentClass;
    }
    showModal(){
        this.elements.modal.classList.add("show");
        this.elements.modal.classList.remove("hide");
        this.elements.container.toggle("hide");
    }
    delegateCloseEventOnClick(){

    }
    closeModal(){
        this.elements.modal.classList.add("hide");
        this.elements.modal.classList.remove("show");
        this.elements.container.toggle("hide");
    }
    renderAddLedgerTransactionsModalOnclick(){

    }
    renderUserBorrowingHistoryModal(){

    }
    renderUserMonthlyContributionsModal(){

    }
    renderUserProfitShareModal(){

    }
    renderUserBorrowingHistoryModal(){

    }

}