const top_upper_left_x = -2;
const top_upper_left_y = 1.25;

const top_lower_right_x = 1;
const top_lower_right_y = -1.25;


function init() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    $.get("/mandel", {"w": width, "h": height} ,function(data) {
    console.log("succeed");
    console.log(data)
    })
}

init()