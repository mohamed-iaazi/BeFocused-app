// Get element by id
const popup = document.getElementById("add-popup");
const main = document.querySelector('main');
const addnote = document.getElementById("add-note");

// Initialize notes list from localStorage
const notelist = JSON.parse(localStorage.getItem("notes")) || [];
display();

// Set onclick listener for add button
addnote.addEventListener('click', () => {
    popup.classList.remove("d-none");
    main.style.filter = 'blur(5px)';
    add();
});

function add() {
    // Reset input fields whenever the popup is opened
    document.getElementById("title").value = '';
    document.getElementById("Description").value = '';
    document.getElementById("Priorité").value = '';

    document.getElementById("cancel").addEventListener('click', () => {
        popup.classList.add("d-none");
        main.style.filter = 'none';
    });

    document.getElementById("save").addEventListener('click', () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("Description").value;
        const priority = document.getElementById("Priorité").value;

        // Prevent saving if any field is empty
        if (title.trim() === '' || description.trim() === '' || priority.trim() === '') {
            alert("Please fill in all fields.");
            return;
        }

        // Save the note
        const data = { title, description, priority };

        // Add new note to the localStorage array
        notelist.push(data);

        // Update localStorage with the new notes list
        localStorage.setItem("notes", JSON.stringify(notelist));

        // Close popup and reset fields
        popup.classList.add("d-none");
        main.style.filter = 'none';
        
        // Re-display the notes
        display();
    });
}

function display() {
    const noteContainer = document.getElementById("notes");
    noteContainer.innerHTML = ''; // Clear existing notes

    // Fetch the latest notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Loop through the notes and display them
    storedNotes.forEach(note => {
        const noteElement = `
            <div class="card p-4 notes col-sm-10 col-md-2 col-lg-3">
                <img src="./assets/more@2x.png" alt="">
                <h2 class="note-title">${note.title}</h2>
                <h3 class="note-description font-weight-light text-secondary">${note.description}</h3>
                <span class="line"></span>
                <h3 class="note-detail p-2 pt-5 font-weight-light text-secondary text-center">${note.description}</h3>
                <div>
                    <input class="note-status mt-4" type="checkbox" name="done">
                    <label for="done">Done</label>
                </div>
                <p class="note-priority">${note.priority}</p>
                <button id="starttimer" type="button" class="btn btn-outline-dark">Start The task</button>
            </div>
        `;

        noteContainer.insertAdjacentHTML('afterbegin', noteElement);
    });
}

document.getElementById("starttimer").addEventListener('click', () => {
    const timer = document.getElementById('timer');
    timer.classList.remove("d-none");
    startTimer();
});

// Pomodoro Timer Logic
let timer;
let minutes = 25;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.innerHTML = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('Time is up! Take a break.');
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
}

function formatTime(minutes, seconds) {
    return `   <div class="timer-circle" 
             id="timer">${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</div>
        <div class="control-buttons">
            <button onclick="togglePauseResume()">
                  Pause
              </button>
        
        </div>`;
}
function togglePauseResume() {
    isPaused = !isPaused;
    const pauseResumeButton = document.querySelector('.control-buttons button');
    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}
