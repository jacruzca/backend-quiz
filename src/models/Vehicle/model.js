import BaseModel from '../BaseModel'

const makes = {
    Acura: ['MDX', 'RDX', 'ILX'],
    Audi: ['A4', 'Q5', 'Q7'],
    BMW: ['325', '750'],
    Ford: ['Taurus', 'F150'],
    Honda: ['CR-V', 'Accord'],
    Jaguar: ['XJ', 'XF', 'XE'],
    Jeep: ['Grand Cherokee'],
    Toyota: ['RAV4', 'Corolla', 'Camry'],
};

export default class Vehicle extends BaseModel {
    
    save() {
        const thisMake = makes[this.make];
        if (!thisMake ||
            thisMake.indexOf(this.model) === -1) {
            throw new Error('Invalid make')
        }
        
        super.save();
    }
    
    static async isValidConfiguration(params) {
        const results = await vehicleSearch({
            vehicleId: params.vehicleId,
            engineConfigId: params.engineConfigId,
            transmissionControlTypeId: params.transmissionControlTypeId,
        })
        return results.length > 0
    }
}
