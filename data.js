const F=['D','I','S','C'];

/* BLOCO A: ordenação forçada, estilo natural (estrutural) */
const GA=[
 {D:'Decidido',I:'Comunicativo',S:'Paciente',C:'Preciso'},
 {D:'Direto',I:'Entusiasmado',S:'Calmo',C:'Cuidadoso'},
 {D:'Competitivo',I:'Persuasivo',S:'Leal',C:'Analítico'},
 {D:'Ousado',I:'Otimista',S:'Tranquilo',C:'Organizado'},
 {D:'Exigente',I:'Expressivo',S:'Compreensivo',C:'Metódico'},
 {D:'Assertivo',I:'Animado',S:'Estável',C:'Criterioso'},
 {D:'Independente',I:'Carismático',S:'Cooperativo',C:'Disciplinado'},
 {D:'Firme',I:'Espontâneo',S:'Gentil',C:'Reservado'},
 {D:'Corajoso',I:'Inspirador',S:'Conciliador',C:'Perfeccionista'},
 {D:'Pioneiro',I:'Influente',S:'Bom ouvinte',C:'Rigoroso'},
 {D:'Objetivo',I:'Encantador',S:'Sereno',C:'Sistemático'},
 {D:'Ambicioso',I:'Popular',S:'Confiável',C:'Cauteloso'},
 {D:'Enérgico',I:'Falante',S:'Acolhedor',C:'Ponderado'},
 {D:'Desafiador',I:'Alegre',S:'Previsível',C:'Questionador'},
 {D:'Resoluto',I:'Convincente',S:'Tolerante',C:'Prudente'},
 {D:'Focado em resultado',I:'Envolvente',S:'Dedicado',C:'Focado em qualidade'},
 {D:'Incansável',I:'Brincalhão',S:'Atento ao outro',C:'Minucioso'},
 {D:'Prático',I:'Caloroso',S:'Pacífico',C:'Correto'},
 {D:'Rápido nas decisões',I:'Bom de papo',S:'Equilibrado',C:'Planejador'},
 {D:'Franco',I:'Confia fácil nas pessoas',S:'Atencioso',C:'Cético'}
];

/* BLOCO B: Mais/Menos sobre o que o ambiente exige (adaptado) */
const GB=[
 {D:'Firme',I:'Sociável',S:'Paciente',C:'Detalhista'},
 {D:'Rápido',I:'Persuasivo',S:'Constante',C:'Exato'},
 {D:'Exigente',I:'Simpático',S:'Calmo',C:'Organizado'},
 {D:'Ousado',I:'Comunicativo',S:'Cooperativo',C:'Cauteloso'},
 {D:'Decidido',I:'Animado',S:'Previsível',C:'Criterioso'},
 {D:'Competitivo',I:'Expressivo',S:'Prestativo',C:'Metódico'},
 {D:'Assertivo',I:'Otimista',S:'Estável',C:'Rigoroso'},
 {D:'Independente',I:'Envolvente',S:'Leal',C:'Disciplinado'},
 {D:'Objetivo',I:'Carismático',S:'Conciliador',C:'Analítico'},
 {D:'Desafiador',I:'Entusiasmado',S:'Sereno',C:'Correto'},
 {D:'Enérgico',I:'Inspirador',S:'Bom ouvinte',C:'Formal'},
 {D:'Taxativo',I:'Convincente',S:'Tolerante',C:'Sistemático'}
];

/* BLOCO C: escala de concordância. r = item invertido. att = item de atenção */
const GC=[
 {f:'D',t:'Quando um projeto trava, sou eu quem toma a frente para destravar.'},
 {f:'S',t:'Prefiro saber com antecedência o que vai acontecer na minha semana.'},
 {f:'I',t:'Faço amizade com facilidade em ambientes novos.'},
 {f:'C',t:'Reviso meu trabalho mais de uma vez antes de entregar.'},
 {f:'D',t:'Prefiro decidir rápido e corrigir no caminho a esperar ter todas as informações.'},
 {f:'I',t:'Em eventos sociais, costumo ficar mais na minha.',r:1},
 {f:'C',t:'Antes de decidir, gosto de levantar dados e comparar alternativas.'},
 {f:'S',t:'Sou a pessoa que os colegas procuram quando precisam ser ouvidos.'},
 {att:4,t:'Para mostrar que está lendo com atenção, marque "Concordo" nesta frase.'},
 {f:'D',t:'Digo o que penso, mesmo quando sei que vai gerar desconforto.'},
 {f:'S',t:'Fico entediado rápido com rotina e preciso de novidade constante.',r:1},
 {f:'I',t:'Penso melhor quando falo em voz alta com outras pessoas.'},
 {f:'C',t:'Regras e processos claros me deixam mais seguro para trabalhar.'},
 {f:'D',t:'Prefiro que outra pessoa assuma a liderança enquanto eu contribuo.',r:1},
 {f:'I',t:'Gosto de apresentar ideias e convencer as pessoas.'},
 {f:'S',t:'Termino o que começo, mesmo quando a tarefa fica repetitiva.'},
 {f:'C',t:'Prefiro improvisar a seguir um plano detalhado.',r:1},
 {f:'D',t:'Metas difíceis me motivam mais do que metas fáceis de bater.'},
 {f:'I',t:'Consigo animar o grupo quando o clima está pesado.'},
 {f:'C',t:'Erros, mesmo pequenos, me incomodam bastante.'},
 {f:'S',t:'Mudanças repentinas me tiram do eixo por um tempo.'},
 {f:'D',t:'Fico incomodado quando alguém controla demais como faço meu trabalho.'},
 {f:'I',t:'Prefiro trabalhar sozinho a passar o dia interagindo com pessoas.',r:1},
 {f:'C',t:'Questiono informações que chegam sem fonte ou sem lógica.'},
 {f:'S',t:'Prefiro manter a harmonia do grupo a ganhar uma discussão.'},
 {att:1,t:'Esta é uma frase de controle. Marque "Discordo totalmente".'},
 {f:'D',t:'Evito confrontos, mesmo quando discordo.',r:1},
 {f:'I',t:'Ser reconhecido publicamente pelo meu trabalho é importante para mim.'},
 {f:'C',t:'Detalhes me cansam. Prefiro olhar o quadro geral.',r:1},
 {f:'S',t:'Trabalho melhor num ritmo constante do que em picos de urgência.'},
 {f:'D',t:'Em uma discussão, defendo minha posição até o fim quando acredito nela.'},
 {f:'I',t:'Me empolgo rápido com ideias novas.'},
 {f:'S',t:'Gosto de mudar de projeto ou de tarefa com frequência.',r:1},
 {f:'C',t:'Prefiro fazer menos coisas, mas bem feitas.'}
];
const LK=['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'];

