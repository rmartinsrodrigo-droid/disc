# Teste DISC

Teste de perfil comportamental DISC grátis, com relatório completo em PDF e cadastro de nome e e-mail.

## Como funciona
- `index.html`, `app.js` e `data.js`: o teste, que roda inteiro no navegador. O PDF também é gerado ali.
- `api/lead.js`: recebe o cadastro (início do teste) e o resultado (fim do teste) e grava no Vercel Blob, em armazenamento privado.
- `api/leads.js`: exporta os cadastros em CSV em `/api/leads?key=SUA_CHAVE`. Use `&format=json` para JSON.

## Configuração na Vercel
- Armazenamento Blob privado conectado ao projeto (cria a variável `BLOB_READ_WRITE_TOKEN`).
- Variável de ambiente `ADMIN_KEY` com a senha da exportação.

## Versões
Veja o [CHANGELOG](CHANGELOG.md). Cada versão publicada ganha uma tag no Git (`v2.1.0`, `v2.2.0`...).
