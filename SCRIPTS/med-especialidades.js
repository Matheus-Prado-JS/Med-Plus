const cards = document.querySelectorAll(".grid .card");
const grid = document.querySelector(".grid");



const especialidadesData = {
  cardio: {
    nome: "Cardiologia",
    img: "../assets/meds/Med1.png",
    especialistas: "Dr. João Silva, Dra. Marcela Costa",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O cardiologista é o médico especializado no diagnóstico, tratamento e prevenção de doenças do coração e do sistema circulatório (vasos sanguíneos). Ele atua na avaliação clínica, solicita exames específicos (como eletrocardiograma e ecocardiograma) e trata condições como hipertensão, arritmias, insuficiência cardíaca e infarto, além de realizar check-ups preventivos."
  },
  derma: {
    nome: "Dermatologia",
    img: "../assets/meds/Med2.png",
    especialistas: "Dra. Maria Souza, Dr. Carlos Pereira",
    hospitais: "Hospital Sírio-Libanês, Albert Sabin",
    descricao: "Uma dermatologista é a médica especialista no diagnóstico, tratamento e prevenção de doenças que afetam a pele, cabelos, unhas e mucosas (boca, lábios, área genital). Ela trata condições como acne, psoríase, dermatites, queda de cabelo e câncer de pele, além de realizar procedimentos estéticos para rejuvenescimento e melhora da textura da pele."
  },
    pedi: {
    nome: "Pediatria",
    img: "../assets/meds/Med3.png",
    especialistas: "Dr. Maurício Santos, Dra. Ana Lima",
    hospitais: "Albert Sabin, Albert Einstein",
    descricao: "O pediatra é o médico especializado na saúde integral de crianças e adolescentes, do nascimento até a adolescência (por volta dos 18-20 anos). Ele monitora o crescimento físico e desenvolvimento motor/cognitivo, previne e trata doenças, orienta sobre amamentação, vacinação, nutrição, prevenção de acidentes e higiene. "
  },
  orto: {
    nome: "Ortopedia",
    img: "../assets/meds/Med4.png",
    especialistas: "Dra. Akemi Sato, Dr. Rafael Oliveira",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O ortopedista é o médico especialista no diagnóstico, tratamento e prevenção de doenças e lesões do sistema locomotor, que inclui ossos, músculos, articulações, tendões, ligamentos e cartilagens. Ele atua tanto em casos de traumas agudos (fraturas, entorses) quanto em condições crônicas (artrose, hérnias)."
  },
    neuro: {
    nome: "Neurologia",
    img: "../assets/meds/Med6.png",
    especialistas: "Dr. Pedro Almeida, Dra. Carolina Mendes",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O neurologista é o médico especialista no diagnóstico e tratamento de doenças que afetam o sistema nervoso (cérebro, medula espinhal e nervos) e músculos. Ele cuida de condições como enxaqueca, AVC, epilepsia, Alzheimer, Parkinson e tremores, buscando melhorar a qualidade de vida do paciente através de exames e medicamentos."
  },
  gine: {
    nome: "Ginecologia",
    img: "../assets/meds/Med7.png",
    especialistas: "Dra. Fernanda Costa, Dr. Luiz Rodrigues",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O ginecologista é o médico especialista na saúde integral da mulher, focado no sistema reprodutor (útero, ovários, tubas, vagina, vulva) e mamas, abrangendo prevenção, diagnóstico e tratamento de doenças. Ele acompanha desde a menarca até o climatério, realizando exames de rotina, orientando sobre sexualidade e reprodução."
  },
    psiq: {
    nome: "Psiquiatria",
    img: "../assets/meds/Med11.png",
    especialistas: "Dra. Beatriz Silva, Dr. André Santos",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O psiquiatra é o médico especializado em saúde mental, focado no diagnóstico, tratamento e prevenção de transtornos mentais, emocionais e comportamentais. Ele avalia aspectos biológicos e psicológicos, podendo solicitar exames, prescrever medicamentos e indicar terapias, como em casos de depressão, ansiedade, bipolaridade e esquizofrenia."
  },
  oftal: {
    nome: "Oftalmologia",
    img: "../assets/meds/Med9.png",
    especialistas: "Dra. Larissa Gomes, Dra. Márcia Fernandes",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O oftalmologista é o médico especializado na saúde ocular, responsável por diagnosticar, tratar e realizar cirurgias em doenças dos olhos, pálpebras e vias lacrimais. Ele corrige erros de refração (miopia, astigmatismo, etc.), trata condições como glaucoma e catarata, além de realizar exames preventivos e de rotina para preservar a visão."
  },
    onco: {
    nome: "Oncologia",
    img: "../assets/meds/Med10.png",
    especialistas: "Dr. Carlos Silva, Dra. Ana Souza",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O oncologista é o médico especializado no diagnóstico, tratamento e acompanhamento de pacientes com câncer (tumores malignos ou benignos). Ele coordena o plano terapêutico, que pode incluir quimioterapia, imunoterapia ou terapias-alvo, trabalhando com equipe multidisciplinar para aumentar a sobrevida e qualidade de vida, focando também na prevenção e manejo de efeitos colaterais."
  },
  endoc: {
    nome: "Endocrinologia",
    img: "../assets/meds/Med8.png",
    especialistas: "Dra. Juliana Pereira, Dr. Marcos Lima",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O endocrinologista é o médico especialista que estuda e trata o sistema endócrino (glândulas) e o metabolismo. Ele diagnostica e gerencia desequilíbrios hormonais, como diabetes, doenças da tireoide, obesidade, menopausa, osteoporose e distúrbios de crescimento. Ele ajusta a produção hormonal para melhorar o funcionamento metabólico e a saúde."
  },
    cli: {
    nome: "Clínico Geral",
    img: "../assets/meds/Med5.png",
    especialistas: "Dra. Priscilla Rocha, Dr. Felipe Martins",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O clínico geral é o médico capacitado para diagnosticar, tratar e prevenir diversas doenças em adultos, atuando como o primeiro ponto de contato na saúde. Ele realiza consultas de rotina (check-up), investiga sintomas inespecíficos e gerencia condições crônicas como hipertensão e diabetes, encaminhando para especialistas quando necessário."
  },
  gastro: {
    nome: "Gastroenterologia",
    img: "../assets/meds/Med12.png",
    especialistas: "Dra. Simone Costa, Dr. Roberto Silva",
    hospitais: "Hospital Sírio-Libanês, Albert Einstein",
    descricao: "O gastroenterologista é o médico especialista no diagnóstico, prevenção e tratamento clínico de doenças do aparelho digestivo, que inclui esôfago, estômago, intestinos (delgado e grosso), fígado, pâncreas e vesícula biliar. Ele trata condições como gastrite, refluxo, síndrome do intestino irritável, úlceras e intolerâncias alimentares. "
  },
};
cards.forEach((card, index) => {
  card.addEventListener("click", () => {

    const key = card.dataset.esp;
    const data = especialidadesData[key];

    if (!data) return;

    const jaAtivo = card.classList.contains("active");

    // 🔥 remove detalhe atual
    const detalheExistente = document.querySelector(".especialidade-detalhe");
    if (detalheExistente) detalheExistente.remove();

    // 🔥 remove active de todos
    cards.forEach(c => c.classList.remove("active"));

    // 🔥 se clicou no mesmo → só fecha e PARA aqui
    if (jaAtivo) return;

    // 🔥 ativa o novo
    card.classList.add("active");

    // 🔥 cria detalhe
    let detalhe = document.createElement("div");
    detalhe.classList.add("especialidade-detalhe", "active");

    detalhe.innerHTML = `
      <div class="especialidade-box fade-in">
        <img src="${data.img}">

        <div class="especialidade-info">
          <h3 class="esp-title">${data.nome}</h3>

          <div class="info-row">
            <p><strong>Especialistas:</strong> ${data.especialistas}</p>
            <p><strong>Hospitais:</strong> ${data.hospitais}</p>
          </div>

          <p class="esp-desc">
            ${data.descricao}
          </p>

          <button class="btn-primary btn-agendar">Agende sua consulta</button>
        </div>
      </div>
    `;

    // 🔥 linha correta
    const linha = Math.floor(index / 4);
    const ultimoIndexDaLinha = (linha + 1) * 4 - 1;

    const refCard = cards[ultimoIndexDaLinha];

    refCard.after(detalhe);
  });
});