const INFO={
 D:{nome:'Dominância',foco:'como você lida com problemas, desafios e poder de decisão',cor:'var(--d)',bg:'var(--d-bg)'},
 I:{nome:'Influência',foco:'como você se relaciona, se comunica e influencia pessoas',cor:'var(--i)',bg:'var(--i-bg)'},
 S:{nome:'Estabilidade',foco:'como você responde a ritmo, mudança e rotina',cor:'var(--s)',bg:'var(--s-bg)'},
 C:{nome:'Conformidade',foco:'como você lida com regras, padrões e qualidade',cor:'var(--c)',bg:'var(--c-bg)'}
};

/* Faixas: mA >=80 | A 65-79 | a 51-64 | b 36-50 | B 21-35 | mB <=20 */
const BANDS=[{k:'mA',min:80,l:'Muito alto'},{k:'A',min:65,l:'Alto'},{k:'a',min:51,l:'Levemente acima da média'},{k:'b',min:36,l:'Levemente abaixo da média'},{k:'B',min:21,l:'Baixo'},{k:'mB',min:0,l:'Muito baixo'}];
const FTXT={
 D:{
  mA:'Seu comportamento é guiado quase todo por resultado e senso de urgência. Você toma a frente sem esperar convite, decide rápido mesmo com pouca informação e encara conflito sem hesitar. Prefere autonomia total e se incomoda quando é questionado ou controlado. A franqueza é um ativo, mas pode soar como dureza, principalmente quando a Influência é baixa. Sob pressão, a tendência é partir para o ataque.',
  A:'Você tem perfil empreendedor, gosta de desafio e assume riscos calculados. Busca autonomia e espaço para decidir, coloca ritmo nas pessoas ao redor e fica impaciente quando as coisas andam devagar. É competitivo e costuma se sair bem em negociações e em situações que pedem posicionamento firme.',
  a:'Você se posiciona quando é necessário e assume a frente em temas que domina, mas não precisa estar no comando o tempo todo. A forma como essa assertividade aparece depende bastante do peso dos seus outros fatores.',
  b:'Você tende a ser mais cooperativo do que competitivo e prefere construir decisões em conjunto. Sabe se posicionar quando o tema é importante para você, mas evita disputas que considera desnecessárias.',
  B:'Você prefere ambientes de colaboração a ambientes de disputa. Pondera antes de agir, evita confronto direto e se sente mais confortável quando os objetivos são definidos em conjunto. Costuma ser visto como alguém conciliador e de fácil convivência.',
  mB:'Você evita riscos e conflitos e prefere que decisões importantes sejam compartilhadas ou tomadas por outras pessoas. É modesto quanto às próprias conquistas e raramente impõe sua vontade. Em ambientes muito competitivos, pode se sentir desconfortável ou ter as ideias pouco ouvidas.'},
 I:{
  mA:'Você é movido por pessoas, conversa e reconhecimento. Comunica com energia, convence com facilidade e cria vínculos rapidamente. Pensa em voz alta e se entusiasma com ideias novas. O ponto de atenção é a dispersão: compromissos, detalhes e acompanhamento podem ficar para trás quando a empolgação passa.',
  A:'Você é sociável, otimista e persuasivo. Gosta de trabalhar com gente, de apresentar ideias e de ver o grupo engajado. Costuma ser percebido como uma presença leve e motivadora, e rende menos em funções muito isoladas ou repetitivas.',
  a:'Você se relaciona bem e sabe ser comunicativo quando o momento pede, mas também consegue se concentrar em tarefas individuais. A abertura varia conforme o ambiente e as pessoas envolvidas.',
  b:'Você tende a ser mais comedido e reflexivo no contato social. É cordial, mas escolhe onde investe energia de relacionamento e prefere conversas objetivas a interações longas.',
  B:'Você é reservado, prefere fatos a entusiasmo e se convence por argumentos concretos. Mantém a comunicação no nível necessário e valoriza sua privacidade. Pode ser percebido como distante por quem ainda não te conhece bem.',
  mB:'Você é bastante introspectivo e cético diante de discursos entusiasmados. Prefere trabalhar com autonomia ou em grupos pequenos e de confiança. A comunicação econômica dá foco e objetividade, mas pode dificultar a construção de rede e a percepção de calor humano.'},
 S:{
  mA:'Você valoriza segurança, rotina e previsibilidade acima de quase tudo. É muito paciente, leal e constante, e as pessoas confiam em você para manter as coisas funcionando. Mudanças repentinas pedem tempo de adaptação e confronto é algo que você evita ao máximo.',
  A:'Você é calmo, cooperativo e bom ouvinte. Trabalha bem em ritmo constante, termina o que começa e apoia o time sem alarde. Prefere mudanças planejadas e explicadas, e costuma ser o ponto de equilíbrio do grupo.',
  a:'Você aprecia algum grau de previsibilidade e harmonia, mas se adapta a mudanças quando entende o motivo. Combina constância com uma flexibilidade razoável.',
  b:'Você tende a ser mais ativo do que passivo e prefere alguma variedade nas tarefas. Lida com mudanças sem grande desconforto, embora não busque instabilidade por si só.',
  B:'Você é inquieto, tem senso de urgência constante e prefere diversidade de tarefas. Muda de direção rápido e se entedia com rotina. Pode demonstrar impaciência com pessoas e processos mais lentos.',
  mB:'Você vive em ritmo acelerado, busca novidade o tempo todo e tem pouca tolerância à espera e à repetição. Vai muito bem em ambientes de transformação e crise, mas pode ter dificuldade em sustentar rotinas e dar continuidade a projetos longos.'},
 C:{
  mA:'Você é guiado por precisão, padrões e lógica. Analisa a fundo antes de decidir, verifica tudo mais de uma vez e se incomoda muito com erro e improviso. Esse rigor garante qualidade, mas pode levar ao perfeccionismo e à demora em decidir quando falta informação.',
  A:'Você é criterioso, organizado e orientado a qualidade. Gosta de entender as regras e os porquês, prefere decisões baseadas em dados e tende a ser diplomático e cuidadoso ao se expressar.',
  a:'Você tem um comportamento sóbrio e cuidadoso, segue as regras que fazem sentido e mantém um olhar crítico sobre a qualidade do que faz, sem travar o andamento.',
  b:'Você se preocupa com a qualidade, mas aceita entregar algo bom o suficiente quando o prazo pede. Tende a questionar regras que considera desnecessárias.',
  B:'Você é independente em relação a normas e procedimentos, lida bem com ambiguidade e improvisa com facilidade. Prefere o quadro geral aos detalhes e pode subestimar riscos ou pular etapas.',
  mB:'Você tem forte aversão a controles, burocracia e regras rígidas. Age por instinto, assume riscos e se sente livre para criar o próprio caminho. Precisa de alguém ou de algum sistema que cuide de detalhes, prazos formais e verificações.'}
};

