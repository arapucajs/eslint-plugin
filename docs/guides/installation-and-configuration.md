# Instalação e configuração

## Requisitos declarados

O manifesto declara Node.js `>=20.6.0` e peer dependency `eslint: ^10.13.0`. Instale o plugin e o ESLint no projeto que executa a lintagem:

```sh
npm install --save-dev @arapucajs/eslint-plugin eslint
```

O consumidor de TypeScript também precisa escolher e configurar um parser compatível com os arquivos e regras que usa. O plugin não declara `typescript-eslint` como dependência de runtime nem aplica configuração de parser automaticamente.

## Registrar as regras

O pacote exporta um objeto ESLint com a propriedade `rules`. Registre-o com um identificador de namespace e habilite cada regra desejada:

```js
// eslint.config.js
import arapucajs from '@arapucajs/eslint-plugin'

export default [
  {
    plugins: { '@arapucajs': arapucajs },
    rules: {
      '@arapucajs/prefer-lazy-controller-import': 'error',
      '@arapucajs/prefer-lazy-listener-import': 'error',
      '@arapucajs/prefer-adonisjs-inertia-link': 'warn',
      '@arapucajs/prefer-adonisjs-inertia-form': 'warn',
      '@arapucajs/no-backend-import-in-frontend': 'error',
    },
  },
]
```

O plugin não fornece preset. A configuração de parser, arquivos, ignores e globals também pertence ao projeto consumidor.

## Opção `allowed`

`no-backend-import-in-frontend` aceita um objeto com `allowed`, uma lista de strings e padrões glob aceitos por `micromatch`:

```js
rules: {
  '@arapucajs/no-backend-import-in-frontend': [
    'error',
    { allowed: ['#shared/**', '../../shared/**'] },
  ],
}
```

Uma lista vazia não libera nenhum caminho extra. A lista é aplicada a imports com caminho relativo e imports de subpath (`#...`) encontrados em declarações `import`. Imports de pacote externo (por exemplo, `react`) não são avaliados por esta regra.

## Regras e fix

As regras lazy podem ser executadas com `eslint --fix`. Elas substituem a declaração de import encontrada por `const Nome = () => import('caminho')`; confira os usos do identificador após aplicar. As outras três regras apenas reportam diagnósticos.

Veja [Referência das regras](../reference/rules.md) para os formatos reconhecidos e limitações por regra.
