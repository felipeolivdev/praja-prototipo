<div align="center">

# PraJá.studio

**Quer uma página pro seu negócio? É PraJá.**

Landing page de um estúdio fictício que entrega páginas para startups em **um dia**.
Projeto de estudo feito com HTML, CSS e JavaScript puros, em um único arquivo.

[**Ver demo ao vivo →**](https://praja-studio.vercel.app)

![Prévia da página inicial da PraJá.studio](assets/preview.png)

</div>

> [!WARNING]
> **Protótipo fictício, feito para fins de estudo e didáticos.**
> A marca PraJá.studio, os pacotes, os preços, os prazos, as condições de pagamento, as garantias, os números dos painéis e o telefone de WhatsApp `(00) 00000-0000` são **inventados**. Este projeto não representa um negócio real nem oferece nenhum serviço.

## Sobre o projeto

A ideia era criar uma landing page que **vende velocidade** para startups que precisam validar ideias rapidamente, e que mostra domínio de front-end no próprio processo: identidade visual própria, interações com propósito, acessibilidade e desempenho, sem frameworks e sem etapa de build.

Tudo o que a página promete aparece nela de alguma forma: o selo "1 dia", o relógio no mockup, o horário de corte calculado em tempo real e o briefing que monta a mensagem pronta para o WhatsApp.

## O que tem na página

| Seção | O que faz |
|---|---|
| **Hero** | Promessa principal, mockup de navegador que começa pronto e de tempos em tempos "refaz" a página, e CTA para o WhatsApp |
| **Comparação** | Agência × no-code sozinho × PraJá, em prazo, esforço, preço, copy e design e posse da página |
| **Processo** | Como cabe tudo em um dia, horário de corte (15h) e linha do tempo guiada pelo scroll |
| **Exemplos** | Galeria de quatro páginas fictícias (lista de espera, pré-venda, software e evento) com identidades visuais diferentes, que se montam peça por peça ao entrar na tela e podem ser ampliadas |
| **Resultados** | Painel ilustrativo de teste de demanda e o que a pessoa leva depois da entrega |
| **Briefing** | Duas formas de preencher: teste ao vivo (prévia, nota de clareza e comparação A/B) ou briefing escrito à mão, com pacote indicado e horário previsto de entrega |
| **Pacotes e garantias** | Três pacotes de preço fechado e as garantias (código, hospedagem, custos e entrada) |
| **FAQ e CTA final** | Objeções mais comuns e uma última chamada para o WhatsApp |

## Destaques técnicos

**Interação**
- **Briefing com duas formas de preencher:** a aba **Teste ao vivo** e a aba **Escrever meu briefing**. A segunda tem uma caixa de texto com exemplo (digitado na tela ao clicar em "Usar exemplo") e atalhos para inserir tópicos, e a mensagem do WhatsApp sai com o texto escrito.
- **Teste ao vivo em 4 passos:** formato (lista de espera, pré-venda, software ou evento), ideia com sugestão de frase, cor e tom de voz, e prazo. A prévia muda de layout por formato, pode ser vista em modo computador ou celular e troca texto, cor e blocos com transições animadas.
- **Teste da promessa:** nota de clareza de 0 a 100 para a frase principal (tamanho, benefício, número ou prazo, jargão e leitura), calculada enquanto a pessoa digita. Dá para criar uma **variação B**, comparar as duas lado a lado, ver qual vence e escolher qual aparece na prévia. É uma heurística simples, não uma garantia de conversão.
- **Horário previsto de entrega** calculado pelo **horário de Brasília** (e não pelo relógio de quem visita), com a regra do corte às 15h, fins de semana e próximo dia útil. A lógica foi testada em vários fusos.
- **Painel de resultados:** as barras e a meta crescem conforme a rolagem (dados ilustrativos). Cada barra mostra um detalhe ao passar o mouse ou receber foco.
- Galeria em que cada exemplo se monta peça por peça conforme a rolagem (a janela ampliada é um `<dialog>` que leva ao WhatsApp com o nome do exemplo na mensagem).
- **A página se constrói conforme a rolagem:** um só mecanismo. O JavaScript entrega a cada bloco um progresso `--p` (0 a 1) ligado à posição de rolagem, e o CSS decide o resto: a linha do bloco se desenha, ele preenche o esboço e o conteúdo entra. Sem temporizadores, sem parallax, nada passa de 600 ms, `prefers-reduced-motion` mostra tudo pronto e, sem JavaScript, o conteúdo já aparece completo. A linha do tempo do processo usa a mesma ideia.
- Poucos caminhos para o WhatsApp, cada um com um papel: topo (desktop) ou barra fixa (celular), hero, briefing, pacotes e CTA final. As faixas do meio levam ao briefing.
- No celular, um botão "voltar ao topo" aparece depois que a pessoa rola a página até o fim (e some ao voltar ao início); fica acima da barra fixa e respeita `prefers-reduced-motion`.
- No celular, menu compacto e uma faixa que mostra a prévia do briefing ao vivo enquanto a pessoa preenche.

**Acessibilidade**
- Link para pular ao conteúdo, foco visível por teclado e navegação por setas nas opções do briefing.
- Estados `aria-checked` e `aria-pressed` nas escolhas, e `prefers-reduced-motion` respeitado.

**Desempenho**
- Sem bibliotecas de JavaScript nem etapa de build: a página inteira é um único arquivo HTML.
- As fontes da galeria só são carregadas quando a seção se aproxima da tela.
- Layout responsivo, testado de desktop a celular.

## Identidade visual

O conceito é **clareza**: fundo claro, uma única cor de destaque, uma única família tipográfica e linhas finas no lugar de sombras. O raio do logotipo, em três traços retos, é o único símbolo.

| Elemento | Decisão |
|---|---|
| **Cores** | Fundo branco e cinza muito claro (`#ffffff`, `#f6f8fa`), texto em cinza-ardósia (`#1e293b`) e **azul** (`#1d4ed8`) como única cor de destaque |
| **Formas** | Cantos retos ou com raio de até 4px, linhas de 1px e nenhuma sombra pesada |
| **Ícones** | Conjunto próprio de ícones de traço (SVG), com o mesmo desenho |
| **Tipografia** | **Inter**, a única família, com muito espaço em branco |
| **Logotipo** | SVG em azul único, sem gradiente: um raio de três traços retos ao lado do nome. O favicon e o `apple-touch-icon` derivam dele |

A galeria e as cores do seletor do briefing são de propósito um contraponto: cada exemplo (Grana, Torra, Fluxo e Sprint Zero) tem cores, fontes e layout próprios, para mostrar que dá para fazer qualquer coisa.

## Estrutura do projeto

```
.
├── index.html        # Página completa (HTML + CSS + JS inline)
├── assets/
│   ├── og.html       # Fonte da imagem de compartilhamento
│   ├── og.png        # Imagem social (1200x630) das metatags Open Graph
│   ├── apple-touch-icon.png  # Ícone para a tela inicial do iPhone
│   └── preview.png   # Captura usada neste README
├── vercel.json       # Cabeçalhos de segurança e cache
├── LICENSE
└── README.md
```

## Rodando localmente

Não há dependências nem etapa de build. Abra o `index.html` no navegador ou sirva a pasta:

```bash
npx serve .
```

## Personalização

| O que mudar | Onde |
|---|---|
| Número do WhatsApp | constante `WHATSAPP_NUMBER` no final do `index.html` (DDI + DDD + número, só dígitos). Enquanto o número for só zeros (fictício), os botões abrem uma janela mostrando a mensagem que seria enviada; com um número real, abrem o WhatsApp direto |
| Telefone exibido | `.phone`, na seção final |
| Nome e logotipo | `<title>`, metatags, SVG do logotipo no header e `assets/og.html` |
| Cores | variáveis CSS em `:root`, no início do `<style>` |
| Preços e pacotes | seção `#pacotes` |
| Horário de corte | função `eta()` no script do briefing, o texto do card de corte e o FAQ |
| Imagem de compartilhamento | edite `assets/og.html` e capture a tela em 1200x630 |

## Deploy

O site é estático e é publicado na [Vercel](https://vercel.com) a partir deste repositório. Cada push na branch `main` gera um novo deploy automaticamente.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).
