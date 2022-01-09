import { LightningElement, track, api, wire } from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
export default class CardComponent extends LightningElement {
    @api account;
    @wire (CurrentPageReference) pageRef;
    //fire event onclick of details button
    handledetailClick(event){
        try{
        fireEvent(this.pageRef,'accountlistupdate',event.target.value);
        //event name : accountlistupdate
        }catch(e){
            console.log('exception'+e);
        }

    }
    
}

//test added