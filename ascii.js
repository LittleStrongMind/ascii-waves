var element_ascii_container = document.querySelector(".ascii");

var matrix  = [];
var size    = 31;
var center  = Math.round(size / 2) - 1;

var character = ".";

var FPS = 16;

window.requestAnimationFrame =
    window.requestAnimationFrame        ||
    window.mozRequestAnimationFrame     ||
    window.webkitRequestAnimationFrame  ||
    window.msRequestAnimationFrame;

function init_matrix() {
    for (var i = 0; i < size; i++) {
        matrix[i] = [];
        for (var j = 0; j < size; j++) {
            matrix[i][j] = character;
        }
    }
}

function draw() {
    var fragment = document.createDocumentFragment();
    var container = document.createElement("div");

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var span = document.createElement("span");
            span.innerText = matrix[i][j];

            if (matrix[i][j] === "-") {
                span.className = "wave";
            }
            fragment.appendChild(span);
        }
        var br = document.createElement("br");
        fragment.appendChild(br);
    }
    container.appendChild(fragment);
    element_ascii_container.appendChild(container);
}
function clean() {
    if (element_ascii_container.firstChild) element_ascii_container.removeChild(element_ascii_container.firstChild);
}
function render() {
    clean();
    draw();
}

function draw_circle(r, c) {
    var x = 0;
    var y = r;
    var d = r - 1;

    while (y >= x) {
        change_at(center + x, center + y, c);
        change_at(center + y, center + x, c);
        change_at(center - x, center + y, c);
        change_at(center - y, center + x, c);

        change_at(center + x, center - y, c);
        change_at(center + y, center - x, c);
        change_at(center - x, center - y, c);
        change_at(center - y, center - x, c);

        if (d >= 2 * x) {
            d = d - 2 * x -1;
            x++;
        } else if (d < 2 * (r - y)) {
            d = d + 2 * y - 1;
            y = y - 1;
        } else {
            d = d + 2 * (y - x - 1);
            y = y - 1;
            x = x + 1;
        }
    }
}
function clear_circle(r) {
    draw_circle(r, character);
}

function change_at(x, y, c) {
    if ( (x < 0 || x >= size) || (y < 0 || y >= size)) return;

    matrix[x][y] = c;
}

function draw_waves(step) {
    draw_circle(step, "-");
    render();
    clear_circle(Math.abs(step - 1));
}
function run() {
    var interval = 1000 / FPS;
    var then = Date.now();
    var now;
    var delta;

    var step = 1;

    init_matrix();
    function main() {
        window.requestAnimationFrame(main);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

            draw_waves(step++ % size);
        }
    }

    main();
}

run();
