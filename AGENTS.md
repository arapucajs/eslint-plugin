# Instruções para agentes — @arapucajs/eslint-plugin

Leia este arquivo e o índice [docs/README.md](docs/README.md) antes de alterar o repositório. O código, `package.json`, `package-lock.json`, `bun.lock`, workflows, testes e documentação são fontes de verdade. Quando houver divergência, confirme o comportamento no código e atualize a documentação na mesma alteração.

## Escopo do projeto

Este repositório publica `@arapucajs/eslint-plugin`, um plugin ESLint flat config em TypeScript para regras específicas do ecossistema ArapucaJS. O ponto de entrada é `index.ts`, compilado pelo `tsup` como ESM para `build/index.js`. O plugin exporta regras; não exporta um preset compartilhado.

As regras disponíveis são `prefer-lazy-controller-import`, `prefer-lazy-listener-import`, `prefer-adonisjs-inertia-link`, `prefer-adonisjs-inertia-form` e `no-backend-import-in-frontend`. A referência em `docs/reference/rules.md` define comportamento e limites observados.

## Documentação obrigatória

É obrigatório criar ou atualizar documentação detalhada sempre que qualquer artefato do projeto for criado ou modificado, incluindo regras, utilitários, testes, harness, dependências, scripts, build, CI, instruções de agentes e documentação.

- Registre todas as páginas em `docs/README.md`.
- Explique propósito, comportamento real, entradas, saídas, opções, limites e manutenção para pessoas e agentes de IA.
- Atualize `README.md` quando instalação, compatibilidade, configuração pública, regras ou exemplos de uso mudarem.
- Mantenha guias, referências, arquitetura, planejamento e instruções de ferramentas proporcionais ao que existe; não crie páginas vazias nem prometa capacidades futuras como atuais.
- Confira exemplos contra `index.ts`, `src/rules/`, testes, manifests e workflows.

## Antes de alterar

1. Leia `docs/README.md` e as páginas relacionadas à mudança.
2. Inspecione o código da regra, seus testes e `index.ts` antes de descrever ou alterar seu contrato.
3. Confira scripts, versões, engines e dependências em `package.json` e nos lockfiles disponíveis.
4. Confira os workflows existentes antes de afirmar como CI, publicação ou release funcionam.
5. Preserve mudanças locais existentes e mantenha `package-lock.json` e `bun.lock` coerentes quando mudar dependências.
6. Não invente suporte a CommonJS, presets, auto-fixes, seletores, formas de import ou compatibilidade não demonstrados pelo código.

## Verificações e convenções

Os comandos definidos em `package.json` incluem `npm run lint`, `npm run typecheck`, `npm test`, `npm run quick:test` e `npm run build`. Escolha verificações adequadas à alteração e reporte exatamente o que foi executado. Use Conventional Commits, conforme `commitlint.config.js`.
