import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class GifService {
  private apikey = '258J4ETfsQvSShza5JQScuxrO02whWZk';
  private giphyQueryUrl = 'https://api.giphy.com/v1/gifs/random?api_key=258J4ETfsQvSShza5JQScuxrO02whWZk&tag=banana&rating=G';

  constructor(private http: Http, private httpClient: HttpClient){}

  public getUrlLink(input: string): Observable<any> {
    const url = 'https://api.giphy.com/v1/gifs/random?api_key=258J4ETfsQvSShza5JQScuxrO02whWZk&tag='
    + input +'&rating=G';

    return this.http.get(url)
      .map((res: Response) =>
        res.json()
    );
  }
}
