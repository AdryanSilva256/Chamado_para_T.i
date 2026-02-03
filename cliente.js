const form = document.getElementById("formChamado");
const modal = document.getElementById("modalSucesso");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    chamados.push({
        nome: document.getElementById("nome").value,
        setor: document.getElementById("setor").value,
        tipo: document.getElementById("tipo").value,
        descricao: document.getElementById("descricao").value,
        status: "Aberto"
    });

    localStorage.setItem("chamados", JSON.stringify(chamados));

    modal.style.display = "flex";
    form.reset();
});

function fecharModal() {
    modal.style.display = "none";
}
