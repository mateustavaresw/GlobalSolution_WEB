//função de trocar tema
function trocarTema() {
    document.body.className = tema;
    localStorage.setItem('tema', tema);
}
//carrega o tema salvo no localStorage
let tema = localStorage.getItem('tema');
if (temaSalvo) {
    document.body.className = temaSalvo;
}
//slideshow
let slideAtual = 0;
let slides = document.querySelectorAll('.slide');
let pontos = document.querySelectorAll('.ponto');
let intervaloSlide;

function mostrarSlide(n) {
    //remove ativo de todos
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('ativo');
        pontos[i].classList.remove('ativo');
    }
    slideAtual = n;
    if (slideAtual >= slides.length) slideAtual = 0;
    if (slideAtual < 0) slideAtual = slides.length - 1;

    slides[slideAtual].classList.add('ativo');
    pontos[slideAtual].classList.add('ativo');
}
function mudarSlide(direcao) {
    mostrarSlide(slideAtual + direcao);
    reiniciarIntervalo();
}
function irParaSlide(n) {
    mostrarSlide(n);
    reiniciarIntervalo();
}
function reiniciarIntervalo() {
    clearInterval(intervaloSlide);
    intervaloSlide = setInterval(() => {
        mostrarSlide(slideAtual + 1);
    }, 4000);
}

//começa o slideshow automaticamente
intervaloSlide = setInterval(function() {
    mostrarSlide(slideAtual + 1);
}, 4000);

//quiz
        var perguntas = [
            {
                pergunta: "Satélites podem ser usados para monitorar plantações do espaço?",
                opcoes: ["Sim", "Não", "Apenas em países ricos", "Apenas à noite"],
                certa: 0
            },
            {
                pergunta: "O que é um drone na agricultura?",
                opcoes: [
                    "Um trator automático",
                    "Um veículo aéreo não tripulado usado para monitorar lavouras",
                    "Um tipo de adubo",
                    "Um sistema de irrigação"
                ],
                certa: 1
            },
            {
                pergunta: "Para que serve um sensor de umidade do solo?",
                opcoes: ["Medir temperatura do ar", "Detectar chuva", "Medir a quantidade de água no solo", "Contar plantas"],
                certa: 2
            },
            {
                pergunta: "O que é agricultura de precisão?",
                opcoes: [
                    "Plantar com régua",
                    "Usar tecnologia para otimizar o cultivo e reduzir desperdícios",
                    "Colher manualmente",
                    "Usar apenas fertilizantes naturais"
                ],
                certa: 1
            },
            {
                pergunta: "O INPE é um instituto brasileiro voltado para pesquisas em qual área?",
                opcoes: [
                    "Medicina",
                    "Educação",
                    "Pesquisas Espaciais",
                    "Turismo"
                ],
                certa: 2
            },
            {
                pergunta: "Por que satélites são úteis para agricultores?",
                opcoes: [
                    "Para fazer ligações telefônicas",
                    "Para monitorar grandes áreas de terra rapidamente",
                    "Para armazenar sementes",
                    "Para produzir energia solar"
                ],
                certa: 1
            },
            {
                pergunta: "O que o AgroSpace ajuda a detectar nas lavouras?",
                opcoes: [
                    "Previsão de jogos de futebol",
                    "Problemas como seca, pragas e saúde das plantas",
                    "Temperatura de cidades",
                    "Qualidade do asfalto"
                ],
                certa: 1
            },
            {
                pergunta: "O que significa IoT?",
                opcoes: [
                    "Imagens Orbitais Terrestres",
                    "Internet das Coisas",
                    "Irrigação Online Total",
                    "Índice de Oxigênio Total"
                ],
                certa: 1
            },
            {
                pergunta: "Qual ferramenta pode tirar fotos aéreas de uma fazenda?",
                opcoes: ["Microscópio", "Drone", "Termômetro", "Bússola"],
                certa: 1
            },
            {
                pergunta: "O AgroSpace combina dados de satélite com dados de sensores locais para quê?",
                opcoes: [
                    "Criar jogos eletrônicos",
                    "Monitorar e melhorar a saúde das plantações",
                    "Prever terremotos",
                    "Mapear oceanos"
                ],
                certa: 1
            }
        ];

        var pontuacao = 0;
        var perguntaAtual = 0;
        var respondeu = false;

        function carregarPergunta() {
            respondeu = false;
            document.getElementById('btn-proxima').style.display = 'none';
            document.getElementById('feedback-quiz').innerHTML = '';

            var p = perguntas[perguntaAtual];
            document.getElementById('num-pergunta').textContent = perguntaAtual + 1;

            // atualiza barra de progresso
            var porcentagem = ((perguntaAtual) / perguntas.length) * 100;
            document.getElementById('barra-fill').style.width = porcentagem + '%';

            document.getElementById('pergunta-texto').textContent = p.pergunta;

            var area = document.getElementById('opcoes-area');
            area.innerHTML = '';

            for (var i = 0; i < p.opcoes.length; i++) {
                var btn = document.createElement('button');
                btn.textContent = p.opcoes[i];
                btn.className = 'opcao-btn';
                btn.setAttribute('data-index', i);
                btn.onclick = verificarResposta;
                area.appendChild(btn);
            }
        }

        function verificarResposta(e) {
            if (respondeu) return;
            respondeu = true;

            var escolhida = parseInt(e.target.getAttribute('data-index'));
            var certa = perguntas[perguntaAtual].certa;
            var botoes = document.querySelectorAll('.opcao-btn');

            for (var i = 0; i < botoes.length; i++) {
                botoes[i].disabled = true;
                if (i === certa) {
                    botoes[i].classList.add('certa');
                }
            }

            var feedback = document.getElementById('feedback-quiz');

            if (escolhida === certa) {
                pontuacao++;
                e.target.classList.add('certa');
                feedback.innerHTML = '✅ Correto!';
                feedback.style.color = '#2e7d32';
            } else {
                e.target.classList.add('errada');
                feedback.innerHTML = '❌ Errado! A resposta certa era: <strong>' + perguntas[perguntaAtual].opcoes[certa] + '</strong>';
                feedback.style.color = '#c62828';
            }

            document.getElementById('btn-proxima').style.display = 'inline-block';

            if (perguntaAtual === perguntas.length - 1) {
                document.getElementById('btn-proxima').textContent = 'Ver Resultado final';
            }
        }

        function proximaPergunta() {
            perguntaAtual++;
            if (perguntaAtual >= perguntas.length) {
                mostrarResultado();
            } else {
                carregarPergunta();
            }
        }

        function mostrarResultado() {
            document.getElementById('quiz-area').style.display = 'none';
            document.getElementById('resultado-quiz').style.display = 'block';

            document.getElementById('pontuacao-texto').textContent = 'Você acertou ' + pontuacao + ' de ' + perguntas.length + ' perguntas!';

            var msg = '';
            if (pontuacao <= 3) {
                msg = 'Valeu por tentar! Estuda mais sobre tecnologia espacial.';
            } else if (pontuacao <= 6) {
                msg = 'Bom resultado! Você já sabe bastante sobre o assunto.';
            } else if (pontuacao <= 8) {
                msg = 'Muito bom! Você manda bem em tecnologia espacial e agro.';
            } else {
                msg = 'Incrível! Você farma aura em AgroSpace!';
            }

            document.getElementById('mensagem-resultado').textContent = msg;
        }

        function reiniciarQuiz() {
            pontuacao = 0;
            perguntaAtual = 0;
            respondeu = false;
            document.getElementById('quiz-area').style.display = 'block';
            document.getElementById('resultado-quiz').style.display = 'none';
            carregarPergunta();
        }