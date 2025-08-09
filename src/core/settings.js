import e from "express";
import * as vali from "valibot";

export const setupMiddleware = (app) => {
  app.use(e.json());
  app.use(e.urlencoded({ extended: true }));
};

export const getFinalError = (error) => {
  const isSchemaError = vali.isValiError(error)

  return isSchemaError
    ? error?.issues?.map((issue) => issue.message)
    : new Error(error);
};

export const v = vali;
