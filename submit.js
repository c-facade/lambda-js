//helpful functions to allow the user to submit their own expressions

//this will show the expression that was written
//by the user
function show_expression(){
	parent= document.getElementById("show");
	e = document.getElementById("textbar").value;
	line = document.createElement("div");
	line.setAttribute('id','line');
	//we are creating a division named line
	//whose children will be the single words
	link = highlight_and_makelink(line, e);
	//this function appends the single words to the line
	//and returns a link
	if(parent.hasChildNodes()){
		parent.replaceChild(line, parent.childNodes[0]);
	}
	else{
		parent.appendChild(line);
	}
	//if we have a link we will insert it
	if (link != null){
		linkdad = document.getElementById("link");
		linkdad.replaceChild(link, linkdad.childNodes[0]);
		//document.getElementById("link").appendChild(link);
	}
	window.scrollTo(0, document.body.scrollHeight);
}

function highlight_and_makelink(parent, text){
	let alert = 0;
	//this will alert the user if they input an undefined word
	let words = text.split(' ');
	let link = "expand.html?expr="
	//this will become the link for the next page
	if (words.length == 0){
		return null;
		//if the text is empty we'll not produce a link
	}
	for (i in words){
		let s = document.createElement("span")
		s.innerHTML = words[i];
		//this span contains one word
		//green if recognised, otherwise red
		if(words[i] in named_symbols){
			s.setAttribute("class", "greentext");
		}
		else{
			s.setAttribute("class", "redtext");
			alert = 1;
		}
		parent.appendChild(s);
		parent.append(" ");
		link+=words[i] + "%20"
	}
	//To have the format expr=A%20B%20C
	//we will erase the last three characters from the link
	link = link.slice(0, -3)
	console.log(link);
	//let's warn the user about using undefined characters
	let a = document.getElementById("alert");
	a.innerHTML = "";
	if (alert == 1){
		a = document.getElementById("alert");
		a.append("Some of the words you submitted are not defined. They will be treated as undefined variables, if you proceed.");
	}
	
	lnk = document.createElement("a");
	lnk.setAttribute("href", link);
	lnk.innerHTML = text;	
	lnk.setAttribute("target", "_");
	return lnk; 
}
