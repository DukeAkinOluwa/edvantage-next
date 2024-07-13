import { openDB } from 'idb';

const DB_NAME = 'user_db';
const STORE_NAME = 'tasks';

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    },
  });
};

export const addTask = async (task) => {
  const db = await getDB();
  return db.add(STORE_NAME, task);
};

export const getAllTasks = async () => {
  const db = await getDB();
  return db.getAll(STORE_NAME);
};

export const updateTask = async (task) => {
  const db = await getDB();
  return db.put(STORE_NAME, task);
};
