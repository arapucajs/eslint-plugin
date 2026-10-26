# CI, release e publicação

## Verificações em pull requests

`.github/workflows/checks.yml` é acionado em pull requests direcionados a `main` e chama workflows reutilizáveis do repositório `arapucajs/.github`, nesta ordem: typecheck, lint e test. Os passos internos desses workflows não estão definidos neste repositório; consulte a fonte compartilhada para detalhes de runtime e instalação.

## Release

`.github/workflows/release.yml` roda em push para `main` e invoca Release Please (`release-type: node`). Quando uma release é criada, o workflow instala dependências, cria um pacote npm (`npm pack`) e anexa o artefato à release no GitHub.

## Publicação

`.github/workflows/deploy.yml` é acionado quando uma release é publicada. Ele executa `npm ci` e `npm run build`, publica no GitHub Packages e, depois, no npm com provenance. A publicação depende de secrets e permissões configurados no GitHub; os nomes dos secrets aparecem no workflow, seus valores não pertencem à documentação.

## Outros workflows

- `sync-labels.yml` sincroniza labels quando acionado manualmente (`workflow_dispatch`) usando configuração externa.
- `stale.yml` agenda fechamento de issues e pull requests sem atividade.
- `dependabot.yml` configura atualizações automatizadas de dependências.

Não infira os detalhes dos workflows compartilhados a partir dos nomes dos jobs locais: este repositório não contém suas implementações.
