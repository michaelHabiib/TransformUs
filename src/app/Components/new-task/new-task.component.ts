import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreService, Task } from 'src/app/Services/store.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  //Properties
  NewTask !: FormGroup
  stage !: string
  ngOnInit(): void {
    // Form
    this.stage = this.dataa.stage
    console.log(this.stage);
    this.NewTask  = this.fb.group({
      title : ['', [Validators.required, Validators.maxLength(18)]],
      description : ['', [Validators.required, Validators.maxLength(40)]],
      author : ['', [Validators.required, Validators.maxLength(18)]],
      priority : ['', [Validators.required]],
      stage : [this.stage, Validators.required],
      dueDate : ['', Validators.required]
    })
    
  }

  constructor(private fb : FormBuilder,private _StoreService : StoreService,
              private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public dataa : any){}

  // Method To Add New Task 
  AddNewTask(){
    const task = {
      title: this.NewTask.value.title,
      description: this.NewTask.value.description,
      auhtor: this.NewTask.value.author,
      priorty: this.NewTask.value.priority,
      stage : this.NewTask.value.stage,
      dueDate : this.NewTask.value.dueDate
    }    
    this._StoreService.AddTask(task)
    this.closeDialog()
  }

  //Method to Close The Dialog
  closeDialog(){
    this.dialog.closeAll()
  }
  // Erorrs Handling messages For All Inputs
  TittleErrorMessage(){
    if (this.NewTask.controls['title'].hasError('required') ) {
      return  'Task Tittle is Required';
    }else if (this.NewTask.controls['title'].hasError('maxlength')){
      return 'Max Number Of Chracter is 18' 
    }else{
      return '';
    }
  }
  DescriptionErrorMessage(){
    if (this.NewTask.controls['description'].hasError('required') ) {
      return  'Task Tittle is Required';
    }else if (this.NewTask.controls['description'].hasError('maxlength')){
      return 'Max Number Of Chracter is 40' 
    }else{
      return '';
    }
  }
  AuthorErrorMessage(){
    if (this.NewTask.controls['author'].hasError('required') ) {
      return  'Task Owner is Required';
    }else if (this.NewTask.controls['author'].hasError('maxlength')){
      return 'Max Number Of Chracter is 18' 
    }else{
      return '';
    }
  }
  StageErrorMessage(){
    if (this.NewTask.controls['stage'].hasError('required') ) {
      return  'Task stage is Required';
    }else{
      return '';
    }
  }
  PriortyErrorMessage(){
    if (this.NewTask.controls['priority'].hasError('required') ) {
      return  'Task priorty is Required';
    }else{
      return '';
    }
  }
  dueDateErrorMessage(){
    if (this.NewTask.controls['dueDate'].hasError('required') ) {
      return  'Task due Date is Required';
    }else{
      return '';
    }
  }
}
