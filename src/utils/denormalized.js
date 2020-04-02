import { denormalize, schema } from 'normalizr';

export const denormalized = (entities, ids) => {
  const words = new schema.Entity('words');
  const mySchema = { words: [words] };
  const data = { words: entities };
  return denormalize({ words: ids }, mySchema, data);
};
