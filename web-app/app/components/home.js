import Component from '@glimmer/component';
import { set , action , computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency';

export default class HomeComponent extends Component {
    @tracked isSearched = false;
    @tracked serachValue = '';
    @tracked data = null;
    @tracked gameData = null;
    @tracked showTopics=true;
    @tracked showInputs=true;
    // @tracked showQuestionPage = false;
    @service
    storage

    constructor(){
      super(...arguments);
      //this.getData();
       this.getTopics.perform("Karate");
    }

    @computed("serachValue")
    get isSearhed(){
        return (this.serachValue.length > 0)
    }

    @action
    async selectOption(userPrompt){
      await this.selected.perform(userPrompt);
      console.log("awiteddd");
    }


    @dropTask
    *selected(userPrompt){
      var url = "http://localhost:5130/api/getGameData/";
      // userPrompt = "Karate";
      var prompt = "selectedTopic=" + userPrompt;
        yield this.storage.fetchData.perform(url,prompt);
        var tempGameData = this.storage.apiData;
        tempGameData.forEach(data => {
          data.Options=JSON.parse(data.optionJson);
        });
        this.showTopics=false;
        this.gameData = tempGameData;
    }
  
    @action
    async apply() {
      this.serachValue = $('#serachId').val();
      console.log("serachde text",this.serachValue);
      if(this.serachValue.length >0){
        await this.getTopics.perform(this.serachValue);
        // this.showQuestionPage = true;
      }
      else{
        this.getTopics.perform("Any common topics for 18 years old boy/girl");
      }
    }

    @dropTask
    *getTopics(userPrompt){
      this.showTopics=true;
      var url = "http://localhost:5130/api/getTopics/";
      // userPrompt = "Karate";
      var prompt = "userPrompt=" + userPrompt;
        yield this.storage.fetchData.perform(url,prompt);
        this.data = this.storage.apiData;
    }
}
