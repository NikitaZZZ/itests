// Голос
const voices = window.speechSynthesis.getVoices();

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(`${text}`);        
  utterance.lang = "ru-RU";
  speechSynthesis.speak(utterance);
}

// Получение из localStorage имени и фамилии
const student_id = localStorage.getItem("student_id");
const klass = localStorage.getItem("klass");
const word_klass = localStorage.getItem("word_klass").replace(/\s/g, '').toLowerCase();

const nameStudentLc = localStorage.getItem("name");
const surnameStudentLc = localStorage.getItem("surname");
const schoolStudentLc = localStorage.getItem("school");
const klassStudentLc = localStorage.getItem("klass");
const wordKlassStudentLc = localStorage.getItem("word_klass").toUpperCase();

// Div для вставки тестов
let testsInner = document.getElementById("tests-inner");
let stats = document.getElementById("stats-inner");

// Переменная для нумерации вопросов
number_test = 0;

// Переменная для изображений
let image_number = -1;

// Для вопросов
let question_number = -1;

// Массив с id'ми учителей
let teachers_tests_id = [];

// Результаты теста
let results_test = [];

// Таймер
let timerMassive = [];

let testsNeed = 0;

function visibleTestsNeedP(id) {
  document.getElementById(`visibleTestsNeed${id}`).style.visibility = "visible";
}

// Скрывать пройденные тесты
db.collection("testPass").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const idTestPassDb = doc.data().testPass;

    db.collection("tests").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idTest = doc.data().id;

        if (idTestPassDb == parseInt(idTest)) {
          let testDiv = document.getElementById(`testAcc${idTestPassDb}`);
          testDiv.parentNode.removeChild(testDiv);
        }
      });
    });
  })
});

// Вывод тестов
db.collection("tests").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        question_number = -1;
        image_number += 1;

        id_db = doc.data().id;
        let id_teacher_t_db = doc.data().id_teacher_t;
        let klass_db = doc.data().klass.replace(/\s/g, '').toLowerCase();
        let subject_db = doc.data().subject;
        let theme_db = doc.data().theme;
        questions_db = doc.data().questions;
        let school_db = doc.data().school;

        const nameStudent = nameStudentLc[0].toUpperCase() + nameStudentLc.slice(1);
        const surnameStudent = surnameStudentLc[0].toUpperCase() + surnameStudentLc.slice(1);

        if (schoolStudentLc == school_db) {
          if (`${klass}${word_klass}` == klass_db) {
            testsNeed += 1;

            stats.innerHTML = `
              <div class="information d-flex justify-content-center">
                <div class="card mr-1 mb-2" style="width: 18rem">
                  <div class="card-body">
                    <h5 class="card-title">Информация о вас:</h5>
                    <p class="card-text">Ваше имя: ${nameStudent} ${surnameStudent}</p>
                    <p class="card-text">Вы учитесь в: ${klassStudentLc}${wordKlassStudentLc}</p>
                    <button class="btn btn-primary" type="button" id="btn-sound-tests-need${id_db}" onclick="speak('Вы - ${nameStudent} ${surnameStudent}, учитесь в ${klassStudentLc}${wordKlassStudentLc}');" title="Озвучить сколько нужно пройти тестов">
                      <i class="fas fa-volume-up"></i>
                    </button>
                  </div>
                </div>
                <div class="card ml-1 mb-2" style="width: 18rem">
                  <div class="card-body">
                    <h5 class="card-title">Сколько тестов нужно пройти?</h5>
                      <p class="card-text">Вы можете посмотреть и послушать, сколько тестов вам еще нужно пройти.</p>
                      <button class="btn btn-primary" type="button" id="btn-sound-tests-need${id_db}" onclick="speak('Тестов нужно пройти - ${testsNeed}'); visibleTestsNeedP(${id_db});" title="Озвучить сколько нужно пройти тестов">
                        <i class="fas fa-volume-up"></i>
                      </button>

                      <p style="float: right; visibility: hidden" id="visibleTestsNeed${id_db}">Осталось тестов: ${testsNeed}</p>
                  </div>
                </div>
              </div>
            `;

            testsInner.innerHTML += `
              <div class="accordion" id="testAcc${id_db}">
                <div class="card">
                  <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                          <button class="btn btn-link" type="button" id="btn-title-test" data-bs-toggle="collapse" data-bs-target="#collapse${id_db}" onclick="checkTimer(${id_db})" aria-expanded="true" aria-controls="collapseOne">
                              ${subject_db} - ${theme_db} <div id="timerDiv${id_db}"></div>
                          </button>
                          <button class="btn btn-primary" type="button" id="btn-sound-test${id_db}" onclick="speak('Тест по предмету - ${subject_db.replace(/"/g)}, тема теста - ${theme_db.replace(/"/g)}')" title="Озвучить название теста">
                            <i class="fas fa-volume-up"></i>
                          </button>

                          <button class="btn btn-outline-success mt-0" style="float: right;" onclick="send_test(${id_db}, '${nameStudentLc}', '${surnameStudentLc}'); stopTimer(${id_db});" id="send-test${id_db}">
                            <i class="fas fa-check"></i>
                              Отправить тест учителю
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

          document.getElementById(`btn-sound-test${id_db}`).onclick = () => { speak(`Тест по предмету - ${subject_db}, тема теста - ${theme_db}`) };

          try {
            timerNeed = doc.data().timer;
            timerMassive.push({
              test: id_db,
              timerNeed: timerNeed,
            });

            if (timerNeed == true) {
              timerMinutes = doc.data().timerMinutes;
              timerSeconds = doc.data().timerSeconds;

              if (timerMinutes == '') {
                if (timerSeconds.length == 1) {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: 00:0${timerSeconds}`;
                } else {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: 00:${timerSeconds}`;
                }
              } else if (timerSeconds == '') {
                if (timerSeconds.length == 1) {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:00`;
                } else {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:00`;
                }
              } else {
                if (timerSeconds.length == 1) {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:0${timerSeconds}`;
                } else {
                  const timerDiv = document.getElementById(`timerDiv${id_db}`);
                  timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutes}:${timerSeconds}`;
                }
              }
            } else {}
          } catch {}

          let question = document.getElementById(`test${id_db}`);

          for (let i = 0; i < questions_db.length; i++) {
            question_number += 1;
            const current_question_number = question_number;

            question.innerHTML += `
              <p class="lead" id="question">
                <button class="btn btn-primary" type="button" id="btn-sound-name-question-need${id_db}" onclick="speak('${questions_db[question_number].input_question.replace(/"/g)}. А) ${questions_db[question_number].option_1.replace(/"/g)}. Б) ${questions_db[question_number].option_2.replace(/"/g)}. В) ${questions_db[question_number].option_3.replace(/"/g)}. Г) ${questions_db[question_number].option_4.replace(/"/g)}.')" title="Озвучить вопрос">
                  <i class="fas fa-volume-up"></i>
                </button>
                ${questions_db[question_number].input_question}
              </p>
              
              <img class="img-fluid" width="400" height="400" id="image-test${question_number}">
              
              <div class="form-check mt-1" id="option1_div">
                <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option1${question_number}${id_db}">
                <label class="form-check-label" for="option1${question_number}${id_db}">${questions_db[question_number].option_1}</label>
              </div>
              <div class="form-check" id="option2_div">
                <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option2${question_number}${id_db}">
                <label class="form-check-label" for="option2${question_number}${id_db}">${questions_db[question_number].option_2}</label>
              </div>
              <div class="form-check" id="option3_div">
                <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option3${question_number}${id_db}">
                <label class="form-check-label" for="option3${question_number}${id_db}">${questions_db[question_number].option_3}</label>
              </div>
              <div class="form-check" id="option4_div">
                <input class="form-check-input" name="radio-answer${question_number}${id_db}" type="radio" id="option4${question_number}${id_db}">
                <label class="form-check-label" for="option4${question_number}${id_db}">${questions_db[question_number].option_4}</label>
              </div>

              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-outline-success mt-2" id="check-answer${question_number}${id_db}" style="margin-top: 2%;" onclick="call_test('${id_db}', '${question_number}');" style="border-radius: 0">
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
      }
    });
});

