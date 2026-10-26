# Manifesto e comandos

Esta referência resume `package.json` e deve ser atualizada junto com alterações de scripts, compatibilidade ou empacotamento.

## Contrato do pacote

- **Nome e versão do checkout documentado:** `@arapucajs/eslint-plugin`, `1.2.5`.
- **Módulo:** ESM (`type: module`).
- **Entrada e export:** `main` e `exports["."]` apontam para `build/index.js`.
- **Arquivos publicados:** `build`, exceto `build/bin` e `build/tests`.
- **Build:** `tsup-node` gera ESM no diretório `build`; `tsc --emitDeclarationOnly --declaration` gera declarações.
- **Runtime:** `micromatch` e `read-package-up` são dependências regulares, usados pela regra frontend.
- **Peer dependency:** `eslint: ^10.13.0`.
- **Engine:** Node.js `>=20.6.0`.

Os valores são os declarados no manifesto do checkout. Uma publicação pode ter versão e lockfile próprios.

## Scripts

| Script | Comando configurado |
| --- | --- |
| `lint` | `eslint .` |
| `pretest` | `npm run lint` |
| `test` | `c8 npm run quick:test` |
| `quick:test` | Node com loader `ts-node-maintained`, executando `bin/test.ts` |
| `typecheck` | `tsc --noEmit` |
| `precompile` | lint e limpeza |
| `compile` | bundle via `tsup-node` e emissão de declarações |
| `build` | `npm run compile` |
| `clean` | remove `build` via `del-cli` |
| `prepublishOnly` | `npm run build` |

O npm executa `pretest` antes de `test` e `precompile` antes de `compile`. Essa relação afeta a sequência real dos comandos.

## Manifestos de dependências

O projeto mantém `package-lock.json` e `bun.lock`. Atualizações devem manter ambos consistentes com `package.json`. `npm ci` usa o lockfile npm; a checagem automática do repositório e suas versões de Node são definidas pelos workflows e workflows reutilizáveis.
