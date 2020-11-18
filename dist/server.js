"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
/**
 * Create Express server at specific port.
 */
const app = express_1.default();
const PORT = 8080;
/**
 * Express configuration
 */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/**
 * Routing to router
 */
app.use('/v1', index_1.default);
/**
 * Error Handler.
 */
app.use((err, req, res, next) => {
    const defaultErr = {
        log: "Express error handler caught unknown error",
        status: 400,
        message: { err: "an error occured" },
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status || 500).send(errorObj.message);
});
/**
 * Start Express server at specified port.
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
exports.default = app;
//# sourceMappingURL=server.js.map