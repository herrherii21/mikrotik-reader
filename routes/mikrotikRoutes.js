const express = require("express");

const router = express.Router();

module.exports = (controller) => {

    router.get(
        "/system",
        controller.getSystemResource
    );

    router.get(
        "/interfaces",
        controller.getInterfaces
    );

    router.get(
        "/ip-addresses",
        controller.getIpAddresses
    );

    return router;
};