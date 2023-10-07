import { getSavedApis } from "../../controllers/savedapi.controller";
import SavedApiModel from "../../mongodb/models/savedapi";
import { mockRequestAndResponse } from "../../utils/mockRequestAndResponse";

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
    const { req, res } = mockRequestAndResponse({
      allSavedApis: Array<typeof SavedApiModel>,
    });

    await getSavedApis(req, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res).toHaveProperty("allSavedApis");
  });
  it("should send status code of 404 upon error  ", async () => {
    mockedFind.mockResolvedValue({});
    const { req, res } = mockRequestAndResponse();
    await getSavedApis(req, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res).not.toHaveProperty("allSavedApis");
  });
});
