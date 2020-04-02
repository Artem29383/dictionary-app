import { normalize, schema } from 'normalizr';

export const normalized = (data, field) => {
  const dictionarySchema = new schema.Entity(field);
  const dictionary = [dictionarySchema];
  return normalize(data, dictionary);
};
