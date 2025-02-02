// Get element by id
const popup = document.getElementById("add-popup");
const main = document.querySelector('main');
const addnote = document.getElementById("add-note");
const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");

// Initialize notes list from localStorage
let notelist = JSON.parse(localStorage.getItem("notes")) || [];
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

    // Ensure only one event listener is attached to cancel button
    cancelButton.onclick = () => {
        popup.classList.add("d-none");
        main.style.filter = 'none';
    };

    // Ensure only one event listener is attached to save button
    saveButton.onclick = () => {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("Description").value.trim();
        const priority = document.getElementById("Priorité").value.trim();

        // Prevent saving if any field is empty
        if (title === '' || description === '' || priority === '') {
            alert("Please fill in all fields.");
            return;  // Stop execution to prevent saving
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
    };
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
                <button type="button" class="btn btn-outline-dark">Start The task</button>
            </div>
        `;

        noteContainer.insertAdjacentHTML('afterbegin', noteElement);
    });
}
