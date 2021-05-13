// Правильный ответ
let correct_answer;

// Для массива вопросов
let questions_massive = [];

// Для нумерации тестов
let question_number = 0;

// Для нумерации готовых тестов
let question_number_general_tests = -1;

// Для изображений
let image_number = -1;

// Для показа вопросов
let question_number_show = -1;

// Id for test
let numberId = getRandId();

// Вывод готовых тестов
try {
  let testsKlass5 = document.getElementById('testsKlass5');
  let testsKlass6 = document.getElementById('testsKlass6');
  let testsKlass7 = document.getElementById('testsKlass7');
  let testsKlass8 = document.getElementById('testsKlass8');
  let testsKlass9 = document.getElementById('testsKlass9');
  let testsKlass10 = document.getElementById('testsKlass10');
  let testsKlass11 = document.getElementById('testsKlass11');
} catch {}

// ID teacher
let idTeacherGeneralTests = localStorage.getItem('id_teacher');

let testsMassive = [];

function updateId() {
  numberId = getRandId();
}

// inner general tests
function generalTests() {
  db.collection("generalTests").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      image_number += 1;
  
      id_db = doc.data().id;
      let klass_db = doc.data().klass.replace(/\s/g, '').toLowerCase();
      let subject_db = doc.data().subject;
      let theme_db = doc.data().theme;
      questions_db = doc.data().questions;
  
      testsMassive.push({
        id: id_db,
        klass: klass_db,
        subject: subject_db,
        theme: theme_db,
        questions: questions_db,
      });
  
      if (klass_db == 5) {
        testsKlass5.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 6) {
        testsKlass6.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number_general_tests}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number_general_tests}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 7) {
        testsKlass7.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number_general_tests}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number_general_tests}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 8) {
        testsKlass8.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number_general_tests}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number_general_tests}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 9) {
        testsKlass9.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number_general_tests}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number_general_tests}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 10) {
        testsKlass10.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
  
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-success mt-2" id="check-answer${question_number_general_tests}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number_general_tests}');" style="border-radius: 0">
                <i class="fas fa-check"></i>
                  Ответить
              </button>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      } else if (klass_db == 11) {
        testsKlass11.innerHTML += `
          <div class="accordion" id="testAcc${id_db}">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" aria-expanded="true" aria-controls="collapseOne">
                    ${subject_db} - ${theme_db}
                  </button>
  
                  <button class="btn btn-outline-success" style="float: right;" type="button" id="btn-plus-test" onclick="addTest(${id_db}, ${idTeacherGeneralTests})">
                    Добавить тест
                  </button>
                </h5>
              </div>
                
              <div id="collapse${id_db}" class="collapse" aria-labelledby="headingOne">
                <div class="card-body" id="${subject_db}${id_db}">
                  <div id="test${id_db}"></div>
                </div>
              </div>
            </div>
          </div>
        `;
  
        let question = document.getElementById(`test${id_db}`);
  
        for (let i = 0; i < questions_db.length; i++) {
          question_number_general_tests += 1;
          const current_question_number = question_number_general_tests;
  
          question.innerHTML += `
            <p class="lead" id="question">${questions_db[question_number_general_tests].input_question}</p>
            
            <img class="img-fluid" id="image-test${question_number_general_tests}">
                  
            <div class="form-check mt-1" id="option1_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option1${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option1${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_1}</label>
            </div>
            <div class="form-check" id="option2_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option2${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option2${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_2}</label>
            </div>
            <div class="form-check" id="option3_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option3${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option3${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_3}</label>
            </div>
            <div class="form-check" id="option4_div">
              <input class="form-check-input" name="radio-answer${question_number_general_tests}${id_db}" type="radio" id="option4${question_number_general_tests}${id_db}">
              <label class="form-check-label" for="option4${question_number_general_tests}${id_db}">${questions_db[question_number_general_tests].option_4}</label>
            </div>
          `;
  
          let image = firebase.storage().ref(`/test${id_db}/question${question_number_general_tests}`);
  
          image.getDownloadURL().then((url) => {
            let image_test = document.getElementById(`image-test${current_question_number}`);
            image_test.src = url;
          }).catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found': 
                let image_test_onf = document.getElementById(`image-test${current_question_number}`);
                image_test_onf.parentNode.removeChild(image_test_onf);
              break;
              case 'storage/unauthorized': 
                let image_test_uaz = document.getElementById(`image-test${current_question_number}`);
                image_test_uaz.parentNode.removeChild(image_test_uaz);
              break;
              case 'storage/canceled': 
                let image_test_ccd = document.getElementById(`image-test${current_question_number}`);
                image_test_ccd.parentNode.removeChild(image_test_ccd);
              break;
              case 'storage/unknown': 
                let image_test_unk = document.getElementById(`image-test${current_question_number}`);
                image_test_unk.parentNode.removeChild(image_test_unk);
              break;
            }
          });
        }
      }
    });
  });
}

function checkFieldsTest() {
  const school = document.getElementById('school').value;
  const klass = document.getElementById('klass').value;
  const theme = document.getElementById('theme').value;

  if (questions_massive.length == 0 ||
    school == '' ||
    klass == '' ||
    theme == '') {
    cantCreateTestMsg();
  } else {
    create_test();
  }
}

function cantCreateTestMsg() {
  Swal.fire({
    icon: 'error',
    title: 'Ошибка',
    text: 'Невозможно создать тест. Добавьте хотя бы один вопрос, либо заполните все поля.',
  });
}

