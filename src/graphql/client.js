import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://materialusm.herokuapp.com/graphql'

export default new GraphQLClient(endpoint)
