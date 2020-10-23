import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class TeamService {

  constructor(
    private apiService: ApiService
  ) { }

  setInvite(body) {
    return this.apiService.post('/team', body);
  }

}
