const express = require("express");

const MikrotikConnector = require("./connectors/mikrotikConnector");
const MikrotikService = require("./services/mikrotikService");
const MikrotikController = require("./controllers/mikrotikController");
const createMikrotikRoutes = require("./routes/mikrotikRoutes");

const app = express();

const mikrotikConnector = new MikrotikConnector({
    host: "192.168.10.1",
    port: 8728,
    user: "admin",
    password: "admin"
});

const mikrotikService = new MikrotikService(
    mikrotikConnector
);

const mikrotikController = new MikrotikController(
    mikrotikService
);

app.use(
    "/api/mikrotik",
    createMikrotikRoutes(mikrotikController)
);

app.get("/", (req, res) => {
    res.json({
        message: "MikroTik Monitoring Backend",
        status: "running"
    });
});

async function startServer() {
    try {
        await mikrotikConnector.connect();

        console.log("Berhasil terhubung ke MikroTik!");

        app.listen(3000, () => {
            console.log(
                "Backend berjalan di http://localhost:3000"
            );
        });

    } catch (error) {
        console.error("Gagal memulai aplikasi:");
        console.error(error);
    }
}

startServer();