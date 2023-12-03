import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set , computed} from '@ember/object';
import { helper } from '@ember/component/helper';

export default class QuizQaComponent extends Component {
    @tracked selectedAnswer = "";
    @tracked question = "";
    @tracked options = [];
    constructor(owner, args) {
        super(owner, args);
    console.log(this.args.model);
    this.question =  this.args.model?.Question;
    this.options =  this.args.model?.Options;
    

    }
    @computed("selectedAnswer")
    get isDisable(){
      return (this.selectedAnswer.length == 0)
    }

@action
    isSelected(selectedAnswer , option){
        return option == selectedAnswer;
    }
@action
    selectOption(option){
        this.selectedAnswer = option;
        console.log("User seelcted", this.selectedAnswer);
        // this.args.onChangePoint(true);
    }
    @action
    onMoveNext(){
        var result = this.selectedAnswer == this.args.model.Answer;
        this.args.onChangePoint(result , this.selectedAnswer);
        this.selectedAnswer="";
    }
}
