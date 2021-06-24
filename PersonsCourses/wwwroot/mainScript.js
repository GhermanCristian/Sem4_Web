function getName() {
    $.get("/personscourses/getName").done(function (response) {
        ;
    });
}

function getPersonsByCourse(courseName) {
    $.get("/personscourses/getPersonsByCourse", { courseName: courseName }).done(function (response) {
        $("#personList").html("Participants - " + response);
    });
}

function getCoursesByStudent(studentID) {
    $.get("/personscourses/getCoursesByStudent", { studentID: studentID }).done(function (response) {
        $("#coursesList").html("Courses - " + response);
    });
}

function getCoursesByProfessor() {
    $.get("/personscourses/getCoursesByProfessor").done(function (response) {
        $("#infoCourses").html("Your courses are - " + response);
    });
}

function gradeStudent(courseID, studentID, studentGrade) {
    $.post("/personscourses/gradeStudent", {courseID: courseID, studentID: studentID, studentGrade: studentGrade}).done(function (response) {
        console.log("in");
    });
}

$(document).ready(function() {
    $("#courseButton").click(function (event) {
        getPersonsByCourse($("#courseInput").val());
    });

    $("#studentButton").click(function (event) {
        getCoursesByStudent($("#studentInput").val());
    });

    $("#gradeButton").click(function (event) {
        console.log("before");
        gradeStudent($("#courseID").val(), $("#studentID").val(), $("#studentGrade").val());
    });

    getCoursesByProfessor();
});