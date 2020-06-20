var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var canvas_1 = document.getElementById("canvas_1");
var context_1 = canvas_1.getContext("2d");

canvas.onmousedown = () => {
    canvas.onmousemove = (e) => {
        var x = e.offsetX;
        var y = e.offsetY;
        context.beginPath();
        context.arc(x, y, 20, 0, 2 * Math.PI);
        context.fill();
    }
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    }
}

var data = [];
document.getElementById("load").onclick = () => {
    data = handleArrayForData(convertCanvasToImage(28, 28))
};

document.getElementById("guess").onclick = () => {
    // handleArray(convertCanvasToImage(28, 28))
    document.getElementById("res").innerHTML = "It is " + indexOfMax(n.query(data));
};

document.getElementById("clear").onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
};

function convertCanvasToImage(width, height) {
	var image = new Image(width, height);
        image.src = canvas.toDataURL("image/png");
    context_1.clearRect(0, 0, canvas_1.width, canvas_1.height);
    context_1.drawImage(image, 0, 0, width, height);
    return context_1.getImageData(0,0,width,height).data;
    
}


