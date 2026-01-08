// memories-page behavior
window.pageInit = function(){
  const list = document.getElementById('memories-list');
  const addBtn = document.getElementById('add-memory');
  if(addBtn && list){
    addBtn.addEventListener('click', ()=>{
      const li = document.createElement('li');
      li.textContent = `Memory ${list.children.length + 1}: A new shared moment`;
      list.appendChild(li);
    });
  }
  console.log('memories-page initialized');
};