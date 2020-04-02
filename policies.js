const { RESTDataSource } = require('apollo-datasource-rest');

class PolicyAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://www.mocky.io/v2/';
    }

    async getAllPolicies() {
        const response = await this.get('580891a4100000e8242b75c5');
        return Array.isArray(response.policies)
            ? response.policies.map(policy => this.policyReducer(policy))
            : [];
    }

    policyReducer(policy) {
        return {
            id: policy.id,
            // amountInsured: policy.amountInsured,
            email: policy.email,
            // inceptionDate: policy.inceptionDate,
            // installmentPayment: policy.installmentPayment,
            clientId: policy.clientId,
        };
    }

}

module.exports = PolicyAPI;