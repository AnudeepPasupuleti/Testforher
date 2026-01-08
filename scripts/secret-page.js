// secret-page behavior
window.pageInit = function(){
  const btn = document.getElementById('reveal-btn');
  const out = document.getElementById('secret-output');
  if(btn && out){
    btn.addEventListener('click', ()=>{
      out.textContent = '🌸 Here is a tiny secret: You make small things feel huge.';
    });
  }
  console.log('secret-page initialized');
};