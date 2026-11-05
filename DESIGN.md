# DESIGN.md: como a PraJá deve parecer

Este arquivo diz o que a página **deve ser**, não o que ela é hoje. O CSS atual ainda não segue tudo o que está aqui. Nunca use o código existente como exemplo de estilo: se o `index.html` e este arquivo discordarem, vale este arquivo. Isso também vale sobre a seção "Identidade visual" do `README.md`.

## 1. Para quem é

Fundador sem equipe técnica, com uma ideia e cerca de R$ 3 mil, com medo de gastar meses à toa. Ele decide em segundos se a página parece séria, antes de ler a promessa.

Por isso a página precisa parecer **segura e direta**: um caminho claro, uma ação óbvia e nada com cara de truque. Ele não é desenvolvedor, então nada deve parecer código ou painel técnico.

## 2. Valores com intenção

### Cores

| Nome | Valor | Papel |
|---|---|---|
| Papel | `#F7F5EF` | Fundo da página e texto sobre botão preto |
| Superfície | `#FCFBF7` | Fundo de card, para separar do papel sem sombra |
| Tinta | `#15161A` | Texto principal e **cor de ação** |
| Apoio | `#5E5D58` | Texto secundário e links do menu |
| Linha | `#E3DFD4` | Divisórias e bordas de card |
| Linha forte | `#CBC6B6` | Borda do botão secundário e blocos cinza de maquete |
| Amarelo-raio | `#F5C518` | **A promessa**, nos três lugares abaixo |

**Tinta é a ação.** Bloco preenchido de tinta significa "clique aqui" e só existe em botão principal e em opção selecionada (fundo `#15161A`, texto `#F7F5EF`). Em cada tela, no máximo uma ação tem esse peso, salvo o botão do topo.

**Amarelo é a promessa.** Ele aparece só em três lugares:

1. No raio do logo.
2. Em um grifo por tela, atrás do texto, com texto em tinta por cima.
3. No selo "24 horas" da primeira dobra.

Na primeira dobra, o selo já diz o prazo, então o único grifo é "É PraJá.". O texto de apoio fica sem grifo.

### Espaçamento

Use somente 8, 16, 24, 40 e 80px.

| Valor | Uso |
|---|---|
| 8px | Ícone e texto, itens de um mesmo rótulo |
| 16px | Entre itens de uma lista e padding interno pequeno |
| 24px | Dentro de um grupo: título e texto, padding de card, gap de grade |
| 40px | Entre grupos: texto e botão, cabeçalho de seção e conteúdo |
| 80px | Padding vertical de seção (40px em telas abaixo de 768px) |

Regra: o espaço entre grupos é sempre maior que o espaço dentro do grupo. Agrupe com espaço antes de usar linha ou caixa. Na dúvida, suba um degrau.

### Forma

- Container: 1120px de largura máxima, com margem lateral de 24px.
- Raio de canto: 6px em etiquetas e campos, 10px em botões e 16px em cards.
- Inclinação: −8°, a mesma do raio, em botões, grifos e selo. Cards e imagens ficam retos.
- Botão principal: fundo tinta, texto papel, Plex Sans 16px peso 700, padding 16px 24px.
- Botão secundário: sem fundo, borda de 2px em `#CBC6B6`, texto tinta. No hover, vira tinta preenchida.

## 3. Tipografia

Duas fontes, cada uma com uma função:

- **Schibsted Grotesk 800** nos títulos e números de destaque. Dá presença sem parecer enfeite.
- **IBM Plex Sans** em todo o resto, com pesos 400 (texto), 500 (rótulos) e 700 (botões e ênfase). É neutra e fácil de ler em tamanho pequeno.

A IBM Plex Mono saiu: letra de código fala com desenvolvedor, e a página promete "sem dev".

Seis tamanhos, com degraus grandes para a hierarquia ser visível de relance:

| Tamanho | Fonte | Uso | Abaixo de 1200px | Abaixo de 768px |
|---|---|---|---|---|
| 72px | Schibsted 800 | Só o H1 da primeira dobra | 52px | 40px |
| 52px | Schibsted 800 | Título de seção (H2) | 32px | 32px |
| 32px | Schibsted 800 | Título de card, preço, número do selo | 32px | 32px |
| 20px | Plex Sans 400 | Texto de apoio e subtítulo | 20px | 20px |
| 16px | Plex Sans 400/700 | Corpo, menu, botões | 16px | 16px |
| 13px | Plex Sans 500 | Rótulos, legendas, rodapé | 13px | 13px |

O 40px existe só no H1 do celular: é o maior valor em que "Tem uma ideia e" cabe em uma linha numa tela de 360px.

Altura de linha: 1 nos títulos e 1.6 no texto. Espaçamento entre letras: −0.025em nos títulos e 0 no resto.

Regras:

- O H1 é sempre o maior texto da tela, em qualquer largura. Nada pode passar dele.
- Tamanho fora da tabela não existe. Se nenhum servir, use o degrau mais próximo.
- Hierarquia se faz com tamanho e peso, não com cor.

## 4. O que não fazer

- Não use amarelo em botão, forma de botão, estado selecionado, hover, ícone, etiqueta, filete de card ou texto.
- Não desenhe botão amarelo nas maquetes. Bloco de botão em maquete é `#CBC6B6`.
- Não use dois grifos na mesma tela.
- Não use a IBM Plex Mono em lugar nenhum da página.
- Não use tamanho quebrado (14,4px, 14,72px, 16,32px) nem `clamp()` que gere tamanho fora da tabela.
- Não crie espaçamento fora de 8, 16, 24, 40 e 80px.
- Não use sombra, brilho, vidro com blur, gradiente ou neon.
- Não acrescente elemento fixo na primeira dobra que não ajude a decidir, como o indicador "LEITURA 0%".
- Não use palavras vagas neste arquivo. "Espaçamento generoso" não é decisão: escreva o número.

## Exceções

Duas áreas ficam fora destas regras, porque imitam o site de outra pessoa:

- As quatro maquetes da galeria (Grana, Torra, Fluxo e Sprint Zero), com cores e fontes próprias.
- A prévia gerada pelo briefing, que usa as cores escolhidas ali.

A moldura em volta delas segue este arquivo.
