# Desenvolvimento e verificações

## Estrutura de trabalho

- `index.ts`: registro exportado das regras.
- `src/rules/`: implementação das regras.
- `src/utils.ts`: fábrica comum para regras typescript-eslint.
- `tests/`: casos válidos e inválidos executados pelo `RuleTester`.
- `bin/test.ts`: integração do `RuleTester` com `@t8ngs/runner`.
- `eslint.config.js`: configuração ESLint usada pelo próprio repositório.
- `package.json`: scripts, dependências, compatibilidade e empacotamento.

## Instalação e comandos

Instale as dependências do lockfile npm:

```sh
npm ci
```

Scripts definidos em `package.json`:

| Comando | Ação |
| --- | --- |
| `npm run lint` | Executa ESLint sobre o repositório |
| `npm run typecheck` | Executa `tsc --noEmit` |
| `npm run quick:test` | Carrega `bin/test.ts`, que descobre specs em `tests/**/*.spec.ts` |
| `npm test` | Executa lint como `pretest` e depois cobertura `c8` sobre `quick:test` |
| `npm run build` | Executa `npm run compile` |
| `npm run compile` | Empacota a entrada com `tsup-node` e emite declarações com TypeScript |
| `npm run clean` | Remove `build/` |

Use os comandos adequados à mudança. `npm test` inclui o lint automaticamente por meio do lifecycle `pretest`; não confunda isso com a execução isolada de `npm run quick:test`.

## Como os testes são executados

Cada arquivo em `tests/` cria um `RuleTester` e declara casos `valid` e `invalid`. `bin/test.ts` conecta os métodos de grupo e teste do `RuleTester` ao runner T8ngs e carrega os arquivos de spec. O teste `no-backend-import-in-frontend.spec.ts` cria um projeto temporário com `package.json` e aliases de import para exercitar a resolução de subpaths.

Ao criar uma regra, adicione testes para resultado esperado, configuração e limites importantes; registre a regra no `index.ts`; documente opção, autofix e limitações em `docs/reference/rules.md`; atualize README se o uso público mudar.

## Build e publicação

O build gera ESM em `build/index.js` e declarações TypeScript. O manifesto publica arquivos `build`, excluindo `build/bin` e `build/tests`. Releases publicadas disparam `deploy.yml`, que constrói e publica no GitHub Packages e npm.

## Convenções de mudança

1. Leia as páginas relacionadas em `docs/` antes de alterar comportamento.
2. Mantenha o contrato descrito alinhado com implementação, testes e manifesto.
3. Atualize `package-lock.json` e `bun.lock` se alterar dependências.
4. Atualize a documentação detalhada na mesma mudança e inclua as páginas novas no índice.
5. Use mensagens Conventional Commits; `commitlint.config.js` estende `@commitlint/config-conventional`.
