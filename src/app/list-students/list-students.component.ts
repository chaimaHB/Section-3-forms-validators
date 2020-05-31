import { Component, OnInit } from "@angular/core";
import { StudentService } from "../shared/services/student.service";
import { Student } from "../shared/models/student";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
@Component({
  selector: "app-list-students",
  templateUrl: "./list-students.component.html",
  styleUrls: ["./list-students.component.css"],
})
export class ListStudentsComponent implements OnInit {
  title = "Liste des étudiants";
  label = "changer la langue";
  cols = [
    "Nom",
    "Prénom",
    "Email",
    "Mot de passe",
    "Age",
    "Téléphone",
    "Action",
  ];
  Delete = "Supprimer";
  Edit = "Modifier";
  constructor(
    private studentService: StudentService,
    public translate: TranslateService
  ) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }
  students: Student[];

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.studentService.getStudentsList().subscribe((data) => {
      this.students = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Student),
        };
      });
    });
  }
  delete(id: string) {
    Swal.fire({
      title: "Vous etes Sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      this.studentService.deleteStudent(id);
    });
  }
}
