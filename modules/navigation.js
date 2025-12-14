
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