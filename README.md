# Projeto EstagioJá

Bem-vindo ao repositório do projeto EstagioJá! </br>
Este é um projeto web desenvolvido utilizando diversas tecnologias modernas. </br>
Professor orientador: **Jaime Wojciechowski**</br>
Aqui estão algumas informações essenciais para entender e contribuir para o projeto.

## Desenvolvedores
- [James Rovel Barbosa](https://github.com/Diagnoster)
- [Lucas Frison Gonçalves](https://github.com/lucasfrison)

## Tecnologias Utilizadas

### Frontend:
- <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> Angular
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-plain.svg" alt="material" width="40" height="40"/> Angular Material
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> HTML
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> CSS 
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> TypeScript
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> Docker (para virtualização)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" alt="heroku" width="40" height="40"/> Heroku (para hospedagem)
- EmailJS (servidor de e-mail)
- SweetAlert2 (estilização)

## Objetivo

O principal objetivo deste projeto é oferecer uma plataforma simples e eficiente para os usuários encontrarem vagas de estágio. Para atingir isso, concentramos nossos esforços em dois aspectos principais:

1. **Layout Clean:** Optamos por um design minimalista, removendo distrações visuais e mantendo a interface limpa. Queremos que os usuários se concentrem facilmente nas informações essenciais.

2. **Facilidade de Uso:** A navegação intuitiva e a simplicidade são prioridades. Queremos que os usuários possam criare, ncontrar e candidatar-se as vagas de estágio sem obstáculos desnecessários.


## Pré-Requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados.

## Running

1. Clone este repositório:
   ```bash
   git clone https://github.com/lucasfrison/estagioja_angular_webapp.git
2. Navegue até o diretório do projeto:
   ```bash
   cd repositorio
3. Instale as dependências do projeto:
   ```bash
   npm install
4. Suba a aplicação Angular:
    ```bash
    ng serve -o

## Recuperação de Senha

Para a funcionalidade de recuperação de senha, nosso projeto utiliza o serviço externo EmailJS. Antes de utilizar essa funcionalidade, é necessário configurar a conexão com o serviço de emailjs. Siga as etapas abaixo:

1. Crie uma conta no serviço de emailjs em [https://www.emailjs.com/](https://www.emailjs.com/).
2. Obtenha as credenciais necessárias (ID do Usuário, Chave de Serviço, etc.) após o registro.
3. No seu projeto, configure o arquivo de configuração apropriado com essas credenciais (componente **recuperar-senha**).
4. **OBS**: É necessário utilizar a aplicação back-end em conjunto, pois a validação de senha verifica se o e-mail existe antes de realizar o envio.

Depois de configurar a conexão com o serviço de emailjs e a aplicação back-end estiver iniciada, a recuperação de senha estará pronta para ser utilizada.

## Curiosidades

- **Desenvolvimento em Standalone:** A maioria dos componentes deste projeto foi desenvolvida como módulos standalone, pode ser importado e utilizado diretamente em qualquer parte da aplicação, sem a necessidade de configurar um módulo

- **Responsividade em Todas as Telas:** Todas as telas do projeto foram cuidadosamente projetadas para garantir uma experiência de usuário consistente em diferentes tamanhos do browser. A responsividade é uma prioridade para oferecer a melhor experiência possível.
 
- **Design Clean:** Todo o layout do projeto foi concebido com o princípio de simplicidade. Buscamos proporcionar uma experiência de usuário agradável sem excesso de informações.

- **Foco na Informação Essencial:** Cada detalhe apresentado tem como objetivo ser relevante para a busca de vagas de estágio, eliminando qualquer informação supérflua.

