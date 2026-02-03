const lista = document.getElementById("listaChamados");
const modal = document.getElementById("modalConfirmar");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let perfil = localStorage.getItem("perfil"); // admin | gerente
let modo = "abertos";
let indexParaApagar = null;

function render() {
    lista.innerHTML = "";

    chamados.forEach((c, i) => {
        const ehAberto = c.status === "Aberto";
        const ehAtendido = c.status === "Resolvido";

        if (
            (modo === "abertos" && ehAberto) ||
            (modo === "atendidos" && ehAtendido)
        ) {
            let botoes = "";

            if (ehAberto) {
                botoes += `
                    <button onclick="concluir(${i})">
                        Marcar como concluído
                    </button>`;
            }

            // 🔐 SÓ GERENTE PODE APAGAR
            if (perfil === "gerente" && ehAtendido) {
                botoes += `
                    <button class="danger" onclick="abrirConfirmacao(${i})">
                        Apagar chamado
                    </button>`;
            }

            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${c.nome}</strong> - ${c.setor}<br>
                <em>${c.tipo}</em><br>
                ${c.descricao}<br>
                <b>Status:</b> ${c.status}<br>
                ${botoes}
            `;

            lista.appendChild(li);
        }
    });
}

function concluir(index) {
    chamados[index].status = "Resolvido";
    salvar();
}

function abrirConfirmacao(index) {
    indexParaApagar = index;
    modal.style.display = "flex";
}

function confirmarApagar() {
    chamados.splice(indexParaApagar, 1);
    fecharConfirmacao();
    salvar();
}

function fecharConfirmacao() {
    modal.style.display = "none";
    indexParaApagar = null;
}

function salvar() {
    localStorage.setItem("chamados", JSON.stringify(chamados));
    render();
}

function mostrarAbertos() {
    modo = "abertos";
    render();
}

function mostrarAtendidos() {
    modo = "atendidos";
    render();
}

render();

