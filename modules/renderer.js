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
    //---add ledger transaction---//
    renderAddLedgerMoneyOutTransactionsModalOnclick(){
        const parent=this.elements.modal;
        parent.innerHTML="";
       const fields=[
        {fieldType: "date",label:"Date",attributes:[{attribute:"class" , value: "date"}]},
        {fieldType: "number",label:"Amount" , attributes:[{attribute:"min" , value: 1},{attribute:"max" , value: 1000000},{attribute:"class" , value: "amount"}]},
        {fieldType: "text",label:"Sent To",attributes:[{attribute:"class" , value: "to"}]},
        {fieldType: "number",label:"Transaction Charges",attributes:[{attribute:"class" , value: "transaction-charges"}]},     
        ];

        const form=this.componentClass.createForm("MONEY OUT TRANSACTIONS",fields);
        const saveBtn=this.componentClass.createElement("button","class","save-money-out");
        saveBtn.textContent="Save";
        parent.appendChild(form);
        parent.appendChild(saveBtn);
    }
    renderAddLedgerMoneyInTransactionsModalOnclick(){
        const parent=this.elements.modal;
        parent.innerHTML="";
       const fields=[
        {fieldType: "date",label:"Date",attributes:[{attribute:"class" , value: "date"}]},
        {fieldType: "number",label:"Amount" , attributes:[{attribute:"min" , value: 1},{attribute:"max" , value: 1000000},{attribute:"class" , value: "amount"}]},
        {fieldType: "text",label:"Received From",attributes:[{attribute:"class" , value: "from"}]},   
        ];

        const form=this.componentClass.createForm("MONEY IN TRANSACTIONS",fields);
        const saveBtn=this.componentClass.createElement("button","class","save-money-in");
        saveBtn.textContent="Save";
        parent.appendChild(form);
        parent.appendChild(saveBtn);
    }

    //-----user profile buttons------//
    splitAndCapitalize(camelCaseWord) {
        const regex = /(?=[A-Z])/;
        const spacedWord = camelCaseWord.replace(regex, " ");
        const words = spacedWord.split(" ");
        const result = words.map(word => {
            if (!word) return ""; 
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");

        return result;
    }
    renderOneMonthHistory(month,monthObject){
        const container=this.componentClass.createElement("ul","class","borrowing-month-container");
        const title=this.componentClass.createElement("h2","textContent",`${month.toUpperCase()}`);
        container.appendChild(title);
        for(let item in monthObject){
            const itemElem=document.createElement("li");
            itemElem.innerHTML=`${this.splitAndCapitalize(item)} : <span class="borrowing-item-value">${monthObject.item}</span>}`;
            container.appendChild(itemElem);
        }

        return container;

    }
    renderUserBorrowingHistoryModal(historyObject){
        
    }
    renderUserMonthlyContributionsModal(){

    }
    renderUserProfitShareModal(){

    }
    renderUserBorrowingHistoryModal(){

    }

}