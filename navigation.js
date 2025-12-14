const navElements={
    hamburgerButton: document.querySelector(".hamburger-menu-button"),
    closeButton: document.querySelector(".menu-close-button"),
    navMenu: document.querySelector(".nav-menu"),
    dashboard: document.querySelector(".dashboard-container"),
    navigationRibbon: document.querySelector(".navigation-ribbon"),
}
class NavigationElements{
    constructor(navElems){
        this.navElems=navElems;
    }
}
class NavigationEngine{
    constructor(navClass){
        this.navClass=navClass;
    }
}

const navigation=new NavigationEngine(navElements);