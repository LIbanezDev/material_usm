import {gql} from 'graphql-request';
import graphql from "./client";

export const executeQuery = async query => {

    const GET_FROM_DB = gql`
      query GetFromDB {
        ${query}
    }
    `
    return await graphql.request(GET_FROM_DB)

}