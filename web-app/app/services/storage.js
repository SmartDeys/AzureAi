import Service from '@ember/service';
import $ from 'jquery';
import { tracked } from '@glimmer/tracking';

export default class StorageService extends Service {
  @tracked apiData = null;

  async fetchData(searchValue="i wanted to learn .net") {
    const url = 'http://localhost:5130/api/getTopics/';

    var senValue = "userPrompt=" + searchValue;
    return $.ajax({
      url: url,
      method: 'GET',
      data: senValue,
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
