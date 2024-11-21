import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

const LOTR_API_URL = process.env.LOTR_API_URL || 'https://lotrapi.co/api/v1';
const LOTR_API_KEY = process.env.LOTR_API_KEY || 'e4dCjaeF2vT_cDsSnl03';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getLOTRCharactersInApi(): Promise<any> {
    const response = this.httpService
      .get(`${LOTR_API_URL}/characters`, {
        headers: {
          Authorization: `Bearer ${LOTR_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));

    return await lastValueFrom(response);
  }
}
