import { Model } from "mongoose";

export const mockFindModel = (model: Model<any>, mockedFind: () => any) => {
  const originalFind = Model.find;
  return (function () {
    beforeEach(() => {
      Model.find = mockedFind;
    });
    afterEach(() => {
      Model.find = originalFind;
    });
  })();
};
