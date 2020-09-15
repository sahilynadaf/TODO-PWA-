if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered");
        console.log(registration);
    }).catch(error => {
        console.log("SW registration failed");
        console.log(error);
    });
}

// variables

const addItemAction = document.querySelector('.addItem-action');
const addItemInput = document.querySelector('.addItem-input');
const submitButton = document.querySelector('.addItem-button');
const displayItemsAction = document.querySelector('.displayItems-action');
const groceryList = document.querySelector('.grocery-list');
const clearButton = document.querySelector('.displayItems-clearButton');
let arrOfItems;

// Event Listeners

// Content Loding Event Listening 

document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    arrOfItems = JSON.parse(localStorage.getItem('list')) || [];
    arrOfItems.forEach(item => {
        createElement(item);
    })
})

// Submit EventListener

submitButton.addEventListener('click', e => {
    e.preventDefault();
    let value = addItemInput.value;
    if (value === '') {
        showFeedback(addItemAction, 'Please Add Value', false);
    } else {
        createElement(value);
        showFeedback(addItemAction, `${value} Added Succesfuly`, true);
        arrOfItems.push(value);
        localStorage.setItem('list', JSON.stringify(arrOfItems));
    }
});

// Clearing Event Listener

clearButton.addEventListener('click', e => {
    e.preventDefault();
    clearAll();
})

// Deleting Event Listener

groceryList.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('grocery-item__link')) {
        let text = e.target.parentElement.previousElementSibling.textContent;
        editItem(text);
        groceryList.removeChild(e.target.parentElement.parentElement);
    }
})

// Functions 

// 1-Function For Element Creation

function createElement(value) {
    let listItem = document.createElement('div');
    listItem.classList.add('grocery-item');
    listItem.innerHTML = `
                <h4 class="grocery-item__title">${value}</h4>
                <a href="#" class="grocery-item__link">
                    <i class="far fa-trash-alt"></i>
                </a>
        `;
    groceryList.appendChild(listItem);
    addItemInput.value = '';
}

// 2- Function For Showing Feedback

function showFeedback(element, feedback, attribute) {
    if (attribute === true) {
        element.classList.add('done');
        element.innerText = feedback;
        setTimeout(() => {
            element.classList.remove('done');
        }, 2000);
    } else {
        element.classList.add('fail');
        element.innerText = feedback;
        setTimeout(() => {
            element.classList.remove('fail');
        }, 2000);
    }
};

// 3- Function For Clearing Element

function clearAll() {
    let groceryItem = document.querySelectorAll('.grocery-item');
    if (groceryItem.length === 0) {
        showFeedback(displayItemsAction, 'Nothing To Delete', false);
    } else {
        groceryItem.forEach(item => {
            groceryList.removeChild(item);
        })
        showFeedback(displayItemsAction, 'List Cleared', true);
        arrOfItems = [];
        localStorage.clear();
    }
}

// 4- Function For Editing Element

function editItem(text) {
    let index = arrOfItems.indexOf(text);
    arrOfItems.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(arrOfItems));
}