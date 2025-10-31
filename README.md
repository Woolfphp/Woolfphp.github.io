# Portfólio — template básico

Este repositório contém um template simples de portfólio estático usando HTML, CSS e JavaScript (vanilla).

Arquivos principais:

- `index.html` — estrutura semântica do site (home, sobre, projetos, contato).
- `css/style.css` — estilos e responsividade.
- `js/main.js` — interações simples: menu mobile, smooth scroll e validação de formulário.
- `images/` — SVGs de placeholder (`avatar.svg`, `project1.svg`).

Como usar (Windows PowerShell):

1. Abrir o arquivo `index.html` direto no navegador (duplo-clique) ou rodar um servidor estático para evitar problemas com rotas relativas.

2. Para rodar com um servidor simples via npx (recomendado):

```powershell
# usando http-server (npx baixa e executa temporariamente)
npx http-server . -o
```

ou

```powershell
# usando serve
npx serve -s . -l 5000
```

3. Abrir `http://localhost:8080` (ou a porta exibida pelo comando) no navegador.

Personalize o conteúdo: substitua "Gustavo Rocha", textos, imagens e links por seus próprios projetos e contatos.

Licença: sinta-se à vontade para usar e adaptar este template como quiser.

Scripts para iniciar o site localmente

Você pode iniciar o site localmente de várias formas. Na raiz do projeto agora existem dois scripts convenientes:

- `start.ps1` — script PowerShell que tenta usar `npx http-server`, cai para `npx serve` e por fim para `python -m http.server` se necessário.
- `start.bat` — equivalente para Windows (cmd), executável por duplo-clique.

Exemplos (PowerShell):

```powershell
# executar o script PowerShell (pode pedir para ajustar ExecutionPolicy)
.\start.ps1
```

Exemplo (cmd):

```batch
start.bat
```

Também é possível usar o script npm existente:

```powershell
npm start
```

Se tiver problemas ao executar `start.ps1`, verifique a política de execução do PowerShell ou use `start.bat`/`npm start`.
