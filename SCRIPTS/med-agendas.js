// SELECT DROPDOWN
const selects = document.querySelectorAll(".select-box");

selects.forEach(select => {
  select.addEventListener("click", () => {
    select.classList.toggle("active");
  });
});

// FECHAR AO CLICAR FORA
document.addEventListener("click", (e) => {
  selects.forEach(select => {
    if (!select.contains(e.target)) {
      select.classList.remove("active");
    }
  });
});

// DADOS MÉDICOS
const medicosData = {
  cardio: [
    {
      nome: "Dr. João Silva",
      hospitais: ["Hospital Sírio-Libanês", "Albert Einstein"]
    },
    {
      nome: "Dra. Marcela Costa",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  derma: [
    {
      nome: "Dra. Maria Souza",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dr. Carlos Pereira",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  pedi: [
    {
      nome: "Dr. Maurício Santos",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dra. Ana Lima",
      hospitais: ["Albert Einstein"]
    }
  ],
    orto: [
    {
      nome: "Dra. Akemi Sato",
      hospitais: ["Hospital Sírio-Libanês", "Albert Einstein"]
    },
    {
      nome: "Dr. Rafael Oliveira",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  neuro: [
    {
      nome: "Dr. Pedro Almeida",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dra. Carolina Mendes",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  gine: [
    {
      nome: "Dra. Fernanda Costa",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dr. Luiz Rodrigues",
      hospitais: ["Albert Einstein"]
    }
  ],
    psiq: [
    {
      nome: "Dra. Beatriz Silva",
      hospitais: ["Hospital Sírio-Libanês", "Albert Einstein"]
    },
    {
      nome: "Dr. André Santos",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  oftal: [
    {
      nome: "Dra. Larissa Gomes",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dra. Marcia Fernandes",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  onco: [
    {
      nome: "Dr. Carlos Silva",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dra. Ana Souza",
      hospitais: ["Albert Einstein"]
    }
  ],
    endoc: [
    {
      nome: "Dra. Juliana Pereira",
      hospitais: ["Hospital Sírio-Libanês", "Albert Einstein"]
    },
    {
      nome: "Dr. Marcos Lima",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  cli: [
    {
      nome: "Dra. Priscilla Rocha",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dr. Felipe Martins",
      hospitais: ["Hospital Sírio-Libanês"]
    }
  ],

  gastro: [
    {
      nome: "Dra. Simone Costa",
      hospitais: ["Albert Sabin"]
    },
    {
      nome: "Dr. Roberto Silva",
      hospitais: ["Albert Einstein"]
    }
  ],
  
};
// SELEÇÃO DE ESPECIALIDADE
const especialidadeOptions = document.getElementById("especialidadeOptions");
const medicoOptions = document.getElementById("medicoOptions");
const localOptions = document.getElementById("localOptions");

let medicoSelecionado = null;

// ESPECIALIDADE
especialidadeOptions.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value;

    item.closest(".select-box").querySelector(".select-header").textContent = item.textContent;

    medicoOptions.innerHTML = "";
    localOptions.innerHTML = "";
    medicoSelecionado = null;

    medicosData[value].forEach(med => {
      const li = document.createElement("li");
      li.textContent = med.nome;

      li.addEventListener("click", () => {
        medicoSelecionado = med;

        medicoOptions.closest(".select-box").querySelector(".select-header").textContent = med.nome;

        // 🔥 carregar hospitais do médico
        localOptions.innerHTML = "";

        med.hospitais.forEach(hosp => {
          const liHosp = document.createElement("li");
          liHosp.textContent = hosp;

          liHosp.addEventListener("click", () => {
            localOptions.closest(".select-box").querySelector(".select-header").textContent = hosp;
          });

          localOptions.appendChild(liHosp);
        });
      });

      medicoOptions.appendChild(li);
    });
  });
});

// HORÁRIOS
const horariosList = document.getElementById("horariosList");

const horarios = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];

horarios.forEach(h => {
  const div = document.createElement("div");
  div.classList.add("horario");
  div.textContent = h;

  div.addEventListener("click", () => {
    document.querySelectorAll(".horario").forEach(h => h.classList.remove("active"));
    div.classList.add("active");
  });

  horariosList.appendChild(div);
});

// CONFIRMAR
document.querySelector(".btn-confirmar").addEventListener("click", () => {
  alert("Agendamento realizado (mock)");
});

const calGrid = document.getElementById("calGrid");
const calMonth = document.getElementById("calMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let dataAtual = new Date(2026, 3); // Abril 2026 (mês começa do 0)
let diaSelecionado = null;

// 🔥 data mínima
const dataMinima = new Date(2026, 3, 1);

function renderCalendar() {
  calGrid.innerHTML = "";

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  calMonth.textContent = `${meses[mes]} ${ano}`;

  // espaços vazios antes do mês começar
  for (let i = 0; i < primeiroDia; i++) {
    const empty = document.createElement("div");
    calGrid.appendChild(empty);
  }

  // dias
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(ano, mes, dia);
    const div = document.createElement("div");
    div.classList.add("cal-day");
    div.textContent = dia;

    // 🔥 bloquear datas antes de abril 2026
    if (data < dataMinima) {
      div.classList.add("disabled");
    }

    div.addEventListener("click", () => {
      document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));

      div.classList.add("selected");
      diaSelecionado = data;
    });

    calGrid.appendChild(div);
  }
}

// navegação
prevMonth.addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderCalendar();
});

// iniciar
renderCalendar();