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

    let totalItems;
    let totalFiles;
    // '(' is queryDynamicParameters initial value
    if(queryDynamicParameters === '') {
        const {filesAmount, files} = await executeQuery(`${baseQuery} filesAmount`)
        totalItems = filesAmount
        totalFiles = files
    } else {
        const {filesAmount, files} = await executeQuery(`${baseQuery} filesAmount (${queryDynamicParameters})`)
        totalItems = filesAmount
        totalFiles = files
    }

    return {files: totalFiles, totalPages:Math.ceil(totalItems / 6)}
}

