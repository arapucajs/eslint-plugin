# Visão arquitetural

## Fluxo de consumo

1. O consumidor importa o pacote ESM compilado em `build/index.js`.
2. `index.ts` importa cada regra e as registra sob uma chave curta no objeto `rules`.
3. O consumidor registra esse objeto em `plugins` de uma flat config ESLint e habilita regras individualmente.
4. ESLint percorre a AST. As regras inspecionam declarações `ImportDeclaration`, chamadas `CallExpression` ou ambos, conforme suas necessidades.

Não há preset exportado; o pacote não ativa as regras implicitamente.

## Implementação das regras

`src/utils.ts` encapsula `ESLintUtils.RuleCreator` e constrói URLs para a página do projeto. Cada arquivo em `src/rules/` exporta uma regra default com metadata, schema, mensagens e visitor. As regras Inertia reconhecem imports estáticos; as regras lazy correlacionam identificadores importados a argumentos de chamadas; a regra frontend também consulta `package.json#imports` e compara exceções com `micromatch`.

## Testes

Os specs criam instâncias de `RuleTester`. `bin/test.ts` liga o RuleTester ao runner T8ngs e importa os arquivos `tests/**/*.spec.ts`. Para que `afterAll` do RuleTester limpe o projeto temporário usado pela regra frontend, o harness associa o cleanup ao grupo executado.

## Build e distribuição

O ponto de entrada TypeScript é empacotado como ESM para `build/`; declarações são emitidas pelo compilador TypeScript. O campo `files` do npm restringe o conteúdo publicado ao diretório compilado, excluindo binários de desenvolvimento e specs.

## Fronteiras e comportamento observável

- A configuração de parser e os padrões de arquivo pertencem ao consumidor.
- A regra de frontend restringe o que sua implementação reconhece; ela não é um resolvedor geral de módulos.
- A aplicação de correções lazy altera imports no arquivo consumidor; o plugin não reescreve os arquivos durante o build.
- Testes de regra validam casos sintéticos da AST e não substituem integração de uma aplicação ArapucaJS real.
