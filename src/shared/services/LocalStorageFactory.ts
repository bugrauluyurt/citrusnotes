import * as localForage from 'localforage';

const DB_DEFAULT = 'citrusnotes';
const STORE_DEFAULT = 'application';

const LocalForageDefaultDrivers = [
    localForage.INDEXEDDB,
    localForage.WEBSQL,
    localForage.LOCALSTORAGE,
];

class LocalDB {
    private storeName: string;
    private drivers: string[] = LocalForageDefaultDrivers;
    private store: LocalForage;
    constructor(storeName: string, drivers?: string[]) {
        if (!storeName) {
            throw new Error('Localstore name should be provided');
        }
        this.storeName = storeName;
        this.drivers = drivers || LocalForageDefaultDrivers;
        this.store = localForage.createInstance({ name: DB_DEFAULT, storeName });
        this.store.setDriver(this.drivers);
    }
    getStoreName(): string {
        return this.storeName;
    }
    getDrivers(): string[] {
        return this.drivers;
    }
    getItem(key: string): Promise<any> {
        return this.store.getItem(key);
    }
    setItem(key: string, value: string): Promise<any> {
        return this.store.setItem(key, value);
    }
}

class LocalStorageFactory {
    private store: LocalDB = new LocalDB(STORE_DEFAULT);
    getDefaultStore(): LocalDB {
        return this.store;
    }
    static create(storeName: string): LocalDB {
        return new LocalDB(storeName);
    }
}

export default new LocalStorageFactory();
