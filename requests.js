const { get } = require('./api');

const getUsersData = () => get('https://jsonplaceholder.typicode.com/users');
const getPostsData = () => get('https://jsonplaceholder.typicode.com/posts');

module.exports = { getUsersData, getPostsData };