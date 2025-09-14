/*
 * @arapucajs/eslint-plugin
 *
 * (c) ArapucaJS
 *
 * Para informações completas de copyright e licença, consulte o arquivo LICENSE
 * que foi distribuído com este código-fonte.
 */
import { describe, it, expect, afterAll } from 'bun:test'
import { RuleTester } from '@typescript-eslint/rule-tester'

// Adapte RuleTester para usar Bun test
RuleTester.it = it
RuleTester.describe = describe
RuleTester.afterAll = afterAll

// Exemplo de uso do RuleTester (ajuste conforme necessário)
RuleTester.setDefaultConfig({
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
})

// Importe seus testes normalmente
import rule from '../src/rules/lazy_controller_import.js'

const ruleTester = new RuleTester()
