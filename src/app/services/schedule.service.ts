import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {QueryModel} from "../shared/models/query-model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  apiKey = '47233e41-1aee-4003-8306-1d931a06f251';

  constructor(
    private readonly http: HttpClient,
  ) { }

  getSchedule(data: QueryModel) {
    const url = 'https://api.rasp.yandex.net/v3.0/search/'
    const queryParams =  new HttpParams()
      .append("apikey", this.apiKey)
      .append("format", "json")
      .append("lang", "ru_RU")
      .append("from", data.from)
      .append("to", data.to)
      .append("transport_types", data.transport)
      .append("date", data.date)

    return this.http.get(url, {params: queryParams});
  }

  getStation (city: string) {
    const url = 'https://suggests.rasp.yandex.net/all_suggests'
    city.replaceAll(' ', '');
    const queryParams =  new HttpParams()
      .append("part", `<${city}`)

    return this.http.get(url, {params: queryParams})
  }
}
