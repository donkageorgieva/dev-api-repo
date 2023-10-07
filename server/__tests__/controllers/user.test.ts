import { signUp } from "../../controllers/user.controller";
import UserModel from "../../mongodb/models/user";
import { mockResponseWithJson } from "../../utils/__tests__/mockResponse";
import jwt from "jsonwebtoken";
jest.mock("../../mongodb/models/user");

describe("signUp controller", () => {
  it("should return status 400 if user already exists", async () => {
    //@ts-ignore
    const req = {
      body: {
        email: "existingUser@example.com",
        password: "password123",
        confirmPassword: "password123",
        username: "testuser",
      },
    } as Request;
    const res = mockResponseWithJson();
    //@ts-ignore
    UserModel.findOne.mockResolvedValue({ email: req.body.email });
    //@ts-ignore
    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });
  it("should return status 400 if passwords don't match", async () => {
    const req = {
      body: {
        email: "abcd@gmail.com",
        password: "1234",
        confirmPassword: "12346",
        username: "test",
      },
    };
    const res = mockResponseWithJson();
    //@ts-ignore
    UserModel.findOne.mockResolvedValue(null);
    //@ts-ignore
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Passwords don't match" });
  });
  it("should create a new user and return status 200 with a token", async () => {
    const req = {
      body: {
        email: "test66666@gmail.com",
        password: "1234",
        confirmPassword: "1234",
        username: "test",
      },
    };
    const res = mockResponseWithJson();
    //@ts-ignore
    UserModel.findOne.mockResolvedValue(null);
    //@ts-ignore
    UserModel.create.mockResolvedValue({
      username: "test",
      email: "test66666@gmail.com",
      password: "1234",
      _id: "1233",
    });
    const expectedToken = "mockedToken";
    //@ts-ignore
    jest.spyOn(jwt, "sign").mockReturnValue(expectedToken);
    //@ts-ignore
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      email: req.body.email,
      username: req.body.username,
      token: expectedToken,
    });
  });
});
