console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response, error) => {
  response.json().then((data) => {
    console.log(data)
  });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.querySelector('#error');
const weatherMessage = document.querySelector('#weather');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = data.error;
      } else {
        weatherMessage.textContent = data.location + data.forecast
      }
    })
  })
});