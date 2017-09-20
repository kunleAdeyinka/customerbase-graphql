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

const mutation = new GraphQLObjectType({
  name: 'Mutiation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentvalue, args){
        return axios.post('http://localhost:3000/customers/', {
          name:args.name,
          email: args.email,
          age: args.age
        }).then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentvalue, args){
        return axios.delete('http://localhost:3000/customers/'+args.id);
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parentvalue, args){
        return axios.patch('http://localhost:3000/customers/'+args.id, args).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:mutation
});
