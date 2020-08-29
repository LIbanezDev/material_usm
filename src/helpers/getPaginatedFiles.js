import {executeQuery} from "../graphql/queries";
import {getFormatedQuery, getValueNumber, getValueStr} from "./converters";

export const getPaginatedFiles = async query => {

    const {queryDynamicParameters, queryStaticParameters} = getFormatedQuery(query)

    const baseQuery = `files (${queryDynamicParameters} ${queryStaticParameters}) {
        id
        name
        url
        createdAtFormated
        createdAt
        updatedAt
        Subject {
            name
            semester
            Career{
                name
                type
            }
        }
    }`

    const {files} = await executeQuery(baseQuery)

    let totalItems;

    // '(' is queryDynamicParameters initial value
    if(queryDynamicParameters === '') {
        const {files: items} = await executeQuery(`files { id }`)
        totalItems = items
    } else {
        const {files: items} = await executeQuery(`files (${queryDynamicParameters}) { id }`)
        totalItems = items
    }

    return {files, totalPages:Math.ceil(totalItems.length / 6)}
}

