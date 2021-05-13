// NUMBER FOR STUDENT
let number_student = 0;

// MAS FOR RESULTS STUDENTS
let results_students_mas_right = [];
let results_students_mas_wrong = [];

// MAS FOR STUDENTS
let students_mas = [];

// MAS FOR TESTS
let tests_mas = [];

// INNER FOR HTML
let results_students_inner_adm = document.getElementById("results_students_table");
let students_inner_adm = document.getElementById("students_table");
let tests_inner_adm = document.getElementById("tests_inner");
let generalTestTabLink = document.getElementById('v-pills-general-test-tab');

// Teacher ID (localStorage)
let idTeacherAdmin = localStorage.getItem('id_teacher_local');

// FOR ADMIN ITESTS
window.onload = () => {
    if (idTeacherAdmin == 607) {
        generalTestTabLink.style.visibility = "visible";
    }
};

// Reg new Student
function signUpStudent() {
    let name = document.getElementById("name").value.replace(/\s/g, '');
    let surname = document.getElementById("surname").value.replace(/\s/g, '');
    let klass = document.getElementById("klass").value;
    let word_klass = document.getElementById("word_klass").value;
    let school = document.getElementById('school').value;

    if (name == "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        });
    } else if (surname == "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        });
    } else if (klass == "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        });
    } else if (word_klass == "") {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        });
    } else if (school == '') {
        Swal.fire({
            title: "Все поля должны быть заполнены",
            icon: "error"
        });    
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Успешно!',
            showConfirmButton: false,
            timer: 1500
        });

        const idStudent = getRandId();

        db.collection("students").doc(`${idStudent}`).set({
            name: name,
            surname: surname,
            klass: klass,
            word_klass: word_klass,
            school: school,
            id_teacher_t: idTeacherAdmin,
            id: idStudent
        });

        localStorage.setItem("student_id", idTeacherAdmin);
    }
}

// Students
function students_list() {
    students_mas = [];
    students_inner_adm.innerHTML = '';
    number_student = 0;

    let teacher_lc = localStorage.getItem("id_teacher_local");

    db.collection("students").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let name_fb = doc.data().name;
            let surname_fb = doc.data().surname;
            let id_teacher_admin2 = doc.data().id_teacher_t;
            let word_klass = doc.data().word_klass;
            let klass = doc.data().klass;
            let idStudent = doc.data().id;

            name_fb[0].toUpperCase();
            surname_fb[0].toUpperCase();

            let student_obj = {
                name: name_fb,
                surname: surname_fb,
                klass: klass,
                word_klass: word_klass,
                id: id_teacher_admin2,
                idStudent: idStudent
            };

            students_mas.push(student_obj);
        });

        // FOR []
        for (let i = 0; i < students_mas.length; i++) {
            if ( teacher_lc === students_mas[i].id ) {
                number_student += 1;

                // inner student
                students_inner_adm.innerHTML += `
                    <tr id="student${students_mas[i].idStudent}">
                        <td>${number_student}</td>
                        <td class="studentName">${students_mas[i].name} ${students_mas[i].surname}</td>
                        <td>${students_mas[i].klass}${students_mas[i].word_klass}</td>
                        <td id="delete-test">
                            <button class="btn btn-outline-danger" onclick="delete_student(${students_mas[i].idStudent})" id="delete-test">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            } else { }
        }
    });
}

// Для вопросов
let question_number_admin = -1;

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
    results_students_mas = [];
    results_students_inner_adm.innerHTML = '';
    number_student = 0;

    db.collection("results").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let result_arr = doc.data().result;
            let idTeacher = doc.data().result[0].id_teacher;
            let date = doc.data().date;
            let idTeacherLc = localStorage.getItem("id_teacher");

            try {
                if (idTeacher == idTeacherLc) {
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

                    const nameFb = result_arr[0].name[0].toUpperCase() + result_arr[0].name.slice(1);
                    const surnameFb = result_arr[0].surname[0].toUpperCase() + result_arr[0].surname.slice(1);
        
                    results_students_inner_adm.innerHTML += `
                        <tr id="resultTest${result_arr[0].id}">
                            <td>${number_student}</td>
                            <td class="resultStudentName">${nameFb} ${surnameFb}</td>
                            <td>${result_arr[0].klass}</td>
                            <td>${result_arr[0].test_subject}</td>
                            <td>${result_arr[0].test_theme}</td>
                            <td id="date">${date}</td>
                            <td id="result-inner-${number_numer}"></td>
                            <td id="delete-test">
                                <button class="btn btn-outline-danger" onclick="delete_result_test(${result_arr[0].id}, '${result_arr[0].name}', '${result_arr[0].surname}')" id="delete-test">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
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
                                    <div id="appersial${number_numer}">
                                        <p id="text-appersial">${appraisal}</p>
                                    </div>
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
                }
            } catch {}
        });
    });
}

