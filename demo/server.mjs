import { createServer } from 'node:http'

const teams = ['North Owls', 'River Foxes']
const seed = { home: 2, away: 1 }
let result = { ...seed }

function standings() {
  return teams.map((team, index) => {
    const margin = (result.home - result.away) * (index === 0 ? 1 : -1)
    const wins = Number(margin > 0)
    const draws = Number(margin === 0)
    const losses = Number(margin < 0)
    return { team, wins, draws, losses, points: 3 * wins + draws }
  }).sort((first, second) => second.points - first.points)
}

function page(title, role, path, content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Cedar Cup</title>
</head>
<body>
  <header>
    <p>Cedar Cup · Local QA demo</p>
    <nav aria-label="Tournament">
      <a href="/" ${path === '/' ? 'aria-current="page"' : ''}>Match</a>
      <a href="/standings" ${path === '/standings' ? 'aria-current="page"' : ''}>Standings</a>
    </nav>
    <form method="post" action="/role">
      <label for="role">Demo role</label>
      <select id="role" name="role">
        <option value="viewer" ${role === 'viewer' ? 'selected' : ''}>Viewer</option>
        <option value="organizer" ${role === 'organizer' ? 'selected' : ''}>Organizer</option>
      </select>
      <button type="submit">Apply role</button>
    </form>
  </header>
  <main>
    <h1>${title}</h1>
    ${content}
  </main>
  <footer>
    <form method="post" action="/reset">
      <button type="submit">Reset demo to seeded state</button>
    </form>
  </footer>
</body>
</html>`
}

function scoreField(side, team, value, error, focus) {
  return `<p>
    <label for="${side}">${team} score</label>
    <input id="${side}" name="${side}" type="number" min="0" max="99" step="1" required
      value="${value}" aria-describedby="score-rule${error ? ` ${side}-error` : ''}"
      ${error ? 'aria-invalid="true"' : ''} ${focus ? 'autofocus' : ''}>
    ${error ? `<span id="${side}-error">${team}: ${error}</span>` : ''}
  </p>`
}

function matchPage(role, errors = {}) {
  const form = role === 'organizer' ? `
    <h2>Publish result</h2>
    <p id="score-rule">Enter a whole number from 0 to 99 for each team. Ties are allowed.</p>
    <form method="post" action="/score" novalidate>
      ${scoreField('home', teams[0], errors.home ? '' : result.home, errors.home, Boolean(errors.home))}
      ${scoreField('away', teams[1], errors.away ? '' : result.away, errors.away, !errors.home && Boolean(errors.away))}
      <button type="submit">Publish score</button>
    </form>` : ''
  return page('Match', role, '/', `
    <p>${teams[0]} <strong>${result.home}–${result.away}</strong> ${teams[1]}</p>
    <p>Result status: Published</p>
    ${form}`)
}

function standingsPage(role) {
  const rows = standings().map(({ team, wins, draws, losses, points }) => `
    <tr><th scope="row">${team}</th><td>${wins}</td><td>${draws}</td><td>${losses}</td><td>${points}</td></tr>`).join('')
  return page('Standings', role, '/standings', `
    <table>
      <caption>Cedar Cup standings</caption>
      <thead><tr><th scope="col">Team</th><th scope="col">Wins</th><th scope="col">Draws</th><th scope="col">Losses</th><th scope="col">Points</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`)
}

function scoreError(value) {
  if (value === null || value === '') return 'Enter a score.'
  if (!/^\d+$/.test(value) || Number(value) > 99) return 'Enter a whole number from 0 to 99.'
}

function send(response, status, body, type = 'text/html; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' })
  response.end(body)
}

function redirect(response, cookie) {
  const headers = { Location: '/' }
  if (cookie) headers['Set-Cookie'] = cookie
  response.writeHead(303, headers).end()
}

async function readForm(request) {
  let body = ''
  request.setEncoding('utf8')
  for await (const chunk of request) {
    body += chunk
    if (body.length > 4096) return null
  }
  return new URLSearchParams(body)
}

const server = createServer(async (request, response) => {
  const path = request.url.split('?')[0]
  const role = (request.headers.cookie ?? '').split(/;\s*/).includes('demo-role=organizer')
    ? 'organizer'
    : 'viewer'

  if (request.method === 'GET') {
    if (path === '/') return send(response, 200, matchPage(role))
    if (path === '/standings') return send(response, 200, standingsPage(role))
  }

  if (request.method === 'POST') {
    if (path === '/reset') {
      result = { ...seed }
      return redirect(response, 'demo-role=viewer; Path=/; HttpOnly; SameSite=Strict')
    }
    if (path === '/score' && role !== 'organizer') {
      return send(response, 403, 'Only the Organizer can publish a score.', 'text/plain')
    }
    if (path === '/role' || path === '/score') {
      let form
      try {
        form = await readForm(request)
      } catch {
        return send(response, 400, 'Unable to read form.', 'text/plain')
      }
      if (!form) return send(response, 413, 'Form is too large.', 'text/plain')
      if (path === '/role') {
        const selected = form.get('role')
        if (selected !== 'viewer' && selected !== 'organizer') {
          return send(response, 400, 'Choose Viewer or Organizer.', 'text/plain')
        }
        return redirect(response, `demo-role=${selected}; Path=/; HttpOnly; SameSite=Strict`)
      }

      const home = form.get('home')
      const away = form.get('away')
      const errors = { home: scoreError(home), away: scoreError(away) }
      if (errors.home || errors.away) return send(response, 422, matchPage(role, errors))
      result = { home: Number(home), away: Number(away) }
      return redirect(response)
    }
  }

  return send(response, 404, 'Page not found.', 'text/plain')
})

const port = Number(process.env.PORT ?? 3000)
server.listen(port, '127.0.0.1', () => {
  console.log(`Cedar Cup is running at http://127.0.0.1:${server.address().port}`)
})
