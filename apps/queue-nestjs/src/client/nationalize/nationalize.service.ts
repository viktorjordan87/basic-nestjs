/*Axios is a HTTP client for Node.js*/
//import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";


/*Undici is a HTTP client for Node.js*/
import { HttpService } from "nestjs-undici";
import { firstValueFrom } from "rxjs";

@Injectable()
export class NationalizeService {
    constructor(private readonly httpService: HttpService) { }

    /*    async getNationality(name: string): Promise<any> {
           const response = await this.httpService.axiosRef.get(
               `https://api.nationalize.io?name=${name}`,
           );
           return response.data;
       } */

    async getNationality(name: string): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.request(`https://api.nationalize.io?name=${name}`),
        );
        return response.body.json();
    }
}       