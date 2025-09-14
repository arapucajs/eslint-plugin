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
const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

// Importe seus testes normalmente
import.meta.glob('./tests/**/*.spec.ts', { eager: true })
