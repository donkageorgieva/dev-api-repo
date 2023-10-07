import { signUp } from "../../controllers/user.controller";
import UserModel from "../../mongodb/models/user";

jest.mock("../../mongodb/models/user");

const mockResponse = () => {
  const res = {} as Response;
  //@ts-ignore
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

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
    const res = mockResponse();
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
    const res = mockResponse();
    //@ts-ignore
    UserModel.findOne.mockResolvedValue(null);
    //@ts-ignore
    await signUp(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Passwords don't match" });
  });
});
