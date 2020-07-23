let db = firebase.firestore();

// Переменная правильного ответа
let correct_answer;

// Создание чисел и вызов функции check()
max = 1;
min = 1000;
number_id = Math.floor(Math.random() * (max - min)) + min;

// Проверка всех полей и чекбоксов при создании теста
// function check() {
//     let input_question_check = document.getElementById("input_question").value;
//     let option_radio1_check = document.getElementById("option_radio1");
//     let option_radio2_check = document.getElementById("option_radio2");
//     let option_radio3_check = document.getElementById("option_radio3");
//     let option_radio4_check = document.getElementById("option_radio4");
//     let option_1_check = document.getElementById("inputText1").value;
//     let option_2_check = document.getElementById("inputText2").value;
//     let option_3_check = document.getElementById("inputText3").value;
//     let option_4_check = document.getElementById("inputText4").value;
//     let school = document.getElementById("school").value;
//     let klass = document.getElementById("klass").value;
//     let theme = document.getElementById("theme").value;
//     let file = document.getElementById("files").files[0];
//     let checkbox_file = document.getElementById("checkbox_file");
//
//     if (input_question_check === '') {
//         Swal.fire({
//             text: "Введите вопрос!",
//             icon: "error"
//         })
//     } else if (file === undefined && checkbox_file.checked === false) {
//         Swal.fire({
//             text: "Выберите изображение или нажмите на кнопку 'Без изображения'!",
//             icon: "error"
//         })
//     } else if (option_1_check === '') {
//         Swal.fire({
//             text: "Введите первый вариант ответа!",
//             icon: "error"
//         })
//     } else if (option_2_check === '') {
//         Swal.fire({
//             text: "Введите второй вариант ответа!",
//             icon: "error"
//         })
//     } else if (option_3_check === '') {
//         Swal.fire({
//             text: "Введите третий вариант ответа!",
//             icon: "error"
//         })
//     } else if (option_4_check === '') {
//         Swal.fire({
//             text: "Введите четвертый вариант ответа!",
//             icon: "error"
//         })
//     } else if (option_radio1_check.checked === false
//         && option_radio2_check.checked === false
//         && option_radio3_check.checked === false
//         && option_radio4_check.checked === false)
//     {
//         Swal.fire({
//             text: "Выберите правильный ответ!",
//             icon: "error"
//         })
//     } else if (school === "") {
//         Swal.fire({
//             text: "Введите школу!",
//             icon: "error"
//         })
//     } else if (klass === "") {
//         Swal.fire({
//             text: "Введите класс!",
//             icon: "error"
//         })
//     } else if (theme === "") {
//         Swal.fire({
//             text: "Введите тему!",
//             icon: "error"
//         })
//     } else {
//         create_question();
//     }
// }

// Для массива вопросов
let questions_massive = [];

// Для нумерации тестов
let question_number = 0;

// Для показа вопросов
let question_number_show = -1;

// Создание теста
function create_question() {
    let pills_tab = document.getElementById("pills-tab");
    let pills_tabContent = document.getElementById("pills-tabContent");
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

    if (checkbox_file.checked) { } else {
        let file = document.getElementById("files").files[0];
        let file_name = file.name;
        let storageRef = firebase.storage().ref(`/test${question_number}/` + number_id);
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
         <a class="nav-link" id="pills-test${question_number}-tab" data-toggle="pill" href="#pills-test${question_number}" role="tab" aria-controls="pills-plus" aria-selected="false">Вопрос ${question_number}</a>
      </li>
    `;

    pills_tabContent.innerHTML += `
      <div class="tab-pane" id="pills-test${question_number}" role="tabpanel" aria-labelledby="pills-test${question_number}-tab">
        <div class="card text-center">
          <div class="card-header">
            <h5 class="card-title" style="margin-bottom: 0; padding-bottom: 0;">${questions_massive[question_number_show].input_question}</h5>
          </div>
          <div class="card-body">
            <h5 class="card-title">Варианты ответа</h5>
            <p class="card-text">1) ${questions_massive[question_number_show].option_1}</p>
            <p class="card-text">2) ${questions_massive[question_number_show].option_2}</p>
            <p class="card-text">3) ${questions_massive[question_number_show].option_3}</p>
            <p class="card-text">4) ${questions_massive[question_number_show].option_4}</p>
            <h5 class="card-title">Правильный ответ</h5>
            <p class="card-text">${questions_massive[question_number_show].correct_answer})</p>
          </div>
        </div>
      </div>
    `;
}

function create_test() {
  let subject = document.getElementById("subject").value;
  let theme = document.getElementById("theme").value;
  let klass = document.getElementById("klass").value;
  let school = document.getElementById("school").value;
  let id_teacher_admin = localStorage.getItem('id_teacher_local');

  Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Вы успешно создали тест!',
      showConfirmButton: false,
      timer: 1500
  })

  db.collection(`tests`).doc(`${number_id}`).set({
      subject: subject,
      theme: theme,
      klass: klass,
      school: school,
      id: number_id,
      id_teacher_t: id_teacher_admin,
      questions: questions_massive
  })
}
