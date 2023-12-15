import { Component } from '@angular/core';
import { StoreService, Task } from 'src/app/Services/store.service';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  constructor(private _StoreService : StoreService, private dialog : MatDialog,
    ){}
  ngOnInit(): void {
    this.GetAllTasks()
  }
  Tasks : any [] = []
  todo: any[] = [];
  inProgress: any[] =[]
  done: any[] = []
  openNewTaskDialog(stage : string){
    this.dialog.open(NewTaskComponent,{
      data : {
        stage : stage
      }
    })
  }
  GetAllTasks() {
    this._StoreService.GetAllTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.Tasks = res.map((task: any) => {
          const data = task.payload.doc.data();
          const id = task.payload.doc.id;
          return { id, ...data };
        });
        console.log(this.Tasks); // Log here to ensure data is correctly populated
        this.seprateArray(this.Tasks)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  seprateArray(tasks : Task[]){
    this.todo = tasks.filter(task => task.stage === '1'),
    this.inProgress = tasks.filter(task => task.stage === '2'),
    this.done = tasks.filter(task => task.stage === '3')
    console.log(this.todo);
    console.log(this.inProgress);
    console.log(this.done);
    
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  editTask(list: string, task: Task): void {

  }
}
