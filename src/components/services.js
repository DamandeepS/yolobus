const API = (() => {
    const API_URL = `http://demo3802089.mockable.io/schedule`;
    
    return {
        getContent: async() => {
            return fetch(API_URL).then(resp => resp.json());
        }
    }

})();

export default API;