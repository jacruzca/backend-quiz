import data from './data'

class Database {
    constructor() {
        this.data = data
    }
    
    get(modelName) {
        const model = require(`./models/${modelName}/model`).default;
        return this.data[modelName].map(m => new model(m));
    }
    
    getById(modelName, id) {
        const model = require(`./models/${modelName}/model`).default
        const found = this.data[modelName].find(m => m.id === id);
        if (found) {
            return new model(found);
        }
        
        return new model({});
    }
    
    set(modelName, datum) {
        // You should write this method
        // and use it for inserts and updates
        const model = require(`./models/${modelName}/model`).default
        this.data[modelName].push(datum);
        return new model(datum);
    }
    
    delete(modelName, datum) {
        const data = this.data[modelName]
        this.data[modelName] = data.filter(obj => obj.id !== datum.id)
    }
}

export default new Database()
