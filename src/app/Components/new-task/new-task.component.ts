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
  NewTask !: FormGroup
  stage !: string
  ngOnInit(): void {
    console.log(this.dataa);
    this.stage = this.dataa.stage
    console.log(this.stage);
    this.NewTask  = this.fb.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
      author : ['', Validators.required],
      priority : ['', Validators.required],
      stage : [this.stage, Validators.required],
      dueDate : ['', Validators.required]
    })
    
  }

  constructor(private fb : FormBuilder,private _StoreService : StoreService,
              private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public dataa : any){}

  AddNewTask(){
    const task = {
      title: this.NewTask.value.title,
      description: this.NewTask.value.description,
      auhtor: this.NewTask.value.author,
      priorty: this.NewTask.value.priority,
      stage : this.NewTask.value.stage,
      dueDate : this.NewTask.value.dueDate
    }
    console.log(task);
    
    this._StoreService.AddTask(task)
    this.closeDialog()
  }
  closeDialog(){
    this.dialog.closeAll()
  }
}
