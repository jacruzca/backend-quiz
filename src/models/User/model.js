import BaseModel from '../BaseModel'

export default class User extends BaseModel {
    
    constructor(args) {
        super(args);
        this.displayName = this.firstName + ' ' + this.lastName;
    }
    
}
