const { RESTDataSource } = require('apollo-datasource-rest');

class ClientAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://www.mocky.io/v2/';
    }

    async getAllClients() {
        const response = await this.get('5808862710000087232b75ac');
        return Array.isArray(response.clients)
            ? response.clients.map(client => this.clientReducer(client))
            : [];
    }

    clientReducer(client) {
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            role: client.clientId,
        };
    }
}

module.exports = ClientAPI;
