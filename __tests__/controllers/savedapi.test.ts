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

  it("should return valid data and status code of 200  ", async () => {
    mockedFind.mockResolvedValue({
      allSavedApis: [
        { API: "test api" },
        { API: "test api 2" },
        { API: "test api 3" },
      ],
    });
    const req = {} as express.Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      allSavedApis: Array<typeof SavedApiModel>,
    };

    await getSavedApis(req, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res).toHaveProperty("allSavedApis");
  });
});
