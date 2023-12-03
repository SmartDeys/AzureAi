import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';

export default class QuizCompComponent extends Component {    
    @service
    storage;

    @tracked sampleData = [
        { Question: "Answer this one", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
        { Question: "Answer this two", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
        { Question: "Answer this one", Options: ["Option A" , "Option B" , "Option C"], Answer: '"Option B"' },
      ];
    @tracked currentQuestion;
    @tracked currentIndex =0;
    @tracked pointsComp = 0;
    @tracked gameData;
    @tracked isLast = false;
    @tracked reportCard =[];
    @tracked showQuestion = true;
    @tracked showReportcard = false;
    constructor(owner, args) {
        super(owner, args);
        
        console.log( this.args.questionData);
        this.currentQuestion = this.args.questionData?.[0];
        console.log(this.currentIndex);
        console.log(this.currentQuestion);
        // this.getQuizQuestions("Basics in c programming");
    }
    // getCurrentQuestion = () =>{
    //     console.log("Cjeck");
    //     return this.sampleData[0];
    //   }
    @action
    isCorrectAnswer(selectedAnswer , CorrectAnswer){
        return selectedAnswer == CorrectAnswer;
    }

    @action
    onChangePoint(AddPoint = true ,selectedAnswer){
        console.log("Result " ,AddPoint);
        if(this.isLast){
            console.log(this.reportCard);
            this.showReportcard = true
            this.showQuestion = false;
            return;
        }

        var qnReport = {};
        qnReport["Question"] = this.currentQuestion.Question;
        qnReport["SelectedAnswer"] = selectedAnswer;
        qnReport["CorrectAnswer"] = this.currentQuestion.Answer;
        this.reportCard.push(qnReport);

        if(AddPoint)
            this.pointsComp++;
        this.currentIndex++;
        this.isLast = this.args.questionData.length - 1 == this.currentIndex;
        this.currentQuestion = this.args.questionData[this.currentIndex];
        console.log("Currect point", this.pointsComp ,"/" , this.args.questionData.length);
    }

    // async getQuizQuestions(userPrompt){
    //     var url = "http://localhost:5130/api/getGameData/";
    //     // userPrompt = "Karate";
    //     var prompt = "selectedTopic=" + userPrompt;
    //       await this.storage.fetchData(url,prompt);
    //       this.gameData = this.storage.apiData;
    //       this.gameData.forEach(data => {
    //         data.Options =JSON.parse(data.optionJson);
    //       });
    //       this.currentQuestion = this.gameData[0];
    //   }

}
