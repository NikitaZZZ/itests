// Database
let db = firebase.firestore();

// NUMBER FOR STUDENT
let number_student = 0;

// MAS FOR RESULTS STUDENTS
let results_students_mas = [];

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
let random_number;
let min = 1;
let max = 1000;
let random_number_array = [];

// List for results students
function results_students_list() {
    // id local (localStorage)
    let id_teacher_admin2 = localStorage.getItem('id_teacher_local');

    db.collection("results").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let name_fb = doc.Ud.Ze.proto.mapValue.fields.name.stringValue;
            let surname_fb = doc.Ud.Ze.proto.mapValue.fields.surname.stringValue;
            let test_subject = doc.Ud.Ze.proto.mapValue.fields.test_subject.stringValue;
            let test_theme_fb = doc.Ud.Ze.proto.mapValue.fields.test_theme.stringValue;
            let test_title_fb = doc.Ud.Ze.proto.mapValue.fields.test_title.stringValue;
            let result_fb = doc.Ud.Ze.proto.mapValue.fields.result.stringValue;
            let teacher_fb = doc.Ud.Ze.proto.mapValue.fields.id_teacher_r.stringValue;
            let id_fb = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;

            let student_res_obj = {
                name: name_fb,
                surname: surname_fb,
                test_subject: test_subject,
                test_theme: test_theme_fb,
                test_title: test_title_fb,
                result: result_fb,
                id_teacher_admin: teacher_fb,
                id_test: id_fb
            };

            results_students_mas.push(student_res_obj);
        });

        // FOR []
        for (let i = 0; i < results_students_mas.length; i++) {
            if ( id_teacher_admin2 === results_students_mas[i].id_teacher_admin ) {
                random_number = Math.floor(Math.random() * (max - min)) + min;
                random_number_array.push(random_number);

                number_student += 1;

                // inner result
                results_students_inner_adm.innerHTML += `
                    <tr>
                        <td>${number_student}</td>
                        <td>${results_students_mas[i].name} ${results_students_mas[i].surname}</td>
                        <td>${results_students_mas[i].test_subject}</td>
                        <td id="${random_number}"></td>
                    </tr>
                `;
            } else { }
        }
    });

    // Вывод тестов
    db.collection("tests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            button_number += 1;
            question_number = -1;
            image_number += 1;
            let id_db = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;
            let id_teacher_t_db = doc.Ud.Ze.proto.mapValue.fields.id_teacher_t.stringValue;
            let klass_db = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;
            let subject_db = doc.Ud.Ze.proto.mapValue.fields.subject.stringValue;
            let theme_db = doc.Ud.Ze.proto.mapValue.fields.theme.stringValue;
            let questions_db = doc.Ud.Ze.proto.mapValue.fields.questions.arrayValue.values;

            let student_id = localStorage.getItem("student_id");
            let klass = localStorage.getItem("klass");
            let word_klass = localStorage.getItem("word_klass");

            let test = document.getElementById("div_tests");

            if (id_teacher_t_db === student_id) {
              if (`${klass}${word_klass}` === klass_db) {
                if (results_students_mas[button_number].id_test === id_db) {
                  number_test += 1;
                  for (let i = 0; i < random_number_array.length; i++) {
                    let td = document.getElementById(random_number_array[i]);

                    // inner btn open modal window test
                    td.innerHTML += `
                        <button class="btn btn-outline-dark" data-toggle="modal" data-target="#${subject_db}${id_db}">Открыть тест</button>
                    `;
                  }

                  // inner modal window test
                  test.innerHTML += `
                    <div class="modal fade" id="${subject_db}${id_db}" tabindex="-1" role="dialog" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" id="test${id_db}"></div>
                          <div class="modal-footer" id="test-footer">
                            <button class="btn btn-outline-dark" data-dismiss="modal" id="close-test">
                              <i class="fas fa-door-open"></i>
                              Закрыть
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;

                  // get question
                  let question = document.getElementById(`test${id_db}`);

                  for (let i = 0; i < questions_db.length; i++) {
                    question_number += 1;
                    const current_question_number = question_number

                    // inner test
                    question.innerHTML += `
                      <p class="lead" id="question">${questions_db[question_number].mapValue.fields.input_question.stringValue}</p>
                      <img class="img-fluid" id="image-test${question_number}">
                      <div class="custom-control custom-radio" id="option1_div">
                        <input class="custom-control-input" name="radio-answer${question_number}${id_db}" type="radio" id="option1${question_number}${id_db}">
                        <label class="custom-control-label" for="option1${question_number}${id_db}">${questions_db[question_number].mapValue.fields.option_1.stringValue}</label>
                      </div>
                      <div class="custom-control custom-radio" id="option2_div">
                        <input class="custom-control-input" name="radio-answer${question_number}${id_db}" type="radio" id="option2${question_number}${id_db}">
                        <label class="custom-control-label" for="option2${question_number}${id_db}">${questions_db[question_number].mapValue.fields.option_2.stringValue}</label>
                      </div>
                      <div class="custom-control custom-radio" id="option3_div">
                        <input class="custom-control-input" name="radio-answer${question_number}${id_db}" type="radio" id="option3${question_number}${id_db}">
                        <label class="custom-control-label" for="option3${question_number}${id_db}">${questions_db[question_number].mapValue.fields.option_3.stringValue}</label>
                      </div>
                      <div class="custom-control custom-radio" id="option4_div">
                        <input class="custom-control-input" name="radio-answer${question_number}${id_db}" type="radio" id="option4${question_number}${id_db}">
                        <label class="custom-control-label" for="option4${question_number}${id_db}">${questions_db[question_number].mapValue.fields.option_4.stringValue}</label>
                      </div>
                      <p class="lead">Ученик ответил: ${results_students_mas[question_number].result}</p>
                    `;

                    // inner image(s)
                    let image = firebase.storage().ref(`/test${id_db}/question${question_number}`);
                    image.getDownloadURL().then((url) => {
                      let image_test = document.getElementById(`image-test${current_question_number}`);
                      image_test.src = url;
                    }).catch((error) => {
                      switch (error.code) {
                        case 'storage/object-not-found': break;
                        case 'storage/unauthorized': break;
                        case 'storage/canceled': break;
                        case 'storage/unknown': break;
                      }
                    })
                }
                }
            }
          }
        })
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
