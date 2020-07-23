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

            let student_res_obj = {
                name: name_fb,
                surname: surname_fb,
                test_subject: test_subject,
                test_theme: test_theme_fb,
                test_title: test_title_fb,
                result: result_fb,
                id_teacher_admin: teacher_fb
            };

            results_students_mas.push(student_res_obj);
        });

        // FOR []
        for (let i = 0; i < results_students_mas.length; i++) {
            if ( id_teacher_admin2 === results_students_mas[i].id_teacher_admin ) {
                number_student += 1;
                results_students_inner_adm.innerHTML += `
                    <tr>
                        <td>${number_student}</td>
                        <td>${results_students_mas[i].name} ${results_students_mas[i].surname}</td>
                        <td>${results_students_mas[i].test_subject}</td>
                        <td>${results_students_mas[i].test_theme}</td>
                        <td>${results_students_mas[i].test_title}</td>
                        <td>${results_students_mas[i].result}</td>
                    </tr>
                `;
            } else { }
        }
    });
}

// Enter tests for teacher
function tests() {
    // id local (localStorage)
    let id_teacher_admin2 = localStorage.getItem('id_teacher_local');

    db.collection("tests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            let subject_fb = doc.Ud.Ze.proto.mapValue.fields.subject.stringValue;
            let question = doc.Ud.Ze.proto.mapValue.fields.question.stringValue;
            id = doc.Ud.Ze.proto.mapValue.fields.id.integerValue;
            let klass_fb = doc.Ud.Ze.proto.mapValue.fields.klass.stringValue;
            let school_fb = doc.Ud.Ze.proto.mapValue.fields.school.stringValue;
            let theme_fb = doc.Ud.Ze.proto.mapValue.fields.theme.stringValue;

            // id fb (firebase)
            let id_teacher_admin1 = doc._document.proto.fields.id_teacher_t.stringValue;

            let test_obj = {
                subject: subject_fb,
                school: school_fb,
                klass: klass_fb,
                theme: theme_fb,
                id_teacher_admin: id_teacher_admin1
            };

            tests_mas.push(test_obj);
        });

        // FOR []
        for (let i = 0; i < tests_mas.length; i++) {
            if ( id_teacher_admin2 === tests_mas[i].id_teacher_admin ) {
                // nuber tests
                number_tests += 1;

                // HTML
                tests_inner_adm.innerHTML += `
                <tr id="test${id}">
                    <th id="number-test" scope="row">${number_tests}</th>
                    <td id="subject-test">${tests_mas[i].subject}</td>
                    <td id="school-test">${tests_mas[i].school}</td>
                    <td id="klass-test">${tests_mas[i].klass}</td>
                    <td id="theme-test">${tests_mas[i].theme}</td>
                    <td id="delete-test">
                        <button class="btn btn-outline-danger" onclick="delete_test(${id})" id="delete-test">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            } else { }
        }

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
