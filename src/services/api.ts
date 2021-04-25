import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/thonecardoso/fakeJsonServerForPodcastr' || 'http://localhost:3333/'
})