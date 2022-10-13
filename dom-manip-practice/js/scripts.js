//Declare Variables
const input = document.querySelector('#favchap')
const list = document.querySelector('.list')
const button = document.querySelector('button')

//Submit Button listener
button.addEventListener('click', () => {
  //Get the user's input and reset the field
  const myChapter = input.value;
  input.value = '';

  //create the html elements we need
  const listItem = document.createElement('li');
  const listText = document.createElement('span');
  const listButton = document.createElement('button');

  //append the elements we created to the listItem 'li'
  listItem.appendChild(listText);
  listText.textContent = myChapter;
  listItem.appendChild(listButton);
  listButton.textContent = '❌';
  listButton.setAttribute('aria-label', `Remove ${myChapter}`);
  list.appendChild(listItem);

  //create an event listener to handle clicking the delete button
  listButton.addEventListener('click', () => {
    list.removeChild(listItem);
  });

  input.focus();
});