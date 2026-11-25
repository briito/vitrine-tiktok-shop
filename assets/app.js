(() => {
  'use strict';
  const produtos = Array.isArray(window.PRODUTOS) ? window.PRODUTOS : [];
  const categorias = Array.isArray(window.CATEGORIAS) ? window.CATEGORIAS : ['Todos'];
  const filters = document.querySelector('#filters');
  const grid = document.querySelector('#grid');
  const empty = document.querySelector('#empty');
  const count = document.querySelector('#count');
  document.querySelector('#year').textContent = new Date().getFullYear();
  let atual = 'Todos';
  const aviso = 'Preço sujeito a alterações conforme ofertas, estoque e condições da plataforma.';
  const brl = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'});
  function criar(tag, cls, texto) { const el=document.createElement(tag); if(cls) el.className=cls; if(texto !== undefined) el.textContent=texto; return el; }
  function seguro(url) { try {const u=new URL(url);return u.protocol==='https:' ? u.href : null;} catch {return null;} }
  function render() {
    grid.replaceChildren();
    const lista=produtos.filter(p=>atual==='Todos'||p.categoria===atual);
    count.textContent=`${lista.length} ${lista.length===1?'produto':'produtos'}`;
    empty.hidden=lista.length!==0;
    if(lista.length===0) { empty.querySelector('h3').textContent=produtos.length ? 'Nenhum produto nesta categoria ainda' : 'Novidades a caminho!'; empty.querySelector('p').textContent=produtos.length ? 'Experimente outra categoria para continuar explorando.' : 'Estamos preparando nossa seleção de achadinhos. Volte em breve para descobrir os produtos.'; }
    lista.forEach(p=>{
      const card=criar('article','card');
      const visual=criar('div','card-visual');
      if(p.imagem){const img=criar('img');img.src=p.imagem;img.alt=p.nome||'Imagem do produto';img.loading='lazy';img.decoding='async';visual.append(img);} else {visual.append(criar('span','image-placeholder','Imagem em breve'));}
      if(p.destaque) visual.append(criar('span','badge','Destaque'));
      const body=criar('div','card-body');body.append(criar('h3','card-name',p.nome||'Produto'));
      if(typeof p.preco==='number' && Number.isFinite(p.preco)) body.append(criar('div','price',brl.format(p.preco)));
      body.append(criar('p','price-note',aviso));
      const link=seguro(p.link);const cta=criar(link?'a':'span','cta',link?'Ver oferta ↗':'Oferta indisponível');
      if(link){cta.href=link;cta.target='_blank';cta.rel='noopener noreferrer sponsored nofollow';cta.setAttribute('aria-label',`Ver oferta de ${p.nome} na TikTok Shop (abre nova aba)`);} else cta.classList.add('disabled');
      body.append(cta);card.append(visual,body);grid.append(card);
    });
  }
  categorias.forEach(cat=>{const btn=criar('button','filter',cat);btn.type='button';btn.setAttribute('aria-pressed',String(cat===atual));btn.addEventListener('click',()=>{atual=cat;filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));render();});filters.append(btn);});
  render();
})();
