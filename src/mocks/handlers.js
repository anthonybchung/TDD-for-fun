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

    const isUser = (user) => {
      return user.userName === userName;
    };

    const resValue = users.find(isUser);

    if (resValue === undefined) {
      return res(ctx.status(401), ctx.json({ error: "Invalid Credentials" }));
    }

    return res(
      ctx.status(200),
      ctx.json({ userName: resValue.userName, password: resValue.password })
    );
  }),
];
