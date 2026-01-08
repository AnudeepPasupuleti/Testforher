// flirt-page behavior
window.pageInit = function(){
  const btn = document.getElementById('send-flirt');
  const out = document.getElementById('flirt-result');
  if(btn && out){
    btn.addEventListener('click', ()=>{
      out.textContent = '💌 Sent: You have a smile that makes Monday feel like Friday.';
    });
  }
  console.log('flirt-page initialized');
};