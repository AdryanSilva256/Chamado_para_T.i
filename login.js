function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("erro");

    if (usuario === "admin" && senha === "123") {
        localStorage.setItem("perfil", "admin");
        window.location.href = "admin.html";

    } else if (usuario === "gerente" && senha === "123") {
        localStorage.setItem("perfil", "gerente");
        window.location.href = "admin.html";

    } else {
        erro.innerText = "Usuário ou senha inválidos";
    }
}

function toggleTI() {
    const area = document.getElementById("areaTI");

    if (area.style.display === "none" || area.style.display === "") {
        area.style.display = "block";
    } else {
        area.style.display = "none";
    }
}
