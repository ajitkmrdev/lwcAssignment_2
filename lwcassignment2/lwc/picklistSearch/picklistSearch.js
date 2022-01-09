import { LightningElement, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import getAccountRecordTypeId from '@salesforce/apex/parentSearchController.getAccountRecordTypeId';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class PicklistSearch extends LightningElement {
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;
  @wire(getAccountRecordTypeId)accountRecordType;
    //method to fetch picklist value from account object
    //fetching default recordtypeId and Type picklist value through wire service
    @wire(getPicklistValues,{
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName:TYPE_FIELD
    })picklistValues;

    @api selectedFieldType; // variable to store changed value of the picklist input
    constructor(){
        super();
      
    }
    connectedCallback(){
        
    }
    //handle method on chamge of picklist field value
    handleChange(event){
        this.selectedFieldType = event.target.value;
    }

    //handle search on click of button
    handleClick(event){
        event.preventDefault();

        // Creates the event with the picklist data.
        const selectedEvent = new CustomEvent('picklistsearchevent', { detail: this.selectedFieldType });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}