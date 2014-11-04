function Book (bookName, authorName, score) {
	this.bookName = bookName;
	this.authorName = authorName;
	this.score = score;
	this.id = "Li" + (seq++);
};

var booksArray = [];
var tOut;
var seq = 0;

function reset(e){
	document.getElementById('bookName').value = "";
	document.getElementById('authorName').value = "";
	document.getElementById('score').value = "";
}

function search(){
if (tOut)
{
clearTimeout(tOut);	
}
tOut = setTimeout(searchIt, 500);
}

function searchIt(){
	clearList();
	var searchResults = [];
	var nameToSearchFor = document.getElementById("searchName").value;
	for (var i=0;i<booksArray.length;i++) {
		if ((booksArray[i].bookName.indexOf(nameToSearchFor) > -1) ||
		    (booksArray[i].authorName.indexOf(nameToSearchFor) > -1) ||
		    (booksArray[i].score.indexOf(nameToSearchFor) > -1) )
		    {
			searchResults.push(booksArray[i]);	
		}
	}
	nf = document.getElementById('notF');
	if (searchResults.length > 0)
	{
	nf.style.display= "none";
	buildListFromArray(searchResults);
	}
	else
	{
	 nf.style.display= "inline-block";
	}
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
	//clearList();
	//buildListFromArray(booksArray);
	addToList(book);
	reset();
}


function clearList(){
	var ul = document.getElementById("bookList");	
	ul.innerHTML = '';
}

function removeItem(e) {
	
	index = getArrIndByElement(e.target.parentElement);
	booksArray.splice(index,1);
	clearList();
	buildListFromArray(booksArray);
}

function getArrIndByElement(element)
{
	eId = element.getAttribute("id");
    for ( var i=0;i<booksArray.length;i++) 
	{
		if (booksArray[i].id == eId)
		{
			return i;
		}
	}
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
		var ind = getArrIndByElement(li);
		li.children[0].innerHTML = booksArray[ind].bookName;;
		li.children[1].innerHTML = booksArray[ind].authorName;
		li.children[2].innerHTML = booksArray[ind].score;
	}
}

function editItem(e) {
	if (e.target.innerHTML == "save") {
		var li = e.target.parentElement;
		var ind = getArrIndByElement(li);
		e.target.innerHTML = "edit";
		booksArray[ind].bookName = li.children[0].children[0].value;
		booksArray[ind].authorName = li.children[1].children[0].value;
		booksArray[ind].score = li.children[2].children[0].value;
		li.children[0].innerHTML = booksArray[ind].bookName;
		li.children[1].innerHTML = booksArray[ind].authorName;
		li.children[2].innerHTML = booksArray[ind].score;
		
		
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
		newElement.setAttribute("id", book.id);
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
	seq=0;
	booksArray = [];
}
