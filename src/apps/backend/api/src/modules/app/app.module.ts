//
import { Module, RequestMethod } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

//

import { HealthModule } from "modules/health/health.module";
import { UsersModule } from "modules/users/users.module";

//
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    HealthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true,
          },
        },
      },
      exclude: [{ method: RequestMethod.ALL, path: "health" }],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