/* Subfatores: 50 + (X - Y) / 2, calculados sobre o gráfico Estrutural */
const SUB=[
 {n:'Determinação',x:'D',y:'I',def:'Buscar resultados de forma objetiva, mesmo quando isso exige priorizar a tarefa sobre as relações.',
  a:'Você persegue objetivos com intensidade e pragmatismo. Quando precisa escolher, tende a colocar o resultado à frente de aspectos pessoais ou sociais.',
  m:'Você equilibra foco em resultado e atenção às pessoas. Consegue ser objetivo sem desconsiderar o impacto das decisões nos outros.',
  b:'Você dá peso grande às relações e ao clima na hora de decidir. Prefere construir consenso a impor o caminho, mesmo que isso leve mais tempo.',
  q:['Quando foi a última vez que você tomou uma decisão impopular? O que pesou mais na sua escolha?','Em que situação você priorizou o resultado e depois percebeu um custo nas relações? O que faria diferente?','Como você age quando precisa comunicar algo difícil para alguém de quem gosta?']},
 {n:'Automotivação',x:'D',y:'S',def:'Energia para agir por conta própria, com senso de urgência e disposição para correr riscos.',
  a:'Você é ativo e se move rápido diante de novos acontecimentos. Fixa metas e vai atrás delas sem precisar de estímulo externo, mas pode ser impaciente com quem não acompanha seu ritmo.',
  m:'Você tem iniciativa, mas também sabe esperar o momento certo. Alterna entre agir rápido e dar tempo às coisas, dependendo do contexto.',
  b:'Você prefere estabilidade e segurança antes de agir. Rende melhor quando os objetivos estão claros e o ritmo é sustentável.',
  q:['Quais são suas metas para os próximos 12 meses e o que você já está fazendo de concreto por elas?','Lembre de uma situação em que você agiu sozinho, sem apoio. O que isso revelou sobre você?','Em que momentos a sua pressa já te prejudicou?']},
 {n:'Independência',x:'D',y:'C',def:'Preferência por seguir as próprias ideias, com pouca necessidade de regras ou aprovação.',
  a:'Você se sente limitado por normas e procedimentos e prefere liberdade para agir do seu jeito. Tem traços pioneiros e confia muito nas próprias escolhas.',
  m:'Você segue regras quando elas fazem sentido, mas não hesita em propor outro caminho quando acredita que existe uma forma melhor.',
  b:'Você valoriza diretrizes claras e se sente mais seguro quando há padrões definidos e validação antes de agir.',
  q:['Em que situação você abriu um caminho que ninguém tinha tentado?','Qual foi a decisão mais arriscada que você já tomou? Como chegou nela?','Que regra do seu dia a dia mais te incomoda? Ela existe por um bom motivo?']},
 {n:'Sociabilidade',x:'I',y:'D',def:'Facilidade de se relacionar e de colocar as pessoas no centro das decisões.',
  a:'Você é caloroso, conversa com facilidade e considera muito o lado humano das situações. Pode se distrair com oportunidades de interação e ter dificuldade em ser duro quando necessário.',
  m:'Você é amigável e acessível, mas sabe manter o foco na tarefa quando o momento exige.',
  b:'Você tem uma visão mais objetiva e pragmática dos fatos. Usa eficiência como critério principal e mantém a comunicação no necessário, o que pode soar distante para algumas pessoas.',
  q:['Como você costuma dar um feedback crítico? Como a pessoa reagiu da última vez?','Lembre de um problema que você resolveu melhor porque consultou outras pessoas.','O que você faz, na prática, para cuidar da sua rede de relacionamentos?']},
 {n:'Entusiasmo',x:'I',y:'S',def:'Energia expressiva e otimista, capaz de engajar e motivar outras pessoas.',
  a:'Você transmite energia e otimismo, inspira e engaja os outros nos seus projetos. Em excesso, pode ser impetuoso e deixar de lado cuidados importantes.',
  m:'Você demonstra entusiasmo quando acredita na ideia, mas tende a ser mais contido em situações novas ou incertas.',
  b:'Você é mais sereno e comedido na expressão. Transmite segurança pela calma, não pela empolgação.',
  q:['Quando foi a última vez que você vendeu uma ideia para alguém? O que funcionou?','Como você mantém o otimismo diante de uma situação complicada?','Qual projeto mais te empolgou? Como você contagiou as pessoas com ele?']},
 {n:'Autoconfiança',x:'I',y:'C',def:'Conforto em situações sociais e disposição para opinar mesmo sem ter todas as informações.',
  a:'Você se sente à vontade em praticamente qualquer situação social, inicia contatos com facilidade e opina sem receio. Às vezes a confiança pode levar a agir por impulso.',
  m:'Sua autoconfiança varia com o contexto. Em situações de menor risco você age rápido. Em outras, prefere checar detalhes antes de se expor.',
  b:'Você prefere se preparar bem antes de se expor e só opina quando tem segurança sobre o assunto. Isso dá consistência, mas pode fazer você se calar quando tinha algo valioso a dizer.',
  q:['Lembre de uma vez em que você tomou a iniciativa de abrir um contato importante.','Como você reagiu da última vez que apresentou algo para um público difícil?','Em que situação você deixou de falar por insegurança e depois se arrependeu?']},
 {n:'Paciência',x:'S',y:'D',def:'Manter ritmo, organização e calma, inclusive em tarefas repetitivas.',
  a:'Você tem pouca pressa, mantém tudo organizado e evita conflitos. Precisa de segurança para decidir e lida bem com espera e repetição.',
  m:'Você sabe esperar quando necessário, mas também se mobiliza quando há urgência real.',
  b:'Você é direto, impetuoso e não gosta de perder tempo. Tende a agir antes de ter todas as respostas e pode deixar a diplomacia de lado.',
  q:['Lembre de uma situação em que esperar foi melhor do que agir. Como foi para você?','Numa conversa recente, você conseguiu ouvir até o fim antes de colocar sua ideia?','O que costuma acabar com a sua paciência? Isso diz algo sobre suas prioridades?']},
 {n:'Consideração',x:'S',y:'I',def:'Ponderar antes de agir, com atenção ao efeito das palavras e ações nas pessoas.',
  a:'Você planeja o que diz e faz, raramente age por impulso e traz confiabilidade ao grupo. Pode ter dificuldade com prazos muito apertados.',
  m:'Você pondera nas decisões importantes, mas age rápido no dia a dia quando o impacto é menor.',
  b:'Você parte para a ação de forma prática e rápida, dando menos atenção ao efeito das palavras quando julga que algo precisa ser dito.',
  q:['Quando você precisou medir muito bem as palavras numa comunicação? Qual foi o resultado?','Na sua apresentação mais importante, o que mudou do primeiro rascunho para a versão final?','Lembre de uma vez em que você precisou conter o entusiasmo antes de divulgar algo.']},
 {n:'Persistência',x:'S',y:'C',def:'Manter o foco e dar continuidade às tarefas até o fim.',
  a:'Você sustenta tarefas longas e repetitivas, é leal ao que construiu e resiste a mudar o que está funcionando.',
  m:'Você persiste quando acredita no caminho, mas aceita mudar de abordagem quando os resultados não aparecem.',
  b:'Você é dinâmico e mutável. Se algo não funciona, tenta outro caminho rapidamente e tem pouca paciência para manter as mesmas práticas.',
  q:['Em que situação você manteve o mesmo processo até dar certo, mesmo com pressão para mudar?','Qual objetivo você quase abandonou? O que fez você continuar ou desistir?','Que tipo de tarefa você costuma deixar pela metade?']},
 {n:'Conexão com normas',x:'C',y:'D',def:'Necessidade de se apoiar em regras, fatos e no aval de outras pessoas antes de agir.',
  a:'Você se sente mais seguro quando segue procedimentos estabelecidos e tem apoio de líderes e colegas para decidir. Cuida de manter relações positivas no trabalho.',
  m:'Você respeita normas e consulta pessoas em decisões relevantes, mas também age por conta própria quando necessário.',
  b:'Você age de forma independente, guiado mais pelos próprios instintos do que por normas. Raramente pede aval e pode parecer muito autossuficiente.',
  q:['Como você se sentiu da última vez que precisou seguir regras muito rígidas?','Quando foi a última vez que você pediu ajuda ou validação antes de agir?','Em que situação seu resultado dependia de outra área? Como você articulou isso?']},
 {n:'Exatidão',x:'C',y:'I',def:'Cautela para evitar erros e riscos desnecessários, com tendência ao perfeccionismo.',
  a:'Você verifica o trabalho várias vezes, fica abatido com erros e raramente corre riscos. Comunica-se com cautela e revela pouco de si.',
  m:'Você toma os cuidados necessários, mas evita exagerar na meticulosidade quando o prazo pede entrega.',
  b:'Você prioriza agilidade e relacionamento sobre a checagem minuciosa. Pode deixar passar detalhes ou erros pequenos.',
  q:['Lembre de uma situação em que você precisou agir com muita cautela. Como fez?','Como você organiza o registro das suas atividades? Qual nível de detalhe usa?','Qual foi o último erro seu que te incomodou de verdade? Por quê?']},
 {n:'Perceptividade',x:'C',y:'S',def:'Notar detalhes e variações sutis no ambiente.',
  a:'Você percebe sutilezas que passam despercebidas pela maioria e tem pouca tolerância ao tédio. Essa atenção pode, às vezes, dispersar seu foco.',
  m:'Você nota detalhes relevantes sem se perder neles, mantendo o foco no que é prioritário.',
  b:'Você se concentra no que está à sua frente e mantém o foco, mesmo que deixe passar algumas mudanças sutis no ambiente.',
  q:['Lembre de uma vez em que só você percebeu um erro. Como os outros reagiram?','Ao voltar a um lugar ou cliente, que mudanças costumam chamar sua atenção?','Que detalhe você percebeu num projeto que mudou a forma de abordá-lo?']}
];

