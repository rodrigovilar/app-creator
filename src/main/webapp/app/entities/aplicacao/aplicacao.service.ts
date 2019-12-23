import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAplicacao } from 'app/shared/model/aplicacao.model';

type EntityResponseType = HttpResponse<IAplicacao>;
type EntityArrayResponseType = HttpResponse<IAplicacao[]>;

@Injectable({ providedIn: 'root' })
export class AplicacaoService {
  public resourceUrl = SERVER_API_URL + 'api/aplicacaos';

  constructor(protected http: HttpClient) {}

  create(aplicacao: IAplicacao): Observable<EntityResponseType> {
    return this.http.post<IAplicacao>(this.resourceUrl, aplicacao, { observe: 'response' });
  }

  update(aplicacao: IAplicacao): Observable<EntityResponseType> {
    return this.http.put<IAplicacao>(this.resourceUrl, aplicacao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAplicacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAplicacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
