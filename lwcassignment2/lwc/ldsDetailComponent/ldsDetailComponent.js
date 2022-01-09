import { LightningElement, api, wire, track } from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
import { registerListener,unregisterAllListeners } from 'c/pubsub';
import { fireEvent } from 'c/pubsub'; //refresh data
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LdsDetailComponent extends LightningElement {
    @api accountRecordId;
    @track editButton = false;
    @track editButtonVisible = false;
    objectApiName = 'Account';
   
    @wire(CurrentPageReference) pageRef;
    //constructor load
    constructor(){
        super();
    }
    connectedCallback() {
        //register event when details button is clicked in cardcomponent (cc2)
        registerListener("accountlistupdate",this.handleAccount,this);
        }

        //setting account id
        handleAccount(data){
        this.accountRecordId = data.Id;
        }
        //handling visibility of edit,save,cancel button
        handleEditClick(){
            this.editButton = true;
            
        }
        handleReset(){
            this.editButton = false;
            
        }
        handleSucess(event){
            //fire event again to the cardcomponent to updte the view of account detail which updated
            fireEvent(this.pageRef,'refreshaccount',event.target.value); //refresh apex

            this.editButton = false;
           //toast event on sucess of Account update
            const evt = new ShowToastEvent({
                title: 'Record Update',
                message: 'Account is Updated ',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
         }

    disconnectedCallback() {
           unregisterAllListeners(this);
         }

}