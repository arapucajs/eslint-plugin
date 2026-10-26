# @arapucajs/eslint-plugin

Plugin ESLint flat config com regras específicas para aplicações ArapucaJS. Ele incentiva imports lazy para controllers e listeners, recomenda os componentes de formulário e link do adaptador Inertia do AdonisJS e impede imports de código fora do frontend em arquivos da pasta `inertia/`.

O pacote exporta um objeto de plugin com cinco regras. Ele não inclui um preset pronto: registre o plugin e habilite as regras necessárias na configuração do ESLint.

## Requisitos

- Node.js `>=20.6.0` (conforme `package.json`)
- ESLint `^10.13.0` (peer dependency declarada)
- TypeScript para os projetos que lintam arquivos TypeScript; a configuração do parser é feita pelo projeto consumidor

## Instalação

```sh
npm install --save-dev @arapucajs/eslint-plugin eslint
```

O pacote é publicado no npm e no GitHub Packages. Para usar a distribuição do GitHub Packages, configure o registry `https://npm.pkg.github.com` para o escopo `@arapucajs` antes da instalação.

## Configuração

Exemplo com ESLint flat config e `typescript-eslint`:

```js
// eslint.config.js
import tseslint from 'typescript-eslint'
import arapucajs from '@arapucajs/eslint-plugin'

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@arapucajs': arapucajs,
    },
    rules: {
      '@arapucajs/prefer-lazy-controller-import': 'error',
      '@arapucajs/prefer-lazy-listener-import': 'error',
      '@arapucajs/prefer-adonisjs-inertia-link': 'warn',
      '@arapucajs/prefer-adonisjs-inertia-form': 'warn',
      '@arapucajs/no-backend-import-in-frontend': [
        'error',
        { allowed: ['#shared/**'] },
      ],
    },
  },
)
```

O trecho usa `typescript-eslint` apenas para ilustrar uma configuração de parser TypeScript. O consumidor deve instalar e configurar suas próprias dependências de parser. A regra de imports frontend lê o campo `imports` do `package.json` mais próximo do arquivo analisado.

## Regras disponíveis

| Regra | Finalidade | Correção automática |
| --- | --- | --- |
| [`prefer-lazy-controller-import`](docs/reference/rules.md#prefer-lazy-controller-import) | Preferir controllers carregados sob demanda nas rotas ArapucaJS | Sim |
| [`prefer-lazy-listener-import`](docs/reference/rules.md#prefer-lazy-listener-import) | Preferir listeners carregados sob demanda em eventos ArapucaJS | Sim |
| [`prefer-adonisjs-inertia-link`](docs/reference/rules.md#prefer-adonisjs-inertia-link) | Preferir o `Link` com roteamento tipado de `@adonisjs/inertia` | Não |
| [`prefer-adonisjs-inertia-form`](docs/reference/rules.md#prefer-adonisjs-inertia-form) | Preferir o `Form` com roteamento tipado de `@adonisjs/inertia` | Não |
| [`no-backend-import-in-frontend`](docs/reference/rules.md#no-backend-import-in-frontend) | Bloquear imports de backend e módulos compartilhados fora de `inertia/` | Não |

As regras lazy reconhecem chamadas específicas do router/emitter e as regras Inertia só analisam imports nomeados estáticos. Consulte a referência para escopo, exemplos, opções e limites precisos.

## Corrigir imports lazy

As duas regras lazy são corrigíveis pelo ESLint (`eslint --fix`). Exemplo do padrão produzido:

```ts
import UsersController from '#controllers/users_controller'

// passa a ser:
const UsersController = () => import('#controllers/users_controller')
```

Revise a alteração no contexto da rota ou do listener, especialmente se um identificador importado for usado em mais lugares.

## Desenvolvimento

```sh
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

Os comandos e o harness dos testes estão descritos em [Desenvolvimento e verificações](docs/guides/development.md). Ao alterar qualquer parte do pacote, atualize a documentação detalhada na mesma mudança e registre novas páginas em [docs/README.md](docs/README.md).

## Documentação

Comece pelo [índice de documentação](docs/README.md). Ele reúne guias de uso e desenvolvimento, referência das regras e opções, arquitetura e planejamento de manutenção.

## Licença

MIT. Consulte [LICENSE](LICENSE).
