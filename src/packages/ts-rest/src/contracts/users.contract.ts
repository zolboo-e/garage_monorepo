import { c } from "./contract";
import { User } from "../schemas";

export const usersContract = c.router({
  getUsers: {
    method: "GET",
    path: "/users",
    responses: {
      200: User.array(),
    },
  },
  getUser: {
    method: "GET",
    path: "/users/:id",
    responses: {
      200: User,
    },
  },
});
