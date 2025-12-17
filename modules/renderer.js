import { domElements,components} from "./domComponents.js";
import { appModel } from "../data.js";


//add click events and render on click

class Render{
    constructor(elements,componentClass){
        this.elements=elements;
        this.componentClass=componentClass;
    }
    initEvents(){
       this.slideInNavigationOnClick();
        this.closeNavigationOnClick();
        this.renderAddMemberOnClick();
        this.renderMemberProfilesOnClick();
        this.renderContributionsOnClick();
        this.renderLoansOnClick();
    }
    slideInNavigationOnClick(){
        const nav=this.elements.navMenu;
        const hamburgerButton=this.elements.hamburgerButton;
        const dashboard=this.elements.dashboard;
        hamburgerButton.addEventListener("click",e=>{
            e.preventDefault();
            nav.classList.toggle("visible");
            dashboard.classList.toggle("split-width");
        });

    }
    closeNavigationOnClick(){
        const nav=this.elements.navMenu;
        const closeButton=this.elements.closeButton;
        const dashboard=this.elements.dashboard;

        closeButton.addEventListener("click",e=>{
            e.preventDefault();
            nav.classList.toggle("visible");
            dashboard.classList.toggle("split-width");
        });
    }
    renderAddMemberOnClick(){
        const addMembersButton=this.elements.menuItemAddMembers;
        addMembersButton.addEventListener("click",e=>{
            e.preventDefault();
            this.componentClass. createAddMemberForm() ;
        });

    }
    renderMemberProfilesOnClick(){
        const profilesDataArray=appModel.members;
        const showMembersButton=this.elements.menuItemMemberProfiles;
        showMembersButton.addEventListener("click",e=>{
            e.preventDefault();
            this.componentClass.generateProfileGrid(profilesDataArray) ;
        });

    }
    renderContributionsOnClick(){
        const profilesDataArray=appModel.members;
        const showContributionsBtn=this.elements.menuItemContributions;
        showContributionsBtn.addEventListener("click",e=>{
            e.preventDefault();
            this.componentClass.createContributionsTable(2025, profilesDataArray) 
        });
    }
    renderLoansOnClick(){
        const loansData=appModel.loans;
        const showLoansBtn=this.elements.menuItemLoans;
        showLoansBtn.addEventListener("click",e=>{
            e.preventDefault();
            this.componentClass.createLoansSummaryTable(2025, loansData);
            console.log("loans ")
        });
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

            if(item==="outstandingArrears"){
                const itemElem1=document.createElement("li");
                const itemElem2=document.createElement("li");
                itemElem1.innerHTML=`Outstanding Principle : <span class="borrowing-item-value">${monthObject[item][principle]}</span>}`;
                itemElem2.innerHTML=`Outstanding Interest : <span class="borrowing-item-value">${monthObject[item][interest]}</span>}`;    
                container.appendChild(itemElem1); 
                container.appendChild(itemElem2);                 
            }
            const itemElem=document.createElement("li");
            itemElem.innerHTML=`${this.splitAndCapitalize(item)} : <span class="borrowing-item-value">${monthObject[item]}</span>}`;
            container.appendChild(itemElem);
        }

        return container;

    }
    renderUserBorrowingHistoryModal(historyObject){
        const parent=this.elements.modal;
        const title=this.componentClass.createElement("h2","textContent","BORROWING HISTORY");
        parent.appendChild(title);
        for(let month in historyObject){
            const currentMonthHistory=this.renderOneMonthHistory(month,historyObject[month]);
            parent.appendChild(currentMonthHistory);
        }
        this.initModal();

    }
    renderUserMonthlyContributionsModal(member,contributionsObject){
        const table=this.componentClass.createElement("table","class","user-contributions-container");
        const title1=this.componentClass.createElement("h2","textContent",member.toUpperCase());
        const title2=this.componentClass.createElement("h2","textContent","MONTHLY CONTRIBUTIONS");
        table.appendChild(title1);
        table.appendChild(title2);

        for(let month in contributionsObject){
            const rowDataArray= [{ content: month, isHeader: true, rowSpan: 1, colSpan: 1, header: "",scope:"row", id:"january"},{ content: contributionsObject[month], isHeader: false, rowSpan: 1, colSpan: 1, header: "january",scope:"row", id:""}];
            const row=this.componentClass.createTableRow(rowDataArray);
            table.appendChild(row);
        }

        const parent=this.elements.modal;
        parent.appendChild(table);
        this.initModal();

    }
    renderUserProfitShareModal(){
    }

}
const modal=new ModalRenderer(domElements,components);
const dashboard=new Render(domElements,components);

export {modal,dashboard};