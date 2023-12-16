import { Component } from '@angular/core';
import { StoreService, Task } from 'src/app/Services/store.service';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/app/Services/color.service';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  // Properties
  backgroundColor: string = '#ffffff';
  Tasks : any [] = []
  todo: any[] = [];
  inProgress: any[] =[]
  done: any[] = []
  protected isLoged : boolean = false


  constructor(private _StoreService : StoreService, private dialog : MatDialog,
    private _ColorService : ColorService, private AuthService : AuthService){}


  ngOnInit(): void {
    this.GetAllTasks()
    // subscrbtion For the Backgorund Color
    this._ColorService.currentColor$.subscribe((color) => {
      console.log(color);
      
      this.backgroundColor = color;
    });

    this.AuthService.LogedState$.subscribe((isLoged) => {
      this.isLoged = isLoged
    })

  }
  // Method to Open New Dialog To Enter the a new Task 
  openNewTaskDialog(stage : string){
    this.dialog.open(NewTaskComponent,{
      data : {
        stage : stage
      }
    })
  }
  // Method to Get All tasks From Database 
  GetAllTasks() {
    this._StoreService.GetAllTasks().subscribe({
      next: (res) => {

        // the Following Code is to Map on The Coming Object and Get The Data 
        this.Tasks = res.map((task: any) => {
          const data = task.payload.doc.data();
          const id = task.payload.doc.id;
          return { id, ...data };

        });

        // Method to Extract 3 Array One For Each Stage
        this.seprateArray(this.Tasks)

      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed To Get Data!",
        });
      }
    });
  }

    // Method to Extract 3 Array One For Each Stage

  seprateArray(tasks : Task[]){
    this.todo = tasks.filter(task => task.stage === '1'),
    this.inProgress = tasks.filter(task => task.stage === '2'),
    this.done = tasks.filter(task => task.stage === '3')
    
  }

  // Drag and Frop Methodlalty The If Condtion Part is To Update the Real Database
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = Number(event.container.id.slice(-1))
      const currentIndex :  number = event.currentIndex;

      // Helper Method to Know wich Array 
      const newStage = this.getStageFromContainerId(id);

      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(id === 0){
        const task : Task = this.todo[currentIndex]
        task.stage = '1'
        this.UpdateTask(task)
      }else if (id === 1){
        const task = this.inProgress[currentIndex]
        task.stage = '2'
        this.UpdateTask(task)
      }else{
        const task = this.done[currentIndex]
        task.stage = '3'
        this.UpdateTask(task)
      }
    }
  }

  //Helper Method To know Wich Array 
  getStageFromContainerId(containerId: number): string {
    switch (containerId) {
      case 0:
        return 'todo';
      case 1:
        return 'inProgress';
      case 2:
        return 'done';
      default:
        return '';
    }
  }

  //Method To Update Task in Data base
  UpdateTask(Task : Task){
    const modal = {
      id : Task.id,
      title: Task.title,
      description: Task.description,
      auhtor: Task.auhtor,
      priorty: Task.priorty,
      stage : Task.stage,
      dueDate : Task.dueDate
    }
    
    this._StoreService.UpdateTask(modal)
  }

  // you Will Work On It 
  editTask(list: string, task: Task): void {

  }
}
