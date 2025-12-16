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
    initModal(){
        this.addCloseButton();
        this.delegateCloseEventOnClick();
        this.showModal();
    }
    showModal(){
        this.elements.modal.classList.add("show");
        this.elements.modal.classList.remove("hide");
        this.elements.container.toggle("hide");
    }
    addCloseButton(){
       const parent= this.elements.modal;
       const button=this.componentClass.createElement("div","class","close-button");
       button.textContent="X";
       parent.appendChild(button);
    }
    delegateCloseEventOnClick(){
        this.elements.modal.addEventListener("click",e=>{
           if(e.target.closest(".close-button")){
                this.closeModal();
            }
        })
    }
    closeModal(){
        this.elements.modal.classList.add("hide");
        this.elements.modal.classList.remove("show");
        this.elements.container.toggle("hide");
    }
    renderLedgerOptions(){
        const div1=this.componentClass.createElement("div","textContent","Money In");
        const div1Ctn=this.componentClass.createElement("div","class","option-container");
        div1.classList.add("money-in-option");
        div1Ctn.appendChild(div1);
        const div2=this.componentClass.createElement("div","textContent","Money Out");
        const div2Ctn=this.componentClass.createElement("div","class","option-container");
         div2Ctn.appendChild(div2);
        div1.classList.add("money-out-option");
        const parent=this.elements.modal;
        parent.appendChild(div1Ctn);
        parent.appendChild(div1Ctn);
    }
    renderAddLedgerMoneyOutTransactionsModalOnclick(){
        const parent=this.elements.modal;
        parent.innerHTML="";
       const fields=[{fieldType: "date",label:"Date"},{fieldType: "number",label:"Amount" , attributes:[{min:1 , max: 100000}],}];


    }
    renderAddLedgerMoneyInTransactionsModalOnclick(){

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