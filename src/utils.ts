/*
 * @arapucajs/eslint-plugin
 *
 * (c) ArapucaJS
 *
 * Para informações completas de copyright e licença, consulte o arquivo LICENSE
 * que foi distribuído com este código-fonte.
 */

import { ESLintUtils } from '@typescript-eslint/utils'

export const createEslintRule = ESLintUtils.RuleCreator<{
  description: string
}>((ruleName) => `https://github.com/arapucajs/eslint-plugin#${ruleName}`)
