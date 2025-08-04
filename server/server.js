import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'

const users = [
    {
        id: 1,
        name: 'Jacklyn McDonald',
        age: 20,
        isAdmin: false
    },
    {
        id: 2,
        name: 'Martin Armstrong',
        age: 25,
        isAdmin: true
    }
]

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }
    type Mutation {
        createUser(name: String!, age: Int!, isAdmin: Boolean = false): User
    }
    type User {
        id: ID!
        name: String
        age: Int
        isAdmin: Boolean
    }
`

const resolvers = {
Query:{
    getUsers: ()=>users,
    getUserById: (parent,args)=> users.find(user=>user.id==args.id)
},
Mutation:{
    createUser: (parent, args) => {
        const newUser = {
            id: (users.length + 1).toString(),
            name: args.name,
            age: args.age,
            isAdmin: args.isAdmin !== undefined ? args.isAdmin : false
        };
        users.push(newUser);
        return newUser;
    }
}
}

const server = new ApolloServer({typeDefs,resolvers});

const {url} = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
