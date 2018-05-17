import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OnlineQaService} from '../../service/online-qa.service';
import {OnlineQAInfo} from '../../model/OnlineQAInfo';

@Component({
  selector: 'app-online-qa',
  templateUrl: './online-qa.component.html',
  styleUrls: ['./online-qa.component.css']
})
export class OnlineQaComponent implements OnInit {

  questionModel: FormGroup;
  onlineQAInfo: Array<OnlineQAInfo>;
  answerStatus: boolean;
  questionStatus: boolean;
  questionMessage: string;
  answerMessage: string;
  answerContent: string;

  constructor(private fb: FormBuilder,
              private onlineQaService: OnlineQaService) {
    this.questionModel = this.fb.group({
      questionsend: ['']
    });
  }

  ngOnInit() {
    this.answerStatus = true;
    this.questionStatus = true;
    this.onlineQaService.getCommonQuestion().subscribe(data => {
      this.onlineQAInfo = data.json().data;
    });
  }


  onSendMessage() {
    if (this.questionModel.value.questionsend !== '' && this.questionModel.value.questionsend !== null) {
      this.questionMessage = this.questionModel.value.questionsend;
      this.questionStatus = false;
      this.questionModel.reset();
      this.onlineQaService.getAnswerByKey(this.questionMessage).subscribe(data => {
        if (data.json().status === 'success') {
          this.answerContent = data.json().data.questionContent;
          this.answerMessage = data.json().data.questionAnswer;
        } else {
          this.answerContent = '暂时没有相关答案';
          this.answerMessage = data.json().message;
        }
        this.answerStatus = false;
      });
    }
  }

  onCommonAnswer(content: string, answer: string) {
    this.questionMessage = content;
    this.questionStatus = false;
    this.answerContent = content;
    this.answerMessage = answer;
    this.answerStatus = false;
  }
}
