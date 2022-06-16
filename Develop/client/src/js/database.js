import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  const jateDb = await openDB('jate', 1);
  const transaction = jateDb.transaction('jate', 'readwrite');
  const save = transaction.objectStore('jate');
  const request = save.put({ id: 1, text: content });
  const result = await request;

  console.log(result, ' saved successfully');
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  
  const jateDb = await openDB('jate', 1);
  const transaction = jateDb.transaction('jate', 'readonly');
  const save = transaction.objectStore('jate');
  const request = save.get(id);
  const result = await request;
  
  console.log(result, ' retrieved successfully');
  
  if(result) {
    return result.text;
  } else {
    return;
  }
  
}

initdb();
