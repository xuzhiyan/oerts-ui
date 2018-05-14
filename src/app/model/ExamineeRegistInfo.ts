import {ExamineeInfo} from './ExamineeInfo';

export class CompleteRegistExamInfo extends ExamineeInfo {
  idCard: string;
  admissionTicket: string;
  status: string;
  score: number;
  examId: string;
  setNum: number;
  roomNum: number;
}
