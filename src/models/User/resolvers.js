import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'

import OrdersModel from '../Order/model';
import VehiclesModel from '../Vehicle/model';

export default {
    Query: {
        users: Resolvers.Query.list(Model),
        user(root, { id }) {
            return Resolvers.Query.getById(Model, id);
        },
        profitableUsers(root, { top }) {
            // 1. create a dictionary resolving the value of each vehicle
            // this assumes that the price of vehicles never change, although the data shows the contrary
            // in either case, there is no way to identify which order belongs to a given customer
            // so, this assumption is necessary
            let vehiclePrices = [];
            Resolvers.Query.list(OrdersModel).map(order => {
                vehiclePrices[order.vehicleId] = order.price;
            });
            
            
            //2. Build the ranking of spend for each user
            let rankingSpent = new Map();
            Resolvers.Query.list(VehiclesModel).map(vehicle => {
                let oldValue = rankingSpent.get(vehicle.userId);
                if (typeof oldValue === 'undefined') {
                    oldValue = 0;
                    rankingSpent.set(vehicle.userId, oldValue);
                }
                if (vehiclePrices[vehicle.id]) {
                    rankingSpent.set(vehicle.userId, oldValue + parseInt(vehiclePrices[vehicle.id]));
                }
            });
            
            //3. Sort the ranking and get only the top
            let rankingSpentSorted =
                [...rankingSpent.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, top);
            
            
            ///4. Get the full user data for each one
            const result = rankingSpentSorted.map(ranked => {
                let user = {
                    user: Resolvers.Query.getById(Model, ranked[0]),
                    spend: ranked[1]
                };
                return user
            });
            
            return result;
        }
    },
    Mutation: {
        deleteUser: Resolvers.Mutation.delete(Model),
    },
    User: {
        vehicles: (obj, args, context) => {
            return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
        },
    },
}
