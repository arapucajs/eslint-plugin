import { assert } from '@t8ngs/assert'
import { configure, processCLIArgs, run, test } from '@t8ngs/runner'
import { RuleTester } from '@typescript-eslint/rule-tester'

/**
 * The setup is needed to integrate Japa with RuleTester. RuleTester
 * needs global afterAll hook and nested groups. Since, Japa does
 * not support nested groups we create parallel groups with
 * nested titles with some trickiry.
 */
let originalTitle: null | string
let depthToSwallow = 1
let currentDepth = 0
let teardownCleanup: any = null

RuleTester.it = test
RuleTester.describe = (title, callback) => {
  if (currentDepth === depthToSwallow) {
    test.group(`${originalTitle} | ${title}`, (group) => {
      group.teardown(teardownCleanup)
      callback()
    })
  } else {
    currentDepth++
    originalTitle = originalTitle ? `${originalTitle} | ${title}` : title
    callback()
  }
}

RuleTester.afterAll = (cleanup) => {
  teardownCleanup = cleanup
}

processCLIArgs(process.argv.splice(2))

configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [assert()],
  importer(filePath) {
    currentDepth = 0
    originalTitle = null
    return import(filePath.href)
  },
})

run()
