class MikrotikService {
    constructor(connector) {
        this.connector = connector;
    }

    async getSystemResource() {
        return await this.connector.getSystemResource();
    }

    async getInterfaces() {
        return await this.connector.getInterfaces();
    }

    async getIpAddresses() {
        return await this.connector.getIpAddresses();
    }
}

module.exports = MikrotikService;