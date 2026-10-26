# Orientações para Claude e agentes de IA

As instruções canônicas estão em [AGENTS.md](./AGENTS.md). Comece pelo [índice de documentação](./docs/README.md) e leia os guias e referências relevantes antes de mudar arquivos.

Este repositório publica `@arapucajs/eslint-plugin`: um plugin ESLint flat config em TypeScript com cinco regras próprias. Ele exporta as regras por `index.ts`; não fornece um preset compartilhado. Confirme o comportamento em `src/rules/`, os casos de teste em `tests/` e as dependências/scripts em `package.json` antes de escrever orientações ou mudar o contrato.

## Documentação obrigatória

Crie ou atualize documentação detalhada na mesma tarefa sempre que qualquer parte do projeto for criada ou modificada, inclusive código, regras, testes, exemplos, dependências, scripts, lockfiles, build, CI e as próprias instruções.

- Coloque documentação explicativa em `docs/` e registre cada página em `docs/README.md`.
- Explique o comportamento real, a configuração, as opções, os limites e a manutenção para humanos e agentes de IA.
- Atualize `README.md` quando o uso público, as regras ou os requisitos mudarem.
- Mantenha guias, referências, arquitetura, planejamento e ferramentas proporcionais ao escopo real; não documente hipótese como capacidade entregue.

Confira `index.ts`, `src/rules/`, `src/utils.ts`, `tests/`, `bin/test.ts`, `package.json`, os lockfiles e `.github/workflows/`. Não declare autofix nas regras Inertia ou na regra frontend, nem suporte a padrões que não estejam cobertos pelo código. Preserve alterações locais existentes e use Conventional Commits.
