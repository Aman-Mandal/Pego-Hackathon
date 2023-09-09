import { createSchema } from "../helpers/polybaseSchema.js";

export const createSchemaHandler = async (req, res, next) => {
  ///call this only once per updated schema
  try {
    const response = await createSchema();

    res.json({ response: response });
  } catch (err) {
    next(err);
  }
};
