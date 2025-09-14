# @arapucajs/eslint-plugin

> Compatível com ESLint>=9.0 e TypeScript >=5.4

<hr>
<br />

<div align="center">
  <h3>Plugin ESLint para aplicações ArapucaJS</h3>
  <p>
    O plugin força sua aplicação a usar imports dinâmicos (lazy imports) para controllers e event listeners. <strong>Lazy imports são obrigatórios quando você utiliza o modo HMR no ArapucaJS</strong>.
  </p>
</div>

<br />

<div align="center">

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

</div>

## Instalação

O pacote já vem pré-configurado com o preset [@arapucajs/eslint-config](https://github.com/arapucajs/eslint-config), portanto a instalação manual não é necessária.

No entanto, você pode instalar e configurar da seguinte forma:

```sh
bun add -D @adonisjs/eslint-plugin

# instele as dependencias peer
bun add -d eslint typescript typescript-eslint
```

ou

```sh
npm i -D @adonisjs/eslint-plugin

# Instale as dependências peer
npm i -D eslint@9 typescript typescript-eslint
```

## Uso

Após a instalação, registre o plugin conforme abaixo. Certifique-se também de configurar o parser `typescript-eslint` para que as regras funcionem corretamente.

```ts
// eslint.config.js
import arapucajsPlugin from '@arapucajs/eslint-plugin'

export default [
  {
    plugins: {
      '@adonisjs': arapucajsPlugin,
    },
    rules: {
      '@adonisjs/prefer-lazy-controller-import': 'error',
      '@adonisjs/prefer-lazy-listener-import': 'error',
    },
  },
]
```

## `prefer-lazy-controller-import`

> [!IMPORTANTE]
> O modo HMR do ArapucaJS só funciona com controllers carregados de forma dinâmica (lazy loaded)

A regra `@adonisjs/prefer-lazy-controller-import` acusa erro quando você importa um controller usando a expressão de importação padrão e o atribui a uma rota. Por exemplo:

```ts
import router from '@arapucajs/core/services/router'
// ❌ Erro: Substitua o import padrão por um import dinâmico do controller
import UsersController from '#controllers/user_controller'

router.get('users', [UsersController, 'index'])
```

A regra é auto corrigível, então você pode aplicar a correção usando os atalhos do seu editor de código.

```ts
import router from '@arapucajs/core/services/router'
// ✅ Corrigido
const UsersController = () => import('#controllers/user_controller')

router.get('users', [UsersController, 'index'])
```

## `prefer-lazy-listener-import`

> [!IMPORTANTE]
> O modo HMR do ArapucaJS só funciona com event listeners carregados de forma dinâmica (lazy loaded)

A regra `@adonisjs/prefer-lazy-listener-import` acusa erro quando você importa um event listener usando a expressão de importação padrão e o atribui a um evento. Por exemplo:

```ts
import emitter from '@arapucajs/core/services/emitter'
// ❌ Erro: Substitua o import padrão por um import dinâmico do listener
import SendVerificationEmail from '#listeners/send_verification_email'

emitter.on('user:created', [SendVerificationEmail, 'handle'])
```

A regra é auto corrigível, então você pode aplicar a correção usando os atalhos do seu editor de código.

```ts
import emitter from '@arapucajs/core/services/emitter'
// ✅ Corrigido
const SendVerificationEmail = () => import('#listeners/send_verification_email')

emitter.on('user:created', [SendVerificationEmail, 'handle'])
```

<div align="center">
  <sub>Feito com ❤︎ por <a href="https://github.com/JefteCosta">Jefte Costa</a> 
</div>

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/adonisjs/eslint-plugin-adonisjs/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/adonisjs/eslint-plugin-adonisjs/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@adonisjs/eslint-plugin/latest.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@adonisjs/eslint-plugin/v/latest 'npm'
[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/adonisjs/eslint-plugin-adonisjs?style=for-the
