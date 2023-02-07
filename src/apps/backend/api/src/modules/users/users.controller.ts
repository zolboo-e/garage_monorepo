//
import { Controller, Get } from "@nestjs/common";
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from "@ts-rest/nest";

//
import { contracts } from "ts-rest";

//
import { UsersService } from "./users.service";

const contract: typeof contracts.users = nestControllerContract(
  contracts.users,
);
type RequestShapes = NestRequestShapes<typeof contract>;

@Controller()
export class UsersController
  implements NestControllerInterface<typeof contract>
{
  constructor(private readonly usersService: UsersService) {}

  @TsRest(contract.getUsers)
  async getUsers() {
    const users = await this.usersService.findAll();

    return {
      status: 200 as const,
      body: users,
    };
  }

  @TsRest(contract.getUser)
  async getUser(@TsRestRequest() { params: { id } }: RequestShapes["getUser"]) {
    const user = await this.usersService.findUnique(id);

    return {
      status: 200 as const,
      body: user,
    };
  }
}
