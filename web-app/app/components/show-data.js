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
      this.getData();
    }

    async getData(){
        await this.storage.fetchData();
        this.data = this.storage.apiData;
    }
}
