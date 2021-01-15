console.log('Looking for info in the source??');

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
let codedTarget = 590732789448;

let chars = `abcdefghijklmnopqrstuvwxyzACBDEFGHIJKLMNOPQRSTUVWXYZ0123456789!.'=[]{}",${' '}`;
let hints = JSON['p' + String.fromCharCode(97) + String.fromCharCode(114) + 's' + String.fromCharCode(101)](
  `AU1SSFU1SSFU1SSFAEgNOwEFpCFAEiV3wEFnCFAE7UUV5PUNwEFnxrCFAEiPSSG]GNL0GSVJRLKGV10GEFnxoCFAEe5Z0LTGzGPTWLUL0YHISLwEFnxpCFAEbSLHZLwEFoCFAE{LZ1ZGM1JRwEFpxrCFAE'1JRGWHZZ3VYKZwwEFoCFAE]0G!a.e yfGMP0EFpCFAEfOYV3GTLGZVTLGU1TILYZwEFoxrCFAEagfGi]f[G]fEFqxrCC`
  .split('')
  .map(c => chars[(chars.indexOf(c) + (chars.length - 33)) % chars.length])
  .join(''));

(async () => {
  
  await new Promise(r => window.addEventListener('load', r));
  
  let [ content, input, submit ] = [ '.content', '.input', '.submit' ]
    .map(v => document.querySelector(v));
  
  input.focus();
  
  let busy = false;
  let attempts = 0;
  let doAttempt = async () => {
    
    if (busy) return; else busy = true;
    
    let { value } = input;
    let code = genCode(value);
    let correct = code === codedTarget;
    
    content.classList.add(correct ? 'right' : 'wrong');
    
    let hint = hints[Math.min(attempts++, hints.length - 1)];
    let hintElem = null;
    if (!correct && hint) {
      
      let [ text, n ] = hint;
      hintElem = document.createElement('div');
      hintElem.classList.add('hint');
      hintElem.textContent = text;
      hintElem.style.fontSize = `calc(10px + ${(100 * n).toFixed(3)}%)`;
      content.parentNode.appendChild(hintElem);
      
    }
    
    let req = new XMLHttpRequest();
    req.open('GET', `guess?${value}`, true);
    req.setRequestHeader('Content-Type', 'text/plain');
    req.send();
    
    await new Promise(r => setTimeout(r, 1400));
    
    busy = false;
    hintElem && hintElem.remove();
    content.classList.remove('right');
    content.classList.remove('wrong');
    
    if (!correct) {
      
      input.value = '';
      input.focus();
      
    } else {
      
      [ ...content.childNodes ].forEach(v => v.remove());
      
      let link = document.createElement('a');
      link.classList.add('link');
      link.setAttribute('href', `details?${value}`);
      link.textContent = 'Ya, that fits';
      content.appendChild(link);
      
    }
    
  };
  
  input.addEventListener('keydown', evt => busy ? evt.preventDefault() : (evt.code === 'Enter' && doAttempt()));
  submit.addEventListener('click', doAttempt);
  
})();
