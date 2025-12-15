const domElements = {
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

class CreateElements {
    constructor(elements) {
        this.elements = elements;
        this.parentElem = this.elements.dashboard;
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
    
    createTableRow(array) {
        //rowDataArray = [
        //     { content: "Jane Smith", isHeader: true, rowSpan: 1, colSpan: 1, header: "name",scope:"", id:""},
        //     { content: "Jane Smith", isHeader: false, rowSpan: 1, colSpan: 1, header: "name",scope:"", id:""},            
        // ];
        const row = this.createElement("tr");

        array.forEach(data => {
            let cellElem;
            
            if (data.isHeader) {
                cellElem = this.createElement("th");
            } else {
                cellElem = this.createElement("td");
            }
            if (data.colSpan) {
                cellElem.setAttribute("colspan", data.colSpan);
            }
            if (data.rowSpan) {
                cellElem.setAttribute("rowspan", data.rowSpan);
            }

            if (data.scope) {
                cellElem.setAttribute("scope", data.scope);
            }
            if (data.header) {
                cellElem.setAttribute("headers", data.header);
            }
            if (data.id) {
                cellElem.setAttribute("id", data.id);
            }
            
            cellElem.textContent = data.content;
            row.appendChild(cellElem);
        });
        
        return row;
    }
    
    createForm(formTitle, fieldsArray) {
        const form = this.createElement("form", "class", "form");
        const titleElem = this.createElement("h2", "textContent", formTitle);      
        form.appendChild(titleElem); 
        this.addFormFField(form, fieldsArray);
        return form; 
    }

    addFormFField(form, formFieldsArray) {
        formFieldsArray.forEach(field => {
            const ctn = this.createElement("div", "class", "form-field");
            const idName = field.label.toLowerCase().trim().replace(/\s/g, "-");
            const label = this.createElement("label", "for", idName);
            label.textContent = field.label;
            const formField = this.createElement("input", "type", field.fieldType);
            if (field.attributes) {
                for (let attribute in field.attributes) {
                    if (field.attributes.hasOwnProperty(attribute)) {
                         formField.setAttribute(attribute, field.attributes[attribute]);
                    }
                }
            }         
            formField.id = idName;         
            ctn.appendChild(label);
            ctn.appendChild(formField);
            form.appendChild(ctn);
        });
    }
    
    createAddMemberForm() {
        this.parentElem.innerHTML = ""; 
        
        //fieldsArray=[{fieldType: "text",label:"First Name" attributes: [{attribute: "",value: ""},{attribute: "",value: ""}]}];---structure
        const fieldsArray = [{
            fieldType: "text",
            label: "First Name"
        }, {
            fieldType: "text",
            label: "Last Name"
        }, {
            fieldType: "number",
            label: "Registered Numbers",
            attributes: {
                min: 1,
                max: 100
            }
        }];
        
        const addMembersForm = this.createForm("MEMBER REGISTRATION FORM", fieldsArray);  
        const saveButton = this.createElement("button", "class", "save-member");
        saveButton.textContent = "Save";   
        addMembersForm.appendChild(saveButton)
        this.parentElem.appendChild(addMembersForm);
    }
    
    createProfile(profileObject) {
        const ctn = this.createElement("div", "class", "user");
        const image = this.createElement("img", "class", "user-image");
        ctn.appendChild(image);
        
        const fullName = profileObject.firstName + " " + profileObject.lastName;
        const labelElem = this.createElement("span", "textContent", "Name: ");
        const nameElem = this.createElement("div", "class", "name profile-item");
        nameElem.innerHTML = `${labelElem.outerHTML} ${fullName}`; 
        ctn.appendChild(nameElem);

        const registeredNumbers = profileObject.registeredNumbers;
        const spanElem = this.createElement("span", "textContent", "Registered Numbers: ");
        const numberElem = this.createElement("div", "class", "numbers profile-item");
        numberElem.innerHTML = `${spanElem.outerHTML} ${registeredNumbers}`;
        ctn.appendChild(numberElem);

        const contributions = profileObject.totalContributions;
        const spanCont = this.createElement("span", "textContent", "Total Contributions: ");
        const contElem = this.createElement("div", "class", "contributions profile-item");
        contElem.innerHTML = `${spanCont.outerHTML} ${contributions}`;
        ctn.appendChild(contElem);

        const returnOnInvestment = profileObject.totalProfit;
        const spanLabel = this.createElement("span", "textContent", "Total Profit : ");
        const returnOnInvestmentElem = this.createElement("div", "class", "total-profit profile-item");
        returnOnInvestmentElem.innerHTML = `${spanLabel.outerHTML} ${returnOnInvestment}`; 
        ctn.appendChild(returnOnInvestmentElem);

        const bal = profileObject.memberAccountBalance;
        const span = this.createElement("span", "textContent", "Account Balance: ");
        const balElem = this.createElement("div", "class", "balance profile-item");
        balElem.innerHTML = `${span.outerHTML} ${bal}`; 
        ctn.appendChild(balElem);

        const userActionsContainer = this.createElement("div", "class", "user-actions-container");
        const button1 = this.createElement("button", "class", "borrowing-summary");
        button1.textContent = "Borrowing History";
        const button2 = this.createElement("button", "class", "monthly-contributions");
        button2.textContent = "Monthly Contributions";
        const button3 = this.createElement("button", "class", "profit-share");
        button3.textContent = "Profit Share";
        userActionsContainer.appendChild(button1);
        userActionsContainer.appendChild(button2);
        userActionsContainer.appendChild(button3);
        ctn.appendChild(userActionsContainer);
        this.parentElem.appendChild(ctn);
    }
    
    
    generateProfileGrid(profilesDataArray) {
        profilesDataArray.forEach(profileObject => {
            this.createProfile(profileObject);
        });
    }
    
    createLedgerMonthLayer(title, month, monthObject) {
        let toOrFrom = "";
        let cells = [];
        let hasTransactionCharges="";
        if (title.toLowerCase().trim() === "moneyin") { 
            cells = [...monthObject.moneyIn];
            toOrFrom = "from";
            hasTransactionCharges=false;
        }
        if (title.toLowerCase().trim() === "moneyout") { 
            cells = [...monthObject.moneyOut] ;
            toOrFrom = "to";
            hasTransactionCharges=true;
        }

        const table = this.createElement("table");
        const tableData1 = [{
            content: `${month.toUpperCase()} ${title.toUpperCase()}`,
            isHeader: true,
            rowSpan: 1,
            colSpan: hasTransactionCharges? 5 : 4,
            header: "",
            scope: "column",
            id: month,
        }];
        const headerRow1 = this.createTableRow(tableData1);
        table.appendChild(headerRow1); 

        // Create table column headers
        let headers;
        if(hasTransactionCharges){
                headers = ["NUMBER", "DATE", toOrFrom.toUpperCase(), "AMOUNT (KSHS)","TRANSACTION CHARGES"];
        }
        if(!hasTransactionCharges){
            headers = ["NUMBER", "DATE", toOrFrom.toUpperCase(), "AMOUNT (KSHS)"];
        }
        let initData = [];
        headers.forEach(header => {
            const tableData2 = {
                content: header,
                isHeader: true,
                rowSpan: 1,
                colSpan: 1,
                header: month,
                scope: "column"
            }; 
            initData.push(tableData2);
        });
        const headerRow2 = this.createTableRow(initData);
        table.appendChild(headerRow2); 

        cells.forEach((cell, index) => { //data cells
            let counter = index + 1;
            const rowData = [];
            
            // Cell 1: Number (counter)
            rowData.push({
                content: counter,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "number",
                scope: ""
            });

            // Cell 2: Date
            rowData.push({
                content: cell.date,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "date",
                scope: ""
            });

            // Cell 3 to/from
            rowData.push({
                content: cell[toOrFrom], // Accesses cell.from or cell.to correctly
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: toOrFrom,
                scope: ""
            });

            // Cell 4: Amount
            rowData.push({
                content: cell.amount,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "amount",
                scope: ""
            });

            if(hasTransactionCharges){
                        // Cell 5: transaction charges
                rowData.push({
                    content: cell.transactionCharges,
                    isHeader: false,
                    rowSpan: 1,
                    colSpan: 1,
                    header: "transaction",
                    scope: "",
            });
            }

            const row = this.createTableRow(rowData);
            table.appendChild(row);

        });
        return table;
    }
    
    generateLedger(ledgerData) {
        this.parentElem.innerHTML = ""; 
        for (let month in ledgerData) {
            const table1 = this.createLedgerMonthLayer("moneyin", month, ledgerData[month]); 
            const table2 = this.createLedgerMonthLayer("moneyout", month, ledgerData[month]);       
            this.parentElem.appendChild(table1);
            this.parentElem.appendChild(table2);
        }
    }

    generateGraph(intervals, arrayCoordinates) {

    }
    
    createContributionsTable(year, membersArray) {
        this.parentElem.innerHTML = "";
        const title = this.createElement("h2", "textContent", `MEMBER CONTRIBUTIONS ${year}`);
        this.parentElem.appendChild(title);

        const table = this.createElement("table", "class", "contributions-table");
        const thead = this.createElement("thead");
        const tbody = this.createElement("tbody");

        // ---  Headers ---
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const fixedHeaders = ["ID", "MEMBER NAME", "REG. #S"];
        const allHeaders = [...fixedHeaders, ...months, "TOTAL"];

        const headerData = allHeaders.map(header => ({
            content: header,
            isHeader: true,
            rowSpan: 1,
            colSpan: 1,
            scope: "col",
            header: header.toLowerCase().replace(/[^a-z0-9]/g, "") 
        }));

        const headerRow = this.createTableRow(headerData);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        membersArray.forEach(member => {
            const rowData = [];
            const memberContributions = member.monthlyContributions;
            let totalContribution = 0;
            // Cell 1: ID
            rowData.push({
                content: member.id,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "id",
            });

            // Cell 2: Name 
            rowData.push({
                content: `${member.firstName} ${member.lastName}`,
                isHeader: true, 
                rowSpan: 1,
                colSpan: 1,
                header: "name",
                scope: "row",
                id: `member-${member.id}-name`
            });

            // Cell 3: Registered Numbers
            rowData.push({
                content: member.registeredNumbers,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "reg. #s",
            });

            // Monthly Contributions
            for (const monthKey in memberContributions) {
                const amount = memberContributions[monthKey];
                totalContribution += amount; 
                rowData.push({
                    content: amount,
                    isHeader: false,
                    rowSpan: 1,
                    colSpan: 1,
                    header: monthKey.substring(0, 3).toLowerCase(), // Use month abbreviation for header
                });
            }

            // Final Cell: Total Contribution
            rowData.push({
                content: totalContribution,
                isHeader: false,
                rowSpan: 1,
                colSpan: 1,
                header: "total",
            });

            const row = this.createTableRow(rowData);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.parentElem.appendChild(table);
    }

    createNonPerformingLoansTable(year, nonMembersArray) {
        this.parentElem.innerHTML = "";
        const title = this.createElement("h2", "textContent", `NON-PERFORMING LOANS SUMMARY ${year}`);
        this.parentElem.appendChild(title);

        const nonPerformingLoans = nonMembersArray.filter(loan => loan.isNonPerformingAmount > 0);

        if (nonPerformingLoans.length === 0) {
            const message = this.createElement("p", "textContent", `No non-performing loans recorded for ${year}.`);
            this.parentElem.appendChild(message);
            return;
        }

        const table = this.createElement("table", "class", "npl-table");
        const thead = this.createElement("thead");
        const tbody = this.createElement("tbody");

        // --- Define Headers ---
        const headers = ["ID", "BORROWER NAME", "NON-PERFORMING AMOUNT (KSHS)", "TOTAL PRINCIPAL ARREARS", "TOTAL INTEREST ARREARS"];

        const headerData = headers.map(header => ({
            content: header,
            isHeader: true,
            rowSpan: 1,
            colSpan: 1,
            scope: "col",
            header: header.toLowerCase().replace(/[^a-z0-9]/g, '')
        }));

        const headerRow = this.createTableRow(headerData);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // --- Populate Body Rows ---
        nonPerformingLoans.forEach(loan => {
            const rowData = [];

            // Helper function to sum arrears across all 12 months
            const sumArrears = (type) => {
                return Object.values(loan.borrowingHistory).reduce((sum, monthData) => {
                    return sum + monthData.outstandingArrears[type];
                }, 0);
            };
            
            const totalPrincipalArrears = sumArrears('principle');
            const totalInterestArrears = sumArrears('interest');

            // Cells
            rowData.push({ content: loan.id, isHeader: false, header: "id" });
            rowData.push({ 
                content: `${loan.firstName} ${loan.lastName}`, 
                isHeader: true, 
                scope: "row", 
                header: "borrower name",
                id: `loan-${loan.id}-name`
            });
            rowData.push({ content: loan.isNonPerformingAmount, isHeader: false, header: "non-performing amount" });
            rowData.push({ content: totalPrincipalArrears, isHeader: false, header: "total principal arrears" });
            rowData.push({ content: totalInterestArrears, isHeader: false, header: "total interest arrears" });

            const row = this.createTableRow(rowData);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.parentElem.appendChild(table);
    }

    createLoansSummaryTable(year, loansData) {
        this.parentElem.innerHTML = "";
        const title = this.createElement("h2", "textContent", `TOTAL LOANS SUMMARY ${year}`);
        this.parentElem.appendChild(title);

        // Combine Member and Non-Member loans for unified processing
        const allLoans = [
            ...loansData.members.map(l => ({ ...l, type: 'MEMBER' })),
            ...loansData.nonMembers.map(l => ({ ...l, type: 'NON-MEMBER' }))
        ];

        if (allLoans.length === 0) {
            const message = this.createElement("p", "textContent", `No loans recorded for ${year}.`);
            this.parentElem.appendChild(message);
            return;
        }

        const table = this.createElement("table", "class", "loans-summary-table");
        const thead = this.createElement("thead");
        const tbody = this.createElement("tbody");

        // --- Define Headers ---
        const headers = ["ID", "BORROWER NAME", "TYPE", "TOTAL BORROWED (PRINCIPAL)", "TOTAL PAID (PRINCIPAL)", "OUTSTANDING DEBT", "TOTAL INTEREST PAID"];

        const headerData = headers.map(header => ({
            content: header,
            isHeader: true,
            rowSpan: 1,
            colSpan: 1,
            scope: "col",
            header: header.toLowerCase().replace(/[^a-z0-9]/g, '')
        }));

        const headerRow = this.createTableRow(headerData);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // --- Populate Body Rows ---
        allLoans.forEach(loan => {
            const rowData = [];

            // Helper function to sum values across all 12 months
            const sumMonthlyData = (key) => {
                return Object.values(loan.borrowingHistory).reduce((sum, monthData) => {
                    return sum + monthData[key];
                }, 0);
            };
            
            const totalBorrowed = sumMonthlyData('borrowedPrinciple');
            const totalPaidPrincipal = sumMonthlyData('paidPrinciple');
            const totalPaidInterest = sumMonthlyData('paidInterest');
            const outstandingDebt = totalBorrowed - totalPaidPrincipal;

            // Cells
            rowData.push({ content: loan.id, isHeader: false, header: "id" });
            rowData.push({ 
                content: `${loan.firstName} ${loan.lastName}`, 
                isHeader: true, 
                scope: "row", 
                header: "borrower name",
                id: `loan-${loan.id}-name`
            });
            rowData.push({ content: loan.type, isHeader: false, header: "type" });
            rowData.push({ content: totalBorrowed, isHeader: false, header: "total borrowed" });
            rowData.push({ content: totalPaidPrincipal, isHeader: false, header: "total paid principal" });
            rowData.push({ content: outstandingDebt, isHeader: false, header: "outstanding debt" });
            rowData.push({ content: totalPaidInterest, isHeader: false, header: "total interest paid" });

            const row = this.createTableRow(rowData);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        this.parentElem.appendChild(table);
    }
    generateGraph(intervals, arrayCoordinates, graphTitle) {
    this.parentElem.innerHTML = "";
    const graphContainer = this.createElement("div", "class", "graph-view-container");
    const title = this.createElement("h2", "textContent", graphTitle);
    graphContainer.appendChild(title);
    
    const chartArea = this.createElement("div", "id", title.replace(" ","-").toLowerCase());
    chartArea.classList.add("chart-area");
    const chartInfo = this.createElement("p", "textContent", 
        `Rendering ${title}Line Graph for ${intervals.length} data points.`);
    
    chartArea.setAttribute('data-intervals', JSON.stringify(intervals));
    chartArea.setAttribute('data-coordinates', JSON.stringify(arrayCoordinates));
    
    chartArea.appendChild(chartInfo); // Placeholder content
    
    graphContainer.appendChild(chartArea);
    
    // 5. Append to parent
    this.parentElem.appendChild(graphContainer);
    
    return graphContainer;
}
    restoreDashboard() {
        this.parentElem.innerHTML = "";
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
        const metricTitles = [{
            class: "total-contributions",
            title: "Total Contributions"
        }, {
            class: "total-outstanding-loans-principal",
            title: "Total Outstanding Loans(principal)"
        }, {
            class: "total-outstanding-loans-intrest",
            title: "Total Outstanding Loans(intrest)"
        }, {
            class: "total-cash-at-hand",
            title: "Total Cash At Hand"
        }, {
            class: "chama-bascket",
            title: "Chama Bascket"
        }];

        metricTitles.forEach(item => {
            const dashboardItem = this.createElement("div", "class", "dashboard-item");
            dashboardItem.classList.add(item.class);

            const heading = this.createElement("h2", "textContent", item.title);

            dashboardItem.appendChild(heading);
            this.parentElem.appendChild(dashboardItem);
        });
    }

}
class Events {
    constructor(elements) {
        this.elements = elements;
    }
}
const components = new CreateElements(domElements); 
const eventDelegations = new Events(domElements); 
export {
    domElements,
    components,
    eventDelegations
};