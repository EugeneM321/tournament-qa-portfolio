import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'
import newman from 'newman'

const collection = JSON.parse(await readFile(
  new URL('./postman/tournament.collection.json', import.meta.url), 'utf8',
))
const demo = spawn(process.execPath, [fileURLToPath(new URL('../demo/server.mjs', import.meta.url))], {
  env: { ...process.env, PORT: '0' },
  stdio: ['ignore', 'pipe', 'inherit'],
})
const output = createInterface({ input: demo.stdout })

try {
  const [line] = await Promise.race([
    once(output, 'line', { signal: AbortSignal.timeout(5000) }),
    once(demo, 'exit').then(([code]) => {
      throw new Error(`Demo exited before startup (code ${code}).`)
    }),
  ])
  const baseUrl = /^Cedar Cup is running at (http:\/\/127\.0\.0\.1:\d+)$/.exec(line)?.[1]
  if (!baseUrl) throw new Error(`Demo did not report a loopback URL: ${line}`)

  const summary = await new Promise((resolve, reject) => {
    newman.run({
      collection,
      envVar: [{ key: 'baseUrl', value: baseUrl }],
      ignoreRedirects: true,
      reporters: process.env.QA_REPORT_DIR ? ['cli', 'junit'] : ['cli'],
      reporter: { junit: { export: process.env.QA_REPORT_DIR + '/newman.xml' } },
      timeout: 30000,
      timeoutRequest: 5000,
    }, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
  if (summary.run.failures.length) process.exitCode = 1
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
} finally {
  output.close()
  demo.kill()
}
