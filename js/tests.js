// БД
let db = firebase.firestore();

// Пoлучение элемента по id
let tests = document.getElementById("tests");

// Получение из localStorage имени и фамилии
let name = localStorage.getItem("name");
let surname = localStorage.getItem("surname");

// Переменная для нумерации вопросов
number_test = 0;

// Массив с id'ми учителей
let teachers_tests_id = [];

// Вывод тестов
db.collection("tests").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc);
        let inner_table = document.getElementById("inner_table");
        let subject = doc.Ud.Ze.proto.mapValue.fields.subject.stringValue;
        let theme = doc.Ud.Ze.proto.mapValue.fields.theme.stringValue;
        let id_teacher_db = doc.Ud.Ze.proto.mapValue.fields.id_teacher_t.stringValue;
        let id = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;
        let id_image = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;
        let option1 = doc.Ud.Ze.proto.mapValue.fields.option1.stringValue;
        let option2 = doc.Ud.Ze.proto.mapValue.fields.option2.stringValue;
        let option3 = doc.Ud.Ze.proto.mapValue.fields.option3.stringValue;
        let option4 = doc.Ud.Ze.proto.mapValue.fields.option4.stringValue;
        let question = doc.Ud.Ze.proto.mapValue.fields.question.stringValue;
        let correct = doc.Ud.Ze.proto.mapValue.fields.correct.integerValue;
        let klass_db = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;
        let image = firebase.storage().ref(`images_test/${id_image}`);
        let test = document.getElementById("div_tests");
        let student_id = localStorage.getItem("student_id");
        let klass = localStorage.getItem("klass");
        let word_klass = localStorage.getItem("word_klass");

        if (id_teacher_db === student_id) {
          if (`${klass}${word_klass}` === klass_db) {
            number_test += 1;
            inner_table.innerHTML += `
              <tr>
                <th scope="row">${number_test}</th>
                <td>${subject}</td>
                <td>${theme}</td>
                <td>
                  <button class="btn btn-outline-dark" data-toggle="modal" data-target="#${subject}${id}">Открыть вопрос</button>
                </td>
              </tr>
            `;

            test.innerHTML += `
              <div class="modal fade" id="${subject}${id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content" id="test">
                    <p class="lead" id="question">${question}</p>
                    <img class="img-fluid" id="image-test${id}">
                    <div class="custom-control custom-radio" id="option1_div">
                      <input class="custom-control-input" name="radio-answer" type="radio" id="option1${id}">
                      <label class="custom-control-label" for="option1${id}">${option1}</label>
                    </div>
                    <div class="custom-control custom-radio" id="option2_div">
                      <input class="custom-control-input" name="radio-answer" type="radio" id="option2${id}">
                      <label class="custom-control-label" for="option2${id}">${option2}</label>
                    </div>
                    <div class="custom-control custom-radio" id="option3_div">
                      <input class="custom-control-input" name="radio-answer" type="radio" id="option3${id}">
                      <label class="custom-control-label" for="option3${id}">${option3}</label>
                    </div>
                    <div class="custom-control custom-radio" id="option4_div">
                      <input class="custom-control-input" name="radio-answer" type="radio" id="option4${id}">
                      <label class="custom-control-label" for="option4${id}">${option4}</label>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button class="btn btn-outline-success" id="check-answer${id}" style="margin-top: 2%;" onclick="call_test(${id}, ${correct}, '${subject}', '${theme}', '${question}');" style="border-radius: 0">
                          <i class="fas fa-check"></i>
                        Ответить
                      </button>
                      <button class="btn btn-outline-primary" id="back_answer${id}" onclick="backAnswer(${id})" style="margin-top: 2%;">
                          <i class="fas fa-backward"></i>
                        Дать другой ответ
                      </button>
                      <button class="btn btn-outline-dark" style="margin-top: 2%;" data-dismiss="modal">
                          <i class="fas fa-door-open"></i>
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
  
            image.getDownloadURL().then((url) => {
              let image_test = document.getElementById(`image-test${id}`);
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
    })
});

// Отмена ответа
function backAnswer(id) {
    let check_answer_btn = document.getElementById(`check-answer${id}`).disabled = false;
}