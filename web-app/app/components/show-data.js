import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShowDataComponent extends Component {
    @service
    storage;
  
    @tracked data = null;
    constructor() {
      //data = this.storage.fetchData();
      super(...arguments);
      //this.getData();
      this.getTopics("Karate");
      //this.getQuizQuestions("Karate");

    }

    async getData(userPrompt){
      var url = "http://localhost:5130/api/getGameData/";
      userPrompt = "Karate";
      var prompt = "selectedTopic=" + userPrompt;
        await this.storage.fetchData(url,prompt);
        this.data = this.storage.apiData;
    }
    async getQuizQuestions(userPrompt){
      var url = "http://localhost:5130/api/getGameData/";
      // userPrompt = "Karate";
      var prompt = "selectedTopic=" + userPrompt;
        await this.storage.fetchData(url,prompt);
        this.data = this.storage.apiData;
    }
    async getTopics(userPrompt){
      var url = "http://localhost:5130/api/getTopics/";
      // userPrompt = "Karate";
      var prompt = "userPrompt=" + userPrompt;
        await this.storage.fetchData(url,prompt);
        this.data = this.storage.apiData;
    }
}
