// Buttons
var addStudentButton = document.getElementById('addStudent');
var deleteStudents = document.getElementById('deleteStudents');


var Student = {
    studentList : [],
    studentContainer : document.getElementById('tableBody'),
    studentsCount : document.getElementById('studentsCount'),
    avgGrade : document.getElementById('averageGrade'),
    
    // სტუდენტის დამატება
    addStudent : function() {
        let tempObject = {
            'name' : '',
            'score' : {
                'monday' : '',
                'tuesday' : '',
                'wednesday': '',
                'thursday' : '',
                'friday' : ''
            }
        };

        let studentName = prompt();
        tempObject['name'] = studentName;

        if(isNaN(Number(studentName)) && studentName !== '' && studentName !== undefined) {
            Student.studentList.push(tempObject);
            Student.studentsCount.innerHTML = Student.studentList.length;
            Student.drawHtml();
        } else {
            alert('Error');
        }
        
    },

    // html -ში გამოტანა
    drawHtml : function() {
        Student.studentContainer.innerHTML = '';
        
        for(i = 0; i < Student.studentList.length; i++) {
            var row = '<tr class="main__content__table-row">';
            row += '<td class="main__content__table-data" onclick="Student.addStudent()">'+Student.studentList[i]['name']+'</td>';
            row += '<td class="main__content__table-data scores" onclick="Student.addPoints(this,\''+ Student.studentList[i]['name'] +'\' , \'monday\')">'+'</td>';
            row += '<td class="main__content__table-data scores" onclick="Student.addPoints(this,\''+ Student.studentList[i]['name'] +'\' , \'tuesday\')">'+'</td>';
            row += '<td class="main__content__table-data scores" onclick="Student.addPoints(this,\''+ Student.studentList[i]['name'] +'\' , \'wednesday\')">'+'</td>';
            row += '<td class="main__content__table-data scores" onclick="Student.addPoints(this,\''+ Student.studentList[i]['name'] +'\' , \'thursday\')">'+'</td>';
            row += '<td class="main__content__table-data scores" onclick="Student.addPoints(this,\''+ Student.studentList[i]['name'] +'\' , \'friday\')">'+'</td>';
            row += '<td class="main__content__table-data delete-row" onclick="Student.deleteRow(this,\''+ Student.studentList[i]['name'] +'\')">'+'<i class="fas fa-user-minus"></i>'+'</td>';
            row += '</tr>';

            Student.studentContainer.innerHTML += row;
        }

        
    },

    // ქულების დამატება
    addPoints(el, name, dateForScore) {
        var r = prompt('Score');

        if(r !== null) {
            r = Number(r);
            if(typeof r !== 'number' || isNaN(r)) {
                alert('please enter a valid number');
                return;
            } else if(r >= 5) {
                r = 5;
                el.innerHTML = 5;
            } else if(r <= 0) {
                r = 0;
                el.innerHTML = 0;
            } else {
                el.innerHTML = r;
            }

            if(r <= 3) {
                el.style.backgroundColor = "red";
            } else {
                el.style.backgroundColor = "green";
            }
        }

        for(var i = 0 ; i < Student.studentList.length; i++) {

            if(Student.studentList[i]['name'] == name) {
                Student.studentList[i]['score'][dateForScore] = r;
            }

        }
        
        Student.averageGrade();
        
    },

    // საშუალო ქულა
    averageGrade : function() {   
        var sum = 0;
        var count = 0;   
        var scores = document.getElementsByClassName('scores');
        for(i = 0; i < scores.length; i++) { 

           sum += Number(scores[i].innerHTML);   
           if(scores[i].innerHTML !== '') {
                count++;
            }

        }

        var average = sum/count;
        if(isNaN(average)) {
            Student.avgGrade.innerHTML = "";
        } else {
            Student.avgGrade.innerHTML = average.toFixed(2);
        }
        
        
    },

    // ხაზის წაშლა
    deleteRow : function(deleteRow, name) { 
        var row = deleteRow.parentNode;
        row.parentNode.removeChild(row);

        for(var i = 0; i < Student.studentList.length; i++) {
            if(Student.studentList[i]['name'] == name) {
                Student.studentList.splice(i, 1);
            }
        }

        Student.averageGrade();
        studentsCount.innerHTML = Student.studentList.length;
    },

    // სტუდენტების წაშლა
    removeStudents : function() {

        Student.studentContainer.innerHTML = "";
        Student.studentList = [];

        studentsCount.innerHTML = Student.studentList.length;
       
    },

};

addStudentButton.addEventListener('click', Student.addStudent);
deleteStudents.addEventListener('click', Student.removeStudents);