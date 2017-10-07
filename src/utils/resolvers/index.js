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
        delete: (Model) => (unusedFirstParameter, args) => {
            const { input, } = args
            db.delete(Model.name, input)
            return {
                id: input.id,
            }
        }
    }
}
