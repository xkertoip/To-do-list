const apiUrl = "http://localhost:3000/tasks";

export async function apiGetTasks() {
     const request = await fetch(apiUrl);
     if(request.ok) {
         return request.json();
     } else {
         throw Error(String(request.status));
     }
}

export async function apiAddTask({title, date, body}) {
    const request = await fetch(apiUrl, {
        method: "post",
        headers: {
            "Content-Type" : "application/json;charset=utf-8"
        },
        body: JSON.stringify({title, date, body})
    });
    if(request.ok) {
        return request.json();
    } else {
        throw Error(String(request.status));
    }
}

export async function apiDeleteTask(id) {
    const request = await fetch(apiUrl + "/" + id, {
        method: "delete",
    });
    if (request.ok) {
        return request.json();
    } else {
        throw Error(String(request.status))
    }
}