// δημιουργούμε μεταβλητές που αντιστοιχούν σε στοιχεία της HTML 
// τα οποία επιλέγουμε είτε μέσω της κλάσης τους είτε με id.
const addButton  = document.querySelector('.button-add');
const taskList   = document.querySelector('.task-list');
const input      = document.getElementById('taskInput');


// ασύγχρονη συνάρτηση για το φόρτωμα των προυπαρχόντων tasks από το αρχείο JSON
// τα await σταματάνε την λειτουργία της συνάρτησης μέχρι την ολοκλήρωση 
// της fetch ή της response.json() (μετατροπή απάντησης σε JSON) αντίστοιχα
async function loadExistingTasks() {
    // αποκτάμε πρόσβαση στο αρχείο μέσω του GET request
    // ( GET είναι το default οπότε δεν το διευκρινίζουμε )
    // μέσω του /tasks route αξιοποιώντας την συνάρτηση get_tasks στην flask
    const response = await fetch("/tasks");
    const data = await response.json();

    // loop για να περάσουμε κάθε task (στοιχείο array) του JSON 
    for (const task of data) {

        // αποθήκεση των τιμών των χακτηριστικών του task με 
        // σύμφωνα με τα οποία θα δημιουργήσουμε το στοιχείο task 
        const dataTaskText = task["task-name"]; 
        // ουσιαστικά task.task-name απλά έχει θέμα με το - και αυτή η σύνταξη λειτουργεί καλύτερα
        const dataTaskStatus = task["task-status"];
        // ουσιαστικά task.task-status απλά έχει θέμα με το - και αυτή η σύνταξη λειτουργεί καλύτερα
        
        // δημιουργία του στοιχείου task με τα δεδομένα από το json 
        const dataTask = createTaskElement(dataTaskText, dataTaskStatus);
        // προσθήκη/εμφάνιση του παραπάνω στοιχείου task στο DOM
        taskList.appendChild(dataTask);
    }
}

// Κλήση της συνάρτησης που φορτώνει τα προυπάρχοντα στοιχεία
// αφού όμως έχει ολοκληρωθεί το φόρτωμα του βασικού περιεχομιένου του DOM
// καθώς η συνάρτηση αξιοποιεί στοιχεία του, και έτσι διασφαλίζεται η σωστή 
// λειτουργία της
document.addEventListener("DOMContentLoaded", () => {
    loadExistingTasks();
});

// συνάρτηση εναλλαγής της κατάστασης status ενός task
// μεταξύ των καταστάσεων pending - complete.
function changeStatus(event) {
    
    // αντιστοιχούμε το statusElement στο στοιχείο στο οποίο θα 
    // αναθέσουμε/"δέσουμε" την παρούσα συνάρτηση.
    const statusElement = event.currentTarget;
    const task = statusElement.closest(".task-row");
    const taskName = task.children[0].textContent;

    // Μέσω της χρήσης δύο κλάσεων (μία για pending και μία για complete status)
    // καταλαβαίνουμε σε τι κατάσταση βρίσκεται το στοιχείο και
    // του αλλάζουμε την κατάσταση του αφαιρώντας την προυπάρχουσα του κατάσταση 
    // και προσθέτοντας του την αντίθετη.
    if (statusElement.classList.contains('status-pending')) {
        statusElement.classList.replace('status-pending', 'status-complete');
        statusElement.textContent = "complete";
    }
    else  {
        statusElement.classList.replace('status-complete', 'status-pending');
        statusElement.textContent = "pending";
    }

    // Πραγαματοποίηση της αλλαγής στο αρχείο json όπως αναφέρουμε 
    // στα σχόλια της αντίστοιχης συνάρτησης
    changeTaskStatusInJSON(taskName);
}

// Συνάρτση για την δημιουργία νέου στοιχείου "task"
// της δομής: 
// <li class="task-row">
//     <div> --- </div>
//     <div><span class="status"> --- </span></div>
//     <div><ion-icon name="close-circle-outline"></ion-icon></div>
// </li>
function createTaskElement(taskText, status) {
    // δημιουργία του βασικού στοιχείου "task"
    const li  = document.createElement("li");
    li.className = "task-row";

    // δημιουργία προσθήκη της ονομασίας του task στο βασικό στοιχείο
    const divList = document.createElement("div");
    divList.textContent = taskText;
    li.appendChild(divList);

    // δημιουργία και προσθήκη της κατάστασης(status) του task στο βασικό στοιχείο
    const divStatus = document.createElement("div");
    const spanStatus = document.createElement("span");
    spanStatus.className = `status-${status}`;
    spanStatus.textContent = status;
    divStatus.appendChild(spanStatus);
    li.appendChild(divStatus);

    // δημιουργία και προσθήκη της επιλογής διαγραφής του task στο βασικό στοιχείό
    const divClose = document.createElement("div");
    const ioniconClose = document.createElement("ion-icon");
    ioniconClose.setAttribute("name", "close-circle-outline");
    divClose.appendChild(ioniconClose);
    li.appendChild(divClose);


    // μετατροπή του εικονίδου Χ σε κουμπί που διαγράφει το βασικό στοιχείο "task"
    ioniconClose.addEventListener('click', () => {
        li.classList.add('deleting');
        setTimeout( () => li.remove(), 500);
        deleteTaskFromJSON(taskText);
        // διαγραφή του στοιχείου "task" μετά από μισό δευτερόλεπτο
        // (όσο δηλαδή, κρατάει το animation της διαγραφής)
    });

    spanStatus.addEventListener('click', changeStatus);

    return li;
}

