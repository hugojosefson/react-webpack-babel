const headers = [{id: 1, header: 'hej'}, {id: 2, header: 'hopp'}];
const bodies = {1: 'body 1 abc qwe', 2: 'body 2 qqqbbba'};


export default {
    getHeaders() {
        return new Promise((resolve) => setTimeout(() => resolve(headers), 700));
    },

    getBody(id) {
        return new Promise((resolve) => setTimeout(() => resolve(bodies[id]), 700))
    }
};