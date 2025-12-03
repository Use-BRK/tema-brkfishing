# Tema BRK Fishing (Glozin Theme Customization)

Bem-vindo ao repositório do **Tema BRK Fishing**. Este projeto é uma customização robusta baseada no tema **Glozin** para Shopify, adaptada especificamente para atender às necessidades da marca BRK Fishing.

## 📋 Sobre o Projeto

Este repositório contém o código-fonte do tema Shopify utilizado na loja BRK Fishing. O tema foi desenvolvido com foco em performance, experiência do usuário (UX) mobile-first e conversão.

### Detalhes do Tema Base
- **Tema Base:** Glozin
- **Versão:** 2.6.0
- **Autor Original:** Nextsky
- **Documentação Original:** [Glozin Documentation](https://nextsky.gitbook.io/glozin-theme)

## 🚀 Funcionalidades Principais

Além das funcionalidades nativas do Shopify e do tema Glozin, este projeto inclui:

- **Design Responsivo & Mobile-First:** Interface otimizada para garantir a melhor experiência de compra em dispositivos móveis.
- **Seções Dinâmicas:**
  - *Scrolling Text:* Faixas de texto rolante para anúncios e promoções.
  - *Swiper Sliders:* Carrosséis de produtos e banners interativos e leves.
- **Otimização de SEO:** Integração com ferramentas de SEO (Booster SEO) para melhor ranqueamento orgânico.
- **Badges e Etiquetas Personalizadas:**
  - Etiquetas de "Novo", "Oferta", "Esgotado" e "Pré-venda" com cores customizáveis.
  - Suporte a contagem regressiva para ofertas.
- **Integração PageFly:** Suporte para construção de Landing Pages personalizadas.
- **Suporte RTL:** Preparado para idiomas Right-to-Left (se necessário).

## 🛠️ Stack Tecnológica

- **Linguagem de Template:** [Shopify Liquid](https://shopify.dev/docs/api/liquid)
- **Estilização:** CSS3 / SCSS (com variáveis CSS para fácil manutenção de cores e tipografia)
- **Scripting:**
  - Vanilla JavaScript
  - [Swiper.js](https://swiperjs.com/) (Sliders)
  - Motion.js (Animações)
- **Gerenciamento de Dependências:** `package.json` (para ferramentas de desenvolvimento local, se aplicável)

## 📂 Estrutura de Diretórios

A estrutura segue o padrão de temas Shopify 2.0:

```
├── assets/        # Arquivos estáticos (JS, CSS, Imagens, Fontes)
├── config/        # Configurações do tema (settings_schema.json)
├── layout/        # Arquivos de layout mestre (theme.liquid)
├── locales/       # Arquivos de tradução (pt-BR.json, en.default.json, etc.)
├── sections/      # Componentes de seção reutilizáveis (Liquid)
├── snippets/      # Fragmentos de código reutilizáveis
└── templates/     # Templates de página (JSON/Liquid)
```

## 💻 Desenvolvimento Local

Para trabalhar neste tema localmente, recomenda-se o uso do **Shopify CLI**.

1. **Instale o Shopify CLI:**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Login na Loja:**
   ```bash
   shopify theme dev --store sua-loja.myshopify.com
   ```

3. **Pull do Tema (Cuidado para não sobrescrever trabalho não salvo):**
   ```bash
   shopify theme pull
   ```

4. **Push das Alterações:**
   ```bash
   shopify theme push
   ```

---
*Desenvolvido e mantido pela equipe de tecnologia da BRK Fishing.*
