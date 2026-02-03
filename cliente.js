const form = document.getElementById("formChamado");
const modal = document.getElementById("modalSucesso");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    // 🔢 GERA NÚMERO SEQUENCIAL DO CHAMADO
    let proximoId = chamados.length > 0
        ? chamados[chamados.length - 1].id + 1
        : 1;

    chamados.push({
        id: proximoId,
        nome: document.getElementById("nome").value,
        setor: document.getElementById("setor").value,
        tipo: document.getElementById("tipo").value,
        descricao: document.getElementById("descricao").value,
        status: "Aberto",
        criadoEm: new Date().toISOString(),
        resolvidoEm: null
    });

    localStorage.setItem("chamados", JSON.stringify(chamados));

    modal.style.display = "flex";
    form.reset();
});

function fecharModal() {
    modal.style.display = "none";
}
