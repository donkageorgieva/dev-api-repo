import { getSavedApis } from "../../controllers/savedapi.controller";
import SavedApiModel from "../../mongodb/models/savedapi";
import { mockFindModel } from "../../utils/__tests__/mockFindModel";
import { mockResponse } from "../../utils/__tests__/mockResponse";

describe("savedapi controller tests", () => {
  jest.mock("../../mongodb/models/savedapi");
  const mockedFind = jest.fn();
  mockFindModel(SavedApiModel, mockedFind);

  it("should return valid data and status code of 200  ", async () => {
    mockedFind.mockResolvedValue({
      allSavedApis: [
        { API: "test api" },
        { API: "test api 2" },
        { API: "test api 3" },
      ],
    });
    const { req, res } = mockResponse({
      allSavedApis: Array<typeof SavedApiModel>,
    });

    await getSavedApis(req, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res).toHaveProperty("allSavedApis");
  });
  it("should send status code of 404 upon error  ", async () => {
    mockedFind.mockResolvedValue({});
    const { req, res } = mockResponse();
    await getSavedApis(req, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res).not.toHaveProperty("allSavedApis");
  });
});
