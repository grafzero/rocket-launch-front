var xmlhttp = new XMLHttpRequest();
//var url = "http://localhost:8076/promotion/plTest";
var url = "http://51.254.216.23:8076/promotion/plTest";

// create style tag 
var styleElement = document.createElement("style");


xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var pageContent = JSON.parse(this.responseText);
        
        createContent(pageContent);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();



function createContent(arr) {
    var html = arr.html;
    var css = arr.css;
    
    // add css content and append to style tag 
    styleElement.innerHTML = css;
    
    // add style tag to head
    document.getElementsByTagName("head")[0].appendChild(styleElement);
    
    // add html content to app div
    document.getElementById("app").innerHTML = html;
    
    
    initRegistrationForm();
}


function initRegistrationForm(){
    document.querySelector('form#promoContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('submitting!');
        var formData = serialize(this);
        console.log(formData);
    

});
    
    
}


function initContactForm(){
        document.querySelector('form#promoRegForm').addEventListener('submit', function(e) {
    console.log('submitting!');
    e.preventDefault();
    let formData = new FormData(this);
    let parsedData = {};
    for(let name of formData) {
      if (typeof(parsedData[name[0]]) == "undefined") {
        let tempdata = formData.getAll(name[0]);
        if (tempdata.length > 1) {
          parsedData[name[0]] = tempdata;
        } else {
          parsedData[name[0]] = tempdata[0];
        }
      }
    }

    let options = {};
    switch (this.method.toLowerCase()) {
      case 'post':
        options.body = JSON.stringify(parsedData);
      case 'get':
        options.method = this.method;
        options.headers = {'Content-Type': 'application/json'};
      break;
    }

    fetch(this.action, options).then(r => r.json()).then(data => {
      console.log(data);
    });
});
    
}


var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};