/* 24 talentos: perfil-alvo D,I,S,C */
const TAL=[
 {n:'Comandante',v:[92,40,15,35],d:'Lidera de forma direta, assume o controle em situações críticas e cobra resultado sem rodeios. Se sente em casa quando precisa virar um jogo difícil, reorganizar uma operação ou tomar decisões que ninguém quer tomar.'},
 {n:'Desbravador',v:[85,62,20,28],d:'Abre caminhos novos, gosta de começar coisas e de entrar em território desconhecido. Tem energia para convencer pessoas a embarcar na ideia e pouca paciência para manutenção e rotina.'},
 {n:'Empreendedor',v:[82,76,20,35],d:'Une ambição e poder de convencimento. Enxerga oportunidades, vende a visão e coloca as coisas em movimento rápido. Precisa de alguém por perto que cuide de detalhes e continuidade.'},
 {n:'Competidor',v:[90,55,25,45],d:'É movido pela vontade de vencer e pelos números. Gosta de metas claras, de comparação e de ritmo intenso. Vai muito bem em negociação e em ambientes onde a performance é visível.'},
 {n:'Realizador',v:[80,35,28,60],d:'Combina foco em resultado com padrão de qualidade. Entrega o que promete, com critério, e se incomoda tanto com lentidão quanto com trabalho mal feito.'},
 {n:'Estrategista',v:[74,30,30,76],d:'Pensa antes, decide com firmeza e executa com lógica. Gosta de problemas complexos, de planejar a jogada e de defender suas conclusões com argumentos sólidos.'},
 {n:'Inspirador',v:[40,92,30,25],d:'Contagia pelo entusiasmo e pela capacidade de fazer as pessoas acreditarem. Brilha em palcos, lançamentos e momentos que pedem energia coletiva.'},
 {n:'Persuasor',v:[70,86,20,30],d:'Convence com facilidade e não tem medo de pedir o fechamento. Mistura relacionamento com objetividade, o que o torna muito eficaz em vendas, negociação e articulação.'},
 {n:'Conector',v:[30,86,65,25],d:'Constrói e mantém redes de relacionamento com naturalidade. Une pessoas, faz apresentações certas e cria um ambiente de confiança ao redor.'},
 {n:'Animador',v:[45,90,40,15],d:'Traz leveza, humor e espontaneidade para o grupo. Quebra o gelo, levanta o clima e mantém o time engajado, mas precisa de estrutura para não se dispersar.'},
 {n:'Comunicador criterioso',v:[35,80,35,66],d:'Gosta de pessoas e de qualidade. Prepara bem o que vai dizer, cuida da imagem do trabalho e comunica temas complexos de forma clara e agradável.'},
 {n:'Mentor',v:[25,76,75,45],d:'Desenvolve pessoas com paciência e calor humano. Escuta, orienta e celebra a evolução dos outros. É procurado como conselheiro dentro do grupo.'},
 {n:'Apoiador',v:[20,45,90,45],d:'É a base confiável do time. Ajuda sem esperar retorno, mantém a constância e garante que as coisas continuem funcionando no dia a dia.'},
 {n:'Mediador',v:[25,70,82,30],d:'Resolve tensões, aproxima lados diferentes e cuida do clima. Prefere acordos a vitórias e tem facilidade para enxergar o ponto de vista do outro.'},
 {n:'Acolhedor',v:[15,62,88,50],d:'Cria um ambiente seguro para as pessoas. É gentil, atencioso e muito leal, com forte senso de cuidado com quem está ao redor.'},
 {n:'Executor confiável',v:[60,35,80,50],d:'Entrega com regularidade e firmeza. Protege o time, cumpre combinados e se posiciona quando algo ameaça a equipe ou a qualidade do trabalho.'},
 {n:'Guardião',v:[25,30,85,72],d:'Preserva processos, padrões e a memória da organização. É metódico, estável e muito confiável em funções que pedem continuidade e rigor.'},
 {n:'Sustentador',v:[45,50,80,55],d:'Mantém o equilíbrio entre as demandas de pessoas e de processo. É versátil, calmo e segura a operação em fases longas e exigentes.'},
 {n:'Analista',v:[30,25,45,92],d:'Mergulha nos dados, busca a causa raiz e só conclui com evidência. Traz profundidade e precisão para decisões importantes.'},
 {n:'Verificador',v:[40,20,58,88],d:'Encontra o erro que ninguém viu. Revisa, testa e garante conformidade com padrões, sendo essencial em funções de controle e qualidade.'},
 {n:'Especialista',v:[25,35,66,85],d:'Domina profundamente um assunto e é a referência técnica do grupo. Prefere aperfeiçoar o que sabe a trocar de área com frequência.'},
 {n:'Engenheiro de soluções',v:[70,30,25,82],d:'Resolve problemas complexos com lógica e determinação. Questiona premissas, desenha sistemas melhores e defende tecnicamente suas escolhas.'},
 {n:'Consultor',v:[30,66,40,80],d:'Une conhecimento técnico e boa comunicação. Diagnostica com cuidado e explica de um jeito que as pessoas entendem e aceitam.'},
 {n:'Organizador',v:[45,40,60,80],d:'Estrutura rotinas, processos e cronogramas. Transforma bagunça em método e garante que o planejado aconteça no prazo.'}
];

