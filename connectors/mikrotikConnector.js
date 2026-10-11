const { MikrotikAPI } = require("@fibercom/routeros-api");

class MikrotikConnector {
    constructor(config) {
    this.api = new MikrotikAPI({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        timeout: 10
    });

    this.api.on("error", (error) => {
        console.error("Router API error:", error.message);
    });

    this.api.on("timeout", (error) => {
        console.error("Router API timeout:", error.message);
    });
}

    async connect() {
    console.log("Connector: mencoba koneksi ke MikroTik...");

    await this.api.connect();

    console.log("Connector: koneksi berhasil!");
}

    async getSystemResource() {
    console.log("Connector: meminta system resource");

    const result = await this.api.write("/system/resource/print");

    console.log("Connector: response diterima");

    const resource = result[0];

    return {
        uptime: resource.uptime,
        routerOS: resource.version,
        board: resource["board-name"],
        platform: resource.platform,
        architecture: resource["architecture-name"],

        cpu: {
            model: resource.cpu,
            count: Number(resource["cpu-count"]),
            frequencyMHz: Number(resource["cpu-frequency"]),
            loadPercent: Number(resource["cpu-load"])
        },

        memory: {
            totalBytes: Number(resource["total-memory"]),
            freeBytes: Number(resource["free-memory"])
        },

        storage: {
            totalBytes: Number(resource["total-hdd-space"]),
            freeBytes: Number(resource["free-hdd-space"])
        }
    };
}

    async getInterfaces() {
    console.log("Connector: meminta interfaces");

    const interfaces = await this.api.write("/interface/print");

    console.log("Connector: response interfaces diterima");

    return interfaces.map((item) => ({
        id: item[".id"],
        name: item.name,
        type: item.type,
        macAddress: item["mac-address"],
        mtu: Number(item.mtu),
        status: item.running === "true" ? "UP" : "DOWN",
        disabled: item.disabled === "true",
        rxBytes: Number(item["rx-byte"]),
        txBytes: Number(item["tx-byte"]),
        rxPackets: Number(item["rx-packet"]),
        txPackets: Number(item["tx-packet"]),
        rxErrors: Number(item["rx-error"]),
        txErrors: Number(item["tx-error"])
    }));
}

    async getIpAddresses() {
    console.log("Connector: meminta IP addresses");

    const addresses = await this.api.write("/ip/address/print");

    console.log("Connector: response IP addresses diterima");

    return addresses.map((item) => ({
        id: item[".id"],
        address: item.address,
        network: item.network,
        interface: item.interface,
        dynamic: item.dynamic === "true",
        disabled: item.disabled === "true",
        invalid: item.invalid === "true"
    }));
}

    async disconnect() {
        await this.api.close();
    }
}

module.exports = MikrotikConnector;