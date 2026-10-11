class MikrotikController {
    constructor(service) {
        this.service = service;
    }

    getSystemResource = async (req, res) => {
        try {
            const data = await this.service.getSystemResource();

            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Gagal mengambil system resource"
            });
        }
    };

    getInterfaces = async (req, res) => {
        try {
            const data = await this.service.getInterfaces();

            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Gagal mengambil interfaces"
            });
        }
    };

    getIpAddresses = async (req, res) => {
        try {
            const data = await this.service.getIpAddresses();

            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: "Gagal mengambil IP addresses"
            });
        }
    };
}

module.exports = MikrotikController;