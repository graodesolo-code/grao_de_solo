# Grão de Solo — Projeto

## O que é
Website institucional do atelier **Grão de Solo** — arquitetura paisagista sustentável e regenerativa, sediado na Maia (Portugal). Single-page com estética **Zen / Wabi-Sabi**.

Marca: *"Design que Regenera. Paisagens para a Vida."* / *"Arquitetura que respira. Paisagens que curam."*
Contactos: `graodesolo@gmail.com` · `915 771 010` · Rua da Estação 261, 44370-178 Maia.

## Estado atual
Website completo e funcional. Single-page com 9 blocos:
Navbar → Hero → Atelier (manifesto) → Setores (residencial + urbano) → Processo (5 fases) → Trabalhos (galeria) → Filosofia (faixa escura) → Contacto → Footer.

- **Conteúdo** centralizado em `src/data/site.ts` (fonte: `public/Texto site.docx`).
- **Imagens** mapeadas em `src/data/assets.ts` (servidas de `public/`).
- **Design system** em `src/index.css`: paleta verde-papel-terra (OKLCH), Fraunces (títulos) + Geist (corpo), tokens de marca (`forest`, `sage`, `moss`, `corten`, `stone`, `paper`).
- **Animações**: scroll-reveal via `useInView` + `Reveal` (respeita `prefers-reduced-motion`).

## Stack
React 19 · Vite 6 · Tailwind v4 (`@theme inline`) · shadcn/ui sobre `@base-ui/react` · React Router · React Query · Supabase (opcional).

## Integrações
- **Formulário de contacto**: `src/services/contact.ts` → **Web3Forms** (gratuito, sem backend). Faz `POST` para `api.web3forms.com/submit` com a `VITE_WEB3FORMS_KEY` do `.env`; as mensagens chegam por email a `graodesolo@gmail.com`. **Fallback `mailto:`** quando não há key ou em falha de rede — o site funciona sempre. Honeypot `company` (lido localmente e como `botcheck` no Web3Forms).
- A edge function `submit-contact` + tabela `contact_messages` (Supabase) ficam como alternativa legada/opcional, não usadas pelo frontend.

## Convenções
- Componentes **< 150 linhas**, UI separada de lógica (hooks/services), mobile-first.
- Cor **só via tokens** do tema (sem hex avulsos). Títulos com `font-heading`; rótulos com a classe `eyebrow`.
- Reutilizar `Reveal`, `SectionHeading`, `Cta` em novas secções.
- `npm run build` + `npm run lint` como gate antes de dar tarefa por concluída.

## Notas
- **Hero**: imagem de fundo full-bleed (`FEATURED.jpg`, `object-cover`) que cobre a viewport com overlay escuro e texto claro — sem badges nem decoração.
- **Favicon**: gerado de `public/logoctransparencia.png` (recorte do "G"-folha, sem texto) → `public/favicon.png` + `public/apple-touch-icon.png`. `<title>` do separador é só "Grão de Solo".
- **Estética**: editorial limpo, sem ícones decorativos em bolinhas, badges de canto, emojis ou scroll cues. Wordmark tipográfico (Fraunces, "de Solo" em itálico). Footer compacto.
- Tailwind v4 **não** usa `tailwind.config.ts` — o tema vive em `src/index.css`.
- No Windows, se `vite build` falhar por `@rollup/rollup-win32-x64-msvc`, reinstalar limpo: `rm -rf node_modules package-lock.json && npm install` (bug conhecido do npm com optional deps).
