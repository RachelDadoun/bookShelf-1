function Book (bookName, authorName, score) {
	this.bookName = bookName;
	this.authorName = authorName;
	this.score = score;
};

var currentBookName;
var currentAuthorName;
var currentScore;

var booksArray = [];

function reset(e){
	document.getElementById('bookName').value = "";
	document.getElementById('authorName').value = "";
	document.getElementById('score').value = "";
}

window.onload = function() {
    // Look for input box and insert key handler
    var prevTxt = null;
    var txt = document.getElementsById('searchName');
    if ( txt != null ) {
        txt[0].onkeyup=function(event) {
            var e = event || window.event;
            var curTxt = txt[0].value;
            handleKeyPress(prevTxt,curTxt);
            prevTxt = curTxt;
            return true;
        }
    }
}

function search(){
window.onload = function() {
	clearList();
	var searchResults = [];
	var nameToSearchFor = document.getElementById("searchName").value;
	for (var i=0;i<booksArray.length;i++) {
		if (booksArray[i].bookName.indexOf(nameToSearchFor) > -1) {
			searchResults.push(booksArray[i]);	
		}
	}
	buildListFromArray(searchResults);
}

function buildListFromArray(searchResults) {
	for (var i=0;i<searchResults.length;i++) {
		addToList(searchResults[i]);
	}
}

function addBook(){
	var bookName = document.getElementById('bookName').value;
	var authorName = document.getElementById('authorName').value;
	var score = document.getElementById('score').value;
	var book = new Book(bookName, authorName, score);
	booksArray.push(book);
	//buildListFromArray(booksArray);
	addToList(book);
	reset();
}

//function buildListFromArray(booksArray) {
		
//}

function clearList(){
	var ul = document.getElementById("bookList");	
	ul.innerHTML = '';
}

function removeItem(e) {
	e.target.parentElement.remove();
}

function submitEdit(e) {
	/**if (e.keyCode == 13) {
		e.target.parentElement.parentElement.children[3].style.display = "inline";
		var newValue = e.target.value;
		var div = e.target.parentElement;
		div.innerHTML = newValue;
	}**/
	if (e.keyCode == 27) {
		e.target.parentElement.parentElement.children[3].innerHTML = "edit";
		var li = e.target.parentElement.parentElement;
		li.children[0].innerHTML = currentBookName;
		li.children[1].innerHTML = currentAuthorName;
		li.children[2].innerHTML = currentScore;
	}
}

function editItem(e) {
	if (e.target.innerHTML == "save") {
		var li = e.target.parentElement;
		e.target.innerHTML = "edit";
		var bookName = li.children[0].children[0].value;
		var authorName = li.children[1].children[0].value;
		var score = li.children[2].children[0].value;
		li.children[0].innerHTML = bookName;
		li.children[1].innerHTML = authorName;
		li.children[2].innerHTML = score;
	} else {
	var divWeWantToReplace = e.target.parentElement.children[0];
	currentBookName = divWeWantToReplace.innerHTML;
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("value", divWeWantToReplace.innerHTML);
	input.setAttribute("onkeyup", "submitEdit(event)");
	divWeWantToReplace.innerHTML = '';
	divWeWantToReplace.appendChild(input);
	var divWeWantToReplace2 = e.target.parentElement.children[1];
	currentAuthorName = divWeWantToReplace2.innerHTML;
	var input2 = document.createElement("input");
	input2.setAttribute("type", "text");
	input2.setAttribute("value", divWeWantToReplace2.innerHTML);
	input2.setAttribute("onkeyup", "submitEdit(event)");
	divWeWantToReplace2.innerHTML = '';
	divWeWantToReplace2.appendChild(input2);
	var divWeWantToReplace3 = e.target.parentElement.children[2];
	currentScore = divWeWantToReplace3.innerHTML;
	var input3 = document.createElement("input");
	input3.setAttribute("type", "text");
	input3.setAttribute("value", divWeWantToReplace3.innerHTML);
	input3.setAttribute("onkeyup", "submitEdit(event)");
	divWeWantToReplace3.innerHTML = '';
	divWeWantToReplace3.appendChild(input3);
	e.target.innerHTML = "save";
	}
}

function addToList(book) {
		var newElement = document.createElement("li");
		var bookNameDiv = document.createElement("div");
		bookNameDiv.innerHTML = book.bookName;
		bookNameDiv.className = "left";
		var authorNameDiv = document.createElement("div");
		authorNameDiv.innerHTML = book.authorName;
		authorNameDiv.className = "center";
		var scoreDiv = document.createElement("div");
		scoreDiv.innerHTML = book.score;
		scoreDiv.className = "right";
		var x = document.createElement("span");
		x.innerHTML = "X";
		//x.onclick = removeItem;
		x.setAttribute("onclick", "removeItem(event)");
		
		var edit = document.createElement("span");
		edit.setAttribute("onclick", "editItem(event)");
		edit.innerHTML = "edit";
		newElement.appendChild(bookNameDiv);
		newElement.appendChild(authorNameDiv);
		newElement.appendChild(scoreDiv);
		newElement.appendChild(edit);
		newElement.appendChild(x);
		var ul = document.getElementById("bookList");
		ul.appendChild(newElement);
}

function clearListAndArray(){
	clearList();
	booksArray = [];
}
