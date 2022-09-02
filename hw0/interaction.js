// Create a "close" button and append it to each list item

var myNodelist = document.getElementsByTagName("LI");
var i;
// upon startup this loop iterates over all list elements and adds a "close" button to each one
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  // the data variable here contains the unicode character X which is used as a close button
  span.className = "close"; // the close classname is reference in the CSS file for styling
  span.appendChild(txt);
  myNodelist[i].appendChild(span); // append the element to the DOM of each list element
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() { // when the close button is clicked, the list item is removed
    var div = this.parentElement;
    div.style.display = "none"; // set the CSS display property to "none", which hides the element when the close button is clicked
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) { // add an event listener to the list element to detect clicks
  if (ev.target.tagName === 'LI') { // only run the code if the target is a list item
    ev.target.classList.toggle('checked'); // toggle the ul.li checked CSS property
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li"); // create new list item
  var inputValue = document.getElementById("myInput").value; // get the text value of the input field
  var t = document.createTextNode(inputValue);
  li.appendChild(t); // append text to list item
  if (inputValue === '') { // if now text was added to the input field, print an alert that user has to add text
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li); // add item to unordered list
  }
  document.getElementById("myInput").value = ""; // reset text in input field after item was added to the list

  // add close button to new item
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // add close button event listener to new item and other ones.
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}