const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

/*const customers = [
  {id: 1, name:'John Dow', email:'jdow@email.com', age: 35},
  {id: 2, name:'Steve Smith', email:'smith@email.com', age: 25},
  {id: 3, name:'Stephanie Lane', email:'slane@email.com', age: 30},
];*/

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
        return axios.get('http://localhost:3000/customers/'+args.id).then(res => res.data);
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentvalue, args){
        return axios.get('http://localhost:3000/customers/').then(res => res.data);
      }
    }
  }

});

module.exports = new GraphQLSchema({
  query: RootQuery
});
