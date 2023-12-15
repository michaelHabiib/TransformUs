import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService, Task } from 'src/app/Services/store.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private dialog : MatDialog, private _StoreService : StoreService){}
  @Input() task!: Task ;
  @Output() edit = new EventEmitter<Task>();

  openUpdateDialog(task : Task){
    this.dialog.open(UpdateTaskComponent,{
      data : {
        task
      }
    })
  }
  DeleteTask(task : Task){
    // this._TaskService.deleteProdusBayonete(task)
  }

}
