const Engine = require('tingodb')();
const fs = require('fs');
const path = require('path');
const tools = require('subheaven-tools');

class Database {
    db = null;
    limiters = {};

    constructor(db_folder='database') {
        db_folder = path.join(process.cwd(), 'local-db', db_folder);
        if (!fs.existsSync(db_folder)) {
            fs.mkdirSync(db_folder, { recursive: true });
        }
        this.db = new Engine.Db(db_folder, {});
    }

    checkFolder = async (folder_path) => {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(folder_path)) {
                fs.mkdir(folder_path, { recursive: true }, (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(true);
                });
            } else {
                resolve(true);
            }
        });
    }

    objectID = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = new Engine.ObjectID(id);
                resolve(result);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    insert = async (collection, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = this.db.collection(collection).insert(data);
                await this.check_limit(collection);
                resolve(result);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    find = async (collection, query = {}) => {
        return new Promise((resolve, reject) => {
            try {
                this.db.collection(collection).find(query).toArray((err, dataset) => {
                    if (err) reject(err);
                    resolve(dataset);
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    find_one = async (collection, query = {}) => {
        return new Promise((resolve, reject) => {
            try {
                this.db.collection(collection).find(query).toArray((err, dataset) => {
                    if (err) reject(err);
                    if (dataset.length > 0) {
                        resolve(dataset[0]);
                    } else {
                        resolve(null)
                    }
                });
            } catch (ex) {
                reject(ex);
            }
        });
    }

    update = async (collection, query, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = this.db.collection(collection).update(query, { '$set': data });
                await this.check_limit(collection);
                resolve(result);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    delete = async (collection, query) => {
        return new Promise((resolve, reject) => {
            try {
                let result = this.db.collection(collection).remove(query);
                resolve(result);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    set_limit = async (collection, size) => {
        this.limiters[collection] = size;
    }

    check_limit = async (collection) => {
        if (this.limiters[collection]) {
            let dataset = await this.find(collection);
            while (dataset.length > this.limiters[collection]) {
                this.delete(collection, { _id: dataset[0]._id.id });
                dataset.shift();
            }
        }
    }
}

module.exports = (db_path='') => {
    return new Database(db_path);
}