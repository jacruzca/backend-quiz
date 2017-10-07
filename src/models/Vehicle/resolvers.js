import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
    Query: {
        vehicles: Resolvers.Query.list(Model),
    },
    Mutation: {
        createVehicle(root, input) {
            const vehicle = Resolvers.Mutation.create(Model, input.input)
            
            return {
                vehicle
            }
        }
    },
}
