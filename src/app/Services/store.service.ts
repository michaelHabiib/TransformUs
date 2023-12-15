import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
export interface Task {
  id?: string;
  title: string;
  description: string;
  auhtor: string;
  priorty: number;
  stage: string;
  dueDate?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private afs : AngularFirestore) { }
  
  // Add New Task
  AddTask(task : Task){
    task.id = this.afs.createId()
    return this.afs.collection('/Tasks').add(task)
  }
  // Get All Tasks
  GetAllTasks(){
    return this.afs.collection('Tasks').snapshotChanges()
  }
}