function checkTimer(id) {
  const docRef = db.collection("tests").doc(`${id}`);
  docRef.get().then((doc) => {
    timerMinutesTest = doc.data().timerMinutes;
    timerSecondsTest = doc.data().timerSeconds;
  });

  let timerNeedTest;

  for (let i = 0; i < timerMassive.length; i++) {
    if (timerMassive[i].test == id) {
      timerNeedTest = timerMassive[i].timerNeed;
    } 
  }

  if (timerNeedTest == true) {
    Swal.fire({
      icon: 'info',
      title: 'Осторожно!',
      text: 'При нажатии ОК - Таймер начнет обратный отсчет',
      showDenyButton: true,
      denyButtonText: 'Назад',
      allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
          if (timerSecondsTest == 0) {
            time = (parseInt(timerMinutesTest) * 60) * 1000;
          } else {
            time = (parseInt(timerMinutesTest) * 60) + parseInt(timerSecondsTest) * 1000;
          }

          timerTest = setTimeout(() => {
            clearInterval(intervalTimer);
            send_test(id_db, `${nameStudentLc}`, `${surnameStudentLc}`);
            $(`#testAcc${id_db}`).collapse('hide');

            localStorage.setItem(`testPass${id_db}`, `${id_db}`);
            
            let btnSendTest = document.getElementById(`send-test${id_db}`);
            btnSendTest.disabled = true;
          }, time);

          intervalTimer = setInterval(() => {
            if (timerSecondsTest == 0) {
              timerMinutesTest -= 1;
              timerSecondsTest = 60;
            }

            if (parseInt(timerMinutesTest) == 0 && parseInt(timerSecondsTest) == 3) {
              localStorage.setItem(`testPass${id}`, `${id}`);
              stopTimer(id);
            }

            timerSecondsTest -= 1;

            const timerDiv = document.getElementById(`timerDiv${id}`);
            if (timerSecondsTest < 10) {
              document.head.title = `${timerMinutesTest}:0${timerSecondsTest}`;
              timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutesTest}:0${timerSecondsTest}`;
            } else {
              document.head.title = `${timerMinutesTest}:${timerSecondsTest}`;
              timerDiv.innerHTML = `Таймер прохождения теста: ${timerMinutesTest}:${timerSecondsTest}`;
            }
          }, 1000);
        } else if (result.isDenied) {
          $(`#collapse${id}`).collapse('hide');
        }
    });
  } else {}
}

function testPass(id, name, surname) {
  db.collection('testPass').doc(`${id}`).set({
    testPass: id,
    name: name,
    surname: surname,
  });
}

function stopTimer(id) {
  try {
    clearTimeout(timerTest);
    clearInterval(intervalTimer);
  
    setTimeout(() => {
      location.reload();
    }, 2500);
  } catch {}
}