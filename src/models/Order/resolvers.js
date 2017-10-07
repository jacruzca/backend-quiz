import Model from './model'
import { Resolvers, } from '../../utils'

export default {
    Query: {
        orders() {
            return Resolvers.Query.list(Model);
        }
    },
}
