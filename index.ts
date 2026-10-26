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
import preferAdonisInertiaLink from './src/rules/arapucajs_inertia_link.js'
import preferAdonisInertiaForm from './src/rules/arapucajs_inertia_form.js'
import noBackendImportInFrontend from './src/rules/no_backend_import_in_frontend.js'

export default {
  rules: {
    'prefer-lazy-controller-import': preferLazyControllerImport,
    'prefer-lazy-listener-import': preferLazyListenerImport,
    'prefer-adonisjs-inertia-link': preferAdonisInertiaLink,
    'prefer-adonisjs-inertia-form': preferAdonisInertiaForm,
    'no-backend-import-in-frontend': noBackendImportInFrontend,
  },
}
