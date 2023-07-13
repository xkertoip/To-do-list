const ul = document.querySelector('.task-list');

export function getTaskHTML(dataElement) {
    const {date, title, body} = dataElement;

    return `
        <div class="task-inside">
            <div class="task-header">
                <h3 class="task-date">${date}</h3>

                <div class="task-actions">
                    <button class="task-edit" title="Edytuj zadanie">
                        Edytuj
                    </button>
                    <button class="task-delete" title="Usuń zadanie">
                        Usuń
                    </button>
                </div>
            </div>

            <div class="row">
                <div class="task-title">${title}</div>
            </div>

            <div class="row">
                <div class="task-body">
                    ${body}
                </div>
            </div>
        </div>
    `;

}

export function renderSingleTask(dataElement) {
    //create article, add class, set data-id as id from db;
    const element = document.createElement("article");
    element.classList.add("task");
    element.dataset.id = dataElement.id;

    //fill article with inherit html
    element.innerHTML = getTaskHTML(dataElement);
    ul.append(element);

    //scroll to last added task
    element.scrollIntoView({
        behavior: "smooth"
    })

}

export function renderTaskList(tasks) {
    ul.innerHTML = "";
    tasks.forEach(dataElement => {
        renderSingleTask(dataElement);
    })
}

