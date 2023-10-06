import { getSavedApis } from "../../controllers/savedapi.controller";
import SavedApiModel from "../../mongodb/models/savedapi";
import express, { Response } from "express";
describe("savedapi controller tests", () => {
  jest.mock("../../mongodb/models/savedapi");
  const mockedFind = jest.fn();
  const originalFind = SavedApiModel.find;
  beforeEach(() => {
    SavedApiModel.find = mockedFind;
  });
  afterEach(() => {
    SavedApiModel.find = originalFind;
  });

  it("should return 200 status code if saved apis array exists ", async () => {
    mockedFind.mockResolvedValue({ allSavedApis: [] });
    const req = {} as express.Request;
    const res = {
      status: jest.fn().mockReturnThis(),
    };

    await getSavedApis(req, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
