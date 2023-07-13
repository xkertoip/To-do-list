import {debounced} from "./_utility";
import toast from 'toast-me';

require("../scss/style.scss");
import {apiGetTasks, apiAddTask, apiDeleteTask, apiSearchTasks, apiEndTask} from "./_api";
import {renderTaskList, renderSingleTask, getTaskHTML} from "./_render";

// RENDER LIST
apiGetTasks().then(res => {
    renderTaskList(res)
}).catch(err => {
    toast(err, "error")
})

//ADD TASK
const form = document.querySelector("#todoForm");
form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = form.querySelector('#todoTitle').value;
    const date = form.querySelector('#todoDate').value;
    const body = form.querySelector('#todoMessage').value;

    if(title && body) {
        try {
            const dataElement = await apiAddTask({title, date, body});
            renderSingleTask(dataElement);
            form.reset();
        } catch (err) {
            toast(err, 'error')
        }

    } else {
        if(!title) return alert("Wypełlnij tytuł");
        else if(!body) return alert("Wypełnij zadanie");
    }
});


// DELETE TASK && EDIT TASK
document.addEventListener("click", async e => {
    // if clicked element has class task-delete
    if(e.target.classList.contains("task-delete")) {
        const task = e.target.closest(".task");
        // get id of single already added task
        const id = +task.dataset.id;
        try {
            const request = await apiDeleteTask(id);

            const anim = task.animate([
                {height: `${task.offsetHeight}px`,
                opacity: 1},
                {height: '0px',
                opacity: 0}
            ], {
                duration: 300,
                iterations: 1
            })
            anim.onfinish = e => {
                task.remove();
            }
        } catch(err) {
            toast(err, "error")
        }



    }
    if(e.target.classList.contains('task-edit')) {
        const el = e.target.closest(".task");
        const id = +el.dataset.id;
        const date = el.querySelector('.task-date').innerText;
        const title = el.querySelector('.task-title').innerText;
        const body = el.querySelector('.task-body').innerText;
        const dataElement = {
            id, date, title, body
        }
        el.classList.add("task-edit-mode");
        el.innerHTML = getTaskHTML(dataElement, true);
    }
    if(e.target.classList.contains('task-edit-save')) {
        const el = e.target.closest('.task');
        const id = +el.dataset.id;
        const title = el.querySelector(".task-title").value;
        const body = el.querySelector(".task-body").value;
        const date = el.querySelector(".task-date").value;
        const dataElement = {
            id, date, title, body
        }
        try {
            const request = await apiEndTask(dataElement);
            el.classList.remove("task-edit-mode");
            el.innerHTML = getTaskHTML(dataElement, false);
        } catch(err) {
            toast(err, "error")
        }

    }
    if(e.target.classList.contains('task-edit-cancel')) {
        const el = e.target.closest('.task');
        const id = +el.dataset.id;
        const title = el.querySelector(".task-title").value;
        const body = el.querySelector(".task-body").value;
        const date = el.querySelector(".task-date").value;
        const dataElement = {
            id, date, title, body
        }
        el.classList.remove('task-edit-mode');
        el.innerHTML = getTaskHTML(dataElement, false);
    }
});

//SEARCH TASK
const tHandler = debounced(500, async e => {
    try {
        const tasks = await apiSearchTasks(search.value);
        renderTaskList(tasks);
    } catch(err) {
        toast(err, 'error')
    }

})
const search = document.querySelector('#todoSearch');
search.addEventListener('input', tHandler);

//BUTTON SCROLL TOP
const list = document.querySelector('.task-list');
const scrollBtn = document.querySelector('.scroll-top-btn');
const scrollHandler = debounced(300, async e => {
    console.log(list.scrollTop);
    if(list.scrollTop > 0) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
})
list.addEventListener('scroll', scrollHandler)