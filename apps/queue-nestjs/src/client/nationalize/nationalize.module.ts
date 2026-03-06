import { Module } from "@nestjs/common";
// import { HttpModule } from "@nestjs/axios";
import { HttpModule } from "nestjs-undici";
import { NationalizeService } from "./nationalize.service";


@Module({
    imports: [HttpModule.register({})], // Undici is a HTTP client for Node.js
    // imports: [HttpModule], // Axios is a HTTP client for Node.js
    providers: [NationalizeService],
    exports: [NationalizeService],
})
export class NationalizeModule { }