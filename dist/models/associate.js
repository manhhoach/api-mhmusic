"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
function associate(sequelizeConnection) {
    sequelizeConnection.sync({ force: true });
}
exports.associate = associate;
