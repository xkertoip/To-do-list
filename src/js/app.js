require("../scss/style.scss");

import {apiGetTasks} from "./_api";

apiGetTasks().then(res => {
    console.log(res);
})