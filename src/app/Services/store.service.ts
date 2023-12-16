import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
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
  
  // Method Add New Task
  AddTask(task : Task){
    task.id = this.afs.createId()
    return this.afs.collection('/Tasks').add(task)
  }
  // Method to Get All Tasks
  GetAllTasks(){
    return this.afs.collection('Tasks').snapshotChanges()
  }
  // Method To Delete Task
  // Following This Repo https://github.com/firebase/firebase-android-sdk/issues/5186
  // and This one https://github.com/firebase/firebase-tools/issues/315
  deleteTask(task: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const id = task.id

      // get the Task Id
        const subscription = this.afs
            .collection('/Tasks', ref => ref.where('id', '==', `${id}`))
            .snapshotChanges()
            .pipe(
              // same what we did in Geting The Data
                map((actions: any) => actions.map((a: any) => {
                    const docId = a.payload.doc.id;
                    return { id: docId };
                }))
            )
            .subscribe((documentIds: any) => {
                if (documentIds && documentIds.length > 0) {
                    const docId = documentIds[0].id;
                    this.afs
                        .collection("Tasks")
                        .doc<Task>(docId)
                        .delete()
                        .then(() => {
                            subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
                            resolve();
                        })
                        .catch((error) => {
                            subscription.unsubscribe(); // Unsubscribe in case of an error
                            console.log(error);
                            reject(error);
                        });
                } else {
                    subscription.unsubscribe(); // Unsubscribe if no matching document is found
                    resolve();
                }
            });
    });
  }

  // Method To update Task 
  // You need To remmber To Change it and make it Update
  UpdateTask(task : Task){
    this.deleteTask(task)
    this.AddTask(task)
  }

}
