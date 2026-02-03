const lista = document.getElementById("listaChamados");
const modal = document.getElementById("modalConfirmar");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let perfil = localStorage.getItem("perfil"); // admin | gerente
let modo = "abertos";
let indexParaApagar = null;

/* 🔹 FORMATA DATA/HORA */
function formatarData(dataISO) {
    if (!dataISO) return "-";

    const data = new Date(dataISO);
    return (
        data.toLocaleDateString("pt-BR") +
        " " +
        data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })
    );
}

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

            const numeroChamado = c.id
                ? `#${String(c.id).padStart(3, "0")}`
                : "#---";

            const li = document.createElement("li");
li.innerHTML = `
    <div class="chamado-card">
        <div class="chamado-id">${numeroChamado}</div>

        <div class="chamado-info">
            <strong>${c.nome}</strong> - ${c.setor}<br>
            <em>${c.tipo}</em><br>
            ${c.descricao}<br><br>

            🕒 <b>Aberto em:</b> ${formatarData(c.criadoEm)}<br>
            ${
                c.resolvidoEm
                    ? `✅ <b>Resolvido em:</b> ${formatarData(c.resolvidoEm)}<br>`
                    : ""
            }
            <b>Status:</b> ${c.status}<br>
            ${botoes}
        </div>
    </div>
`;
            lista.appendChild(li);
        }
    });
}

function concluir(index) {
    chamados[index].status = "Resolvido";
    chamados[index].resolvidoEm = new Date().toISOString();
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
