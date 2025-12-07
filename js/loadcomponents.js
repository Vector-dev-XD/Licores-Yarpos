fetch("componentes/footer.html")
    .then(response => response.text())
    .then(html =>{
        document.getElementById("footer-container").innerHTML = html;
    });


const phonemq=window.matchMedia("(max-width: 400px)")
let menuOp=document.getElementsByClassName("menu")


menuOp[0].addEventListener("click",(e)=>{
    console.log("holis")
})

phonemq.addEventListener("change",(e)=>{
    menuOp[0].hidden="false"
})


