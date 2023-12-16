import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  // Properties
  UpdateTaskForm !: FormGroup
  data !: any
  constructor(private fb : FormBuilder,private _StoreService : StoreService,
    private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public dataa : any){}

    ngOnInit(): void {
      // Form
      this.data = this.dataa.task
      this.UpdateTaskForm = this.fb.group({
        id : [this.data.id, Validators.required],
        title : [this.data.title, Validators.required],
        description : [this.data.description, Validators.required],
        author : [this.data.auhtor, Validators.required],
        priorty : [this.data.priorty, Validators.required],
        stage : [this.data.stage, Validators.required],
        dueDate : [this.data.dueDate, Validators.required]
      })
      
    }
    // method To Update The Task
    UpdateTask(){
      const modal = {
        id : this.UpdateTaskForm.value.id,
        title: this.UpdateTaskForm.value.title,
        description: this.UpdateTaskForm.value.description,
        auhtor: this.UpdateTaskForm.value.author,
        priorty: this.UpdateTaskForm.value.priorty,
        stage : this.UpdateTaskForm.value.stage,
        dueDate : this.UpdateTaskForm.value.dueDate
      }
      
      this._StoreService.UpdateTask(modal)
      this.closeDialog()
    }
    // Method to close The Dialog 
    closeDialog(){
      this.dialog.closeAll()
    }
    // Methods To Handle Inputs Errors
    TittleErrorMessage(){
      if (this.UpdateTaskForm.controls['title'].hasError('required') ) {
        return  'Task Tittle is Required';
      }else if (this.UpdateTaskForm.controls['title'].hasError('maxlength')){
        return 'Max Number Of Chracter is 18' 
      }else{
        return '';
      }
    }
    DescriptionErrorMessage(){
      if (this.UpdateTaskForm.controls['description'].hasError('required') ) {
        return  'Task Tittle is Required';
      }else if (this.UpdateTaskForm.controls['description'].hasError('maxlength')){
        return 'Max Number Of Chracter is 40' 
      }else{
        return '';
      }
    }
    AuthorErrorMessage(){
      if (this.UpdateTaskForm.controls['author'].hasError('required') ) {
        return  'Task Owner is Required';
      }else if (this.UpdateTaskForm.controls['author'].hasError('maxlength')){
        return 'Max Number Of Chracter is 18' 
      }else{
        return '';
      }
    }
    StageErrorMessage(){
      if (this.UpdateTaskForm.controls['stage'].hasError('required') ) {
        return  'Task stage is Required';
      }else{
        return '';
      }
    }
    PriortyErrorMessage(){
      if (this.UpdateTaskForm.controls['priority'].hasError('required') ) {
        return  'Task priorty is Required';
      }else{
        return '';
      }
    }
    dueDateErrorMessage(){
      if (this.UpdateTaskForm.controls['dueDate'].hasError('required') ) {
        return  'Task due Date is Required';
      }else{
        return '';
      }
    }

}
