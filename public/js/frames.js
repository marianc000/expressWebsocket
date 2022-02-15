addBtn.addEventListener("click", addIframe);

function addIframe(){
    console.log(">addIframe");
    frameDiv.insertAdjacentHTML('afterbegin',`<div class='iframeContainer'><div class='remove'>&times;</div><iframe src='frame.html'></iframe></div>`);
}

frameDiv.addEventListener("click", removeIframe);

function removeIframe(e){
    e.target.parentElement.closest('.iframeContainer')?.remove();
}

for (let i=0;i<6;i++){
    addIframe();
}