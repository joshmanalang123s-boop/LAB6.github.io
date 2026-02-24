const API = 'https://fakestoreapi.com/products'
const tbody = document.querySelector('#products-table tbody')
const modal = document.getElementById('modal')
const modalBackdrop = document.getElementById('modal-backdrop')
const modalClose = document.getElementById('modal-close')

let products = []

async function loadProducts(){
  try{
    const res = await fetch(API)
    products = await res.json()
    renderTable(products)
  }catch(e){
    tbody.innerHTML = '<tr><td colspan="5">Failed to load products</td></tr>'
    console.error(e)
  }
}

function renderTable(items){
  tbody.innerHTML = ''
  items.forEach(p => {
    const tr = document.createElement('tr')
    tr.dataset.id = p.id
    tr.innerHTML = `
      <td><img class="thumb" src="${p.image}" alt="${escapeHtml(p.title)}"></td>
      <td>${p.id}</td>
      <td>${escapeHtml(p.title)}</td>
      <td>${escapeHtml(p.category)}</td>
      <td>$${Number(p.price).toFixed(2)}</td>
      <td>${p.rating?.rate ?? '—'} (${p.rating?.count ?? 0})</td>
    `
    tr.addEventListener('click', () => openModal(p))
    tbody.appendChild(tr)
  })
}

function openModal(p){
  document.getElementById('modal-title').textContent = p.title
  document.getElementById('modal-category').textContent = p.category
  document.getElementById('modal-price').textContent = `$${p.price.toFixed(2)}`
  document.getElementById('modal-rating').textContent = `Rating: ${p.rating?.rate ?? '—'} (${p.rating?.count ?? 0})`
  document.getElementById('modal-description').textContent = p.description
  const img = document.getElementById('modal-image')
  img.src = p.image
  img.alt = p.title
  modal.setAttribute('aria-hidden','false')
}

function closeModal(){
  modal.setAttribute('aria-hidden','true')
}

modalBackdrop.addEventListener('click', closeModal)
modalClose.addEventListener('click', closeModal)
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal() })


document.getElementById('search').addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase()
  if(!q) return renderTable(products)
  const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  renderTable(filtered)
})

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c])
}

loadProducts()
