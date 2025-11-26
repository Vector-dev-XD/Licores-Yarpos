fetch("componentes/navbar.html")
    .then(response => response.text())
    .then(html =>{
        document.getElementById("navbar-container").innerHTML = html;
    });

fetch("componentes/footer.html")
    .then(response => response.text())
    .then(html =>{
        document.getElementById("footer-container").innerHTML = html;
    });
