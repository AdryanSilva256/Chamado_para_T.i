const form = document.getElementById("chamadoForm");
const lista = document.getElementById("listaChamados");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

function renderChamados() {
    lista.innerHTML = "";
    chamados.forEach((chamado, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${chamado.nome}</strong> - ${chamado.setor}<br>
            <em>${chamado.tipo}</em><br>
            ${chamado.descricao}
        `;
        lista.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const chamado = {
        nome: nome.value,
        setor: setor.value,
        tipo: tipo.value,
        descricao: descricao.value
    };

    chamados.push(chamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    form.reset();
    renderChamados();
});

renderChamados();
