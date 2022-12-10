import { rest } from "msw";

export const handlers = [
  rest.post("https://abchungstack.us/api/v1/users", (req, res, ctx) => {
    const { userName, password } = req.json();
    return res.status(401), ctx.json({ error: "not authorized" });
  }),
];
