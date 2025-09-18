/*
 * @arapucajs/eslint-plugin
 *
 * (c) ArapucaJS
 *
 * Para obter informações completas sobre direitos autorais e licença, consulte o arquivo LICENSE
 * que foi distribuído com este código-fonte.
 */

import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../src/rules/lazy_listener_import.js'

const valids = [
  {
    name: 'Lazy import',
    code: `
  import emitter from '@arapucajs/core/services/emitter'
  const SendVerificationEmail = () => import('#listeners/send_verification_email')

  emitter.on('user:registered', [SendVerificationEmail, 'handle'])
  `,
  },
]

const invalids = [
  {
    name: 'Import expression',
    code: `
    import emitter from '@arapucajs/core/services/emitter'
    import SendVerificationEmail from '#listeners/send_verification_email'

    emitter.on('user:registered', [SendVerificationEmail, 'handle'])
    `,
    output: `
    import emitter from '@arapucajs/core/services/emitter'
    const SendVerificationEmail = () => import('#listeners/send_verification_email')

    emitter.on('user:registered', [SendVerificationEmail, 'handle'])
    `,
    errors: [{ messageId: 'preferLazyListenerImport' as const }],
  },
]

const ruleTester = new RuleTester()
ruleTester.run('prefer-lazy-listener-import', rule, {
  valid: valids,
  invalid: invalids,
})
