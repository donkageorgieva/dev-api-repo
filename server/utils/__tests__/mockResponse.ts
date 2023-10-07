import express from "express";

export const mockResponse = (responseValuesConfig?: Record<string, any>) => {
  const req = {} as express.Request;
  const res = {
    status: jest.fn().mockReturnThis(),

    ...responseValuesConfig,
  };

  return {
    req,
    res,
  };
};
