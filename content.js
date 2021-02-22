function main () {
  let hanjas = [...document.querySelectorAll('.myword .hanja')].map(el => el.innerText.trim());
  if (localStorage.getItem('saved-hanjas')) {
    hanjas = hanjas.concat(JSON.parse(localStorage.getItem('saved-hanjas').toString()));
  }
  hanjas = [...new Set(hanjas)]
  // save to local storage
  localStorage.setItem('saved-hanjas', JSON.stringify(hanjas));
  console.log(hanjas.join(''))
}

main()