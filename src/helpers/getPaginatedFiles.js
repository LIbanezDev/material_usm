import {executeQuery} from "../graphql/queries";
import {getFormatedQuery} from "./converters";

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
        const {filesAmount} = await executeQuery(`filesAmount`)
        totalItems = filesAmount
    } else {
        const {filesAmount} = await executeQuery(`filesAmount (${queryDynamicParameters})`)
        totalItems = filesAmount
    }

    return {files, totalPages:Math.ceil(totalItems / 6)}
}