const PROF={
 D:{titulo:'Executor',
  resumo:'é movido a resultado e se sente mais vivo quando tem um desafio pela frente. Decide rápido, fala de forma direta e não costuma esperar que os outros resolvam o que pode resolver sozinho. Em situações de crise, tende a ser quem assume a direção.',
  motivacao:'Desafio é o seu combustível. Você se motiva com metas ambiciosas, com a chance de vencer e com a liberdade para decidir como chegar lá. Ver o resultado acontecendo, e ser reconhecido pela conquista, renova sua energia para buscar o próximo objetivo, ainda mais difícil.',
  gestao:'Você rende mais com uma liderança que dê autonomia de verdade, desafios contínuos e variedade de projetos. O gestor ideal é objetivo, decide rápido, cobra por resultado e não por cada passo, e topa debater de igual para igual. Aprovações lentas e microgestão drenam sua motivação.',
  comunica:'Sua comunicação é direta, curta e orientada para a ação. Você vai ao ponto, faz perguntas incisivas e expressa discordância sem rodeios. Funciona bem para destravar decisões, mas pode intimidar pessoas mais sensíveis ou dar a impressão de pouca escuta.',
  fortes:['Toma decisões rápidas, mesmo com informação incompleta','Assume responsabilidade e puxa a frente em momentos difíceis','Foco forte em meta, prazo e resultado','Encara conflito e conversa difícil sem fugir','Enxerga oportunidades e corre riscos calculados','Mantém o ritmo e a energia do time alto'],
  atencao:['Pode soar impaciente ou ríspido sem perceber','Tende a atropelar processos e pessoas mais lentas','Escuta pouco quando já formou opinião','Delega a tarefa, mas às vezes não delega a autoridade','Pode decidir rápido demais em temas que pediam análise'],
  amb:'Ambientes dinâmicos, com metas claras, liberdade para agir e pouca burocracia.',
  medo:'Perder o controle da situação, ser passado para trás ou ver alguém se aproveitar de uma fraqueza sua.',
  dec:'Rápida e baseada em impacto. Prefere errar agindo a acertar tarde.',
  press:'Sob pressão, tende a ficar mais autoritário, centralizar decisões e cobrar de forma mais dura. A paciência cai e a comunicação fica curta.',
  comSim:['Vá direto ao ponto e comece pela conclusão','Fale de resultado, prazo e impacto','Apresente opções e deixe a decisão com a pessoa','Seja objetivo e seguro, inclusive para discordar','Cumpra o que prometeu, no prazo'],
  comNao:['Rodeios e excesso de detalhe antes do ponto principal','Tom inseguro ou indeciso','Tirar autonomia ou controlar cada passo','Levar a discordância para o lado pessoal'],
  dev:['Contar até três antes de responder em temas sensíveis','Perguntar mais e afirmar menos nas reuniões','Reconhecer o esforço das pessoas, não só a entrega','Separar o que é urgente do que só parece urgente','Dar tempo a quem precisa de mais informação para decidir']},
 I:{titulo:'Influenciador',
  resumo:'se conecta com as pessoas com facilidade, comunica com energia e tem o dom de engajar o grupo numa ideia. É otimista, criativo e rende mais em ambientes com troca, conversa e reconhecimento. Costuma ser quem quebra o gelo e anima o time.',
  motivacao:'Você se motiva com pessoas, reconhecimento e novidade. Ambientes com troca, projetos criativos e a chance de influenciar decisões te energizam. Ser visto e valorizado publicamente faz diferença real no seu engajamento.',
  gestao:'Você rende mais com uma liderança próxima, acessível e entusiasmada, que dê espaço para ideias e reconheça suas contribuições. Ajuda ter um gestor que traduza o entusiasmo em prioridades claras e acompanhe os compromissos sem engessar. Ambientes frios e formais demais reduzem sua energia.',
  comunica:'Sua comunicação é expressiva, calorosa e cheia de histórias. Você conecta rápido, usa exemplos e emoção para convencer e costuma deixar o ambiente mais leve. O cuidado é não perder a objetividade nem prometer mais do que dá para entregar.',
  fortes:['Cria rapport e confiança rapidamente','Comunica ideias com entusiasmo e poder de convencimento','Motiva e engaja o time','Gera ideias e enxerga possibilidades','Constrói rede de contatos com naturalidade','Mantém o clima leve, mesmo em momentos tensos'],
  atencao:['Pode prometer mais do que consegue entregar','Perde o interesse quando a tarefa fica repetitiva','Tende a deixar detalhes e acompanhamento para depois','Às vezes fala mais do que escuta','Pode decidir pela emoção ou pela empolgação do momento'],
  amb:'Ambientes colaborativos, informais, com espaço para ideias, interação constante e pouca rotina.',
  medo:'Rejeição, perda de prestígio ou ser ignorado pelo grupo.',
  dec:'Intuitiva e influenciada pelo impacto nas pessoas. Gosta de ouvir opiniões antes de fechar.',
  press:'Sob pressão, tende a ficar desorganizado, falar demais ou reagir de forma emocional. Pode evitar a conversa difícil ou tentar resolver tudo no carisma.',
  comSim:['Comece com uma conversa leve antes do assunto','Dê espaço para a pessoa falar e trazer ideias','Reconheça as contribuições em público','Mostre o lado inspirador e o impacto nas pessoas','Combine o próximo passo por escrito no final'],
  comNao:['Ser frio, seco ou impessoal demais','Excesso de dados sem contexto','Críticas na frente dos outros','Ignorar o entusiasmo da pessoa'],
  dev:['Anotar compromissos e revisar no fim do dia','Dizer não a algumas demandas para cumprir as que importam','Checar fatos antes de comunicar','Escutar até o fim antes de responder','Fechar o que começou antes de partir para a próxima ideia']},
 S:{titulo:'Estabilizador',
  resumo:'é constante, paciente e confiável. As pessoas sabem que podem contar com você. Valoriza harmonia, trabalha bem em equipe e prefere um ritmo previsível. Costuma ser o ponto de equilíbrio do time e quem segura a operação funcionando.',
  motivacao:'Você se motiva com segurança, pertencimento e a sensação de contribuir de verdade para o grupo. Relações de confiança, clareza sobre o que se espera de você e reconhecimento pela constância são o que te mantém engajado ao longo do tempo.',
  gestao:'Você rende mais com uma liderança estável, cordial e coerente, que explique o porquê das mudanças e dê tempo para adaptação. Ajuda ter papéis claros, combinados cumpridos e espaço para dar opinião em particular. Pressão constante e mudanças sem aviso geram desgaste silencioso.',
  comunica:'Sua comunicação é calma, atenciosa e mais voltada para ouvir do que para falar. Você transmite segurança e acolhimento. O cuidado é não guardar discordâncias e não deixar que o silêncio seja interpretado como concordância.',
  fortes:['Confiável e consistente no que entrega','Escuta de verdade e acolhe as pessoas','Excelente para trabalho em equipe','Mantém a calma em situações tensas','Leal à equipe e à empresa','Persistente em tarefas longas e detalhadas'],
  atencao:['Resiste a mudanças, principalmente as repentinas','Evita conflito, mesmo quando ele é necessário','Tem dificuldade de dizer não','Pode guardar insatisfação até ela virar problema','Demora a decidir quando a decisão afeta pessoas'],
  amb:'Ambientes estáveis, cooperativos e organizados, com papéis claros e ritmo sustentável.',
  medo:'Perder a segurança, mudanças bruscas sem explicação e conflitos que quebrem a harmonia do grupo.',
  dec:'Cuidadosa e consultiva. Considera o impacto nas pessoas e prefere consenso.',
  press:'Sob pressão, tende a ceder para evitar conflito, se fechar e ficar em silêncio. Pode concordar por fora e discordar por dentro.',
  comSim:['Seja cordial e mostre interesse genuíno','Explique o porquê e dê tempo para assimilar mudanças','Pergunte a opinião diretamente, em particular','Mostre o passo a passo e o que muda na rotina','Reconheça a constância e a lealdade'],
  comNao:['Mudanças de última hora sem contexto','Pressionar por resposta imediata','Tom agressivo ou impaciente','Interpretar o silêncio como concordância'],
  dev:['Falar sobre incômodos assim que surgem, sem esperar acumular','Treinar dizer não com gentileza','Encarar mudanças como experimentos de curto prazo','Expor opiniões em reunião, mesmo que divergentes','Assumir protagonismo em projetos que domina']},
 C:{titulo:'Analista',
  resumo:'valoriza qualidade, precisão e lógica. Gosta de entender as coisas a fundo antes de agir, segue padrões e se preocupa em fazer certo. É quem encontra o erro que ninguém viu e quem faz a pergunta que os outros esqueceram.',
  motivacao:'Você se motiva com a excelência do trabalho bem feito, com problemas que exigem raciocínio e com a segurança de ter as informações certas. Ser reconhecido pela competência e pela qualidade vale mais do que elogios genéricos.',
  gestao:'Você rende mais com uma liderança organizada e coerente, que defina expectativas e critérios com clareza, respeite seu tempo de análise e dê feedback baseado em fatos. Mudanças sem lógica, informação vaga e cobranças imprevisíveis geram muito desconforto.',
  comunica:'Sua comunicação é precisa, estruturada e baseada em fatos. Você pensa antes de falar, escolhe as palavras com cuidado e prefere a forma escrita para temas importantes. O cuidado é não soar frio ou crítico demais, nem exigir detalhes de quem só precisa do essencial.',
  fortes:['Alto padrão de qualidade e atenção ao detalhe','Pensamento analítico e lógico','Planejamento e organização','Decisões baseadas em dados','Identifica riscos e falhas antes que aconteçam','Diplomático e cuidadoso na forma de comunicar'],
  atencao:['Pode travar em busca da perfeição','Demora a decidir quando falta informação','Tende a ser crítico demais consigo e com os outros','Pode parecer distante ou frio','Tem dificuldade com ambiguidade e mudanças sem lógica'],
  amb:'Ambientes organizados, com processos claros, padrões de qualidade definidos e espaço para trabalho focado.',
  medo:'Errar, ser criticado pelo próprio trabalho ou ser pego desprevenido, sem informação.',
  dec:'Analítica e baseada em critérios. Precisa de tempo e dados para se sentir seguro.',
  press:'Sob pressão, tende a se fechar, ficar mais crítico e defensivo e se apegar a regras e procedimentos. Pode pedir cada vez mais informação antes de agir.',
  comSim:['Chegue preparado, com dados e fatos','Seja claro, lógico e organizado','Dê tempo para análise antes da decisão','Coloque expectativas e critérios por escrito','Responda as perguntas com calma'],
  comNao:['Informação vaga, imprecisa ou sem fonte','Pressionar por decisão sem dados','Excesso de informalidade ou exagero emocional','Criticar o trabalho sem argumento concreto'],
  dev:['Definir o que é bom o suficiente antes de começar','Decidir com 80% da informação quando o prazo pede','Compartilhar ideias ainda em rascunho','Dar feedback positivo, não só apontar falhas','Investir em conversas informais com o time']}
};

