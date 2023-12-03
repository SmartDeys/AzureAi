import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class QuizCompComponent extends Component {
    @tracked sampleData = [
        { Question: "Answer this one", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
        { Question: "Answer this two", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
        { Question: "Answer this one", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
      ];
    @tracked currentQuestion;
    @tracked currentIndex =0;
    @tracked pointsComp = 0;

    constructor(owner, args) {
        super(owner, args);
    
        this.currentQuestion = this.sampleData[0];
        console.log(this.currentIndex);
        console.log(this.currentQuestion);
    }
    // getCurrentQuestion = () =>{
    //     console.log("Cjeck");
    //     return this.sampleData[0];
    //   }
    @action
    onChangePoint(AddPoint = true ){
        console.log(":Classed");
        if(AddPoint)
            this.pointsComp++;
        this.currentIndex++;
        this.currentQuestion = this.sampleData[this.currentIndex];
    }


}
