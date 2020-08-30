import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NODE_ENV === 'development' ?
    'http://localhost:4000/graphql'
    :
    'https://materialusm.herokuapp.com/graphql'

export default new GraphQLClient(endpoint)
