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

export const mockResponseWithJson = () => {
  const res = {} as Response;
  //@ts-ignore
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
