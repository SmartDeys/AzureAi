import Component from '@glimmer/component';
import { set , action , computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HomeComponent extends Component {
    @tracked isSearched=false;
    @tracked serachValue = '';

    @service
    storage

    @computed("serachValue")
    get isSearhed(){
        return (this.serachValue.length > 0)
    }

    @action
    triggerSearch() {
      debounce(this, 'getSearch', 1500);
    }
  
    getSearch() {
      this.serachValue = $('#serachId').val();
      console.log("serachde text",this.serachValue);
      if(this.serachValue.length >0)
        this.storage.fetchData(this.serachValue);
      else{
        this.storage.fetchData();
      }
    }
}
