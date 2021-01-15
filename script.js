console.log('INSPECTING SOURCE WILL NOT HELP YOU NIBBA');

let genCode = str => {
  
  while (str.length < 30) str += ' ';
  str = str.slice(0, 30);
  
  let num = 18723807111; 
  for (let c of str) {
    let n = c.charCodeAt(0);
    num = Math.abs(((num * n + n * n) + n) % 4192839293976);
  }
  return num;
  
};

(async () => {
  
  await new Promise(r => window.addEventListener('load', r));
  
  let [ content, input, submit ] =
    [ '.content', '.input', '.submit' ].map(v => document.querySelector(v));
  
  input.focus();
  
  let busy = false;
  let attempts = 0;
  let doAttempt = async () => {
    
    if (busy) return;
    busy = true;
    
    attempts++;
    
    let { value } = input;
    let code = genCode(value);
    let correct = code === 590732789448;
    
    content.classList.add(correct ? 'right' : 'wrong');
    
    await new Promise(r => setTimeout(r, 1000));
    
    busy = false;
    content.classList.remove('right');
    content.classList.remove('wrong');
    
    if (!correct) {
      
      input.value = '';
      input.focus();
      
    } else {
      
      [ ...content.childNodes ].forEach(v => v.remove());
      
      let link = document.createElement('a');
      link.classList.add('link');
      link.setAttribute('href', `details.html?code=${value}`);
      link.textContent = 'Code verified';
      content.appendChild(link);
      
    }
    
  };
  
  input.addEventListener('keydown', evt => {
    if (busy) return evt.preventDefault();
    evt.code === 'Enter' && doAttempt();
  });
  submit.addEventListener('click', doAttempt);
  
})();
