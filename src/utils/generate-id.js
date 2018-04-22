const getNextIndex = index => () => index++;
const generateId = getNextIndex(0);

export default generateId;
