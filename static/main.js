const top_upper_left_x = -2;
const top_upper_left_y = 1.1;

const top_lower_right_x = 1;
const top_lower_right_y = -1.1;

const boundx = top_lower_right_x - top_upper_left_x;
const boundy = top_upper_left_y - top_lower_right_y;

// pointless?
function get_resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (height / boundy * boundx > width) return [width, Math.floor(width / boundx * boundy)]
    return [Math.floor(height / boundy * boundx), height]
}

//TODO: we tap/click on the screen, then zoom in, but what about zoom out
//TODO: add + and - bottom?
function pixel_to_point() {
}

function init() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    let picture_size = get_resize();
    console.log("get_resize: ", picture_size)

    let data = {
        "w": picture_size[0],
        "h": picture_size[1],
        "ux": top_upper_left_x,
        "uy": top_upper_left_y,
        "lx": top_lower_right_x,
        "ly": top_lower_right_y,
    };
    $.get("/mandel", data ,function(data) {
    console.log("succeed");
    console.log(data)

    $("#pic").empty()
    $('#pic').prepend('<img src="static/mandel.png"/>')
    })
}

console.log(window.innerWidth, ",", window.innerHeight)
init()