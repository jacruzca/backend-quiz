import BaseModel from '../BaseModel'

export default class User extends BaseModel {
    
    constructor(args) {
        super(args);
        if (this.firstName && this.lastName) {
            this.displayName = this.firstName + ' ' + this.lastName.charAt(0) + ".";
        }
    }
    
}