// Enter tests for teacher
function tests() {
    document.getElementById('algebra').innerHTML = ``;
    document.getElementById('math').innerHTML = ``;
    document.getElementById('english').innerHTML = ``;
    document.getElementById('biology').innerHTML = ``;
    document.getElementById('okrworld').innerHTML = ``;
    document.getElementById('geography').innerHTML = ``;
    document.getElementById('geometry').innerHTML = ``;
    document.getElementById('history').innerHTML = ``;
    document.getElementById('literature').innerHTML = ``;
    document.getElementById('physics').innerHTML = ``;
    document.getElementById('alchemy').innerHTML = ``;
    document.getElementById('russian').innerHTML = ``;
    document.getElementById('obzh').innerHTML = ``;
    document.getElementById('pe').innerHTML = ``;
    document.getElementById('tech').innerHTML = ``;
    document.getElementById('obsh').innerHTML = ``;
    document.getElementById('it').innerHTML = ``;

    tests_mas = [];

    // id local (localStorage)
    let id_teacher_admin2 = localStorage.getItem('id_teacher_local');
    let algebra = document.getElementById('algebra');
    let math = document.getElementById('math');
    let english = document.getElementById('english');
    let biology = document.getElementById('biology');
    let okrworld = document.getElementById('okrworld');
    let geography = document.getElementById('geography');
    let geometry = document.getElementById('geometry');
    let history = document.getElementById('history');
    let literature = document.getElementById('literature');
    let physics = document.getElementById('physics');
    let alchemy = document.getElementById('alchemy');
    let russian = document.getElementById('russian');
    let obzh = document.getElementById('obzh');
    let pe = document.getElementById('pe');
    let tech = document.getElementById('tech');
    let obsh = document.getElementById('obsh');
    let it = document.getElementById('it');

    algebraCounter = document.getElementById('algebra-counter');
    mathCounter = document.getElementById('math-counter');
    englishCounter = document.getElementById('english-counter');
    biologyCounter = document.getElementById('biology-counter');
    okrworldCounter = document.getElementById('okrworld-counter');
    geographyCounter = document.getElementById('geography-counter');
    geometryCounter = document.getElementById('geometry-counter');
    historyCounter = document.getElementById('history-counter');
    literatureCounter = document.getElementById('literature-counter');
    physicsCounter = document.getElementById('physics-counter');
    alchemyCounter = document.getElementById('alchemy-counter');
    russianCounter = document.getElementById('russian-counter');
    obzhCounter = document.getElementById('obzh-counter');
    peCounter = document.getElementById('pe-counter');
    techCounter = document.getElementById('tech-counter');
    obshCounter = document.getElementById('obsh-counter');
    itCounter = document.getElementById('it-counter');

    algebra_counter = 0;
    math_counter = 0;
    english_counter = 0;
    biology_counter = 0;
    okrworld_counter = 0;
    geography_counter = 0;
    geometry_counter = 0;
    history_counter = 0;
    literature_counter = 0;
    physics_counter = 0;
    alchemy_counter = 0;
    russian_counter = 0;
    obzh_counter = 0;
    tech_counter = 0;
    obsh_counter = 0;
    it_counter = 0;

    let question_number_admin = -1;

    db.collection("tests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let subject_fb = doc.data().subject;
            id = doc.data().id;
            let klass_fb = doc.data().klass;
            let school_fb = doc.data().school;
            let theme_fb = doc.data().theme;
            let id_db = doc.data().id;
            let questions_db = doc.data().questions;

            // id fb (firebase)
            let id_teacher_admin1 = doc.data().id_teacher_t;

            if ( id_teacher_admin1 == id_teacher_admin2 ) {
                switch (subject_fb) {
                    case 'Алгебра': 
                    algebra_counter += 1;
                    algebra.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id}, '${subject_fb}')" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `; break;
                    case 'Математика':
                    math_counter += 1;
                    math.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Английский язык': 
                    english_counter += 1;
                    english.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Биология': 
                    biology_counter += 1;
                    biology.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Окружающий мир': 
                    okrworld_counter += 1;
                    okrworld.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'География': 
                    geography_counter += 1;
                    geography.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Геометрия': 
                    geometry_counter += 1;
                    geometry.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'История': 
                    history_counter += 1;
                    history.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Литература': 
                    literature_counter += 1;    
                    literature.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Физика': 
                    physics_counter += 1;
                    physics.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Химия': 
                    alchemy_counter += 1;
                    alchemy.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Русский язык': 
                    russian_counter += 1;
                    russian.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'ОБЖ': 
                    obzh_counter += 1;
                    obzh.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Физическая культура': 
                    pe_counter += 1;
                    pe.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Технология': 
                    tech_counter += 1;
                    tech.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Обществознание': 
                    obsh_counter += 1;
                    obsh.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                    case 'Информатика':
                    it_counter += 1;
                    it.innerHTML += `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Предмет</th>
                                    <th scope="col">Школа</th>
                                    <th scope="col">Класс</th>
                                    <th scope="col">Тема</th>
                                    <th scope="col">Открыть тест</th>
                                    <th scope="col">Удалить тест</th>
                                </tr>
                            </thead>
                            <tbody id="tests_inner">
                                <tr id="test${id}">
                                    <td id="subject-test">${subject_fb}</td>
                                    <td id="school-test">${school_fb}</td>
                                    <td id="klass-test">${klass_fb}</td>
                                    <td id="theme-test">${theme_fb}</td>
                                    <td id="theme-test" style="padding: 0.9em;">
                                    <button class="btn btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#testCollapseDiv${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                                        Открыть тест
                                    </button>
                                    </td>
                                    <td id="delete-test">
                                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                            <div id="testCollapseDiv${id}" class="collapse"></div>
                        </table>
                    `
                    ; break;
                }

                algebraCounter.innerHTML = algebra_counter;
                mathCounter.innerHTML = math_counter;
                englishCounter.innerHTML = english_counter;
                biologyCounter.innerHTML = biology_counter;
                okrworldCounter.innerHTML = okrworld_counter;
                geographyCounter.innerHTML = geography_counter;
                geometryCounter.innerHTML = geometry_counter;
                historyCounter.innerHTML = history_counter;
                literatureCounter.innerHTML = literature_counter;
                physicsCounter.innerHTML = physics_counter;
                alchemyCounter.innerHTML = alchemy_counter;
                russianCounter.innerHTML = russian_counter;
                obzhCounter.innerHTML = obzh_counter;
                techCounter.innerHTML = tech_counter;
                obshCounter.innerHTML = obsh_counter;
                itCounter.innerHTML = it_counter;

                document.getElementById(`testCollapseDiv${id}`).innerHTML = `
                    <div id="testCollapse${id}">
                        <h4 style="margin-left: 1.5em; margin-top: 0.5em" id="title-test">${theme_fb}</h4>
                        <div id="collapsesQuestions${id}"></div>
                    </div>
                `;
            
                for (let i = 0; i < questions_db.length; i++) {
                    const current_question_number = question_number_admin;

                    question_number_admin += 1;
                    
                    document.getElementById(`collapsesQuestions${id}`).innerHTML += `
                        <div id="testCollapseQuestons${id}">
                            <p class="lead ml-3" style='margin-bottom: 0;' id="question">Вопрос: ${questions_db[question_number_admin].input_question}</p>
                                
                            <img class="img-fluid" id="image-test${question_number_admin}">
                                    
                            <div class="custom-control custom-radio" style='padding-top: 0; margin-top: 0.3em; margin-top: 0; margin-bottom: 0;' id="option1_div">
                                <p style='padding-top: 0; margin-top: 0; margin-bottom: 0;'>1) ${questions_db[question_number_admin].option_1}</p>
                            </div>
                            <div class="custom-control custom-radio" style='padding-top: 0; margin-top: 0.3em; margin-bottom: 0;' id="option2_div">
                                <p style='padding-top: 0; margin-top: 0; margin-bottom: 0;'>2) ${questions_db[question_number_admin].option_2}</p>
                            </div>
                            <div class="custom-control custom-radio" style='padding-top: 0; margin-top: 0.3em; margin-bottom: 0;' id="option3_div">
                                <p style='padding-top: 0; margin-top: 0; margin-bottom: 0;'>3) ${questions_db[question_number_admin].option_3}</p>
                            </div>
                            <div class="custom-control custom-radio" style='padding-top: 0; margin-top: 0.3em;' id="option4_div">
                                <p style='padding-top: 0; margin-top: 0; padding-bottom: 1.5em'>4) ${questions_db[question_number_admin].option_4}</p>
                            </div>
                        </div>
                    `;
        
                    let image = firebase.storage().ref(`/test${id_db}/question${question_number_admin}`);
        
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

                question_number_admin = -1;
            } else { }
        });
    });
}

function searchInput(id) {
    const input = document.getElementById(`search${id}`).value.toLowerCase();
    const tr = document.getElementsByTagName('tr');

    // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
    for (i = 0; i < tr.length; i++) {
        try {
            const td = tr[i].getElementsByClassName(`${id}`)[0].innerHTML.toLowerCase();

            console.log(td.indexOf(input));
            if (td.indexOf(input) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        } catch {}
    }
}

// Создание Вопроса
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
    console.log(questions_massive);

    question_number += 1;
    question_number_show += 1;

    console.log(question_number);
    
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

// Create test for general using
function createGeneralTest() {
    let subject = document.getElementById("subjectGeneralTest").value;
    let theme = document.getElementById("themeGeneralTest").value;
    let klass = document.getElementById("klassGeneralTest").value;
  
    db.collection(`generalTests`).doc(`${numberId}`).set({
        subject: subject,
        theme: theme,
        klass: klass,
        id: numberId,
        questions: questions_massive
    });

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Вы успешно создали тест!',
        showConfirmButton: false,
        timer: 2000,
    });
}