const COMBO={
 DI:{t:'Empreendedor',x:'A combinação de Dominância com Influência cria alguém que decide rápido e ainda consegue levar as pessoas junto. Há visão, energia e poder de convencimento. O ponto de atenção é a pressa: o entusiasmo e a vontade de ver acontecer podem atropelar detalhes e quem precisa de mais tempo.'},
 DS:{t:'Realizador persistente',x:'Dominância com Estabilidade é uma combinação menos comum. Há foco em resultado com constância: vai até o fim e não desiste fácil. Tende a ser firme nos objetivos e leal às pessoas, e pode oscilar entre agir rápido e resistir a mudanças que não foram ideia sua.'},
 DC:{t:'Estrategista',x:'Dominância com Conformidade une foco em resultado com exigência de qualidade. Decide com firmeza, mas apoiado em lógica e critério. Tende a ser exigente consigo e com os outros e vai muito bem com problemas complexos. O cuidado é não soar frio ou crítico demais.'},
 ID:{t:'Mobilizador',x:'Influência com Dominância forma alguém persuasivo e com iniciativa. Inspira, convence e também cobra resultado. Funciona muito bem em vendas, liderança de projetos e frentes que precisam de energia. Atenção ao otimismo nos prazos e ao acompanhamento.'},
 IS:{t:'Conselheiro',x:'Influência com Estabilidade cria alguém caloroso, acolhedor e muito bom com pessoas. Constrói relações duradouras, escuta e anima o grupo ao mesmo tempo. Tende a evitar conflitos e a priorizar o clima. O desafio é ser mais firme quando a situação exige.'},
 IC:{t:'Comunicador criterioso',x:'Influência com Conformidade é a mistura de quem gosta de pessoas mas também preza a qualidade. Comunica bem e com cuidado, prepara o que vai dizer e se preocupa com a imagem do trabalho. Pode sentir tensão entre a vontade de agradar e a exigência de fazer certo.'},
 SD:{t:'Executor confiável',x:'Estabilidade com Dominância forma alguém constante que também sabe se posicionar. Entrega com regularidade, protege o time e é firme quando valores ou equipe são ameaçados. Prefere mudanças planejadas, mas age com decisão quando necessário.'},
 SI:{t:'Facilitador',x:'Estabilidade com Influência resulta em alguém paciente, simpático e excelente em apoiar pessoas. Cria um ambiente acolhedor, ouve bem e mantém o time unido. O ponto de atenção é a dificuldade com confronto e a tendência a dizer sim para tudo.'},
 SC:{t:'Especialista estável',x:'Estabilidade com Conformidade forma alguém metódico, cuidadoso e muito confiável. Segue processos, entrega com qualidade e mantém a constância. Prefere ambientes previsíveis e regras claras. O desafio é lidar com mudanças rápidas e se expor mais.'},
 CD:{t:'Analista decidido',x:'Conformidade com Dominância une análise rigorosa e firmeza. Estuda, entende e então defende a posição com convicção. Tem alto padrão de exigência e foco em fazer certo. Pode ser visto como inflexível quando está seguro de que tem razão.'},
 CI:{t:'Avaliador',x:'Conformidade com Influência cria alguém analítico que também sabe se comunicar. Pensa com lógica e apresenta conclusões de forma clara e agradável. Busca qualidade e reconhecimento pelo trabalho bem feito, e pode ficar dividido entre a precisão e a vontade de agradar.'},
 CS:{t:'Perfeccionista sereno',x:'Conformidade com Estabilidade forma alguém preciso, calmo e muito consistente. Trabalha com método, cuida dos detalhes e mantém a qualidade ao longo do tempo. O cuidado é não se fechar demais e não travar diante de mudanças.'}
};

