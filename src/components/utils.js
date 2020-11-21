/**
 * 
 * @param {property} id 
 * @param {object} content 
 */
const valueReducer = (id, content) => id?.split('.').reduce((result, id) => result && result[id], content);

const getDateFromTimeStamp = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
export { valueReducer, getDateFromTimeStamp };