//
import { Injectable } from "@nestjs/common";

//
import { PrismaService } from "modules/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }
  async findUnique(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
