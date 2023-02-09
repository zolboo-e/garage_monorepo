//
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

//
import { AppModule } from "modules/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
