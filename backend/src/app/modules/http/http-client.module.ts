import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HttpClientService } from "./service/http-client.service";

@Module({
    imports: [
      HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      }),
    ],
    providers: [HttpClientService],
    exports: [HttpClientService]
  })
  export class HttpClientModule {}
  