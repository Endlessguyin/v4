let project = { files: [] }
let currentId = null
let sharedMode = false

let shareHistory = JSON.parse(localStorage.shareHistory || '[]')
let settings = {
  skipConfirm: JSON.parse(localStorage.skipConfirm || 'false')
}

function getParam(k) {
  const qs = new URLSearchParams(location.search)
  if (qs.has(k)) return qs.get(k)
  const h = location.hash
  const idx = h.indexOf('?')
  if (idx >= 0) {
    const hs = new URLSearchParams(h.slice(idx + 1))
    if (hs.has(k)) return hs.get(k)
  }
  return null
}

function save() {
  if (!sharedMode) {
    localStorage.miniIDE = JSON.stringify(project)
    localStorage.miniIDE_cur = currentId
  }
  localStorage.shareHistory = JSON.stringify(shareHistory)
  localStorage.skipConfirm = JSON.stringify(settings.skipConfirm)
}

function loadLocal() {
  try {
    const d = JSON.parse(localStorage.miniIDE)
    if (d.files) project = d
  } catch {}
  currentId = localStorage.miniIDE_cur
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function genSharedId() {
  // base‑36 digits (0–9, a–z)
  const arr = new Uint8Array(20)
  crypto.getRandomValues(arr)
  return Array.from(arr, v => (v % 36).toString(36)).join('')
}

function findNode(id, nodes = project.files) {
  for (let n of nodes) {
    if (n.id === id) return n
    if (n.type === 'folder') {
      const c = findNode(id, n.children)
      if (c) return c
    }
  }
}
function removeNode(id, nodes = project.files) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      nodes.splice(i, 1)
      return true
    }
    if (nodes[i].type === 'folder') {
      if (removeNode(id, nodes[i].children)) return true
    }
  }
}

const tree = document.getElementById('tree')
function renderTree(nodes = project.files, container = tree) {
  container.innerHTML = ''
  nodes.forEach(n => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.className = 'node ' + n.type + (n.id === currentId ? ' active' : '')
    div.draggable = true
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', n.id)
    })
    div.addEventListener('dragover', e => {
      if (n.type === 'folder') e.preventDefault()
    })
    div.addEventListener('drop', e => {
      if (n.type === 'folder') {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        if (id !== n.id) {
          const m = findNode(id)
          removeNode(id)
          n.children.push(m)
          n.expanded = true
          save()
          renderTree()
          loadEditor()
        }
      }
    })
    const lbl = document.createElement('span')
    lbl.className = 'label'
    lbl.textContent = n.name
    lbl.onclick = () => {
      if (n.type === 'folder') {
        n.expanded = !n.expanded
        renderTree()
      } else {
        currentId = n.id
        save()
        renderTree()
        loadEditor()
      }
    }
    const more = document.createElement('span')
    more.className = 'more'
    more.textContent = '⋮'
    more.onclick = e => {
      e.stopPropagation()
      showContextMenu(n, e.pageX, e.pageY)
    }
    div.append(lbl, more)
    li.append(div)
    if (n.type === 'folder' && n.expanded) {
      const ul = document.createElement('ul')
      ul.className = 'children'
      renderTree(n.children, ul)
      li.append(ul)
    }
    container.append(li)
  })
}

const txt = document.getElementById('txt')
const preview = document.getElementById('preview')

function loadEditor() {
  const n = findNode(currentId)
  txt.value = n?.content || ''
  updatePreview()
}
txt.oninput = () => {
  const n = findNode(currentId)
  if (n) n.content = txt.value
  save()
  updatePreview()
}