// Создание вопроса
function create_question() {
    let pills_tab = document.getElementById("pills-tab");
    let questionsDiv = document.getElementById("questions");
    let input_question = document.getElementById("input_question").value;
    let option_radio1 = document.getElementById("option_radio1");
    let option_radio2 = document.getElementById("option_radio2");
    let option_radio3 = document.getElementById("option_radio3");
    let option_radio4 = document.getElementById("option_radio4");
    let option_1 = document.getElementById("inputText1").value;
    let option_2 = document.getElementById("inputText2").value;
    let option_3 = document.getElementById("inputText3").value;
    let option_4 = document.getElementById("inputText4").value;
    let checkbox_file = document.getElementById("checkbox_file");

    if (checkbox_file.checked) {} else {
        let file = document.getElementById("files").files[0];
        let file_name = file.name;
        let storageRef = firebase.storage().ref(`/test${numberId}/` + `question${question_number}`);
        let uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', (snapshot) => {}, (error) => {}, () => {
            let downloadURL = uploadTask.snapshot.downloadURL;
        });
    }

    if (option_radio1.checked === true) {
        correct_answer = 1;
    } else if (option_radio2.checked === true) {
        correct_answer = 2;
    } else if (option_radio3.checked === true) {
        correct_answer = 3;
    } else if (option_radio4.checked === true) {
        correct_answer = 4;
    }

    let object_question = {
        input_question: input_question,
        option_1: option_1,
        option_2: option_2,
        option_3: option_3,
        option_4: option_4,
        correct_answer: correct_answer
    };

    questions_massive.push(object_question);

    question_number += 1;
    question_number_show += 1;

    pills_tab.innerHTML += `
      <li class="nav-item ml-2">
         <a class="nav-link mt-2" id="pills-test${question_number}-tab" data-bs-toggle="collapse" href="#pills-test${question_number}" role="tab" aria-controls="pills-plus" aria-selected="false">Вопрос ${question_number}</a>
      </li>
    `;

    questionsDiv.innerHTML += `
      <div class="collapse" id="pills-test${question_number}">
        <div class="card text-center">
          <div class="card-header">
            <h5 class="card-title" style="margin-bottom: 0; padding-bottom: 0;">${questions_massive[question_number_show].input_question}</h5>
          </div>
          <div class="card-body">
            <p class="card-text">1) ${questions_massive[question_number_show].option_1}</p>
            <p class="card-text">2) ${questions_massive[question_number_show].option_2}</p>
            <p class="card-text">3) ${questions_massive[question_number_show].option_3}</p>
            <p class="card-text">4) ${questions_massive[question_number_show].option_4}</p>
            <h5 class="card-title">Правильный ответ: ${questions_massive[question_number_show].correct_answer})</h5>
          </div>
        </div>
      </div>
    `;

    document.getElementById("input_question").value = '';
    document.getElementById("inputText1").value = '';
    document.getElementById("inputText2").value = '';
    document.getElementById("inputText3").value = '';
    document.getElementById("inputText4").value = '';

    option_radio1.checked = false;
    option_radio2.checked = false;
    option_radio3.checked = false;
    option_radio4.checked = false;
}

function create_test() {
    let subject = document.getElementById("subject").value;
    let theme = document.getElementById("theme").value;
    let klass = document.getElementById("klass").value;
    let school = document.getElementById("school").value;
    let id_teacher_admin = localStorage.getItem('id_teacher_local');
  
    try {
      let timerNeed = document.getElementById('timerNeed');
      let timerMinutes = document.getElementById('timerMinutes').value;
      let timerSeconds = document.getElementById('timerSeconds').value;

      if (timerNeed.checked) {
        if (timerSeconds == "") {
          timerSeconds = 0;
        } else if (timerMinutes == "") {
          timerMinutes = 0;
        }

        db.collection(`tests`).doc(`${numberId}`).set({
          subject: subject,
          theme: theme,
          klass: klass,
          school: school,
          id: numberId,
          id_teacher_t: id_teacher_admin,
          questions: questions_massive,
          timer: true,
          timerMinutes: timerMinutes,
          timerSeconds: timerSeconds
        });
      } else {
        db.collection(`tests`).doc(`${numberId}`).set({
          subject: subject,
          theme: theme,
          klass: klass,
          school: school,
          id: numberId,
          id_teacher_t: id_teacher_admin,
          questions: questions_massive
        });
      }
    } catch {
      db.collection(`tests`).doc(`${numberId}`).set({
        subject: subject,
        theme: theme,
        klass: klass,
        school: school,
        id: numberId,
        id_teacher_t: id_teacher_admin,
        questions: questions_massive
      });
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Вы успешно создали тест!',
        showConfirmButton: false,
        timer: 2000,
    });

    // update id for other test
    updateId();
}

function addTest(idTest, idTeacher) {
  let schoolPrompt = prompt('Введите школу, для которой будет создан тест: ');
  let klassPrompt = prompt('Введите класс (С буквой), для которого будет создан тест: ');
  let randId = getRandId();

  for (let i = 0; i < testsMassive.length; i++) {
    if (testsMassive[i].id == idTest) {
      db.collection(`tests`).doc(`${randId}`).set({
        subject: testsMassive[i].subject,
        theme: testsMassive[i].theme,
        klass: klassPrompt,
        school: schoolPrompt,
        id: randId,
        id_teacher_t: idTeacher,
        questions: testsMassive[i].questions,
      });
    }
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,

    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'success',
    title: `Тест добавлен!`,
  });
}