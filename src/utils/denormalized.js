import { denormalize, schema } from 'normalizr';

export const denormalized = (entities, ids) => {
  const words = new schema.Entity('words');
  const mySchema = { words: [words] };
  const entitie = { words: entities };
  const denormalizedData = denormalize({ words: ids }, mySchema, entitie);
  return denormalizedData;
};
