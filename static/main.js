var top_upper_left_x = -2;
var top_upper_left_y = 1.1;

var top_lower_right_x = 1;
var top_lower_right_y = -1.1;

var idx = 0


function get_boundX() {
    return top_lower_right_x - top_upper_left_x;
}

function get_boundY() {
    return top_upper_left_y - top_lower_right_y;
}


function getImageSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let boundy = get_boundY();
    let boundx = get_boundX();

    if (height / boundy * boundx > width) return [width, Math.floor(width / boundx * boundy)]
    return [Math.floor(height / boundy * boundx), height]
}

//TODO: we tap/click on the screen, then zoom in, but what about zoom out
//TODO: add + and - bottom?
function pixel_to_point() {

}

function init() {

    let picture_size = getImageSize();
    console.log("get_resize: ", picture_size)

    // let data = {
    //     "w": picture_size[0],
    //     "h": picture_size[1],
    //     "ux": top_upper_left_x,
    //     "uy": top_upper_left_y,
    //     "lx": top_lower_right_x,
    //     "ly": top_lower_right_y,
    // };

    // $.get("/mandel", data ,function(data) {
    //     console.log("succeed");
    //     console.log(data)

    //     $("#pic").empty()
    //     $('#pic').prepend('<img id="p" src="static/mandel.png"/>')
    // })

    request_to_create_image(
        picture_size[0],
        picture_size[1],
        top_upper_left_x,
        top_upper_left_y,
        top_lower_right_x,
        top_lower_right_y
    )
}

function request_to_create_image(w, h, ux, uy, lx, ly) {
    idx += 1
    let data = {
        w, h, ux, uy, lx, ly, idx
    };

    $.get("/mandel", data ,function(data) {
        console.log("succeed");
        console.log(data)

        $("#pic").empty()
        $('#pic').prepend(`<img id="p" src="static/mandel${idx}.png"/>`)
    })
}

function isInsideOfPicture(imgTop, imgLeft, imgHeight, imgWidth, clickX, clickY) {
    console.log("click: ", clickX, clickY)
    console.log("left: ", imgLeft, " top: ", imgTop)
    console.log("imgWidth: ", imgWidth, " imgHeight: ", imgHeight)

    let isInHorizontally = clickX < (imgLeft + imgWidth) && clickX > imgLeft
    let isInVertically = clickY < (imgTop + imgHeight) && clickY > imgTop

    return isInHorizontally && isInVertically
}

function setNewImageProperties(imgTop, imgLeft, imgHeight, imgWidth, clickX, clickY) {

    let left = clickX - imgLeft;
    let right = imgLeft + imgWidth - clickX;

    let above = clickY - imgTop;
    let below = imgTop + imgHeight - clickY;

    console.log("left: ", left)
    console.log("right: ", right)
    console.log("above: ", above)
    console.log("below: ", below)

    let left_range = left / imgWidth  * 0.4 * get_boundX();
    let right_range = right / imgWidth * 0.4 * get_boundX();

    let above_range = above / imgHeight * 0.4 * get_boundY();
    let below_range = below / imgHeight * 0.4 * get_boundY();

    top_upper_left_x += left_range;
    top_upper_left_y  -= above_range;

    top_lower_right_x -= right_range;
    top_lower_right_y += below_range;

    console.log("ux: ", top_upper_left_x, " uy: ", top_upper_left_y)
    console.log("lx: ", top_lower_right_x, " ly: ", top_lower_right_y)

    // sending the request to load new image
    let picture_size = getImageSize();

    request_to_create_image(
        picture_size[0],
        picture_size[1],
        top_upper_left_x,
        top_upper_left_y,
        top_lower_right_x,
        top_lower_right_y
    )
}

$(window).dblclick(function(e) {
    let clickX = e.clientX
    let clickY = e.clientY
    let imgTop = $("#p").offset().top
    let imgLeft = $("#p").offset().left
    let imgHeight = document.getElementById("p").clientHeight
    let imgWidth = document.getElementById("p").clientWidth

    if (isInsideOfPicture(imgTop, imgLeft, imgHeight, imgWidth, clickX, clickY)) {
        console.log("inside")
        setNewImageProperties(imgTop, imgLeft, imgHeight, imgWidth, clickX, clickY)
    } else {
        console.log("outside")
    }
})

init()