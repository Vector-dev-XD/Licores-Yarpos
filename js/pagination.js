
    const productsPerPage = 5;
    const productList = document.getElementById("productList");
    const pagination = document.getElementById("pagination");

    const productCards = Array.from(productList.getElementsByClassName("product-card"));
    let currentPage = 1;
    const totalPages = Math.ceil(productCards.length / productsPerPage);

    function showPage(page) {
        currentPage = page;

        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        productCards.forEach((card, index) => {
            card.style.display = (index >= start && index < end) ? "flex" : "none";
        });

        updatePagination();
    }

    function updatePagination() {
        pagination.innerHTML = "";

        const prev = document.createElement("button");
        prev.textContent = "Ant";
        prev.disabled = (currentPage === 1);
        prev.onclick = () => showPage(currentPage - 1);
        pagination.appendChild(prev);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.toggle("active", i === currentPage);
            btn.onclick = () => showPage(i);
            pagination.appendChild(btn);
        }

        const next = document.createElement("button");
        next.textContent = "Sig";
        next.disabled = (currentPage === totalPages);
        next.onclick = () => showPage(currentPage + 1);
        pagination.appendChild(next);
    }

    showPage(1);

