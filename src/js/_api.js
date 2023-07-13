const apiUrl = "http://localhost:3000/tasks";

export async function apiGetTasks() {
     const request = await fetch(apiUrl);
     if(request.ok) {
         return request.json();
     } else {
         throw Error(String(request.status));
     }
}