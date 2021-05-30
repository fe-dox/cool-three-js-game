const dataStore = require('nedb')
const path = require("path");

class Database {
    static dataStores = {};

    static GetDatabase(dbName) {
        if (!this.dataStores[dbName]) {
            this.dataStores[dbName] = new dataStore({filename: path.join(__dirname + dbName + '.nedb'), autoload: true})
        }
        return this.dataStores[dbName]
    }
}

module.exports = Database