// συνάρτηση για την προσθήκη νέου στοιχείου "task" στην λίστα
// με ονομασία που λαμβάνεται από το input
function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText != "") {
        const taskElement = createTaskElement(taskText, "pending");
        taskList.appendChild(taskElement);
    
        addTaskInJSON(taskText, 'pending');

        input.value = "";
    }
}

// δίνουμε την δυνατότητα στον χρήστη να καταχωρεί νέο στοιχείο
// πατώντας το πλήκτρο "enter" εναλλακτικά του κουμπιού "Add"
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// συνδέουμε την συνάρτηση addTask ως δράση του κουμπιού "Add"
addButton.addEventListener('click', addTask);


// ασύγχρονη συνάρτηση για την προσθήκη ενός task στο json αρχείο
async function addTaskInJSON(taskName, taskStatus) {
    // δημιουργία προσωρινού στοιχείου με τα ζητούμενα δεδομένα
    // το στοιχείο αυτό θα προσθεθεί στην πορεία στο array του json 
    const task = {
        "task-name": taskName,
        "task-status": taskStatus
    };

    // αξιοποίηση του σχήματος try catch για την προστασία και 
    // σωστή διαχείριση απρόσμενων error
    try {
        // αποστολή του POST request στο οποίο έχουμε "πακετάρει"
        // την stringified json μορφή του προσωρινού στοιχείου 
        // ( μέσω του /tasks route για να χρησιμοποιηθεί η συνάρτηση add_task στην flask )
        // και αποθήκευση της απάντησης του server σε μεταβλητή για τον έλεγχο της
        // τα await σταματάνε την λειτουργία της συνάρτησης μέχρι την ολοκλήρωση 
        // της fetch ή της response.json() αντίστοιχα
        const response = await fetch('/tasks', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        });

        // έλεγχος της απάντησης του server και εκτύπωση του αντίστοιχου 
        // μυνήματος στην κονσόλα
        const result = await response.json();
        if (result.success) console.log('Task added successfully!');
        else console.error('Failed to add task.');
    } catch (error) {
        console.error('Error:', error);
    }
}


// ασύγχρονη συνάρτηση για την διαγραφή ενός στοιχείου task από το αρχείο JSON 
// σύμφωνα με το περιεχόμενο του ονόματος του task 
// τα await σταματάνε την λειτουργία της συνάρτησης μέχρι την ολοκλήρωση 
// της fetch ή της response.json() (μετατροπή απάντησης σε JSON) αντίστοιχα
async function deleteTaskFromJSON(taskName) {
    const response = await fetch('/tasks');
    const tasks = await response.json();

    // εύρεση και αποθήκευση του αριθμού σειράς του ζητούμενου task στο array "tasks"
    // (  για κάθε task στο tasks έλεγξε αν το όνομα ("task-name") του είναι το επιθυμητό (taskName)  )
    // ( αυτομάτως θα επιστρέφει True ή False μέχρι να το βρει (True) )
    // ( αν δεν βρεθεί επιστρέφει -1 )
    const taskID = tasks.findIndex(task => task["task-name"] === taskName);

    // αξιοποίηση του σχήματος try catch για την προστασία και 
    // σωστή διαχείριση απρόσμενων error
    try {
        // αποστολή του DELETE request μέσω του route /tasks/taskID (αξιοποίηση της delete_task στην flask)
        // και αποθήκευση της απάντησης
        const response = await fetch(`/tasks/${taskID}`, {method: 'DELETE'});
        const result = await response.json();

        // έλεγχος της απάντησης και εκτύπωση αντίστοιχου μηνύματος στην κονσόλα
        if (result.success) console.log('Task deleted successfully!');
        else console.error('Failed to delete task.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// ασύγχρονη συνάρτηση για την διαγραδή ενός στοιχείου task από το αρχείο JSON 
// σύμφωνα με το περιεχόμενο του ονόματος του task 
// τα await σταματάνε την λειτουργία της συνάρτησης μέχρι την ολοκλήρωση 
// της fetch ή της response.json() (μετατροπή απάντησης σε JSON) αντίστοιχα
async function changeTaskStatusInJSON(taskName) {
    const response = await fetch('/tasks');
    const tasks = await response.json();

    // εύρεση και αποθήκευση του αριθμού σειράς του ζητούμενου task στο array "tasks"
    // (  για κάθε task στο tasks έλεγξε αν το όνομα ("task-name") του είναι το επιθυμητό (taskName)  )
    // ( αυτομάτως θα επιστρέφει True ή False μέχρι να το βρει (True) )
    // ( αν δεν βρεθεί επιστρέφει -1 )
    const taskID = tasks.findIndex(task => task["task-name"] === taskName);

    // αξιοποίηση του σχήματος try catch για την προστασία και 
    // σωστή διαχείριση απρόσμενων error
    try {
        // αποστολή του PUT request μέσω του route /tasks/taskID (αξιοποίηση της change_task_status στην flask)
        // αποθήκευση και έλεγχος της απάντησης και εκτύπωση αντίστοιχου μηνύματος στην κονσόλα
        const response = await fetch(`/tasks/${taskID}`, {method: 'PUT'});
        const result = await response.json();
        if (result.success) console.log('Task status changed successfully!');
        else console.error('Failed to change task status.');
    } catch (error) {
        console.error('Error:', error);
    }
}