function buildHTML() {
  let css = '', js = '', htmlBody = ''

  project.files.forEach(f => {
    if (f.type === 'folder') return
    if (/\.css$/i.test(f.name)) css += f.content + '\n'
    else if (/\.js$/i.test(f.name)) js += f.content + '\n'
  })

  const cur = findNode(currentId)
  if (cur && /\.html$/i.test(cur.name)) htmlBody = cur.content
  else {
    const first = project.files.find(
      f => f.type === 'file' && /\.html$/i.test(f.name)
    )
    htmlBody = first ? first.content : ''
  }

  let raw = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <base href="./">
  <style>${css}</style>
</head>
<body>
${htmlBody}
<script>${js}<\/script>
</body>
</html>`

  raw = raw.replace(
    /(href|src)=["']\/([^"'<>]+?)["']/gi,
    '$1="./$2"'
  )

  return raw
}

function updatePreview() {
  preview.srcdoc = buildHTML()
}

const ctx = document.getElementById('context-menu')
document.body.onclick = () => { ctx.style.display = 'none' }
function showContextMenu(node, x, y) {
  ctx.innerHTML = ''
  ctx.style.top = y + 'px'
  ctx.style.left = x + 'px'
  const ops = [
    { icon: '✎', txt: 'Rename', act: () => openRename(node) },
    { icon: '🗑', txt: 'Delete', act: () => openDelete(node) },
    { icon: '⎘', txt: 'Duplicate', act: () => doDuplicate(node) }
  ]
  ops.forEach(o => {
    const it = document.createElement('div')
    it.className = 'item'
    it.innerHTML = `<img src="data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>
        <text x='0' y='14' font-size='14'>${o.icon}</text>
      </svg>"/><span>${o.txt}</span>`
    it.onclick = e => {
      e.stopPropagation()
      o.act()
      ctx.style.display = 'none'
    }
    ctx.append(it)
  })
  ctx.style.display = 'flex'
}
function doDuplicate(n) {
  const copy = JSON.parse(JSON.stringify(n))
  ;(function upd(nd) {
    nd.id = genId()
    if (nd.type === 'folder') nd.children.forEach(upd)
  })(copy)
  copy.name += ' Copy'
  project.files.push(copy)
  save()
  renderTree()
}
function openRename(n) {
  showModal(
    'Rename',
    '<input id="modal-in" style="width:100%"/>',
    [
      {
        txt: 'OK',
        fn: () => {
          const v = document.getElementById('modal-in').value
          if (v) {
            n.name = v; save(); renderTree(); closeModal()
          }
        }
      },
      { txt: 'Cancel', fn: closeModal }
    ]
  )
  document.getElementById('modal-in').value = n.name
}
function openDelete(n) {
  const doIt = () => {
    removeNode(n.id)
    if (currentId === n.id) currentId = null
    save(); renderTree(); loadEditor(); closeModal()
  }
  if (settings.skipConfirm) doIt()
  else showModal(
    'Delete',
    `<p>Delete "${n.name}"?</p>`,
    [
      { txt: 'Yes', fn: doIt },
      { txt: 'No', fn: closeModal }
    ]
  )
}

const mo = document.getElementById('modal-overlay')
const mt = document.getElementById('modal-title')
const mb = document.getElementById('modal-body')
const mf = document.getElementById('modal-footer')
function showModal(title, body, buttons) {
  mt.textContent = title
  mb.innerHTML = body
  mf.innerHTML = ''
  buttons.forEach(b => {
    const btn = document.createElement('button')
    btn.textContent = b.txt
    btn.onclick = b.fn
    mf.append(btn)
  })
  mo.style.display = 'flex'
}
function closeModal() {
  mo.style.display = 'none'
}

document.getElementById('btn-file').onclick = () => {
  showModal('New File','<input id="modal-in" style="width:100%"/>',[
    {
      txt:'OK', fn:()=> {
        const v = document.getElementById('modal-in').value
        if (v) {
          project.files.push({
            id: genId(), type:'file', name:v, content:''
          })
          save(); renderTree(); closeModal()
        }
      }
    },
    { txt:'Cancel', fn:closeModal }
  ])
}
document.getElementById('btn-folder').onclick = () => {
  showModal('New Folder','<input id="modal-in" style="width:100%"/>',[
    {
      txt:'OK', fn:()=> {
        const v = document.getElementById('modal-in').value
        if (v) {
          project.files.push({
            id: genId(),
            type:'folder',
            name:v,
            expanded:true,
            children:[]
          })
          save(); renderTree(); closeModal()
        }
      }
    },
    { txt:'Cancel', fn:closeModal }
  ])
}
const uploader = document.getElementById('uploader')
document.getElementById('btn-img').onclick = () => uploader.click()
uploader.onchange = e => {
  const f = e.target.files[0], r = new FileReader()
  r.onload = () => {
    project.files.push({
      id: genId(),
      type:'file',
      name: f.name,
      content: r.result
    })
    save(); renderTree()
  }
  r.readAsDataURL(f)
}

document.getElementById('btn-view').onclick = () => {
  const blob = new Blob([buildHTML()],{type:'text/html'})
  const url = URL.createObjectURL(blob)
  window.open(url,'_blank')
  setTimeout(()=>URL.revokeObjectURL(url),60000)
}

document.getElementById('btn-down').onclick = () => {
  if (project.files.length>1) {
    const zip = new JSZip()
    function add(n,path){
      if(n.type==='folder'){
        const f = zip.folder(path+n.name+'/')
        n.children.forEach(c=>add(c,path+n.name+'/'))
      } else {
        const parts = n.content.split(',')
        zip.file(
          path+n.name,
          parts.length>1? atob(parts[1]) : n.content
        )
      }
    }
    project.files.forEach(n=>add(n,''))
    zip.generateAsync({type:'blob'}).then(blob=>{
      const a=document.createElement('a')
      a.href=URL.createObjectURL(blob)
      a.download='project.zip';a.click()
      URL.revokeObjectURL(a.href)
    })
  } else {
    const blob = new Blob([buildHTML()],{type:'text/html'})
    const a = document.createElement('a')
    a.href=URL.createObjectURL(blob)
    a.download='index.html';a.click()
    URL.revokeObjectURL(a.href)
  }
}

