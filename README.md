# Desafio Marlin

**Este projeto pode ser consultado no githubpages no link:** 'https://rafaelscobino.github.io/Desafio-Marlin-Angular9-Pages/'

Este projeto tem por objetivo:
- Recriar o estilo da imagem  utilizando HTML e CSS, sem auxílio de nenhum framework;
    - Pode ser consultado no repositório 'https://github.com/rafaelScobino/DesafioMarlin-HtmlEstatico'
      
- Exibir as notícias, no padrão da tela da tela proposta pela desfio consumindo a MockApi por meio do método GET;
- Criar uma tela para exibir a notícia em detalhes utilizando o método GET com o parâmetro de ID para retornar a notícia completa;
- Criar uma tela para usar o método POST e enviar uma nova notícia para a MockAPi;

Projeto produzido utilizado Angular 9.1.13 e a [MockApi](https://5cf9ae9df26e8c00146cff8d.mockapi.io/api/v1/post)

## Estrutura do Projeto

Este projeto possui 9 componentes:
- O AppComponent, responsável pela exibição da página e do router-outlet para utilizado para rotas dos componentes principais. Possui três filhos:
  - O router-outlet, responsável pela exibição dos componentes principais através de rotas;
  - O componente page-header, responsável pela lógica e exibição dos títulos e subtítulos das páginas;
  - O componente side-menu, responsável pela navegação da página e a barra de pesquisa.

- O projeto possui 3 componentes principais responsáveis pela exibição das informações principais:
  - O componente news-page, responsável pela lógica e exibição dos componentes news-card;
  - O componente news-detail, responsável pela lógica e exibição dos detalhes da notícia;
  - O componente more-news, responsável pela lógica e exibição da página para cadastro de uma nova notícia e a prévia no modelo de news-card. Possui 2 componentes filhos:
    - O componente news-form, responsável pelo formulário de uma nova noticia e a lógica de envio a 'MockApi';  
    - O componente post-feedback, responsável pela comunicação ao usuário da sua postagem e redirecionamento das rotas após postagem.

- O componente news-card utilizado para encapsular a prévia da notícia, foi utilizado em 2 componentes principais:
  - Utilizado no componente news-page para exibição das prévias;
  - Utilizado no componente more-news para exibir a prévia em tempo real da noticia sendo escrita no news-form.

## Funcionalidades incluídas no Projeto

Este projeto possui as funcionalidades:
- Botão de 'Carregar mais notícias', utilizando no componente news-page para exibir, de 6 em 6, o resto das notícias além das 6 que inicializam como padrão do componente;
- Link de 'Estou com sorte' foi adicionado ao componente side-menu para exibir a tela de detalhes com uma notícia aleatória;
- A barra de pesquisa retorna resultados buscando o texto digitado tanto no titulo como no corpo da notícia.

## Observações

O cadastro de notícias pode ser realizado no link 'Sua notícia'

Os inputs do news-form modificam a cor da borda de acordo com a sua validação;

O input do news-form referente a URL da imagem da notícia necessita que a URL seja do tipo "https://" para ser validado para garantir um link válido;

## Desafios

Devido ao projeto ser feito em Angular na versão 9.1.13, foi necessário utilizar o [Node.js version manager](https://github.com/coreybutler/nvm-windows) -  **`Node NVM 1.1.12`**
para alterar a versão do Node.js para lidar com problemas de compatibilidade:
  - **Após o `ng new` o comando `npm install --legacy-peer-deps` foi utilizado para lidar com dependências deprecadas**;
  - **Comando 'ng build' também foi executado como o `node.js na versão 10.24.1` para criar arquivos de distribuição**;
  - **Comando `ng serve` deve ser rodado usando o `node.js na versão 10.24.1`**;

## Como Rodar o Projeto

Realize o download ou a cópia do Repositório. Utilize o terminal, ou Git Bash e navegue até a pasta em que o projeto foi salvo, e digite `ng serve`. 
Abra seu navegador e digite o endereço `http://localhost:4200/`. 

Para interromper a execução pressione `ctrl + C` em seu terminal.

## Planejamento do projeto feito com `draw.io`

O projeto foi planejado utilizando o fluxograma feito com 'draw.io':

![Projeto Marlin drawio](https://github.com/user-attachments/assets/2fb31914-c7b4-4ed2-b975-19953078d29a)


# MarlinApp

  **Devido a problemas de compatibilidade foi utilizado o `Node.js na versão 20`**
  **Após o `ng new` o comando `npm install --legacy-peer-deps` foi utilizado para lidar com dependências deprecadas**
  
Projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 9.1.13.

## Server de desenvolvimento

**Devido a problemas de compatibilidade o `ng serve` deve ser rodado usando o `node.js na versão 10.24.1`**

## Build

**Comando 'ng build' também foi executado como o `node.js na versão 10.24.1` para criar arquivos de distribuição**


