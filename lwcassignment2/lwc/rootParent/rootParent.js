import { LightningElement, api } from 'lwc';

export default class RootParent extends LightningElement {

    @api typeValue; //type value to be passed to child cmp 2 
    //onclick of search button assign type value to variable
    handleSearchEvent(event){
        this.typeValue = event.detail;
        
    }
}