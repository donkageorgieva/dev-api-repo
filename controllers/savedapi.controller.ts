import SavedApiModel from "../mongodb/models/savedapi";
import express, { Response } from "express";
const getSavedApis = async (req: express.Request, res: Response) => {
  try {
    const allSavedApis = await SavedApiModel.find();
    return res.status(200).json(allSavedApis);
  } catch (error) {
    return res.status(404);
  }
};

// const postSavedApi = async (req: express.Request, res: express.Response) => {
//   try {

//   } catch (error) {}
// };
// const updateSavedApi = async (req: express.Request, res: express.Response) => {

//   try {
//   } catch (error) {}
// };
// const deleteSavedApi = async (req: express.Request, res: express.Response) => {
//   try {
//   } catch (error) {}
// };

export { getSavedApis };
