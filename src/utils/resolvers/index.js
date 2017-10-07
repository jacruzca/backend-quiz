import db from '../../db'

export const Resolvers = {
    Query: {
        list: (Model) => {
            return db.get(Model.name)
        },
        getById: (Model, id) => {
            return db.getById(Model.name, id)
        }
    },
    Mutation: {
        create: (Model, input) => {
            const model = require(`../../models/${Model.name}/model`).default;
            const instance = new model(input);
            instance.save();
            return instance;
        },
        delete: (Model) => (unusedFirstParameter, args) => {
            const { input, } = args
            db.delete(Model.name, input)
            return {
                id: input.id,
            }
        }
    }
}
