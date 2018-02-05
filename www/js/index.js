//var storedLogin;
var lastDate = null;

var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		checkPermissions();

		$.ajaxSetup({
			cache : false,
			contentType : "application/json",
			timeout : 30000
		});

		screen.orientation.lock('portrait');
		
		document.addEventListener("backbutton", exit, true);
		
		user.login = localStorage.getItem("user_login");
		user.password = localStorage.getItem("user_password");
		var storedForums = localStorage.getItem("forums");
		var storedTests = localStorage.getItem("tests");
		lastDate = localStorage.getItem("last_date");
		var storedLanguage = localStorage.getItem("language");

		if (storedTests != null && storedTests != undefined) {
			tests = JSON.parse(storedTests);
		}

		if (storedForums != null && storedForums != undefined) {
			forums = JSON.parse(storedForums);
		}

		if (storedLanguage != null && storedLanguage != undefined) {
			selectedLang = storedLanguage;
			// translateToLang(selectedLang);
		}

		if (user.login != null && user.login != undefined
				&& user.password != null && user.password != undefined) {
			tryLogin();
		}

		loadContent();


	}
};

app.initialize();

function loadContent() {
	// Menu
	menuPage.load();

	// Forums
	forumsPage.load();

	// Content
	for (var i = 0; i < subjects.total; i++) {
		for (var j = 0; j < subjects.subject[i].total; j++) {

			// Main
			pageDiv = mainContentPage.create(i, j);
			$("body").append(pageDiv);
			mainContentPage.load(i, j);

			// Links
			pageDiv = linksContentPage.create(i, j);
			$("body").append(pageDiv);
			linksContentPage.load(i, j);

			// Game
			for (var t = 0; t < subjects.subject[i].chapters[j].contentGame.pageId.length; t++) {
				if (subjects.subject[i].chapters[j].contentGame.pageId[t]
						.localeCompare('test0') == 0) {

					var testsOrder = randomList(0, tests.total - 1);
					for (var k = 0; k < testsOrder.length; k++) {
						pageDiv = testPage.create(i, j, k);
						$("body").append(pageDiv);
						testPage.load(i, j, k, tests.test[(testsOrder[k])]);
					}

					$("#prev-" + i + "-" + j + "-test0").remove();
					var lastTest = $("#next-" + i + "-" + j + "-test"
							+ (tests.total - 1));
					lastTest.empty();
					lastTest.attr("href", "#page-menu");
					lastTest.attr("onclick", "returnMenu(" + i + "," + j + ")");
					lastTest.append('<span class="trn">Return to menu</span>');
				} else if (subjects.subject[i].chapters[j].contentGame.pageId[t]
						.localeCompare('matchGame0') == 0) {
					for (var k = 0; k < matchGame.length; k++) {
						pageDiv = matchGamePage.create(i, j, k);
						$("body").append(pageDiv);
						matchGamePage.load(i, j, k);
					}
					
					$("#prev-" + i + "-" + j + "-matchGame0").remove();
					var lastMatchGame = $("#next-" + i + "-" + j + "-matchGame"
							+ (matchGame.length - 1));
					lastMatchGame.empty();
					lastMatchGame.attr("href", "#page-menu");
					lastMatchGame.attr("onclick", "resetMatchGame(" + i + "," + j + ")");
					lastMatchGame.append('<span class="trn">Return to menu</span>');
				} else if (subjects.subject[i].chapters[j].contentGame.pageId[t]
						.localeCompare('mathGame') == 0) {
					pageDiv = mathGamePage.create(i, j);
					$("body").append(pageDiv);
					mathGamePage.load(i, j);
				}
			}
		}
	}
	
	$("body").enhanceWithin();

	$(window).bind('resize', fitImg);

	translateToLang(selectedLang);
}

function checkPermissions() {
	var permissions = cordova.plugins.permissions;

	permissions
			.checkPermission(
					permissions.READ_EXTERNAL_STORAGE, // TODO CHECK IF NEEDED
					permissions
							.requestPermission(
									permissions.READ_EXTERNAL_STORAGE,
									function(status) {
										if (!status.hasPermission) {
											alert("Algunas funcionalidades fallarán si la aplicación no tiene permisos de lectura");
											navigator.app.exitApp();// TODO
											// CHANGE
										}
									},
									function() {
										alert("Algunas funcionalidades fallarán si la aplicación no tiene permisos de lectura"); // TODO
										// BILINGUE
										navigator.app.exitApp();// TODO CHANGE

									}));
}

function fitImg() {// TODO CHECK IF IT'S NEEDED
	var screenWidth = $(window).width() - 16 * 2;
	var screenHeight = $(window).height() - 16 * 2;
	$("img").each(function() {
		$(this).css({
			"max-width" : screenWidth,
			"max-height" : screenHeight
		});
	});
}
