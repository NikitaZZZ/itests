// БД
let db = firebase.firestore();

// Массивы учеников и учителя
let teachers = [];
let students = [];

// Имя, фамилия, id из БД
let name_fb, surname_fb, id_teacher_fb_p;

// Bootstrap кнопки для SweetAlert'a
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-outline-primary',
      cancelButton: 'btn btn-outline-primary'
    },
    buttonsStyling: false
})

// Вход для учеников
function signInStudents() {
    const nameSignIn = document.getElementById("name_signIn_student").value.trim();
    const surnameSignIn = document.getElementById("surname_signIn_student").value.trim();
    const klassSignIn = document.getElementById("klass_signIn_student").value.trim();

    db.collection("students").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            name_fb = doc.Ud.Ze.proto.mapValue.fields.name.stringValue;
            surname_fb = doc.Ud.Ze.proto.mapValue.fields.surname.stringValue;
            teacher_id = doc.Ud.Ze.proto.mapValue.fields.id_teacher_t.stringValue;
            let klass_fb = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;
            let word_klass_fb = doc.Ud.Ze.proto.mapValue.fields.word_klass.stringValue;

            let student_obj = {
                name: name_fb,
                surname: surname_fb,
                id: teacher_id,
                klass: klass_fb,
                word_klass: word_klass_fb
            };

            students.push(student_obj);
        });
        console.log(nameSignIn, surnameSignIn, klassSignIn);
        console.log(students);
        for (let i = 0; i < students.length; i++) {
            if (nameSignIn === students[i].name && surnameSignIn === students[i].surname && klassSignIn === `${students[i].klass}${students[i].word_klass}`) {
                localStorage.setItem("name", students[i].name);
                localStorage.setItem("surname", students[i].surname);
                localStorage.setItem("student_id", students[i].id);
                localStorage.setItem("klass", students[i].klass);
                localStorage.setItem("word_klass", students[i].word_klass);
                location.href = "tests.html";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            }
        }
    });
}

// Регистрация учителя
function signUpTeacher() {
    let name = document.getElementById("name_reg_teacher").value.trim();
    let surname = document.getElementById("surname_reg_teacher").value.trim();

    // ID for teacher
    max_auth = 1;
    min_auth = 1000;
    let id_teacher_fb = Math.floor(Math.random() * (max_auth - min_auth)) + min_auth;

    if (name === "") {
        Swal.fire({
            icon: 'error',
            title: "Вы неверно ввели данные или не ввели их!"
        })
    } else if (surname === "") {
        Swal.fire({
            icon: 'error',
            title: "Вы неверно ввели данные или не ввели их!"
        })
    } else {
        db.collection("teacher").add({
            name: name,
            surname: surname,
            idteacher:  id_teacher_fb,
        });

        Swal.fire({
            title: `Ваш код для входа: ${id_teacher_fb}`,
            text: `Не забудьте!`
        })
    }
}

// Вход для учителя
function signInTeacher() {
    const nameSignIn = document.getElementById("name_signIn_teacher").value.trim();
    const surnameSignIn = document.getElementById("surname_signIn_teacher").value.trim();
    let code = document.getElementById("code-teacher-input").value.trim();

    db.collection("teacher").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc)
            let name_fb = doc.Ud.Ze.proto.mapValue.fields.name.stringValue;
            let surname_fb = doc.Ud.Ze.proto.mapValue.fields.surname.stringValue;
            let id_teacher_fb_p = doc.Ud.Ze.proto.mapValue.fields.idteacher.integerValue;
            if (id_teacher_fb_p === code) {
                let teacher_obj = {
                    name: name_fb,
                    surname: surname_fb,
                    id_teacher_obj: id_teacher_fb_p
                };
                teachers.push(teacher_obj);
                localStorage.setItem("id_teacher", id_teacher_fb_p);
            } else if (id_teacher_fb_p !== code) {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            }
        });

        // Попробовать реализовать через continue и break
        for (let i = 0; i < teachers.length; i++) {
            let id_teacher = localStorage.getItem("id_teacher");
            if (nameSignIn === teachers[i].name && surnameSignIn === teachers[i].surname && code === teachers[i].id_teacher_obj) {
                localStorage.setItem('id_teacher_local', teachers[i].id_teacher_obj);
                check_checkbox();
            } else if (nameSignIn !== teachers[i].name && surnameSignIn !== teachers[i].surname && id_teacher_fb_p !== id_teacher) {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            } else if (nameSignIn !== teachers[i].name) {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            } else if (surnameSignIn !== teachers[i].surname) {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            } else if (id_teacher_fb_p !== id_teacher) {
                Swal.fire({
                    icon: 'error',
                    title: "Вы неверно ввели данные или не ввели их!"
                })
            }
        }
    });
}

// Проверка чекбоксов
function check_checkbox() {
    let choice = document.getElementById("choice-where");

    if (choice.value === "create_test") {
        location.href = "create-test.html";
    } else if (choice.value === "admin") {
        location.href = "admin.html";
    } else if (choice.value === "tests") {
        location.href = "tests.html"
    }
}

function check_input(type, name, surname) {
    let name_2 = document.getElementById(name).value;
    let surname_2 = document.getElementById(surname).value;
    let code = document.getElementById("code-teacher").value;

    if (type === "student") {
        if (name_2 === "") {
            Swal.fire({
                icon: "error",
                title: "Пожалуйста, введите имя"
            })
        } else if (surname_2 === "") {
            Swal.fire({
                icon: "error",
                title: "Пожалуйста, введите фамилию"
            })
        } else {
            signInStudents();
        }
    } else if (type === "teacher") {
        if (name_2 === "") {
            Swal.fire({
                icon: "error",
                title: "Пожалуйста, введите имя"
            })
        } else if (surname_2 === "") {
            Swal.fire({
                icon: "error",
                title: "Пожалуйста, введите фамилию"
            })
        } else if (code === "") {
            Swal.fire({
                icon: "error",
                title: "Пожалуйста, введите код"
            })
        } else {
            signInTeacher();
        }
    }
}
