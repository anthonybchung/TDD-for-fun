import { rest } from "msw";

const users = [
  {
    userName: "anthony",
    password: "123456",
  },
  {
    userName: "bernie",
    password: "123456",
  },
  {
    userName: "Charlie",
    password: "123456",
  },
];
export const handlers = [
  rest.post("https://abchungstack.us/api/v1/auth/login", (req, res, ctx) => {
    const { userName, password } = req.body;
    return res(
      ctx.status(200),
      ctx.json({ userName: users[2].userName, password: users[2].password })
    );
  }),
];
