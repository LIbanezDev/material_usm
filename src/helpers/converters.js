export function getAsString(value) {
    if(Array.isArray(value)) {
        return value[0];
    }
    return value;
}

export function getValueNumber(value) {
    const str = getValueStr(value);
    const number = parseInt(str);
    return isNaN(number) ? null : number;
}

export function getValueStr(value) {
    const str = getAsString(value);
    return !str || str.toLowerCase() === 'all' ? null : str;
}

export const getFormatedQuery = (query) => {

    const currentPage = getValueNumber(query.page) || 1;
    const rowsPerPage = getValueNumber(query.itemsPerPage) || 6;
    const offset = (currentPage - 1) * rowsPerPage;

    let queryDynamicParameters = '';

    queryDynamicParameters +=
        (getValueStr(query.type)) ? `careerType: "${query.type}"` : ''
    queryDynamicParameters +=
        (getValueNumber(query.career) && getValueNumber(query.career) !== 0) ? `, careerId: ${query.career}` : ''
    queryDynamicParameters +=
        (getValueNumber(query.semester) && getValueNumber(query.semester) !== 0) ? `, semester: ${query.semester}` : ''
    queryDynamicParameters +=
        (getValueNumber(query.subject) && getValueNumber(query.subject) !== 0) ? `, subjectId: ${query.subject}` : ''

    const queryStaticParameters = `, limit: ${rowsPerPage}, offset: ${offset}`

    return {queryDynamicParameters, queryStaticParameters}
}