import ApiService from './framework/api-service';

/*const Method = {
  GET: 'GET',
  PUT: 'PUT',
};*/

export default class PointsApiService extends ApiService {
  get points () {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }
}


