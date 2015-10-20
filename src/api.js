const headers = [{id: 1, header: 'hej'}, {id: 2, header: 'hopp'}];
const bodies = {1: 'body 1 abc qwe', 2: 'body 2 qqqbbba'};


export default {
    getHeaders() {
        return new Promise((resolve) => resolve(headers));
    },

    getBody(id) {
        return new Promise((resolve) => resolve(bodies[id]))
    }
};

