// locks-page behavior
window.pageInit = function(){
  const toggle = document.getElementById('toggle-locks');
  if(toggle){
    toggle.addEventListener('change', ()=>{
      alert(toggle.checked ? 'Extra locks enabled' : 'Extra locks disabled');
    });
  }
  console.log('locks-page initialized');
};