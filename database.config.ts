import Dexie from "dexie";

const database = new Dexie("SearchApp");
database.version(1).stores({
  history: '++id, search, rating, minPrice, maxPrice',
});

export const historyTable = database.table('history');
export default database;