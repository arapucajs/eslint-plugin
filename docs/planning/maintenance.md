# Planejamento de manutenção

Esta página registra práticas e pontos de atenção para manutenção contínua; não representa uma promessa ou cronograma de funcionalidades.

## A cada mudança

- Atualize a referência se mudar nome, detecção, opção, mensagem ou correção de uma regra.
- Atualize os guias e o README se mudar instalação, compatibilidade, configuração ou uso público.
- Atualize arquitetura se mudar exports, fluxo de testes, build ou distribuição.
- Registre qualquer página nova em `docs/README.md`.
- Mantenha manifesto e os dois lockfiles alinhados quando dependências mudarem.
- Documente quais verificações foram executadas e seus resultados.

## Pontos que merecem avaliação ao evoluir

- As regras lazy substituem a declaração import inteira; avaliar imports com vários specifiers e referências adicionais antes de ampliar a correção automática.
- As regras de controller e listener reconhecem um conjunto limitado de APIs e padrões de chamada. Mudanças no runtime ArapucaJS podem exigir extensão dos visitors e novos casos de teste.
- A regra frontend examina `ImportDeclaration`, resolução simples de subpath imports e caminhos relativos. Se o objetivo passar a cobrir reexports, CommonJS ou imports dinâmicos, projetar e testar cada sintaxe separadamente.
- A regra frontend mantém cache de metadados de pacote por diretório durante o processo. Rever invalidação apenas se o fluxo de lint passar a editar manifests durante a execução.
- Conferir compatibilidade de ESLint, parser e versões de Node sempre contra o manifesto e as ações CI atuais.

Estes pontos são observações sobre o comportamento do checkout, não bugs automaticamente confirmados nem escopo já aprovado.