const REL={
 D:{D:'Respeito mútuo pela objetividade, mas risco de disputa por controle. Combinem papéis e quem decide o quê.',I:'Boa energia e velocidade juntos. Você traz foco, o I traz engajamento. Cuide para não cortar o entusiasmo dele.',S:'O S complementa sua velocidade com constância. Explique mudanças com antecedência e baixe o tom.',C:'O C traz a qualidade que você às vezes pula. Dê tempo e dados, e ele vai segurar a execução.'},
 I:{D:'O D traz o foco que equilibra suas ideias. Seja objetivo com ele e vá ao ponto.',I:'Muita energia e criatividade, pouca organização. Definam quem cuida do acompanhamento.',S:'Relação calorosa e harmoniosa. Você traz energia, o S traz constância. Respeite o ritmo dele.',C:'Estilos opostos. O C pode achar você pouco preciso. Leve dados e cumpra os detalhes combinados.'},
 S:{D:'O D pode parecer brusco, mas costuma ser só direto. Coloque suas opiniões com clareza, ele respeita isso.',I:'Parceria leve e agradável. Ajude o I a manter o foco e a cumprir compromissos.',S:'Muita harmonia e confiança, mas risco de evitar decisões difíceis. Alguém precisa puxar a frente.',C:'Combinação estável e organizada. Funciona muito bem em processos e entregas de qualidade.'},
 C:{D:'O D quer velocidade, você quer precisão. Mostre os riscos de forma objetiva e aceite decidir com informação suficiente.',I:'O I traz leveza e conexão com pessoas. Releve a informalidade e aproveite a comunicação dele.',S:'Parceria tranquila e consistente. Os dois valorizam método e previsibilidade.',C:'Alto padrão de qualidade, mas risco de análise sem fim. Combinem prazos de decisão.'}
};

