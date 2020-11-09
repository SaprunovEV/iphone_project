window.onload = init;
function init() {
    let imgs = document.getElementsByTagName("img");
    for(let i = 0; i < imgs.length; i++){
        imgs[i].onmouseover = showAnswer;
        imgs[i].onmouseout = showSecret;
    }
}

function showAnswer(eventObj) {
    let img = eventObj.target;
    var name = img.id;
    name = name + ".jpg";
    img.src = name;
}

function showSecret(eventObj) {
    let img = eventObj.target;
    img.src = img.id + "blur.jpg";
}