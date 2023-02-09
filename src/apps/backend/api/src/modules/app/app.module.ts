//
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

//

import { UsersModule } from "modules/users/users.module";

//
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true,
          },
        },
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