const CHG={
 D:{up:'Você está ampliando a Dominância. O ambiente pede mais firmeza, decisão e posicionamento do que você mostraria naturalmente.',dn:'Você está contendo a Dominância. Está segurando a assertividade natural, talvez para se encaixar num ambiente mais colaborativo ou hierárquico.'},
 I:{up:'Você está ampliando a Influência. O ambiente pede mais comunicação, exposição e relacionamento do que o seu padrão natural.',dn:'Você está contendo a Influência. Está mais reservado socialmente do que seria se estivesse totalmente à vontade.'},
 S:{up:'Você está ampliando a Estabilidade. O ambiente pede mais paciência, constância e cooperação do que o seu ritmo natural.',dn:'Você está contendo a Estabilidade. O ambiente pede mais velocidade e flexibilidade do que o seu ritmo natural.'},
 C:{up:'Você está ampliando a Conformidade. O ambiente pede mais rigor, regras e atenção a detalhes do que o seu padrão natural.',dn:'Você está contendo a Conformidade. O ambiente pede mais agilidade e improviso do que o seu padrão natural de cuidado.'}
};

const GRAPHS={
 estr:{n:'Estrutural',d:'Representa a sua essência: o estilo que aparece quando você está à vontade e também quando a pressão é intensa, porque nessas horas sobra pouca energia para se adaptar. Tende a ser o mais estável ao longo do tempo. Vem do Bloco 1 (ordenação), combinado com a escala de concordância do Bloco 3.'},
 adap:{n:'Adaptado',d:'Mostra o comportamento que você sente que o ambiente atual pede, de forma consciente ou não. São as características que você tenta usar no trabalho como resposta ao que acha necessário. Vem do Bloco 2.'},
 res:{n:'Resultante',d:'É o comportamento mais provável no momento presente, a combinação do Estrutural com o Adaptado. É a melhor leitura de como as pessoas te percebem hoje.'},
 chg:{n:'Mudança',d:'Mostra quanto cada fator está sendo ampliado ou reduzido entre o Estrutural e o Adaptado. Indica o esforço que você faz para se ajustar ao momento atual.'}
};

const METODO=[
 ['O modelo','O DISC foi proposto por William Moulton Marston no livro Emotions of Normal People (1928), que descreve quatro padrões de comportamento a partir de como a pessoa percebe o ambiente (favorável ou desafiador) e como reage a ele (de forma ativa ou receptiva). Walter Clarke transformou a teoria em instrumento de avaliação nos anos 1950, e John Geier criou nos anos 1970 o Personal Profile System, base da maioria dos testes DISC atuais.'],
 ['Três instrumentos combinados','Bloco 1 usa ordenação forçada de quatro palavras, que mede o estilo natural. Bloco 2 usa a escolha Mais e Menos sobre o que o ambiente exige, que gera o perfil adaptado, na lógica natural versus adaptado usada por fornecedores como TTI Success Insights e ETALENT. Bloco 3 usa uma escala de concordância com itens invertidos, que é uma medida normativa.'],
 ['Por que misturar formatos','Questionários só de escolha forçada geram dados ipsativos: pontuar alto em um fator obriga a pontuar baixo em outro, o que limita comparações e análises de confiabilidade. Combinar a ordenação com uma escala de concordância reduz essa limitação e permite checar se as respostas são coerentes entre si.'],
 ['Subfatores e talentos','Os 12 subfatores são calculados pela diferença entre pares de fatores no gráfico Estrutural, como fazem os relatórios DISC estendidos. Os talentos são perfis de referência, e a semelhança é calculada pela distância entre o seu gráfico e o perfil de cada talento.'],
 ['Controle de qualidade','O teste verifica itens de atenção, contradições entre afirmações diretas e invertidas, coerência entre o Bloco 1 e o Bloco 3, respostas repetidas em sequência e tempo total de resposta.'],
 ['Limites','O DISC descreve estilo de comportamento, não inteligência, caráter, competência técnica ou potencial. A pesquisa acadêmica independente sobre a validade preditiva do DISC é limitada, e por isso ele deve ser usado para autoconhecimento e conversa, nunca como critério único em decisões sobre pessoas.']
];
