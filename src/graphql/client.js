import { GraphQLClient } from 'graphql-request'
// 'http://localhost:4000/graphql'
const endpoint = process.env.NODE_ENV === 'development' ?
    'https://materialusm.herokuapp.com/graphql'
    :
    'https://materialusm.herokuapp.com/graphql'

export default new GraphQLClient(endpoint)
