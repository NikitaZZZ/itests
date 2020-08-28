// БД
let db = firebase.firestore();

// Пoлучение элемента по id
let tests = document.getElementById("tests");

// Получение из localStorage имени и фамилии
let name = localStorage.getItem("name");
let surname = localStorage.getItem("surname");

// Переменная для нумерации вопросов
number_test = 0;

// Переменная для изображений
let image_number = -1;

// Для вопросов
let question_number = -1;

// Массив с id'ми учителей
let teachers_tests_id = [];

// результаты теста
let results_test = [];

// Вывод тестов
db.collection("tests").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
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
        let inner_table = document.getElementById("inner_table");

        if (id_teacher_t_db === student_id) {
          if (`${klass}${word_klass}` === klass_db) {
            number_test += 1;
            inner_table.innerHTML += `
              <tr>
                <th scope="row">${number_test}</th>
                <td>${subject_db}</td>
                <td>${theme_db}</td>
                <td>
                  <button class="btn btn-outline-dark" data-toggle="modal" data-target="#${subject_db}${id_db}">Открыть тест</button>
                </td>
              </tr>
            `;

            test.innerHTML += `
              <div class="modal fade" id="${subject_db}${id_db}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body" id="test${id_db}"></div>
                    <div class="modal-footer" id="test-footer">
                      <button class="btn btn-outline-success" onclick="send_test()" id="send-test">
                        <i class="fas fa-check"></i>
                        Отправить учителю
                      </button>
                      <button class="close-test btn btn-outline-dark" data-dismiss="modal" id="close-test${id_db}" disabled>
                        <i class="fas fa-door-open"></i>
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;

            let question = document.getElementById(`test${id_db}`);

            for (let i = 0; i < questions_db.length; i++) {
              question_number += 1;
              const current_question_number = question_number

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
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test(${id_db}, ${questions_db[question_number].mapValue.fields.correct_answer.integerValue}, '${subject_db}', '${theme_db}', '${questions_db[question_number].mapValue.fields.input_question.stringValue}', '${question_number}', '${id_teacher_t_db}', '${klass}', '${word_klass}');" style="border-radius: 0">
                      <i class="fas fa-check"></i>
                    Ответить
                  </button>
                </div>
              `;

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
    })
});
