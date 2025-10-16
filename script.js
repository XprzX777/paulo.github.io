document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento de elementos da interface
    const screens = {
        menu: document.getElementById('menu'),
        rules: document.getElementById('rules-screen'),
        question: document.getElementById('question-screen'),
        kick: document.getElementById('kick-screen'),
        victory: document.getElementById('victory-screen'),
    };

    // --- Elementos do Menu e Perguntas ---
    const btn1v1 = document.getElementById('btn1v1');
    const btn2v2 = document.getElementById('btn2v2');
    const btnRegras = document.getElementById('btnRegras');
    const btnVoltarMenu = document.getElementById('btnVoltarMenu');
    const btnSair = document.getElementById('btnSair');
    const turnInfo = document.getElementById('turnInfo');
    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const btnSubmitAnswer = document.getElementById('submit-answer');
    const answerFeedback = document.getElementById('answer-feedback');

    // --- Elementos da Tela de Chute ---
    const kickTurnInfo = document.getElementById('kick-turn-info');
    const goalAreas = document.querySelectorAll('.goal-area');
    const goalkeeper = document.getElementById('goalkeeper');
    const btnKick = document.getElementById('btnKick');
    const kickFeedback = document.getElementById('kick-feedback');
    const ball = document.getElementById('ball');
    const goalAreaContainer = document.getElementById('goal-area-container');
    const scoreTeam1 = document.getElementById('score-team1');
    const scoreTeam2 = document.getElementById('score-team2');
    const victoryMessage = document.getElementById('victory-message');
    const victoryDetails = document.getElementById('victory-details');
    const btnBackToMenu = document.getElementById('btnBackToMenu');

    // Variáveis de estado do jogo
    let mode = null;
    let currentPlayer = 1;
    let currentTeam = 1;
    let scores = { team1: 0, team2: 0 };
    let shuffledQuestions = [];
    let questionIndex = 0;
    let selectedGoalArea = null;

    // Banco de perguntas
    const questions = [
        // --- Conhecimentos Gerais (20) ---
        { question: "Quantos estados tem o Brasil?", answer: "26" },
        { question: "Qual é o coletivo de cães?", answer: "matilha" },
        { question: "Qual a moeda oficial do Japão?", answer: "iene" },
        { question: "Quem escreveu 'Dom Quixote'?", answer: "miguel de cervantes" },
        { question: "Quantos lados tem um hexágono?", answer: "6" },
        { question: "O que comemora-se no dia 21 de abril no Brasil?", answer: "tiradentes" },
        { question: "Qual é o maior osso do corpo humano?", answer: "femur" },
        { question: "Qual o significado da sigla 'CPF'?", answer: "cadastro de pessoas fisicas" },
        { question: "Qual animal estampa a nota de 200 reais?", answer: "lobo-guara" },
        { question: "Qual é o ponto mais alto do Brasil?", answer: "pico da neblina" },
        { question: "Em que ano o homem pisou na Lua pela primeira vez?", answer: "1969" },
        { question: "Qual é o nome do martelo de Thor?", answer: "mjolnir" },
        { question: "Qual o esporte mais popular do mundo?", answer: "futebol" },
        { question: "Quantos continentes existem?", answer: "6" },
        { question: "Quem foi o inventor da lâmpada?", answer: "thomas edison" },
        { question: "Qual o plural de 'cidadão'?", answer: "cidadaos" },
        { question: "Qual destes não é um dos cinco sentidos: Audição, Olfato ou Intuição?", answer: "intuicao" },
        { question: "Qual objeto o Papa usa na cabeça?", answer: "mitra" },
        { question: "Como se chama o processo de transformação da lagarta em borboleta?", answer: "metamorfose" },
        { question: "Qual o aparelho usado para ver as estrelas e planetas?", answer: "telescopio" },
        // --- Ciências e Natureza (20) ---
        { question: "Qual o gás mais abundante na atmosfera terrestre?", answer: "nitrogenio" },
        { question: "Qual o nome da camada de gás que protege a Terra dos raios solares?", answer: "camada de ozonio" },
        { question: "Qual o maior animal do mundo?", answer: "baleia azul" },
        { question: "Qual o nome do processo pelo qual as plantas produzem seu alimento?", answer: "fotossintese" },
        { question: "Qual planeta é conhecido como 'Planeta Vermelho'?", answer: "marte" },
        { question: "Quantos corações tem um polvo?", answer: "3" },
        { question: "Qual é o metal mais caro do mundo?", answer: "rodio" },
        { question: "Qual a fórmula química da água?", answer: "h2o" },
        { question: "Qual o mamífero que voa?", answer: "morcego" },
        { question: "Qual o animal terrestre mais rápido?", answer: "guepardo" },
        { question: "De qual país a batata é originária?", answer: "peru" },
        { question: "O que a aranha usa para construir sua teia?", answer: "seda" },
        { question: "Qual o nome do movimento da Terra em torno do Sol?", answer: "translacao" },
        { question: "Qual a ciência que estuda os fósseis?", answer: "paleontologia" },
        { question: "Em qual estado da matéria a água se encontra a 100°C?", answer: "gasoso" },
        { question: "Qual o maior órgão do corpo humano?", answer: "pele" },
        { question: "Qual o animal que representa o símbolo da paz?", answer: "pomba" },
        { question: "Quantas patas tem uma aranha?", answer: "8" },
        { question: "Qual o nome do açúcar natural das frutas?", answer: "frutose" },
        { question: "Qual o nome da força que nos mantém presos ao chão?", answer: "gravidade" },
        // --- História e Geografia (20) ---
        { question: "Em que país ficam as pirâmides de Gizé?", answer: "egito" },
        { question: "Quem descobriu o Brasil?", answer: "pedro alvares cabral" },
        { question: "Qual o oceano que banha a costa leste do Brasil?", answer: "atlantico" },
        { question: "Qual a capital da Argentina?", answer: "buenos aires" },
        { question: "Qual o rio mais longo do mundo?", answer: "nilo" },
        { question: "Qual o nome da primeira mulher a viajar para o espaço?", answer: "valentina tereshkova" },
        { question: "Qual a cidade conhecida como a 'cidade luz'?", answer: "paris" },
        { question: "Qual a capital de Portugal?", answer: "lisboa" },
        { question: "A queda de qual muro marcou o fim da Guerra Fria?", answer: "muro de berlim" },
        { question: "Qual o nome do deus do Sol na mitologia egípcia?", answer: "ra" },
        { question: "Em qual país está localizada a Torre de Pisa?", answer: "italia" },
        { question: "Qual era a principal fonte de energia da primeira Revolução Industrial?", answer: "carvao" },
        { question: "Qual presidente brasileiro ficou conhecido por 'Pai dos Pobres'?", answer: "getulio vargas" },
        { question: "Qual o menor país do mundo?", answer: "vaticano" },
        { question: "Em que ano começou a Segunda Guerra Mundial?", answer: "1939" },
        { question: "Qual é o maior deserto do mundo?", answer: "antartida" },
        { question: "Qual o nome do navio que afundou em sua viagem inaugural em 1912?", answer: "titanic" },
        { question: "Qual civilização antiga construiu Machu Picchu?", answer: "incas" },
        { question: "Qual o nome da deusa grega do amor?", answer: "afrodite" },
        { question: "Qual é a capital do Canadá?", answer: "ottawa" },
        // --- Arte e Entretenimento (20) ---
        { question: "Quem é o autor de 'O Pequeno Príncipe'?", answer: "antoine de saint-exupery" },
        { question: "Qual o nome do vocalista da banda Queen?", answer: "freddie mercury" },
        { question: "Em qual filme o personagem Coringa diz a frase 'Why so serious?'?", answer: "o cavaleiro das trevas" },
        { question: "Qual o nome do criador da Turma da Mônica?", answer: "mauricio de sousa" },
        { question: "Qual é o nome do bruxo protagonista da saga 'Harry Potter'?", answer: "harry potter" },
        { question: "Quem pintou o teto da Capela Sistina?", answer: "michelangelo" },
        { question: "Qual o nome do carro falante da série 'A Super Máquina'?", answer: "kitt" },
        { question: "Qual instrumento musical de cordas é famoso por ser tocado por anjos?", answer: "harpa" },
        { question: "Qual o nome do parque habitado por dinossauros em um famoso filme de 1993?", answer: "jurassic park" },
        { question: "Qual artista brasileiro é conhecido como o 'Rei'?", answer: "roberto carlos" },
        { question: "Qual o nome do vilão que quer a Joia da Alma em 'Vingadores: Guerra Infinita'?", answer: "thanos" },
        { question: "Quantos anões a Branca de Neve conheceu?", answer: "7" },
        { question: "Qual o nome do encanador bigodudo dos videogames da Nintendo?", answer: "mario" },
        { question: "Qual banda de rock tem como logotipo uma boca com a língua para fora?", answer: "rolling stones" },
        { question: "Qual o nome do ator que interpreta o Homem de Ferro?", answer: "robert downey jr" },
        { question: "Quem escreveu a saga 'O Senhor dos Anéis'?", answer: "j.r.r. tolkien" },
        { question: "Qual o nome do peixe amigo de Ariel em 'A Pequena Sereia'?", answer: "linguado" },
        { question: "Qual destes filmes ganhou o Oscar de Melhor Filme: 'Avatar' ou 'Parasita'?", answer: "parasita" },
        { question: "Como é chamado o cinema produzido na Índia?", answer: "bollywood" },
        { question: "Qual o nome do fantasma camarada?", answer: "gasparzinho" },
        // --- Esportes e Curiosidades (20) ---
        { question: "De quantos em quantos anos acontecem os Jogos Olímpicos?", answer: "4" },
        { question: "Qual o país com mais títulos de Copa do Mundo de Futebol?", answer: "brasil" },
        { question: "Qual o esporte praticado por Michael Jordan?", answer: "basquete" },
        { question: "Em qual esporte se usa um 'taco' e uma 'bolinha'?", answer: "golfe" },
        { question: "Qual o nome do famoso lutador de boxe que dizia 'flutuar como uma borboleta, picar como uma abelha'?", answer: "muhammad ali" },
        { question: "Quantos jogadores um time de vôlei tem em quadra?", answer: "6" },
        { question: "Qual o nome do golpe final de Ryu no jogo 'Street Fighter'?", answer: "hadouken" },
        { question: "Qual o país de origem do atleta Usain Bolt?", answer: "jamaica" },
        { question: "Em que país foi inventado o Judo?", answer: "japao" },
        { question: "Como se chama a pontuação máxima no boliche?", answer: "strike" },
        { question: "Qual o nome do estádio de futebol mais famoso do Rio de Janeiro?", answer: "maracana" },
        { question: "Em qual jogo de cartas o objetivo é somar 21 pontos?", answer: "blackjack" },
        { question: "Qual a cor da bola de basquete tradicional?", answer: "laranja" },
        { question: "Qual o nome da corrida de cavalos mais famosa da Inglaterra?", answer: "ascot" },
        { question: "Onde será realizada a Copa do Mundo de 2026?", answer: "estados unidos, mexico e canada" },
        { question: "Qual o nome do movimento de dança popularizado por Michael Jackson?", answer: "moonwalk" },
        { question: "Qual o nome da principal competição de futebol americano dos EUA?", answer: "super bowl" },
        { question: "Qual o nome do skatista brasileiro mais famoso?", answer: "tony hawk" },
        { question: "Quantas casas tem um tabuleiro de xadrez?", answer: "64" },
        { question: "Qual o único time que participou de todas as Copas do Mundo?", answer: "brasil" },
    ];

    // Função para trocar de tela
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }
    }

    // Função para embaralhar o array (Algoritmo Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Inicia e reseta o jogo
    function iniciarJogo() {
        scores = { team1: 0, team2: 0 };
        questionIndex = 0;
        currentPlayer = 1;
        currentTeam = 1;
        shuffledQuestions = [...questions];
        shuffleArray(shuffledQuestions);
        atualizarPlacar();
        proximoTurno();
    }

    // Prepara e mostra a próxima pergunta
    function proximoTurno() {
        if (questionIndex >= shuffledQuestions.length) {
            questionIndex = 0; // Reinicia as perguntas se acabarem
        }
        mostrarPergunta();
        showScreen('question');
    }

    // Mostra a pergunta atual na tela
    function mostrarPergunta() {
        const q = shuffledQuestions[questionIndex];
        questionText.textContent = q.question;
        answerInput.value = '';
        answerFeedback.textContent = '';
        
        if (mode === '1v1') {
            turnInfo.textContent = `Jogador ${currentPlayer}, sua vez!`;
        } else {
            turnInfo.textContent = `Equipe ${currentTeam} (Jogador ${currentPlayer}), sua vez!`;
        }
        
        answerInput.focus();
    }

    // Mostra a tela de chute e prepara os elementos
    function showKickScreen() {
        showScreen('kick');
        kickFeedback.textContent = '';
        btnKick.disabled = true;
        selectedGoalArea = null;
        goalAreas.forEach(area => area.classList.remove('selected'));
        
        if (mode === '1v1') {
            kickTurnInfo.textContent = `Jogador ${currentPlayer}, prepare o chute!`;
        } else {
            kickTurnInfo.textContent = `Equipe ${currentTeam}, prepare o chute!`;
        }
    }

    // Passa o turno para o próximo jogador
    function passarVez() {
        questionIndex++;
        if (mode === '1v1') {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            currentTeam = currentPlayer;
        } else { // 2v2
            currentPlayer = (currentPlayer % 4) + 1;
            currentTeam = (currentPlayer <= 2) ? 1 : 2;
        }
        proximoTurno();
    }

    // Valida a resposta do usuário
    function checarResposta() {
        const userAnswer = answerInput.value.toLowerCase().trim();
        const correctAnswer = shuffledQuestions[questionIndex].answer.toLowerCase();

        if (!userAnswer) {
            answerFeedback.textContent = 'Por favor, digite uma resposta.';
            answerFeedback.style.color = '#ffcc00';
            return;
        }

        if (userAnswer === correctAnswer) {
            answerFeedback.textContent = 'Resposta correta! Prepare-se para chutar.';
            answerFeedback.style.color = '#00ffaa';
            setTimeout(showKickScreen, 1500);
        } else {
            answerFeedback.textContent = `Errado! A resposta era "${shuffledQuestions[questionIndex].answer}". Vez do próximo.`;
            answerFeedback.style.color = '#ff4b2b';
            setTimeout(passarVez, 2500);
        }
    }

    // --- Lógica do Chute ---
    function handleKick() {
        if (!selectedGoalArea) return;

        btnKick.disabled = true;
        const gkPosition = defenderPosicao();
        goalkeeper.classList.add('jump'); // Adiciona classe para animar
        goalkeeper.style.transform = getTransformacaoGoleiro(gkPosition);

        // Animação da bola para a área chutada
        const goalArea = selectedGoalArea;
        const goalRect = goalArea.getBoundingClientRect();
        const containerRect = goalAreaContainer.getBoundingClientRect();
        const ballX = goalRect.left + goalRect.width / 2 - containerRect.left - ball.offsetWidth / 2;
        const ballY = goalRect.top + goalRect.height / 2 - containerRect.top - ball.offsetHeight / 2;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        ball.style.bottom = 'auto'; // Remove bottom para usar top

        const chutouNo = selectedGoalArea.dataset.pos;
        const defendeu = gkPosition === chutouNo;

        setTimeout(() => {
            if (defendeu) {
                kickFeedback.textContent = "DEFENDEU!";
                selectedGoalArea.classList.add('defended');
            } else {
                kickFeedback.textContent = "GOOOOL!";
                selectedGoalArea.classList.add('goal-scored');
                if (currentTeam === 1) scores.team1++;
                else scores.team2++;
                atualizarPlacar();
                verificarVitoria();
            }

            setTimeout(() => {
                goalkeeper.classList.remove('jump'); // Remove a classe para resetar
                goalkeeper.style.transform = 'translate(-50%, -50%)'; // Volta ao centro
                ball.style.left = '50%'; // Reseta a posição da bola
                ball.style.top = 'calc(100% - 50px)'; // Reseta a posição da bola
                ball.style.bottom = 'auto'; // Reseta bottom
                selectedGoalArea.classList.remove('selected', 'defended', 'goal-scored'); // Limpa classes
                passarVez();
            }, 2000);
        }, 500);
    }

    // Define a posição de defesa do goleiro
    function defenderPosicao() {
        const posicoes = ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];
        return posicoes[Math.floor(Math.random() * posicoes.length)];
    }

    // Retorna a transformação CSS para a posição do goleiro
    function getTransformacaoGoleiro(pos) {
        const transformacoes = {
            'top-left': 'translate(-83.33%, -83.33%)',
            'top-center': 'translate(-50%, -83.33%)',
            'top-right': 'translate(-16.67%, -83.33%)',
            'middle-left': 'translate(-83.33%, -50%)',
            'middle-center': 'translate(-50%, -50%)', // Fica no meio
            'middle-right': 'translate(-16.67%, -50%)',
            'bottom-left': 'translate(-83.33%, -16.67%)',
            'bottom-center': 'translate(-50%, -16.67%)',
            'bottom-right': 'translate(-16.67%, -16.67%)'
        };
        return transformacoes[pos] || 'translate(-50%, -50%)';
    }

    // Atualiza o placar na tela
    function atualizarPlacar() {
        scoreTeam1.textContent = scores.team1;
        scoreTeam2.textContent = scores.team2;
    }

    // Verifica se há um vencedor
    function verificarVitoria() {
        const maxGoals = 5; // Número de gols para vencer
        if (scores.team1 >= maxGoals) {
            mostrarVitoria(1);
        } else if (scores.team2 >= maxGoals) {
            mostrarVitoria(2);
        }
    }

    // Mostra a tela de vitória
    function mostrarVitoria(winningTeam) {
        victoryMessage.textContent = `Equipe ${winningTeam} venceu!`;
        victoryDetails.textContent = `Placar final: Equipe 1 - ${scores.team1} | Equipe 2 - ${scores.team2}`;
        showScreen('victory');
    }


    // --- Event Listeners ---
    btn1v1.addEventListener('click', () => {
        mode = '1v1';
        iniciarJogo();
    });

    btn2v2.addEventListener('click', () => {
        mode = '2v2';
        iniciarJogo();
    });

    btnRegras.addEventListener('click', () => {
        showScreen('rules');
    });

    btnVoltarMenu.addEventListener('click', () => {
        showScreen('menu');
    });

    btnSair.addEventListener('click', () => {
        window.close(); // Simplesmente fecha a aba/janela
    });

    btnSubmitAnswer.addEventListener('click', checarResposta);
    answerInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') checarResposta();
    });

    goalAreas.forEach(area => {
        area.addEventListener('click', () => {
            if (selectedGoalArea) {
                selectedGoalArea.classList.remove('selected');
            }
            selectedGoalArea = area;
            area.classList.add('selected');
            btnKick.disabled = false;
        });
    });

    btnKick.addEventListener('click', handleKick);

    // Estado inicial: mostrar o menu
    showScreen('menu');
});
