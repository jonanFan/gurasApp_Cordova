var dict = {
	"Sign Up" : {
		es : "Registrar",
		eu : "Erregistratu"
	},
	"Sign In" : {
		es : "Iniciar sesión",
		eu : "Hasi saioa"
	},
	"Log out" : {
		es : "Cerrar sesión",
		eu : "Itxi saioa"
	},
	"Name" : {
		es : "Nombre",
		eu : "Izena"
	},
	"Email" : {
		es : "Email",
		eu : "Email"
	},
	"Password" : {
		es : "Contraseña",
		eu : "Pasahitza"
	},
	"Username" : {
		es : "Nombre de usuario",
		eu : "Erabiltzaile izena"
	},
	"No video" : {
		es : "No se puede visualizar el video",
		eu : "Ezin da videoa ikusi"
	},
	"Menu" : {
		es : "Menu",
		eu : "Menua"
	},
	"Links" : {
		es : "Continuar",
		eu : "Egin klik"
	},
	"Game" : {
		es : "A jugar",
		eu : "Jolastera"
	},
	"Check" : {
		es : "Comprobar",
		eu : "Egiaztatu"
	},
	"Advice" : {
		es : "Consejo",
		eu : "Laguntza"
	},
	"Next" : {
		es : "Siguiente",
		eu : "Hurrengoa"
	},
	"Prev" : {
		es : "Anterior",
		eu : "Aurrekoa"
	},
	"Forums" : {
		es : "Foros",
		eu : "Foruak"
	},
	"Teacher" : {
		es : "Profesor",
		eu : "Irakaslea"
	},
	"Title" : {
		es : "Título",
		eu : "Izenburua"
	},
	"Make quest" : {
		es : "Hacer pregunta",
		eu : "Galdetu"
	},
	"Quest" : {
		es : "Pregunta",
		eu : "Galdera"
	},
	"Ans" : {
		es : "Respuesta",
		eu : "Erantzuna"
	},
	"QuestAns" : {
		es : "Preguntas/Respuestas",
		eu : "Galdera/Erantzunak"
	},
	"Return" : {
		es : "Volver",
		eu : "Itzuli"
	},
	"Return to menu" : {
		es : "Finalizar",
		eu : "Amaitu"
	},
	"Results" : {
		es : "Resultado",
		eu : "Emaitza"
	},
	"Start record" : {
		es : "Grabar pregunta",
		eu : "Galdera grabatu"
	},
	"Stop record" : {
		es : "Parar grabación",
		eu : "Grabatzen amaitu"
	},
	"Send record" : {
		es : "Enviar pregunta",
		eu : "Galdera bidali"
	},
	"Recorded audio" : {
		es : "Audio grabado:",
		eu : "Grabatutako audioa:"
	},
	"Remember user": {
		es : "Recordar usuario",
		eu : "Erabiltzailea gogoratu"
	},
	"Scoreboard": {
		es: "MARCADOR",
		eu: "MARKAGAILUA"
	},
	"Multiple": {
		es: "Múltiplos",
		eu: "Multiploak"
	},
	
	"Select table size": {
		es: "Selecciona el tamaño del tablero",
		eu: "Aukeratu taularen tamaina"
	}	
}

var selectedLang = "eu";

function translateToLang(lang) {

	translator.lang(lang);

	if (lang.localeCompare("es") == 0) {
		selectedLang = "es";
		localStorage.setItem("language", selectedLang);
		$(".cast").css("display", "block");
		$(".eusk").css("display", "none");

		for (var i = 0; i < subjects.total; i++) {
			$(".appSubj" + i).text(subjects.subject[i].titleES);
			for (var j = 0; j < subjects.subject[i].total; j++) {
				$(".appSubj" + i + "chap" + j).text(
						subjects.subject[i].chapters[j].titleES);

				var pageIds=subjects.subject[i].chapters[j].contentGame.pageId;
				
				var isTest=0;
				for(var t=0; t < pageIds.length; t++ ){
					if(pageIds[t].indexOf("test") >=0)
					{	
						isTest=1;
					}
				}
				
				if (isTest == 1) {
					for (var k = 0; k < tests.total; k++) {
						$(
								"label[id|='label-radio-choice-" + i + '-' + j
										+ '-test' + k + "']")
								.each(
										function(index) {
											$(this)
													.text(
															tests.test[k].answerES[index]);
										});
					}
				}
			}
		}
		
		$("select[class='select-matchGame'] option").each(function(){
			$(this).text($(this).attr("data-ES"));
		});
		
		$("select[class='select-matchGame']").each(function(){
			$(this).selectmenu("refresh");
		});

	} else if (lang.localeCompare("eu") == 0) {
		selectedLang = "eu";
		localStorage.setItem("language", selectedLang);	
		$(".cast").css("display", "none");
		$(".eusk").css("display", "block");

		for (var i = 0; i < subjects.total; i++) {
			$(".appSubj" + i).text(subjects.subject[i].titleEU);
			for (var j = 0; j < subjects.subject[i].total; j++) {
				$(".appSubj" + i + "chap" + j).text(
						subjects.subject[i].chapters[j].titleEU);
				
				var pageIds=subjects.subject[i].chapters[j].contentGame.pageId;
				
				var isTest=0;
				for(var t=0; t < pageIds.length; t++ ){
					if(pageIds[t].indexOf("test") >=0)
					{	
						isTest=1;
					}
				}

				if (isTest ==1 ) {
					for (var k = 0; k < tests.total; k++) {
						$(
								"label[id|='label-radio-choice-" + i + '-' + j
										+ '-test' + k + "']")
								.each(
										function(index) {
											$(this)
													.text(
															tests.test[k].answerEU[index]);
										});
					}
				}
			}
		}
		
		$("select[class='select-matchGame'] option").each(function(){
			$(this).text($(this).attr("data-EU"));
		});

		$("select[class='select-matchGame']").each(function(){
			$(this).selectmenu("refresh");
		});
		
	} else {
		alert("Unknown language");
	}
}

var translator = $('body').translate({
	lang : "eu",
	t : dict
});
