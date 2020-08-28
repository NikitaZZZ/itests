// Database
let db = firebase.firestore();

// NUMBER FOR STUDENT
let number_student = 0;

// MAS FOR RESULTS STUDENTS
let results_students_mas_right = [];
let results_students_mas_wrong = [];

// MAS FOR STUDENTS
let students_mas = [];

// NUMBER FOR TESTS
let number_tests = 0;

// MAS FOR TESTS
let tests_mas = [];

// INNER FOR HTML
let results_students_inner_adm = document.getElementById("results_students_table");
let students_inner_adm = document.getElementById("students_table");
let tests_inner_adm = document.getElementById("tests_inner");

// Reg new Student
function signUpStudent() {
    let name = document.getElementById("name").value.trim();
    let surname = document.getElementById("surname").value.trim();
    let klass = document.getElementById("klass").value;
    let word_klass = document.getElementById("word_klass").value;

    // id (localStorage)
    let id_teacher_admin = localStorage.getItem('id_teacher_local');

    if (name === "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        })
    } else if (surname === "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        })
    } else if (klass === "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        })
    } else if (word_klass === "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Успешно!',
            showConfirmButton: false,
            timer: 1500
        });

        db.collection("students").add({
            name: name,
            surname: surname,
            klass: klass,
            word_klass: word_klass,
            id_teacher_t: id_teacher_admin
        });

        localStorage.setItem("student_id", id_teacher_admin);
    }
}

// Students
function students_list() {
    let teacher_lc = localStorage.getItem("id_teacher_local");

    db.collection("students").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let name_fb = doc.Ud.Ze.proto.mapValue.fields.name.stringValue;
            let surname_fb = doc.Ud.Ze.proto.mapValue.fields.surname.stringValue;
            let id_teacher_admin2 = doc.Ud.Ze.proto.mapValue.fields.id_teacher_t.stringValue;
            let word_klass = doc.Ud.Ze.proto.mapValue.fields.word_klass.stringValue;
            let klass = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;

            let student_obj = {
                name: name_fb,
                surname: surname_fb,
                klass: klass,
                word_klass: word_klass,
                id: id_teacher_admin2
            };

            students_mas.push(student_obj);
        });

        // FOR []
        for (let i = 0; i < students_mas.length; i++) {
            if ( teacher_lc === students_mas[i].id ) {
                number_student += 1;

                // inner student
                students_inner_adm.innerHTML += `
                    <tr>
                        <td>${number_student}</td>
                        <td>${students_mas[i].name} ${students_mas[i].surname}</td>
                        <td>${students_mas[i].klass}${students_mas[i].word_klass}</td>
                    </tr>
                `;
            } else { }
        }
    });
}

// Переменная для изображений
let image_number = -1;

// Для вопросов
let question_number = -1;

// Переменная для нумерации вопросов
number_test = 0;

// Для получения из массивая id
let button_number = -1;

// Генерация рандомных чисел для id кнопки открытия тестов
let random_number = 0;
let min = 1;
let max = 1000;
let random_number_array = [];

// Нумерация
let number_numer = 0;

// оценка
let appraisal = 0;

