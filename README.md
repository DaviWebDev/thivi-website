<h1 align="center">🌿 Thivi Edu</h1>

<p align="center">
  Site institucional de uma escola de culinária e hospitalidade.<br />
  Rápido, acessível e mobile-first.
</p>

<p align="center">
  <a href="https://thivi-website.vercel.app/"><img alt="Ver o site" src="https://img.shields.io/badge/ver_o_site-73ab3a?style=for-the-badge&logo=vercel&logoColor=white" /></a>
  <img alt="Lighthouse 90+" src="https://img.shields.io/badge/Lighthouse-90%2B-1e3408?style=for-the-badge&logo=lighthouse&logoColor=white" />
</p>

<p align="center">
  <img alt="Astro" src="https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
</p>

---

## 📖 Sobre

Projeto de portfólio que recria um layout do Figma como um site completo e funcional: **Home, About, Programs, Affiliations, News, Contact, Privacy Policy e 404**.

O layout original veio de um template do Figma. O conteúdo foi reescrito do zero, e as marcas, os textos e os dados são fictícios.

**Objetivos**

- 🎯 Nota **90+** no Lighthouse (desempenho, acessibilidade e SEO), validada em CI.
- 🧩 **JavaScript vanilla** com TypeScript, sem frameworks de interface.
- 🗃️ Conteúdo tratado como dado: programas e notícias são arquivos Markdown validados por schema.
- 🔁 Fluxo de projeto real: lint, testes, segurança e deploy automatizado.

## 🧰 Stack

<p>
  <img alt="Stack" src="https://skillicons.dev/icons?i=astro,ts,tailwind,html,css,js,figma,vercel,docker,nginx,githubactions,playwright,eslint,prettier,pnpm&perline=15" />
</p>

| Área          | Tecnologias                                                              |
| ------------- | ------------------------------------------------------------------------ |
| Framework     | [Astro](https://astro.build) (geração estática)                          |
| Linguagem     | TypeScript                                                               |
| Estilo        | Tailwind CSS 4, `tailwind-clamp` para tipografia e espaçamento fluidos   |
| Conteúdo      | Content collections do Astro (`programs` e `news` em Markdown, com Zod)  |
| SEO           | `astro-seo`, `@astrojs/sitemap`, canonical por página e `robots.txt`     |
| Fontes/ícones | Fontes locais pela API de fontes do Astro, `astro-icon`                  |
| Testes        | Playwright (Chromium, Firefox, WebKit e Pixel 7)                         |
| Qualidade     | ESLint (com `eslint-plugin-security`), Prettier, Husky, lint-staged      |
| Infra         | Vercel, GitHub Actions, Docker (dev e produção com Nginx), Lighthouse CI |

## ✨ Destaques

- 🎠 **Carrossel e menu mobile em JS vanilla**, com navegação por botões e indicadores de página.
- 📬 **Formulário de contato de demonstração**, com validação de nome e e-mail e estados de erro e sucesso. Não há back-end: nenhum dado é enviado.
- 🗺️ **Mapa carregado só sob consentimento.** O iframe do Google é criado por JavaScript depois do clique, e a escolha fica salva no navegador. A página de privacidade explica o comportamento.
- 🔒 **Segurança.** CSP configurada no Astro, cabeçalhos de segurança no `vercel.json` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) e cache imutável para os arquivos de `/_astro/`.
- ♿ **Item de menu ativo** com `aria-current="page"`, inclusive nas páginas internas de News e Programs.
- 🔗 **URLs sem barra final**, com canonical normalizado para evitar páginas duplicadas.

## 🚀 Como rodar

Requisitos: Node.js `>= 24.22.1` e [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Variável opcional para gerar canonical e sitemap com o domínio correto:

```bash
SITE_URL=https://seu-dominio.com pnpm build
```

> [!NOTE]
> Os hooks do Husky usam Docker para rodar o [gitleaks](https://github.com/gitleaks/gitleaks) (busca de segredos) antes de cada commit e push.

<details>
<summary><strong>Todos os scripts</strong></summary>

<br />

| Comando                | O que faz                                              |
| ---------------------- | ------------------------------------------------------ |
| `pnpm dev`             | Servidor de desenvolvimento                            |
| `pnpm build`           | Gera o site estático em `dist/`                        |
| `pnpm preview`         | Serve o build localmente                               |
| `pnpm lint`            | ESLint sem avisos                                      |
| `pnpm format`          | Formata o código com Prettier                          |
| `pnpm PW:test-partial` | Roda os testes E2E                                     |
| `pnpm PW:ui`           | Abre os testes no modo interativo do Playwright        |
| `pnpm docker:preview`  | Build de produção com Nginx em `http://localhost:4322` |

</details>

## ✅ Qualidade e CI

A cada push e pull request, o GitHub Actions executa:

1. 🕵️ **Segredos:** varredura do histórico com gitleaks.
2. 🧹 **Código:** `eslint`, `astro check`, `pnpm audit` e build.
3. 🧪 **E2E:** Playwright em Chromium e Pixel 7 nos pull requests, e em Chromium, Firefox, WebKit e Pixel 7 na `main`.
4. 🚦 **Lighthouse CI** na `main`: o build falha se desempenho, acessibilidade ou SEO ficarem abaixo de **90** na Home, em News e em Contact.

O Dependabot mantém as dependências atualizadas.

## 🗂️ Estrutura

<details>
<summary><strong>Ver pastas</strong></summary>

```
src/
├── components/   # layout (Header, Footer) e ui (Card, Carousel, ButtonLink)
├── content/      # news/ e programs/ em Markdown
├── data/         # dados da home, afiliações e rodapé
├── layout/       # Layout.astro (head, SEO, header e footer)
├── pages/        # rotas, incluindo news/[slug] e programs/[slug]
├── scripts/      # carousel, header e formulário de contato em TS
└── styles/       # global.css com os tokens do Tailwind
tests/            # testes E2E (links, formulário e componentes)
```

</details>

## 👋 Autor

Feito por [DaviWebDev](https://github.com/DaviWebDev).
