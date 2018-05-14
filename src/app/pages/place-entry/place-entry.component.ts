import {Component, OnInit, TemplateRef} from '@angular/core';
import {ExamPlaceInfo} from '../../model/ExamPlaceInfo';
import {ExamPlaceManagementService} from '../../service/exam-place-management.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {cityValidator, districtValidator, placeValidator} from '../../shared/validators/validators';

@Component({
  selector: 'app-place-entry',
  templateUrl: './place-entry.component.html',
  styleUrls: ['./place-entry.component.css']
})
export class PlaceEntryComponent implements OnInit {

  examPlaceModel: FormGroup;
  validStatus = true;
  placeInfo: Array<ExamPlaceInfo> = new Array<ExamPlaceInfo>();
  deletePlace: ExamPlaceInfo;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(private examPMService: ExamPlaceManagementService,
              private modalService: BsModalService,
              private fb: FormBuilder) {
    this.examPlaceModel = this.fb.group({
      city: ['', cityValidator],
      district: ['', districtValidator],
      place: ['', placeValidator],
    });
  }

  ngOnInit() {
    this.examPMService.getAllExamPlace().subscribe(data => {
      this.placeInfo = data.json().data;
    });
  }

  onDelete(item: ExamPlaceInfo, temp: TemplateRef<any>) {
    this.deletePlace = item;
    this.modalRef = this.modalService.show(temp, this.config);
  }

  onAdd(temp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(temp, this.config);
  }

  onBack() {
    this.modalRef.hide();
    this.examPlaceModel.reset();
    this.validStatus = true;
  }

  deleteInfo() {
    const body = {
      'city': this.deletePlace.city,
      'district': this.deletePlace.district,
      'place': this.deletePlace.place
    };
    this.examPMService.deleteExamPlace(body).subscribe(value => {
      this.examPMService.getAllExamPlace().subscribe(data => {
        this.placeInfo = data.json().data;
        this.modalRef.hide();
      });
    });
  }

  addInfo(failed: TemplateRef<any>) {
    if (this.examPlaceModel.valid) {
      const body = {
        'city': this.examPlaceModel.value.city,
        'district': this.examPlaceModel.value.district,
        'place': this.examPlaceModel.value.place
      };
      this.examPMService.addExamPlace(body).subscribe(data => {
        if (data.json().status === 'success') {
          // 添加成功
          this.examPMService.getAllExamPlace().subscribe(value => {
            this.placeInfo = value.json().data;
            this.modalRef.hide();
            this.examPlaceModel.reset();
          });
        } else {
          // 有相同的地址，添加失败
          this.modalRef2 = this.modalService.show(failed, this.config);
        }
      });
    } else {
      this.validStatus = false;
    }
  }

}
