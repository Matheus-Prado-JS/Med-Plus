const container = document.getElementById("agendamentosList");
const welcome = document.getElementById("welcomeText");

const user = JSON.parse(localStorage.getItem("medplus_logged"));

if (user) {
  welcome.textContent = `Bem-vindo, ${user.username}`;
}

const agendamentos = JSON.parse(localStorage.getItem("medplus_agendamentos")) || [];

if (agendamentos.length === 0) {
  container.innerHTML = `<p class="sem-agendamentos">Nenhum agendamento ainda.</p>`;
} else {
  agendamentos.forEach((item, index) => {

    const card = document.createElement("div");
    card.classList.add("agendamento-card");

card.innerHTML = `
  <h3>${item.especialidade}</h3>
  <p><strong>Médico:</strong> ${item.medico}</p>
  <p><strong>Hospital:</strong> ${item.hospital}</p>
  <p><strong>Data:</strong> ${item.data}</p>
  <p><strong>Horário:</strong> ${item.horario}</p>

  <div class="card-actions">
    <button class="btn-primary cancelar">Cancelar</button>
  </div>
`;

    container.appendChild(card);
    const btnCancelar = card.querySelector(".cancelar");

btnCancelar.addEventListener("click", () => {
  const confirmar = confirm("Tem certeza que deseja cancelar essa consulta?");

  if (confirmar) {
    let lista = JSON.parse(localStorage.getItem("medplus_agendamentos")) || [];

    lista.splice(index, 1); // remove pelo índice

    localStorage.setItem("medplus_agendamentos", JSON.stringify(lista));

    // recarrega a página pra atualizar
    location.reload();
  }
});
  });
}