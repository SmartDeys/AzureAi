import Component from '@glimmer/component';
import { set , action , computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HomeComponent extends Component {
    @tracked isSearched = false;
    @tracked serachValue = '';
    @tracked data = null;
    @tracked gameData = null;
    // @tracked showQuestionPage = false;
    @service
    storage

    constructor(){
      super(...arguments);
      //this.getData();
      // this.getTopics("Karate");
    }

    @computed("serachValue")
    get isSearhed(){
        return (this.serachValue.length > 0)
    }

    @action
    async selectOption(userPrompt){
      var url = "http://localhost:5130/api/getGameData/";
      // userPrompt = "Karate";
      var prompt = "selectedTopic=" + userPrompt;
        await this.storage.fetchData(url,prompt);
        var tempGameData = this.storage.apiData;
        tempGameData.forEach(data => {
          data.Options=JSON.parse(data.optionJson);
        });
        this.gameData = tempGameData;
    }
  
    @action
    async apply() {
      this.serachValue = $('#serachId').val();
      console.log("serachde text",this.serachValue);
      if(this.serachValue.length >0){
        await this.getTopics(this.serachValue);
        // this.showQuestionPage = true;
      }
      else{
        this.getTopics("Any common topics for college student");
      }
    }

    async getTopics(userPrompt){
      var url = "http://localhost:5130/api/getTopics/";
      // userPrompt = "Karate";
      var prompt = "userPrompt=" + userPrompt;
        await this.storage.fetchData(url,prompt);
        this.data = this.storage.apiData;
    }
}
