function iOSVersion() {
	var match = (navigator.appVersion).split('OS ');
	if (match.length > 1) {
		return match[1].split(' ')[0].split('_').join('.');
	}
	return false;
}

function loadPackageInfo() {
	var queryVar = getQueryVariable('p');
	var urlSplit = window.location.href.split("description.html?p");
	var formURL = urlSelfParts[0] + "packageInfo/"+ queryVar;
	$("#description").text(formURL);

	$.ajax({
		url: formURL,
		type: "GET",
		dataType: "text json",
		cache: false,
		success: function (decoder) {
			//var decoder = eval('('+returnFields+')');
			if(decoder.name) {
				document.title = decoder.name;
				$("#name").text(decoder.name);
			}
			if(decoder.version) {
				$("#version").text(decoder.version);
			}
			if(decoder.compatible) {
				$("#compatitle").text(decoder.compatible);
			}
			if(decoder.description) {
				$("#description").text(decoder.description);
			}
			if(decoder.screenshot) {
				$("#screenshot").text(decoder.screenshot);
			}
			if(decoder.whatsnew) {
				$("#whatsnew").text(decoder.whatsnew);
			}
        },
		error: function (err) {
			console.log("");
		}
	});
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}