import { Component, OnInit, ViewChild } from "@angular/core";
import { Student } from "../shared/models/student";
import { StudentService } from "../shared/services/student.service";
import { FormGroup, NgForm, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  public student = new Student();
  addForm: FormGroup;
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.registerForm = this.formBuilder.group(
        {
          firstname: ["", [Validators.required]],
          lastname: ["", [Validators.required]],
          email: ["", [Validators.required, Validators.email]],
          age: ["", [Validators.required]],
          password: ["", [Validators.required, Validators.minLength(6)]],
        },
        {
          //validator: MustMatch("password", "confirmPassword"),
        }
      );
      console.log("My Id", params);
      if (params.id != undefined && params.id != null) {
        this.getStudent(params.id);
      }
      //
    });
  }
  save() {
    this.submitted = true;
    if (this.submitted == true && this.registerForm.valid) {
      this.student.firstName = this.registerForm.controls["firstname"].value;
      this.student.lastName = this.registerForm.controls["lastname"].value;
      this.student.age = this.registerForm.controls["age"].value;
      this.student.email = this.registerForm.controls["email"].value;
      this.student.password = this.registerForm.controls["password"].value;

      if (!this.student.id) {
        this.studentService.AddStudent({ ...this.student });
        this.toastr.success("Success", "Utilisateur Ajouté!", {
          timeOut: 3000,
        });
      } else {
        this.studentService.updateStudent({ ...this.student });
        this.toastr.success("Success", "Utilisateur Modifier !", {
          timeOut: 3000,
        });
      }

      this.registerForm.reset();
      this.submitted = false;
    }
  }
  getStudent(id: string) {
    this.studentService.getStudent(id).subscribe((res) => {
      this.student = res.data() as Student;
      this.student.id = res.id;
      this.registerForm.controls["firstname"].setValue(this.student.firstName);
      this.registerForm.controls["lastname"].setValue(this.student.lastName);
      this.registerForm.controls["age"].setValue(this.student.age);
      this.registerForm.controls["email"].setValue(this.student.email);
      this.registerForm.controls["password"].setValue(this.student.password);
    });
  }
}
