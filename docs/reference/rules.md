# Referência das regras

O plugin registra as regras abaixo em `index.ts`. Todos os nomes devem ser prefixados pelo namespace usado na configuração do consumidor (os exemplos usam `@arapucajs`).

## `prefer-lazy-controller-import`

- **Tipo:** `problem`; **fixável:** sim; **opções:** nenhuma.
- Reconhece o import default de `@arapucajs/core/services/router` e chamadas no identificador importado aos métodos `get`, `post`, `put`, `delete`, `patch` ou `resource`.
- Para métodos HTTP, procura o primeiro elemento do segundo argumento quando ele é um array. Para `resource`, procura o segundo argumento.
- Reporta se o valor encontrado for um identificador importado por import default ou nomeado. O fix substitui a declaração de import inteira por uma função de import dinâmico.

```ts
import router from '@arapucajs/core/services/router'
import UsersController from '#controllers/users_controller'

router.get('/users', [UsersController, 'index'])
// O fix transforma o import do controller em:
// const UsersController = () => import('#controllers/users_controller')
```

**Limites:** só identifica o módulo exato e o import default do router; não reconhece alias importado como router de outra forma, métodos HTTP fora da lista, `resource` em outra forma, controller passado sem array para métodos HTTP, ou código que não apareça como `CallExpression`. O fix substitui todo o import associado ao identificador; se a declaração tiver outros specifiers, revise o resultado.

## `prefer-lazy-listener-import`

- **Tipo:** `problem`; **fixável:** sim; **opções:** nenhuma.
- Reconhece o import default de `@arapucajs/core/services/emitter` e chamadas `.on(...)` nesse identificador.
- Examina o segundo argumento se for array. Para elementos identificadores importados (default ou nomeados), reporta e substitui o import pelo padrão `const Nome = () => import(caminho)`.

```ts
import emitter from '@arapucajs/core/services/emitter'
import SendVerificationEmail from '#listeners/send_verification_email'

emitter.on('user:created', [SendVerificationEmail, 'handle'])
```

**Limites:** apenas `.on` com array literal como segundo argumento é analisado. O módulo do emitter precisa ser importado como default. Imports com múltiplos specifiers podem ser totalmente substituídos pelo fix; revise-os.

## `prefer-adonisjs-inertia-link`

- **Tipo:** `suggestion`; **fixável:** não; **opções:** nenhuma.
- Reporta uma declaração estática de import de `@inertiajs/react` ou `@inertiajs/vue3` quando ela contém um import nomeado `Link`, inclusive com alias.
- A mensagem recomenda `Link` de `@adonisjs/inertia/react` ou `@adonisjs/inertia/vue`, respectivamente.

**Limites:** não corrige o import e não analisa imports default/namespace, `require`, imports dinâmicos ou reexports.

## `prefer-adonisjs-inertia-form`

- **Tipo:** `suggestion`; **fixável:** não; **opções:** nenhuma.
- Mesma detecção da regra de Link, para o import nomeado `Form` de `@inertiajs/react` ou `@inertiajs/vue3`.
- Recomenda `Form` de `@adonisjs/inertia/react` ou `@adonisjs/inertia/vue`.

**Limites:** não corrige automaticamente; só analisa imports nomeados em declarações estáticas.

## `no-backend-import-in-frontend`

- **Tipo:** `problem`; **fixável:** não.
- Atua somente quando o caminho do arquivo atual contém um segmento `inertia/`.
- **Opção:** `[{ allowed: string[] }]`, padrão `{ allowed: [] }`. Os padrões são testados com `micromatch.isMatch` contra o caminho literal do import. Exemplo: `['#shared/**', '../../shared/**']`.
- Imports `import type` são ignorados. Imports relativos são aceitos se o caminho resolvido permanecer dentro de um segmento `inertia/`; caso contrário são reportados.
- Imports `#...` são comparados ao campo `imports` do `package.json` mais próximo do arquivo. O alvo é permitido se algum alvo encontrado começar por `./inertia/` ou `inertia/`; sem mapeamento correspondente, o import é reportado.
- Outros caminhos (incluindo dependências externas bare como `react`) são ignorados.

**Limites importantes:** analisa apenas nós `ImportDeclaration`; não verifica `export ... from`, `require()` ou `import()` dinâmico. A resolução de aliases é uma leitura simples de `package.json#imports`, não a resolução completa de condições do Node. Há cache por diretório durante a vida do processo.

## Convenção de mensagens

As mensagens e seus `messageId` estão no `meta.messages` de cada implementação em `src/rules/`. Use `messageId` nos testes, em vez de acoplar os casos à redação traduzida da mensagem.
