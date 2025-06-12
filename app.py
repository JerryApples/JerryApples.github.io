from flask import Flask, render_template, request, jsonify
import webbrowser
import json
import os

webbrowser.open("http://127.0.0.1:5000")

app = Flask(__name__)

# μεταβλητή που αποθηκεύει το path του αρχείου json
DATA = os.path.join(app.root_path, 'static', 'data.json')

@app.route('/')
def index():
    return render_template('todolist.html')

# δημιουργία συναρτήσεων γενικής χρήσης που 
# θα χρησιμοποιηθούν στις παρακάτω συναρτήσεις 
# για λόγους απλότητας

# διαβάζουμε το βασικό αρχείο json και αποθηκεύουμαι το 
# περιεχόμενο του ως το αντίστοιχο στοιχείο της python 
# που αντιστοιχεί στο json μας (στην περίπτωση array) στην "tasks"
# έπειτα λόγως της σύνταξης with as το αρχείο κλείνεται
def read_tasks():
    with open(DATA, 'r', encoding='utf-8') as f:
        return json.load(f)

# Γράφουμε στο βασικό αρχείο json την παράμετρο "tasks" την 
# οποία τροφοδοτούμε στην συνάρτηση 
# ( αναμενόμενη είσοδος στην συνάρτηση είναι array)
# ξανά λόγω σύνταξης with as το αρχείο κλείνει 
def write_tasks(tasks):
    with open(DATA, 'w', encoding='utf-8') as f: 
        json.dump(tasks, f, ensure_ascii=False, indent=4)

@app.route('/tasks', methods=['POST'])
def add_task():
    # μεταβλητή στην οποία αποθηκεύουμε το "body" json του 
    # stringified json object που κάνουμε POST στο /tasks route
    new_task = request.get_json() 
    tasks = read_tasks()

    # προσθέτουμε το json που 'POSTαρίστηκε' στο βασικό json αρχείο
    tasks.append(new_task)

    # γράψιμο του ανανεωμένου array "tasks" στο βασικό αρχείο json
    write_tasks(tasks)
    
    # διασφάλιση σωστής διαχείρισης του αιτήματος από τον server
    # χρήση json object για επιβεβαίωση σωστής λειτουργίας στην javascript
    return jsonify({"success": True}) 


# δημιουργία route που αποκτά πρόσβαση σε δεδομένα ( GET )
# το οποίο συνδεέται με την συνάρτηση get_tasks που επιστρέφει 
# το περιεχόμενο του βασικού αρχείου ως "απάντηση" (flask response) 
# η οποία περιέχει σαν σώμα το περιεχόμενο του βασικού αρχείο json 
# ( σε stringified μορφή )
@app.route('/tasks', methods=['GET'])
def get_tasks():
    # φόρτωμα του περιεχόμενου του βασικού αρχειού json στην tasks
    tasks = read_tasks()
    return jsonify(tasks)


# δημιουργία route που διαγράφει δεδομένα ( DELETE ) 
# το οποίο συνδέεται με την συνάρτυση delete_task που 
# διαγράφει ένα στοιχείο task από το βασικό json 
@app.route('/tasks/<int:task_index>', methods=['DELETE'])
def delete_task(task_index):
    # φόρτωμα των task του βασικού json σε μορφή array, σε μια μεταβλητή 
    tasks = read_tasks()

    # έλεγχος αν το index είναι πέρα των ορίων του json μας και επιστροφή
    # json που δίνει πληροφορίες για το πρόβλημα, και κωδικού 404 που δηλώνει 
    # ότι δεν βρέθηκε το ζητούμενο "resource"
    if task_index < 0 or task_index >= len(tasks):
        return jsonify({'error': 'Task index out of range'}), 404
    
    # διαγραφή του ζητούμενου στοιχείου "task" από το array 
    tasks.pop(task_index)
    
    # γράψιμο του ανανεωμένου (task) array στο json 
    write_tasks(tasks) 

    # διασφάλιση σωστής διαχείρισης του αιτήματος από τον server
    # χρήση json object για επιβεβαίωση σωστής λειτουργίας στην javascript
    return jsonify({"success": True})


@app.route('/tasks/<int:task_index>', methods=['PUT'])
def change_task_status(task_index):
    tasks = read_tasks()
    
    # έλεγχος αν το index είναι πέρα των ορίων του json μας και επιστροφή
    # json που δίνει πληροφορίες για το πρόβλημα, και κωδικού 404 που δηλώνει 
    # ότι δεν βρέθηκε το ζητούμενο "resource"
    if task_index < 0 or task_index >= len(tasks):
        return jsonify({'error': 'Task index out of range'}), 404
    
    # εναλλάσει την κατάσταση από pending σε complete και αντίστροφα
    if (tasks[task_index]["task-status"] == "pending"):
        tasks[task_index]["task-status"] = "complete"
    elif (tasks[task_index]["task-status"] == "complete"):
        tasks[task_index]["task-status"] = "pending"

    # πραγματοποιεί την αλλαγή στο json αρχείο μας γράφοντας σε αυτό 
    # το ανανεωμένο tasks με την λειτουργία της write_tasks όπως αναφέραμε παραπάνω
    write_tasks(tasks)
    
    # διασφάλιση σωστής διαχείρισης του αιτήματος από τον server
    # χρήση json object για επιβεβαίωση σωστής λειτουργίας στην javascript
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)