// List for results students
function results_students_list() {
    // id local (localStorage)
    db.collection("results").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let result_arr = doc.data().result;

            for (let i = 0; i < result_arr.length; i++) {
                if (result_arr[i].result == "Правильно") {
                    results_students_mas_right.push({
                        result: 'Правильно',
                        id: i
                    });
                } else if (result_arr[i].result == "Неправильно") {
                    results_students_mas_wrong.push({
                        result: 'Неправильно',
                        id: i
                    });
                }
            }
            
            number_numer += 1;
            number_student += 1;

            results_students_inner_adm.innerHTML += `
                <tr>
                    <td>${number_student}</td>
                    <td>${result_arr[0].name} ${result_arr[0].surname}</td>
                    <td>${result_arr[0].klass}${result_arr[0].word_klass}</td>
                    <td>${result_arr[0].test_subject}</td>
                    <td>${result_arr[0].test_theme}</td>
                    <td id="result-inner-${number_numer}"></td>
                </tr>
            `;

            for (let i = 0; i < result_arr.length; i++) {
                try {
                    if (results_students_mas_right[i].id == i) {
                        // Всего ответов
                        all_results = results_students_mas_right.length + results_students_mas_wrong.length;
    
                        // Алгоритм вычисления процента от числа
                        percent_result = Math.round((results_students_mas_right.length / all_results) * 100);
    
                        if (percent_result >= 90) {
                            appraisal = 5;
                        } else if (percent_result >= 70) {
                            appraisal = 4;
                        } else if (percent_result >= 50) {
                            appraisal = 3;
                        } else {
                            appraisal = 2;
                        }  
                    } 
                } catch { }

                try {
                    if (results_students_mas_wrong[i].id == i) {
                        // Всего ответов
                        all_results = results_students_mas_right.length + results_students_mas_wrong.length;
    
                        // Алгоритм вычисления процента от числа
                        percent_result = Math.round((results_students_mas_right.length / all_results) * 100);
    
                        if (percent_result >= 90) {
                            appraisal = 5;
                        } else if (percent_result >= 70) {
                            appraisal = 4;
                        } else if (percent_result >= 50) {
                            appraisal = 3;
                        } else if (percent_result < 50) {
                            appraisal = 2;
                        }
                    }
                } catch { }

                let res_inner = document.getElementById(`result-inner-${number_numer}`)

                res_inner.innerHTML = `
                    <tr>
                        <td id="${random_number}">
                            <p id="appersial${number_numer}">${appraisal}</p>
                        </td>
                    </tr>
                `;

                let appersial_elem = document.getElementById(`appersial${number_numer}`);
                switch (appraisal) {
                    case 2: appersial_elem.className = "appersial alert alert-danger"; break;
                    case 3: appersial_elem.className = "appersial alert alert-warning"; break;
                    case 4: appersial_elem.className = "appersial alert alert-primary"; break;
                    case 5: appersial_elem.className = "appersial alert alert-success"; break;
                }
            }

            result_arr = [];
            results_students_mas_right = [];
            results_students_mas_wrong = [];
        });
    });
}

// Enter tests for teacher
function tests() {
    // id local (localStorage)
    let id_teacher_admin2 = localStorage.getItem('id_teacher_local');

    db.collection("tests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let subject_fb = doc.Ud.Ze.proto.mapValue.fields.subject.stringValue;
            id = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;
            let klass_fb = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;
            let school_fb = doc.Ud.Ze.proto.mapValue.fields.school.stringValue;
            let theme_fb = doc.Ud.Ze.proto.mapValue.fields.theme.stringValue;

            // id fb (firebase)
            let id_teacher_admin1 = doc.Ud.Ze.proto.mapValue.fields.id_teacher_t.stringValue;

            if ( id_teacher_admin2 === id_teacher_admin2 ) {
                // number tests
                number_tests += 1;

                // inner test
                tests_inner_adm.innerHTML += `
                  <tr id="test${id}">
                      <th id="number-test" scope="row">${number_tests}</th>
                      <td id="subject-test">${subject_fb}</td>
                      <td id="school-test">${school_fb}</td>
                      <td id="klass-test">${klass_fb}</td>
                      <td id="theme-test">${theme_fb}</td>
                      <td id="delete-test">
                          <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                              <i class="fas fa-trash"></i>
                          </button>
                      </td>
                  </tr>
                `;
            } else { }
        });
    });
}

// Clear div students
function clear_students() {
    students_mas = [];
    students_inner_adm.innerHTML = '';
    number_student = 0;
}

// Clear div results students
function clear_results_students() {
    results_students_mas = [];
    results_students_inner_adm.innerHTML = '';
    number_student = 0;
}

// Clear div tests
function clear_tests() {
    tests_inner_adm.innerHTML = '';
    number_tests = 0;
    tests_mas = [];
}
