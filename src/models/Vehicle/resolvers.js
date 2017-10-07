import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
    Query: {
        vehicles() {
            return Resolvers.Query.list(Model)
        }
    },
    Mutation: {
        createVehicle(root, input) {
            const vehicle = Resolvers.Mutation.create(Model, input.input);
            return {
                vehicle
            }
        },
        updateVehicle(root, input) {
            const vehicle = Resolvers.Mutation.update(Model, input.input);
            return {
                vehicle
            }
        }
    },
}