document.getElementById('btn-share').onclick = () => {
  const shareId = genSharedId()
  const payload = {
    id: shareId,
    project: JSON.parse(JSON.stringify(project))
  }
  const data = encodeURIComponent(btoa(JSON.stringify(payload)))
  const url =
    location.origin +
    location.pathname.replace(/\/$/,'') +
    `/#/shared/registered?data=${data}`

  shareHistory.unshift({
    id: shareId,
    data, url,
    date: new Date().toLocaleString()
  })
  save()

  showModal('Share',`<input id="share-in" style="width:100%" readonly>`,[
    {
      txt:'Copy', fn:()=>{
        const inp = document.getElementById('share-in')
        inp.select()
        document.execCommand('copy')
      }
    },
    { txt:'Open', fn:()=>window.open(url,'_blank') },
    { txt:'Close', fn:closeModal }
  ])
  const inp = document.getElementById('share-in')
  inp.value = url
  inp.select()
  document.execCommand('copy')
}

document.getElementById('btn-history').onclick = () => {
  let html = `<table style="width:100%;font-size:12px;
    border-collapse:collapse">
    <tr><th>When</th><th>URL</th><th>Del</th></tr>`
  shareHistory.forEach(h => {
    html += `<tr>
      <td>${h.date}</td>
      <td>
        <input type="text" data-id="${h.id}" value="${h.url}"
          readonly style="width:100%;font-size:10px;
          border:1px solid #ccc;padding:2px"/>
      </td>
      <td style="text-align:center">
        <button data-id="${h.id}">✕</button>
      </td>
    </tr>`
  })
  html += '</table>'
  showModal('History',html,[{txt:'Close',fn:closeModal}])
  mb.querySelectorAll('button[data-id]').forEach(bt=>{
    bt.onclick = e=>{
      const id = e.target.getAttribute('data-id')
      const idx = shareHistory.findIndex(x=>x.id===id)
      if(idx>-1) shareHistory.splice(idx,1)
      save(); closeModal()
      document.getElementById('btn-history').click()
    }
  })
}

document.getElementById('btn-settings').onclick = () => {
  const checked = settings.skipConfirm?'checked':''
  showModal(
    'Settings',
    `<label><input type="checkbox" id="skip" ${checked}/> Skip Confirm</label>`,
    [{ txt:'OK', fn:()=>{
        settings.skipConfirm = !!document.getElementById('skip').checked
        save(); closeModal()
    }}]
  )
}

document.getElementById('btn-clear').onclick = () => {
  showModal(
    'Clear All',
    `<p>Clear ALL files and start fresh?</p>`,
    [
      {
        txt:'OK', fn:()=>{
          localStorage.removeItem('miniIDE')
          localStorage.removeItem('miniIDE_cur')
          project.files = [{
            id: genId(),
            type:'file',
            name:'index.html',
            content:'<h1>Hello! Welcome To The GLSeries Editor.</h1>'
          }]
          currentId = project.files[0].id
          save(); renderTree(); loadEditor(); closeModal()
        }
      },
      { txt:'Cancel', fn:closeModal }
    ]
  )
}

const ed = document.getElementById('editor')
const idv = document.getElementById('inner-divider')
idv.onmousedown = e => {
  document.body.style.cursor = 'col-resize'
  const startX = e.clientX, startW = ed.offsetWidth
  function onmove(ev) {
    let nw = startW + (ev.clientX - startX)
    nw = Math.max(200, Math.min(nw, window.innerWidth-100))
    ed.style.width = nw + 'px'
  }
  function onup() {
    document.body.style.cursor = ''
    window.removeEventListener('mousemove',onmove)
    window.removeEventListener('mouseup',onup)
  }
  window.addEventListener('mousemove',onmove)
  window.addEventListener('mouseup',onup)
}

window.onload = () => {
  const sharedData = getParam('data')
  if (sharedData) {
    try {
      const payload = JSON.parse(atob(decodeURIComponent(sharedData)))
      project = payload.project
      sharedMode = true

      document.getElementById('sidebar').style.display = 'none'
      document.getElementById('editor').style.display = 'none'
      document.getElementById('inner-divider').style.display = 'none'
      ;[
        'btn-file','btn-folder','btn-img','btn-view','btn-down',
        'btn-share','btn-history','btn-settings','btn-clear'
      ].forEach(id=>{
        const el = document.getElementById(id)
        if(el) el.style.display='none'
      })

      updatePreview()
      return
    } catch {
    }
  }

  loadLocal()
  if (!project.files.length) {
    project.files = [{
      id: genId(),
      type: 'file',
      name: 'index.html',
      content: '<h1>Hello! Welcome To The GLSeries Editor.</h1>'
    }]
    currentId = project.files[0].id
  }
  renderTree()
  loadEditor()
}
