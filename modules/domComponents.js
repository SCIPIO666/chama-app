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
    constructor(elements){
        this.elements=elements;
        this.parentElem=this.elements.dashboard;
    }
    createElement(element, attribute = "", value = "") {
        const elem = document.createElement(element);
        if (attribute) {
            if (attribute === "class") {
                elem.classList.add(value);
            } else if (attribute === "textContent") {
                elem.textContent = value;
            } else {
                elem.setAttribute(attribute, value);
            }
        }
        return elem;
    }
    createTableHeaders(array){
            //rowDataArray = [
            //     { content: "Jane Smith", isHeader: true, rowSpan: 1, colSpan: 1, header: "name",scope:""},
            //     { content: "Jane Smith", isHeader: false, rowSpan: 1, colSpan: 1, header: "name",scope:""},            
            // ];
            const table =this.createElement("table");
            const row=this.createElement("tr");
            let cellElem;
            array.forEach(data=>{
                    if(data.isHeader){
                         cellElem=this.createElement("th","colspan",data.colSpan);
                    }
                    if(!data.isHeader){
                        cellElem=this.createElement("td","colspan",data.colSpan);
                    }
                    cellElem.setAttribute("rowspan",data.rowSpan);             
                    if(data.scope){
                        cellElem.setAttribute("scope",data.scope);
                    }
                    if(data.header){
                        cellElem.setAttribute("headers",data.header);
                    }
                    cellElem.textContent=data.content;
                    row.appendChild(cellElem);
                    table.appendChild(headerElem);               
            });
            return table;
    }
    createForm(title,fieldsArray){
        const form=this.createElement("form","class","form");
        const title=this.createElement("h2","textContent",title)
        //fieldsArray=[{fieldType: "text",label:"First Name"},];---structure
        this.addFormFField(form,fieldsArray);
        form.appendChild(title);
        this.parentElem.appendChild(form);
    }
    addFormFField(form,formFieldsArray){
        formFieldsArray.forEach(field=>{
            const ctn=  this.createElement("div","class","form-field");
            const label=this.createElement("label","for",field.label.toLowerCase.trim());
            label.textContent=field.label;
            const formField=this.createElement("input","type",field.fieldType);
            if(formFieldsArray.attributes && formFieldsArray.attributes.length!==0){
                for(let attribute in formFieldsArray.attributes){
                    formField.setAttribute(attribute,formFieldsArray.attributes.attribute);
                };
            }
            formField.id=field.label.toLowerCase.replace(" ","-");
            ctn.appendChild(label);
            ctn.appendChild(formField);
            form.appendChild(ctn);
        });
    }
    createAddMemberForm(){
                //fieldsArray=[{fieldType: "text",label:"First Name" attributes: [{attribute: "",value: ""},{attribute: "",value: ""}]}];---structure
        const fieldsArray=[{fieldType: "text",label:"First Name"},{fieldType: "text",label: "Last Name"},
            {fieldType: "number",label:"Registered Numbers", attributes:{min:1,max:100}}];
        const addMembersForm=this.createForm("MEMBER REGISTRATION FORM",fieldsArray);
        const saveButton=this.createElement("button","class","save-member");
        saveButton.textElement="save";
        addMembersForm.appendChild(saveButton)
        this.parentElem="";
        this.parentElem.appendChild(addMembersForm);
    }
    createProfile(profileObject){
        const ctn=this.createElement("div","class","user");
        const image=this.createElement("img","class","user-image");
        const fullName= profileObject.firstName + " " + profileObject.lastName;
        const labelElem=this.createElement("span","textContent","Name: ");
        const nameElem=this.createElement("div","class","name profile-item");
        nameElem.innerHTML=`${labelElem}: ${fullName}`;

        const registeredNumbers= profileObject.registeredNumbers;
        const spanElem=this.createElement("span","textContent","Registered Numbers: ");
        const numberElem=this.createElement("div","class","numbers profile-item");
        numberElem.innerHTML=`${spanElem}: ${registeredNumbers}`;

        const contributions= profileObject.totalContributions;
        const spanCont=this.createElement("span","textContent","Total Contributions: ");
        const contElem=this.createElement("div","class","contributions profile-item");
        contElem.innerHTML=`${spanCont}: ${contributions}`;

        const bal= profileObject.memberAccountBalance;
        const span=this.createElement("span","textContent","Account Balance: ");
        const balElem=this.createElement("div","class","balance profile-item");
        balElem.innerHTML=`${span}: ${bal}`;

        const userActionsContainer=this.createElement("div","class","user-actions-container");
        const button1=this.createElement("button","class","borrowing-summary");
        button1.textContent="Borrowing History";
        const button2=this.createElement("button","class","monthly-contributions");
        button2.textContent="Monthly Contributions";
        const button3=this.createElement("button","class","profit-share");
        button3.textContent="Profit Share";  
        userActionsContainer.appendChild(button1) ;
        userActionsContainer.appendChild(button2) ;
        userActionsContainer.appendChild(button3)   ;
         






    }
    generateProfileGrid(profilesDataArray){

    }
    generateLedger(ledgerData){

    }
    generateGraph(intervals,arrayCoordinates){

    }
    restoreDashboard(){
        this.parentElem.innerHTML="";
        this.parentElem.classList.add("dashboard-container", "split-width");
        const formContainer = this.createElement("form", "class", "year-selection-container");   
        const yearContainer = this.createElement("div", "class", "year-container");
        const labelYear = this.createElement("label", "textContent", "Year:");
        labelYear.setAttribute("for", "year");       
        const selectYear = this.createElement("select", "id", "year"); 
        const optionYear = this.createElement("option", "textContent", "2025");
        optionYear.setAttribute("value", "2025");
        selectYear.appendChild(optionYear);
        yearContainer.appendChild(labelYear);
        yearContainer.appendChild(selectYear);
        formContainer.appendChild(yearContainer);  
        this.parentElem.appendChild(formContainer);
        const metricTitles = [
            { class: "total-contributions", title: "Total Contributions" },
            { class: "total-outstanding-loans-principal", title: "Total Outstanding Loans(principal)" },
            { class: "total-outstanding-loans-intrest", title: "Total Outstanding Loans(intrest)" },
            { class: "total-cash-at-hand", title: "Total Cash At Hand" },
            { class: "chama-bascket", title: "Chama Bascket" }
        ];

        metricTitles.forEach(item => {
            const dashboardItem = this.createElement("div", "class", "dashboard-item");
            dashboardItem.classList.add(item.class);
            
            const heading = this.createElement("h2", "textContent", item.title);
            
            dashboardItem.appendChild(heading);
            this.parentElem.appendChild(dashboardItem);
        });
    }

}

const ctn=domElements.dashboard;
const components=new CreateElements(ctn);
export {domElements,components};