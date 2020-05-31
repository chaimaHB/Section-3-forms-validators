import { Injectable } from '@angular/core' ;
import { AngularFirestore } from '@angular/fire/firestore' ;
import { Student } from '../models/student' ;
@ Injectable ({
providedIn: 'root'
})
export class StudentService {

constructor ( private firestore : AngularFirestore ) { }



AddStudent ( student : Student ) {
return this . firestore . collection ( 'students' ). add ( student );

}

getStudentsList() {
    return this.firestore.collection('students').snapshotChanges();
        }


deleteStudent(studentId: string){
            this.firestore.doc('students/' + studentId).delete();
            }
getStudent(studentId: string) {
                return this.firestore.doc('students/' + studentId).get();
                }
                
updateStudent(student: Student) {
                    return this.firestore.doc('students/' + student.id).update(student);
                    }
}