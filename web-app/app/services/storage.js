import Service from '@ember/service';
import $ from 'jquery';
import { tracked } from '@glimmer/tracking';

export default class StorageService extends Service {
  @tracked apiData = null;

  async fetchData() {
    const url = 'http://localhost:5130/api/start/';

    return $.ajax({
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200', // Include the origin of your Ember app
      },
    })
      .then((response) => {
        // Handle successful response
        this.apiData = response;
        console.log('Data stored:', this.apiData);
        return response;
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        // Handle errors
        console.error('Error:', errorThrown);
        throw errorThrown;
      });
  }
}
