const minSize = 10;
const maxSize = 50;
const defaultSize = 20;

const minSpeed = 1;
const maxSpeed = 4;
const defaultSpeed = 3;

const minBlockSize = 60;
const maxBlockSize = 500;

const WAITING_TIME = 100;

const unsortedBlock = 'turquoise';
const sortedBlock = 'mediumspringgreen';
const comparisonBlock = 'crimson';

var size;
var delay;

var arr = [];

var array_container_width;
var element_width;
var element_width_max;
var margin_element;

var algo_selected;

function updateValues() {
    array_container_width = Math.floor($("#array-container").width());
    element_width_max = Math.floor(array_container_width / 20);

    margin_element = 2;
    if(parseInt($(window).width()) < 1200) {
        margin_element = 1;
    }
}

function findElementWidth() {
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if(element_width > element_width_max) {
        element_width = element_width_max;
    }
}

function createArray() {
    arr = [];
    $("#array").html('');

    for(var i = 0; i < size; i++) {
        var n = Math.floor(Math.random() * (maxBlockSize - minBlockSize + 1)) + minBlockSize;
        arr.push(n);
        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");
        $element.css('background-color', unsortedBlock);
        $element.css('width', element_width.toString() + 'px');
        $element.css('height', n.toString() + 'px');
        $element.css('margin-left', margin_element + 'px');
        $element.css('margin-right', margin_element + 'px');
        $element.appendTo("#array");
    }
}

function setHeight(id, height) {
    $("#e" + id).css('height', height);
}

function setColor(id, color) {
    $("#e" + id).css('background-color', color);
}

function setColorRange(p, r, color) {
    for(var i = p; i <= r; i++){
        $("#e" + i).css('background-color', color);
    }
}

function swap(a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    var h1 = $("#e" + a).css('height');
    var h2 = $("#e" + b).css('height');
    setHeight(a, h2);
    setHeight(b, h1);
}

function disableOthers() {
    $("#sort").prop('disabled', true);
    $("#randomize").prop('disabled', true);
    $("#size-slider").prop('disabled', true);
}

function enableOthers() {
    $("#sort").prop('disabled', false);
    $("#randomize").prop('disabled', false);
    $("#size-slider").prop('disabled', false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {
    $("#size-slider").attr('min', minSize);
    $("#size-slider").attr('max', maxSize);
    $("#size-slider").attr('value', defaultSize);

    $("#speed-slider").attr('min', minSpeed);
    $("#speed-slider").attr('max', maxSpeed);
    $("#speed-slider").attr('value', defaultSpeed);

    size = defaultSize;
    delay = WAITING_TIME * Math.pow(2, maxSpeed - defaultSpeed);

    updateValues();
    
    findElementWidth();
    createArray();

    $("#randomize").click(
        function() {
            createArray();
        }
    );

    $(".algo-btn").click(
        function() {
            algo_selected = $(this).html();

            $(".algo-btn-active").removeClass('algo-btn-active');
            $(this).addClass('algo-btn-active');

            $("#warning").removeClass('display-flex');
            $("#warning").addClass('display-none');
        }
    );

    $("#sort").click(
        async function() {
            disableOthers();
            setColorRange(0, size - 1, unsortedBlock);
            if(algo_selected == "Bubble Sort")
                await bubbleSort();
            else {
                $("#warning").removeClass('display-none');
                $("#warning").addClass('display-flex');
            }
            enableOthers();
        }
    );

    $("#size-slider").on('input', function() {
        size = $(this).val();
        findElementWidth();
        createArray();
    });

    $("#speed-slider").on('input', function() {
        delay = WAITING_TIME * Math.pow(2, maxSpeed - $(this).val());
    });

    $(window).resize(function() {
        if(array_container_width != Math.floor($("#array-container").width())) {
            updateValues();
            findElementWidth();
            for(var i = 0; i < size; i++) {
                $("#e" + i).css('width', element_width.toString() + 'px');
                $("#e" + i).css('margin-left', margin_element + 'px');
                $("#e" + i).css('margin-right', margin_element + 'px');
            }
        }
    });
});