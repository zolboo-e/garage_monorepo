import { c } from "./contract";
import { usersContract } from "./users.contract";

export const contracts = c.router({
  users: usersContract,
});
