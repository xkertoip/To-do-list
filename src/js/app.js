import {debounced} from "./_utility";

require("../scss/style.scss");
import {apiGetTasks, apiAddTask, apiDeleteTask, apiSearchTasks} from "./_api";
import {renderTaskList, renderSingleTask} from "./_render";

apiGetTasks().then(res => {
    console.log(res);
    renderTaskList(res)
})

const form = document.querySelector("#todoForm");
form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = form.querySelector('#todoTitle').value;
    const date = form.querySelector('#todoDate').value;
    const body = form.querySelector('#todoMessage').value;

    if(title && body) {
        const dataElement = await apiAddTask({title, date, body});
        renderSingleTask(dataElement);
        form.reset();

    } else {
        if(!title) return alert("Wypełlnij tytuł");
        else if(!body) return alert("Wypełnij zadanie");
    }
});

document.addEventListener("click", async e => {
    // if clicked element has class task-delete
    if(e.target.classList.contains("task-delete")) {
        const task = e.target.closest(".task");
        // get id of single already added task
        const id = +task.dataset.id;
        const request = await apiDeleteTask(id);

        const anim = task.animate([
            {height: `${task.offsetHeight}px`},
            {height: '0px'}
        ], {
            duration: 300,
            iterations: 1
        })
        anim.onfinish = e => {
            task.remove();
        }
    }
});
const tHandler = debounced(500, async e => {
    console.log(search.value);
    const tasks = await apiSearchTasks(search.value);
    renderTaskList(tasks);
})
const search = document.querySelector('#todoSearch');
search.addEventListener('input', tHandler);

