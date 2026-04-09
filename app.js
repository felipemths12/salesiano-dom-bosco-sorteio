// Listas iniciais
const turmas = [
"6º A",
"6º B",
"6º C",
"6º D",
"6º E",
"6º F",
"6º G",
"6º H",
"6º I",
"7º A",
"7º B",
"7º C",
"7º D",
"7º E",
"7º F",
"7° G",
"8º A",
"8º B",
"8º C",
"8º D",
"8º E",
"8º F",
"8º G",
"8º H",
"9º A",
"9º B",
"9º C",
"9º D",
"9º E",
"9º F",
"1ª série A",
"1ª série B",
"1ª série C",
"1ª série D",
"2ª série A",
"2ª série B",
"2ª série C",
"2ª série D",
"3ª série A",
"3ª série B",
"3ª série C"
];

let selecoes = [
    "🇨🇦 Canadá","🇺🇸 Estados Unidos","🇲🇽 México","🇨🇼 Curaçao","🇭🇹 Haiti",
"🇵🇦 Panamá","🇯🇵 Japão","🇮🇷 Irã","🇺🇿 Uzbequistão","🇰🇷 Coreia do Sul",
"🇯🇴 Jordânia","🇦🇺 Austrália","🇶🇦 Catar","🇸🇦 Arábia Saudita","🇳🇿 Nova Zelândia",
"🇦🇷 Argentina","🇪🇨 Equador","🇺🇾 Uruguai","🇨🇴 Colômbia","🇵🇾 Paraguai",
"🇲🇦 Marrocos","🇹🇳 Tunísia","🇪🇬 Egito","🇩🇿 Argélia","🇬🇭 Gana","🇨🇻 Cabo Verde",
"🇿🇦 África do Sul","🇨🇮 Costa do Marfim","🇸🇳 Senegal","🏴 Inglaterra","🇫🇷 França",
"🇭🇷 Croácia","🇵🇹 Portugal","🇳🇴 Noruega","🇳🇱 Holanda","🇩🇪 Alemanha",
"🇨🇭 Suíça","🇦🇹 Áustria","🇧🇪 Bélgica","🇪🇸 Espanha","🏴 Escócia",
"🇹🇷 Turquia","🇨🇿 República Tcheca","🇸🇪 Suécia","🇧🇦 Bósnia e Herzegovina","🇨🇩 República Democrática do Congo","🇮🇶 Iraque"
];

let indiceTurmaAtual = 0;
let historicoSorteios = []; // Array para guardar os resultados e permitir o 'desfazer'

function sortear() {
    if (indiceTurmaAtual >= turmas.length) {
        alert("Todas as turmas já foram sorteadas!");
        return;
    }

    if (selecoes.length === 0) {
        alert("Não há mais seleções disponíveis!");
        return;
    }

    const turmaSorteada = turmas[indiceTurmaAtual];
    const indiceAleatorio = Math.floor(Math.random() * selecoes.length);
    const selecaoSorteada = selecoes[indiceAleatorio];

    // Remove a seleção sorteada da lista disponível
    selecoes.splice(indiceAleatorio, 1);

    // Salva no histórico
    historicoSorteios.push({ turma: turmaSorteada, selecao: selecaoSorteada });

    // Atualiza a interface
    atualizarTela();

    // Avança para a próxima turma
    indiceTurmaAtual++;

    // Verifica se foi o último sorteio para liberar o PDF
    if (indiceTurmaAtual >= turmas.length) {
        finalizarSorteio();
    }
}

function desfazerUltimo() {
    if (historicoSorteios.length === 0) {
        alert("Nenhum sorteio foi realizado ainda para ser desfeito.");
        return;
    }

    // Remove o último sorteio do histórico
    const ultimoSorteio = historicoSorteios.pop();

    // Devolve a seleção para a lista de disponíveis para ser sorteada novamente
    selecoes.push(ultimoSorteio.selecao);

    // Volta o índice da turma
    indiceTurmaAtual--;

    // Atualiza a tela com o histórico restante
    atualizarTela();

    // Garante que a interface volte ao modo "Sorteio" caso tenha sido finalizado
    document.getElementById("btn-sortear").style.display = "flex";
    document.getElementById("btn-pdf").style.display = "none";
}

function atualizarTela() {
    const destaque = document.getElementById("resultado-destaque");
    const lista = document.getElementById("lista-historico");

    // Limpa a lista na tela
    lista.innerHTML = "";

    // Se o histórico estiver vazio, reseta o destaque
    if (historicoSorteios.length === 0) {
        destaque.innerHTML = "Pressione 'Sortear' para iniciar";
        return;
    }

    // Mostra o último sorteado no destaque
    const ultimo = historicoSorteios[historicoSorteios.length - 1];
    destaque.innerHTML = `Último Sorteio: ${ultimo.turma} ⚽ ${ultimo.selecao}`;

    // Renderiza a lista completa atualizada
    for (let i = 0; i < historicoSorteios.length; i++) {
        const li = document.createElement("li");
        li.textContent = `✅ ${historicoSorteios[i].turma} vai representar a seleção de: ${historicoSorteios[i].selecao}`;
        lista.appendChild(li);
    }
}

function finalizarSorteio() {
    document.getElementById("resultado-destaque").innerHTML = "🎉 Sorteio Concluído! 🎉";
    document.getElementById("btn-sortear").style.display = "none"; // Esconde botão de sortear
    document.getElementById("btn-pdf").style.display = "flex"; // Mostra botão de PDF
}

function gerarPDF() {
    // 1. Cria um elemento temporário invisível (apenas na memória) para o PDF
    const elementoTemporario = document.createElement("div");
    elementoTemporario.style.padding = "20px";
    elementoTemporario.style.fontFamily = "Inter, sans-serif";
    elementoTemporario.style.color = "#333333";

    // 2. Adiciona um título para o documento
    const titulo = document.createElement("h2");
    titulo.innerText = "Resultado Oficial - Sorteio da Copa";
    titulo.style.textAlign = "center";
    titulo.style.color = "#4B69FD"; 
    elementoTemporario.appendChild(titulo);

    // Adiciona uma linha visual para separar o título da lista
    const hr = document.createElement("hr");
    hr.style.margin = "20px 0";
    elementoTemporario.appendChild(hr);

    // 3. Cria uma lista de texto baseada no nosso histórico de sorteios
    const listaPDF = document.createElement("ul");
    listaPDF.style.listStyleType = "none";
    listaPDF.style.padding = "0";
    listaPDF.style.fontSize = "16px";
    listaPDF.style.lineHeight = "2"; // Dá um espaçamento bom entre as linhas

    // Percorre o histórico e adiciona cada item como uma linha de texto simples
    for (let i = 0; i < historicoSorteios.length; i++) {
        const li = document.createElement("li");
        li.innerText = `✅ ${historicoSorteios[i].turma} representará a seleção de: ${historicoSorteios[i].selecao}`;
        listaPDF.appendChild(li);
    }

    // Adiciona a lista de textos dentro do nosso elemento temporário
    elementoTemporario.appendChild(listaPDF);

    // 4. Configurações da biblioteca html2pdf
    const opcoes = {
        margin:       15,
        filename:     'resultado-copa-turmas.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 5. Gera e faz o download do arquivo a partir do elemento limpo que criamos
    html2pdf().set(opcoes).from(elementoTemporario).save();
}