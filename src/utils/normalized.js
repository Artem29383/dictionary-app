import { normalize, schema } from 'normalizr';

export const normalized = data => {
  const dictionarySchema = new schema.Entity('dictionary');
  const dictionary = [dictionarySchema];
  return normalize(data, dictionary);
};
