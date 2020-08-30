import { GraphQLClient } from 'graphql-request'

/*const endpoint = 'https://materialusm.herokuapp.com/graphql'*/
const endpoint = 'http://localhost:4000/graphql'

export default new GraphQLClient(endpoint)
