/*
 * @arapucajs/eslint-plugin
 *
 * (c) ArapucaJS
 *
 * Para informações completas de copyright e licença, consulte o arquivo LICENSE
 * que foi distribuído com este código-fonte.
 */

import preferLazyListenerImport from './src/rules/lazy_listener_import.js'
import preferLazyControllerImport from './src/rules/lazy_controller_import.js'

export default {
  rules: {
    'prefer-lazy-controller-import': preferLazyControllerImport,
    'prefer-lazy-listener-import': preferLazyListenerImport,
  },
}
