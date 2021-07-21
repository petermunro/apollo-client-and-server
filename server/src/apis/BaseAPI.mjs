import { RESTDataSource } from 'apollo-datasource-rest';

export class BaseAPI extends RESTDataSource {
  constructor(baseURL, resourceName) {
    super();
    this.baseURL = baseURL;
    this.resourceName = resourceName;
  }

  collectionUrl() {
    return this.baseURL + '/' + this.resourceName;
  }

  memberUrl(memberId) {
    return this.collectionUrl() + '/' + encodeURIComponent(memberId);
  }
}
