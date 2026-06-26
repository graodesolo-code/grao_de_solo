# Manutenção — Grão de Solo

Tudo o que é preciso para manter o site no ar. Atualizar este ficheiro sempre que algo mudar.

## Resumo
- **O que é:** site single-page (React + Vite). Sem backend próprio.
- **Deploy:** Vercel.
- **Domínio:** comprado na Vercel.
- **Formulário de contacto:** Web3Forms (gratuito) → email para `graodesolo@gmail.com`.

## Deploy (Vercel)
- Cada `git push` para `main` faz deploy automático.
- Build: `npm run build` · Output: `dist/`.
- Painel: https://vercel.com → projeto Grão de Solo.
- **Variável de ambiente obrigatória** (Vercel → Settings → Environment Variables):
  - `VITE_WEB3FORMS_KEY` = `2236f44a-5ef7-4321-b901-2811d316e736`
  - Sem ela, o formulário cai para `mailto:` (abre o email do visitante).
  - Depois de a adicionar/alterar → **Redeploy** (a key é embebida no build).

## Domínio (Vercel)
- Comprado e gerido na Vercel (Settings → Domains).
- **Renovação:** anual. A Vercel cobra automaticamente no cartão associado.
  - Confirmar que o cartão está válido perto da data de renovação.
  - Domínio: `graodesolo.com` · Data de renovação: `25/06` (renova automaticamente a 25/06/2027).
- DNS gerido pela Vercel — não mexer salvo necessário.

## Formulário de contacto (Web3Forms)
- Serviço: https://web3forms.com · Conta: `graodesolo@gmail.com`.
- **Gratuito**, sem expiração. Limite ~250 envios/mês.
- Mensagens chegam por email a `graodesolo@gmail.com`.
- Código: `src/services/contact.ts`. A key vive em `VITE_WEB3FORMS_KEY`.
- **Manutenção:** praticamente nenhuma. Só verificar:
  - Se pararem de chegar emails → ver pasta de spam; confirmar a key no Vercel.
  - Primeiro email de um endereço novo pode ir para spam (marcar "não é spam").
- Email vem com cabeçalho fixo em inglês ("Hello…") — limitação do plano grátis, só muda com plano pago.

## Tarefas recorrentes
- **Anual:** confirmar renovação do domínio + cartão válido na Vercel.
- **Pontual:** atualizar conteúdo em `src/data/site.ts` e imagens em `public/` (mapeadas em `src/data/assets.ts`).
- **Antes de cada deploy:** `npm run build` e `npm run lint` têm de passar.

## Contactos / acessos
- Email do negócio: `graodesolo@gmail.com`
- Conta Vercel: `graodesolo@gmail.com`
- Conta Web3Forms: `graodesolo@gmail.com`

## Em caso de problema
- **Site offline:** ver estado do deploy no painel Vercel.
- **Formulário não envia emails:** confirmar `VITE_WEB3FORMS_KEY` no Vercel + ver spam.
- **Build falha localmente:** apagar `node_modules` + `package-lock.json` e correr `npm install`.
