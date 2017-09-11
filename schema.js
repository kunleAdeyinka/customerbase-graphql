const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const customers = [
  {id: 1, name:'John Dow', email:'jdow@email.com', age: 35},
  {id: 2, name:'Steve Smith', email:'smith@email.com', age: 25},
  {id: 3, name:'Stephanie Lane', email:'slane@email.com', age: 30},
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    customer: {
      type: CustomerType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
        for(let i=0; i< customers.length; i++){
          if(customers[i].id == args.id){
            return customers[i];
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentvalue, args){
        return customers;
      }
    }
  }

});

module.exports = new GraphQLSchema({
  query: RootQuery
});