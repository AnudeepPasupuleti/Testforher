(function(){
  const app = document.getElementById('app');
  const loaderEl = document.getElementById('global-loader');
  let currentScript = null;

  function showLoader(){ loaderEl.classList.remove('hidden'); loaderEl.setAttribute('aria-hidden','false') }
  function hideLoader(){ loaderEl.classList.add('hidden'); loaderEl.setAttribute('aria-hidden','true') }

  async function loadPartial(page){
    showLoader();
    const partialPath = `partials/${page}-page.html`;
    try{
      const res = await fetch(partialPath, {cache: 'no-store'});
      if(!res.ok) throw new Error('Failed to load: '+partialPath);
      const html = await res.text();
      app.innerHTML = html;
      await loadPageScript(page);
    }catch(err){
      app.innerHTML = `<div class="page"><h2>Error</h2><p class="muted">Could not load page: ${page}</p></div>`;
      console.error(err);
    }finally{
      hideLoader();
    }
  }

  function loadPageScript(page){
    return new Promise((resolve)=>{
      // remove previous script if any
      if(currentScript){
        currentScript.remove();
        currentScript = null;
      }
      const script = document.createElement('script');
      script.src = `scripts/${page}-page.js`;
      script.async = true;
      script.id = `page-script-${page}`;
      script.onload = function(){
        // If the page script exposed a pageInit function, call it
        if(typeof window.pageInit === 'function'){
          try{ window.pageInit(); }catch(er){ console.error(er) }
          try{ delete window.pageInit }catch(e){}
        }
        currentScript = script;
        resolve();
      };
      script.onerror = function(){ console.error('Failed to load script for',page); resolve(); };
      document.body.appendChild(script);
    });
  }

  function navTo(page){
    loadPartial(page);
    // update active link styles
    document.querySelectorAll('.nav-link').forEach(a=>{
      a.classList.toggle('active', a.dataset.page===page);
    });
  }

  // wire nav links
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const page = a.dataset.page;
      if(page){ window.location.hash = page; }
    });
  });

  window.addEventListener('hashchange', ()=>{
    const name = window.location.hash.replace('#','') || 'secret';
    navTo(name);
  });

  // initial load
  const initial = (window.location.hash.replace('#','') || 'secret');
  navTo(initial);
})();