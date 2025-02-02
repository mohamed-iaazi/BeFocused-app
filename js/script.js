// get element by id 
const popup = document.getElementById("add-popup");
const main = document.querySelector('main');
const addnote = document.getElementById("add-note");

// Initialize notes list from localStorage
// const list = JSON.parse(localStorage.getItem("notes")) || [];
const notelist = JSON.parse(localStorage.getItem("notes")) || [];
display();

// set onclick listener for add btn

    addnote.addEventListener('click', () => {
        popup.classList.remove("d-none");
        main.style.filter = 'blur(5px)';
        add();


    });


function add() {
    document.getElementById("cancel").addEventListener('click', (e) => {
        popup.classList.add("d-none");
        main.style.filter = 'none';
    });

    document.getElementById("save").addEventListener('click', (e) => {
        popup.classList.add("d-none");
        main.style.filter = 'none';
        let title = document.getElementById("title").value;
        let description = document.getElementById("Description").value;
        let prioroty = document.getElementById("Priorité").value;
        const data = { title: title, description: description, prioroty: prioroty };
        notelist.push(data);
        localStorage.setItem("notes", JSON.stringify(notelist));
        deleteinput();
        display();
    });
}

function display() {
    const noteContainer = document.getElementById("notes");
    noteContainer.innerHTML='';

    console.log(notelist.length);
    
    notelist.forEach(note => {

       const noteElement = `
            <div id="note-card"class="card p-4 notes col-sm-10 col-md-2 col-lg-3">
            <img src="./assets/more@2x.png" alt="">
            <h2 id="title">${note.title}</h2>
            <h3 id="description" class="font-weight-light text-secondary">${note.description}</h3>
            <span class="line"></span>
            <h3 id="detail" class="p-2 pt-5 font-weight-light text-secondary text-center">${note.description}</h3>
            <div>
                <input id="status" class="mt-4" type="checkbox" name="done">
                <label for="done">Done</label>
            </div>
            <p id="Priorité">${note.prioroty}</p>
            <button id="start_btn" type="button" class="btn btn-outline-dark">Start The task</button>
        `;

        noteContainer.insertAdjacentHTML('afterbegin',noteElement);
    });
}

function deleteinput() {
    document.getElementById("title").innerText = '';
    document.getElementById("Description").innerText = '';
    document.getElementById("Priorité").innerText = '';
}