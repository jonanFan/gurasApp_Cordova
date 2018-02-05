var appConstants = {
	localPermanentStorageFolder: "/sdcard/eus.ehu.gurasApp/",
	localPermanentStorageFolderAudio: function () {
		return this.localPermanentStorageFolder+"audio/";
	},	
	//serverURL: "http://192.168.16.100:8080/",
	serverURL: "http://u017633.ehu.eus:28080/",
	appPath: "gurasApp/",
	// URLS de los servicios rest
	register: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/register"; 
	},
	login: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/login"; 
	},
	getForums: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/getForums"; 
	},
	getTests: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/getTests"; 
	},
	getAudioFile: function() {
		//return this.serverURL+this.appPath+"audio/";
		return this.serverURL+"static/"+this.appPath+"audio/";
	},
	uploadFile: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/uploadFile"; 
	},
	addQuestion: function() {
		return this.serverURL+this.appPath+"rest/gurasApp/addQuestion"; 
	}
};

var noWifiConfirmed=false;

var subjects = {
		total: 2,
		subject: [
		           {
		        	   titleES: 'Matemática',
		        	   titleEU: 'Matematika',
		        	   total: 1,
		        	   chapters: [
		        		   			{
		        		   				titleES: 'Divisores y Múltiplos',
		        		   				titleEU: 'Zatitzaile eta Multiploak',
		        		   				contentMain: 
		        		   					'<div style="text-align:center;width:100%;">'+
		        		   					'<iframe align="middle" src="https://www.youtube.com/embed/YW_04Esg4QQ?rel=0&enablejsapi=1" class="cast iframe" style="display: none;margin-left:10%;margin-right:10%;width:80%;"></iframe>'+
		        		   					'<iframe align="middle" src="https://www.youtube.com/embed/lDlkuobWh4M?rel=0&enablejsapi=1" class="eusk iframe" style="display: block;margin-left:10%;margin-right:10%;width:80%;"></iframe>'+
		        		   					'</div>',
		        		   				contentLinks: 
		        		   					'<h5 class="cast" style="display: none;text-align:center;font-weight:bold;">Links de interés</h5>'+
		        		   					'<h5 class="eusk" style="display: block;text-align:center;font-weight:bold;">Baliabide interesgarriak</h5>'+
		        		   					'<div style="border:solid black;margin-top:1px;">'+
		        		   					'<a href="" class="cast" style="display:none;text-align:center;text-decoration: none;margin-bottom:0px;font-size:1.5em;" onclick="openNav(\'https://es.wikipedia.org/wiki/M%C3%BAltiplo\',\'_system\',\'location=yes\')">Múltiplos</a>'+
		        		   					'<a href="" class="eusk" style="display:block;text-align:center;text-decoration: none;margin-bottom:0px;font-size:1.5em;" onclick="openNav(\'https://eu.wikipedia.org/wiki/Multiplo_(matematika)\',\'_system\',\'location=yes\')">Multiploak</a>'+			        		   				
		        		   					'</br>'+
		        		   					'<a href="" class="cast" style="display:none;text-align:center;text-decoration: none;margin-top:7px;font-size:1.5em;" onclick="openNav(\'http://nosolomates.es/ayuda/ayuda/divisores.htm\',\'_system\',\'location=yes\')">Divisores</a>'+
		        		   					'<a href="" class="eusk" style="display:block;text-align:center;text-decoration: none;margin-top:7px;font-size:1.5em;" onclick="openNav(\'http://recursostic.educacion.es/descartes/web/materiales_didacticos/EDAD_1eso_eus_multiplos_y_divisores/1quincena2_contenidos_1c.htm\',\'_system\',\'location=yes\')">Zatitzaileak</a>'+
		        		   					'</div>',
		        		   				contentGame: {
		        		   					pageId:['test0','mathGame'],
		        		   					buttonTitle: ['Test','Multiple']
		        		   				}
		        		   			}		        		   		
		        		   		]
		           },
		           {
		        	   titleES: 'Ciencias naturales',
		        	   titleEU: 'Natur zientziak',
		        	   total: 1,
		        	   chapters: [
		        		   			{
		        		   				titleES: 'Aparato reproductor',
		        		   				titleEU: 'Ugaltze aparatua',
		        		   				contentMain: 
		        		   					'<div style="text-align:center;">'+
		        		   					'<img src="img/ugalketa-eus.png" class="eusk" style="width: 100%; height: 100%;margin-top:0;display:block;text-align:center" alt="Image1"'+
		        		   					 'onclick="openNav(\'file:///android_asset/www/img/ugalketa-eus.png\', \'_blank\', \'location=no,enableViewportScale=true\')">'+
		        		   					'<img src="img/ugalketa-es.jpg" class="cast" style="width: 60%; height: 50%;margin-left:15%;margin-top:0;display:none;text-align:center" alt="Image2"'+
		        		   					 'onclick="openNav(\'file:///android_asset/www/img/ugalketa-es.jpg\', \'_blank\', \'location=no,enableViewportScale=true\')">'+
		        		   					 '</div>'+
		        		   					'<audio id="ugaltze-audio-cas" controls class="cast" style="margin-left: 5%; margin-right:5%; width:90%;margin-top:2px;display:none;text-align:center;" onplay="stopOtherPlayers(this)"><source src="https://dl.dropbox.com/s/mmlicowqoted1a8/Aparato%20Reproductor.mp3" type="audio/mpeg"></audio>'+
		        		   					'<audio id="ugaltze-audio-eusk" controls class="eusk"  style="margin-left: 5%;margin-right:5%; width:90%;margin-top:2px;display:block;text-align:center;" onplay="stopOtherPlayers(this)"><source src="https://dl.dropbox.com/s/senpj15whv0zoik/Ugaltze%20aparatua.mp3" type="audio/mpeg"></audio>',
		        		   				contentLinks: 
			        		   					'<h5 class="cast" style="display: none;text-align:center;font-weight:bold;">Links de interés</h5>'+
			        		   					'<h5 class="eusk" style="display: block;text-align:center;font-weight:bold;">Baliabide interesgarriak</h5>'+
			        		   					'<div style="border:solid black;display:inline-block;margin-top:1px;">'+
			        		   					'<a href="" class="cast" style="display:none;text-align:center;text-decoration: none;margin-bottom:0px;font-size:1.5em;" onclick="openNav(\'https://es.wikipedia.org/wiki/Aparato_reproductor_masculino\',\'_system\',\'location=yes\')">Aparato reproductor masculino</a>'+
			        		   					'<a href="" class="eusk" style="display:block;text-align:center;text-decoration: none;margin-bottom:0px;font-size:1.5em;" onclick="openNav(\'http://ikasiz-ikasi.blogspot.com.es/2010/12/gizonezkoen-ugalketa-aparatua.html\',\'_system\',\'location=yes\')">Gizonen ugaltze aparatua</a>'+			        		   				
			        		   					'</br>'+
			        		   					'<a href="" class="cast" style="display:none;text-align:center;text-decoration: none;margin-top:7px;font-size:1.5em;" onclick="openNav(\'https://es.wikipedia.org/wiki/Aparato_genital_femenino\',\'_system\',\'location=yes\')">Aparato reproductor femenino</a>'+
			        		   					'<a href="" class="eusk" style="display:block;text-align:center;text-decoration: none;margin-top:7px;font-size:1.5em;" onclick="openNav(\'http://ikasiz-ikasi.blogspot.com.es/2010/12/emakumezkoen-ugaltze-aparatua.html\',\'_system\',\'location=yes\')">Emakumezkoen ugaltze aparatua</a>'+
			        		   					'</div>',
			        		   			contentGame: {
				        		   					pageId:['matchGame0'],
				        		   					buttonTitle: ['Game']
				        		   		}
		        		   			}        		   
		        		   		]
		           }		        
		          ]
};

var tests = {
		total: 0,
		test: []
};

/*
 * var tests = { total: 2, test: [ { questionES: 'This is the first
 * question...bla bla bla?ES', questionEU: 'This is the first question...bla bla
 * bla?EU', answerES: [ 'A: Wrong 0-0 with text adviceES', 'B: This is the right
 * oneES', 'C: Wrong 0-2 with local img adviceES', 'D: Wrong 0-3ES' ], answerEU: [
 * 'A: Wrong 0-0 with text adviceEU', 'B: This is the right oneEU', 'C: Wrong
 * 0-2 with local img adviceEU', 'D: Wrong 0-3EU' ], adviceES: 'AdviceES',
 * adviceEU: 'AdviceEU', correctAnswer: 1 }, { questionES: 'This is the second
 * question...bla bla bla?ES', questionEU: 'This is the second question...bla
 * bla bla?EU', answerES: [ 'A: Wrong 0-0 with text adviceES', 'B: This is the
 * right oneES', 'C: Wrong 0-2 with local img adviceES', 'D: Wrong 0-3ES' ],
 * answerEU: [ 'A: Wrong 0-0 with text adviceEU', 'B: This is the right oneEU',
 * 'C: Wrong 0-2 with local img adviceEU', 'D: Wrong 0-3EU' ], adviceES:
 * 'AdviceES', adviceEU: 'AdviceEU', correctAnswer: 1 } ] };
 */

var results = {
		corrects: 0,
		answered: 0
};

var forums = {
		total: 0,
		forum: []
};


var matchGame= [
	{
	imgSrc:"img/ugal-emakume-match.jpg",  
	questionsES:[
			['Ovario','Útero','Trompas de falopio','Cuello del útero', 'Vagina'],
			['Ovario','Útero','Trompas de falopio','Cuello del útero', 'Vagina'],
			['Ovario','Útero','Trompas de falopio','Cuello del útero', 'Vagina'],
			['Ovario','Útero','Trompas de falopio','Cuello del útero', 'Vagina'],
			['Ovario','Útero','Trompas de falopio','Cuello del útero', 'Vagina'],
			],
	questionsEU:[
			['Obulutegia','Umetokia','Falopioren tronpa','Umetokiaren lepoa', 'Bagina'],
			['Obulutegia','Umetokia','Falopioren tronpa','Umetokiaren lepoa', 'Bagina'],
			['Obulutegia','Umetokia','Falopioren tronpa','Umetokiaren lepoa', 'Bagina'],
			['Obulutegia','Umetokia','Falopioren tronpa','Umetokiaren lepoa', 'Bagina'],
			['Obulutegia','Umetokia','Falopioren tronpa','Umetokiaren lepoa', 'Bagina']
			],
	answers:[1,2,3,4,5]
	},
	{
		imgSrc:"img/ugal-gizon-match.jpg",  
		questionsES:[
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata'],
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata'],
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata'],
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata'],
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata'],
				['Vejiga','Vesícula seminal','Glande','Escroto','Tubos deferentes', 'Próstata']
				],
		questionsEU:[
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata'],
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata'],
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata'],
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata'],
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata'],
				['Gernu-maskuria','Semen-besikula','Glandea','Eskrotoa','Hodi deferentea', 'Prostata']
			],
		answers:[1,2,3,4,5,6]
	}
  
];

/*
 * var forums = { total: 2, forum: [ { login:null, title:'preg 1',
 * question:'AS', answer:null, teacher:'PETER', date: 20171022 }, { login:null,
 * title:'preg 2', question:'AS', answer:'ah', teacher:null, date: 20171022 } ] };
 */

var footerDiv='<div data-role="footer" data-position="fixed" style="padding-top: 1px;background-color: #c3cdd5" data-tap-toggle="false">'
	+ '<div class="ui-grid-a" style="text-align: center;">'
	+ '<a href="" id="button-es" class="ui-btn ui-btn-inline ui-corner-all"'
	+ 'style="text-align: center;" onclick="translateToLang(\'es\')">ES</a>'
	+ '<a href="" id="button-eu" class="ui-btn ui-btn-inline ui-corner-all"'
	+ 'style="text-align: center;" onclick="translateToLang(\'eu\')">EU</a>'
	+ '</div>'
	// + '<h4 style="margin-bottom: 1%">2017-2018</h4>'
	+ '</div>';

var menuPage = {
		load: function() {
		
		//var contentDiv = '<h2 style="width:100%;margin-top:1px;margin-botton:1px;"><span class="trn">Menu</span></h2>';
		var contentDiv='';
			
    	for(var i=0;i < subjects.total;i++) {
    		contentDiv +=  '<div data-role="collapsible" data-inset="false" data-collapsed="false" data-icon="" data-iconpos="" style="margin-bottom:0; margin-top:0;">';
    		contentDiv +=  '<h3><span class="appSubj'+i+'">'+subjects.subject[i].titleEU+'</span></h3>';
    		
    		contentDiv += '<ul data-role="listview" style="margin-bottom:0">';
    		for(var j=0; j < subjects.subject[i].total; j++ ) {
        		contentDiv +=  '<li><a href="#page-content'+i+'-'+j+'-main" class="appSubj'+i+'chap'+j+' waves-effect waves-button">'+subjects.subject[i].chapters[j].titleEU+'</a></li>';        			
     		}
    		
			contentDiv += '</ul>';
	    	contentDiv += '</div>';
    	}
    	
    	contentDiv +=  '<div data-role="collapsible" data-inset="false" data-collapsed="false" data-icon="" data-iconpos="" style="margin-bottom:0">';
		contentDiv +=  '<h3><span class="trn">Forums</span></h3>';
		contentDiv += '<ul data-role="listview" style="margin-bottom:0">';
    	contentDiv +=  '<li><a href="#page-forums" class="waves-effect waves-button"><span class="trn">QuestAns</span></a></li>';        			
		contentDiv += '</ul>';
    	contentDiv += '</div>';
		    	
    	var menu=$("#menu-content");
    	
    	menu.empty();
    	menu.append(contentDiv);
		}
};

var mainContentPage = {
		create: function(subjIndex, chapIndex) {
			
		var pageDiv=$('<div data-role="page" id="page-content'+subjIndex+'-'+chapIndex+'-main"></div>');
		
		var headerDiv = '<div data-role="header"   data-position="fixed" data-fullscreen="false" data-tap-toggle="false">'
			+ '<a href="#page-menu" class="ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button"'
			+ 'style="text-align: center;" onclick="stopPlayers()">'
			+ '<i class="zmdi zmdi-menu"></i></a>'
			+ '<h1 style="text-align:center; margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;" id="appName">gurasApp</h1>'
			+ '</div>'; 
		
		var contentDiv='<div data-role="content" style="text-align:center; padding-top: 0%;">'+
		'<h4 style="text-align:center;text-decoration:underline;font-weight:bold;margin-bottom:10px;margin-top:15px;">'+
		'<span id="titleSubj'+subjIndex+'chap'+chapIndex+'-main" class="appSubj'+subjIndex+'chap'+chapIndex+'"></span>'+
		'</h4>'+
		'<div id="dataSubj'+subjIndex+'chap'+chapIndex+'-main"></div>'+
		'<h5 class="cast" style="display: none;text-align:center;margin-top:10px;margin-bottom:0;font-weight:bold;">¿Quieres saber como ayudar a los niños a entender la lección?</h5>'+
		'<h5 class="eusk" style="display: block;text-align:center;margin-top:10px;margin-bottom:0;font-weight:bold;">Nola lagundu guzti hau barneratzen haurrei jakin nahi?</h5>'+
		'<a href="#page-content'+subjIndex+'-'+chapIndex+'-links" class="ui-btn ui-btn-raised ui-btn-inline ui-corner-all waves-effect waves-button" style="text-align: center;margin-top:10px;" onclick="stopPlayers()"><span class="trn">Links</span></a>'+
		'</div>';
				
		var footerdiv='<div data-role="footer" data-position="fixed" style="padding-top: 1px;background-color: #c3cdd5" data-tap-toggle="false">'
			+ '<div class="ui-grid-a" style="text-align: center;">'
			+ '<a href="" id="button-es" class="ui-btn ui-btn-inline ui-corner-all"'
			+ 'style="text-align: center;" onclick="translateToLang(\'es\');stopPlayers();">ES</a>'
			+ '<a href="" id="button-eu" class="ui-btn ui-btn-inline ui-corner-all"'
			+ 'style="text-align: center;" onclick="translateToLang(\'eu\');stopPlayers();">EU</a>'
			+ '</div>'
			+ '</div>';
		
		pageDiv.append(headerDiv,contentDiv,footerdiv);

		return pageDiv;
		},
		load: function(subjIndex, chapIndex) {
			
			var title=$("#titleSubj"+subjIndex+"chap"+chapIndex+"-main");
			var data=$("#dataSubj"+subjIndex+"chap"+chapIndex+"-main");
			
			data.empty();
			
			title.text(subjects.subject[subjIndex].chapters[chapIndex].titleEU);
			data.append(subjects.subject[subjIndex].chapters[chapIndex].contentMain);
		}
};

var linksContentPage = {
		create: function(subjIndex, chapIndex) {
			
		var pageDiv=$('<div data-role="page" id="page-content'+subjIndex+'-'+chapIndex+'-links"></div>');
		
		var headerDiv = '<div data-role="header"   data-position="fixed" data-fullscreen="false" data-tap-toggle="false">'
			+ '<a href="#page-menu" class="ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button"'
			+ 'style="text-align: center;">'
			+ '<i class="zmdi zmdi-menu"></i></a>'
			+ '<h1 style="text-align:center; margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;" id="appName">gurasApp</h1>'
			+ '</div>'; 
			
		
		var contentDiv='<div data-role="content" style="text-align:center; padding-top: 0%;">'+
		'<h3 style="text-align:center;text-decoration:underline;font-weight:bold;margin-bottom:10px;margin-top:15px;">'+
		'<span id="titleSubj'+subjIndex+'chap'+chapIndex+'-links" class="appSubj'+subjIndex+'chap'+chapIndex+'"></span>'+
		'</h3>'+
		'<div id="dataSubj'+subjIndex+'chap'+chapIndex+'-links"></div>'+
		'<h5 class="cast" style="display: none;font-weight:bold;margin-top:10px;">¿Quieres jugar?</h5>'+
		'<h5 class="eusk" style="display: block;font-weight:bold;margin-top:10px;">Jolastu nahi?</h5>'+
		'<div id="dataSubj'+subjIndex+'chap'+chapIndex+'-gameButtons"></div>'+
		'</div>';
		
		pageDiv.append(headerDiv,contentDiv,footerDiv);

		return pageDiv;
		},
		load: function(subjIndex, chapIndex) {
			var title=$("#titleSubj"+subjIndex+"chap"+chapIndex+"-links");
			var data=$("#dataSubj"+subjIndex+"chap"+chapIndex+"-links");
			var buttons=$("#dataSubj"+subjIndex+"chap"+chapIndex+"-gameButtons");
			

			data.empty();
			buttons.empty();
			
			title.text(subjects.subject[subjIndex].chapters[chapIndex].titleEU);
			data.append(subjects.subject[subjIndex].chapters[chapIndex].contentLinks);
			
			var button='';
			for (var i = 0; i < subjects.subject[subjIndex].chapters[chapIndex].contentGame.pageId.length; i++) {
				
				button+='<a id="hrefSubj-'+subjIndex+'-'+chapIndex+'-'+subjects.subject[subjIndex].chapters[chapIndex].contentGame.pageId[i]+'" ';
				button+='href="#page-content-'+subjIndex+'-'+chapIndex+'-'+subjects.subject[subjIndex].chapters[chapIndex].contentGame.pageId[i]+'" ';
				button+='class="ui-btn ui-btn-raised ui-btn-inline ui-corner-all waves-effect waves-button" style="text-align: center;margin-left:5px;margin-right:5px;">';
				button+='<span class="trn">'+subjects.subject[subjIndex].chapters[chapIndex].contentGame.buttonTitle[i]+'</span></a>';
			}
			
			buttons.append(button);
		}
};

var matchGamePage = {
		create: function(subjIndex, chapIndex, i) {
			
		var pageDiv=$('<div data-role="page" id="page-content-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'"></div>');
		
		var headerDiv = '<div data-role="header"   data-position="fixed" data-fullscreen="false" data-tap-toggle="false">'
			+ '<a href="#page-content'+subjIndex+'-'+chapIndex+'-links" class="ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button"'
			+ 'style="text-align: center;" onclick="resetMatchGame('+subjIndex+','+ chapIndex+')">'
			+ '<i class="zmdi zmdi-mail-reply"></i></a>'
			+ '<h1 style="text-align:center; margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;" id="appName">gurasApp</h1>'
			+ '</div>'; 
		
		var contentDiv='<div data-role="content" style="text-align:center; padding-top: 0%;">'+
		'<h3 style="text-align:center;text-decoration:underline;font-weight:bold;margin-bottom:10px;margin-top:15px;">'+
		'<span id="titleSubj'+subjIndex+'chap'+chapIndex+'-matchGame'+i+'" class="appSubj'+subjIndex+'chap'+chapIndex+'"></span>'+
		'</h3>'+		
		'<img src="#" alt="Image-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'"  id="image-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'">'+
		'<div id="select-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'"></div>'+
		'<div style="display:block;width:80%;text-align:center;margin-top:5px;margin-bottom:10px;margin-left:10%;margin-right:20%;">'+
		'<a href="" id="button-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'" class="ui-btn ui-btn-raised ui-btn-inline ui-corner-all waves-effect waves-button" style="display:block;text-align:center;margin-top:5px;margin-bottom:10px;" onclick="">'+
		'<span class="trn">Check</span></a>'+
		'<a href="#" id="next-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'" class="ui-btn ui-corner-all ui-btn-raised waves-effect waves-button" data-transition="turn" style="display:none;margin-bottom:10px;text-align:center;" onclick=""><i class="zmdi zmdi-arrow-forward"></i>  <span class="trn">Next</span></a>'+
		'<a href="#" id="prev-'+subjIndex+'-'+chapIndex+'-matchGame'+i+'" class="ui-btn ui-corner-all ui-btn-raised waves-effect waves-button" data-transition="turn" style="text-align:center;"><i class="zmdi zmdi-arrow-back"></i>  <span class="trn">Prev</span></a>'+
		'</div>'+
		'</div>';
		
		pageDiv.append(headerDiv,contentDiv,footerDiv);
		

		return pageDiv;
		},
		load: function(subjIndex, chapIndex, index) {
			
			var game=matchGame[index];
			var data=$("#select-"+subjIndex+"-"+chapIndex+"-matchGame"+index);
			var imagen=$("img[id^='image-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"']");

			data.empty();
			
			imagen.attr("src", game.imgSrc);

			var content='';
			
			var nGrids=0;
			if(game.questionsES.length % 2 != 0)
				nGrids=(game.questionsES.length-1)/2+1;
			else
				nGrids=(game.questionsES.length)/2;
		
			var i=0;
			for(var j=0; j < nGrids; j++){

				content+='<div class="ui-grid-a" style="text-align: center;">';
				
				content+='<div class="ui-block-a" style="text-align: center;">'+
				'<div class="cast" style="display:none;font-weight:bold;"><i class="zmdi zmdi-thumb-up check-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:green;display:none;" ></i><i class="zmdi zmdi-thumb-down wrong-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:red;display:none;" ></i>  Número '+(i+1)+':</div>'+
				'<div class="eusk" style="display:block;font-weight:bold;"><i class="zmdi zmdi-thumb-up check-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:green;display:none;"></i><i class="zmdi zmdi-thumb-down wrong-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:red;display:none;"  ></i>  '+(i+1)+'. zenbakia:</div>'+
				'<select class="select-matchGame" id="select-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'">'+
				'<option value="-1"  data-EU="Hauta"  data-ES="Elegir">Hauta</option>';
				
				var questionES=game.questionsES[i];
				var questionEU=game.questionsEU[i];
				var questionOrder = randomList(0, questionES.length - 1);

				for(var k=0; k < questionOrder.length; k++){
					content+='<option value="'+(questionOrder[k]+1)+'"  data-EU="'+questionEU[questionOrder[k]]+'"  data-ES="'+questionES[questionOrder[k]]+'">'+questionEU[questionOrder[k]]+'</option>';
				}
				content+='</select>'+
				'</div>';
				
				i++;
				
				if(i < game.questionsES.length){
					content+='<div class="ui-block-b" style="text-align: center;">'+
					'<div class="cast" style="display:none;font-weight:bold;"><i class="zmdi zmdi-thumb-up check-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:green;display:none;" ></i><i class="zmdi zmdi-thumb-down wrong-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:red;display:none;"   ></i>  Número '+(i+1)+':</div>'+
					'<div class="eusk" style="display:block;font-weight:bold;"><i class="zmdi zmdi-thumb-up check-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:green;display:none;"></i><i class="zmdi zmdi-thumb-down wrong-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'-'+i+'" style="color:red;display:none;"   ></i>  '+(i+1)+'. zenbakia:</div>'+
					'<select class="select-matchGame" id="select-'+subjIndex+'-'+chapIndex+'-matchGame'+index+'" >'+
					'<option value="-1"  data-EU="Hauta"  data-ES="Elegir">Hauta</option>';
					
					questionES=game.questionsES[i];
					questionEU=game.questionsEU[i];
					questionOrder = randomList(0, questionES.length - 1);
	
					for(var k=0; k < questionOrder.length; k++){
						content+='<option value="'+(questionOrder[k]+1)+'"  data-EU="'+questionEU[questionOrder[k]]+'"  data-ES="'+questionES[questionOrder[k]]+'">'+questionEU[questionOrder[k]]+'</option>';
					}
					content+='</select>'+
					'</div>';
					
					i++;
				}
				
				content+='</div>';
			}
			
			data.append(content);
	     	$("#button-"+subjIndex+"-"+chapIndex+"-matchGame"+index).attr("onclick", "checkMatchGame("+subjIndex+","+chapIndex+","+index+")");
			
			$("#prev-"+subjIndex+"-"+chapIndex+"-matchGame"+index).attr("href","#page-content-"+subjIndex+"-"+chapIndex+"-matchGame"+(index-1));
	     	$("#next-"+subjIndex+"-"+chapIndex+"-matchGame"+index).attr("href","#page-content-"+subjIndex+"-"+chapIndex+"-matchGame"+(index+1));
		}
}; 	


var testPage = {
		create: function(subjIndex, chapIndex, i) {
			
			var pageDiv=$('<div data-role="page" id="page-content-'+subjIndex+'-'+chapIndex+'-test'+i+'"></div>');

			var headerDiv = '<div data-role="header"   data-position="fixed" data-fullscreen="false" data-tap-toggle="false">'
				+ '<a href="#page-content'+subjIndex+'-'+chapIndex+'-links" class="ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button"'
				+ 'style="text-align: center;" onclick="resetTests('+subjIndex+','+ chapIndex+')">'
				+ '<i class="zmdi zmdi-mail-reply"></i></a>'
				+ '<h1 style="text-align:center; margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;" id="appName">gurasApp</h1>'
				+ '</div>'; 
			
			var contentDiv=
				'<div data-role="content">'+
					'<form id="form-'+subjIndex+'-'+chapIndex+'-test'+i+'"  class="ui-controlgroup ui-controlgroup-vertical ui-corner-all" data-answered="no">'+
						'<fieldset data-role="controlgroup" data-iconpos="left">'+
						'<legend id="question-'+subjIndex+'-'+chapIndex+'-test'+i+'-EU" class="eusk" style="display: block;text-align:left;font-size:1em;"></legend>'+
						'<legend id="question-'+subjIndex+'-'+chapIndex+'-test'+i+'-ES" class="cast" style="display: none;text-align:left;font-size:1em;"></legend>'+
						'<input name="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'" id="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'a" data-mini="false" value="0" type="radio"/>'+
						'<label for="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'a" id="label-radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'-0" class="ui-btn ui-corner-all ui-btn-inherit" style="padding-top:1%;"></label>'+	
						'<input name="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'" id="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'b" data-mini="false" value="1" type="radio"/>'+
						'<label for="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'b" id="label-radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'-1" class="ui-btn ui-corner-all ui-btn-inherit" style="padding-top:1%;"></label>'+
						'<input name="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'" id="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'c" data-mini="false" value="2" type="radio"/>'+
						'<label for="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'c" id="label-radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'-2" class="ui-btn ui-corner-all ui-btn-inherit" style="padding-top:1%;"></label>'+
						'<input name="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'" id="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'d" data-mini="false" value="3" type="radio"/>'+
						'<label for="radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'d" id="label-radio-choice-'+subjIndex+'-'+chapIndex+'-test'+i+'-3" class="ui-btn ui-corner-all ui-btn-inherit" style="padding-top:1%;"></label>'+
						'</fieldset>'+
						'<div style="display:block;width:80%;text-align:center;margin-top:5px;margin-bottom:10px;margin-left:10%;margin-right:20%;">'+
							'<a href="" id="checkButton-'+subjIndex+'-'+chapIndex+'-test'+i+'" class="ui-btn ui-btn-raised ui-btn-inline ui-corner-all waves-effect waves-button" onclick="" style="display:block;text-align:center;margin-top:5px;margin-bottom:10px;"><span class="trn">Check</span></a>'+
							'<a href="" id="adviceButton-'+subjIndex+'-'+chapIndex+'-test'+i+'" class="ui-btn ui-btn-raised ui-btn-inline ui-corner-all waves-effect waves-button" style="display:none;margin-bottom:10px;text-align:center;" onclick=""><span class="trn">Advice</span></a>'+						
							'<a href="#" id="next-'+subjIndex+'-'+chapIndex+'-test'+i+'" class="ui-btn ui-corner-all ui-btn-raised waves-effect waves-button" data-transition="turn" style="display:none;margin-bottom:10px;text-align:center;" onclick=""><i class="zmdi zmdi-arrow-forward"></i>  <span class="trn">Next</span></a>'+
							'<a href="#" id="prev-'+subjIndex+'-'+chapIndex+'-test'+i+'" class="ui-btn ui-corner-all ui-btn-raised waves-effect waves-button" data-transition="turn" style="display:block;text-align:center;"><i class="zmdi zmdi-arrow-back"></i>  <span class="trn">Prev</span></a>'+
						'</div>'+
					'</form>'+				
				'</div>';
			
			
			var footerTest='<div data-role="footer" data-position="fixed" style="padding-top: 1px;background-color: #c3cdd5" data-tap-toggle="false">'
				+ '<div class="ui-grid-a" style="text-align: center;">'
				+'<div style="text-align: center;"><span class="trn">Results</span>: '
				+'<span class="res-1">0</span>/'
				+'<span class="res-2">0</span>'
				+'</div>'
				+ '<a href="" id="button-es" class="ui-btn ui-btn-inline ui-corner-all"'
				+ 'style="text-align: center;" onclick="translateToLang(\'es\')">ES</a>'
				+ '<a href="" id="button-eu" class="ui-btn ui-btn-inline ui-corner-all"'
				+ 'style="text-align: center;" onclick="translateToLang(\'eu\')">EU</a>'
				+ '</div>'
				// + '<h4 style="margin-bottom: 1%">2017-2018</h4>'
				+ '</div>';
			
			pageDiv.append(headerDiv,contentDiv,footerTest);
						
			return pageDiv;
		},
		load: function(subjIndex, chapIndex, i, test) {			
	     	$("#question-"+subjIndex+'-'+chapIndex+'-test'+i+"-EU").text((i+1)+". Galdera: "+test.questionEU);
	     	$("#question-"+subjIndex+'-'+chapIndex+'-test'+i+"-ES").text("Pregunta "+(i+1)+": "+test.questionES);

	     	
	     	$("label[id|='label-radio-choice-"+subjIndex+'-'+chapIndex+'-test'+i+"']").each(
	     			function(index) {   
	     				$(this).text(test.answerEU[index]);  
	     				
	    		    }
	     	);
	     	
	     	$("#checkButton-"+subjIndex+"-"+chapIndex+"-test"+i).attr("onclick", "checkTest("+subjIndex+","+chapIndex+","+i+","+test.correctAnswer+")");
	     	$("#adviceButton-"+subjIndex+"-"+chapIndex+"-test"+i).attr("onclick", "showAdvice('"+test.adviceES+"','"+test.adviceEU+"')");

	     	$("#prev-"+subjIndex+"-"+chapIndex+"-test"+i).attr("href","#page-content-"+subjIndex+"-"+chapIndex+"-test"+(i-1));
	     	$("#next-"+subjIndex+"-"+chapIndex+"-test"+i).attr("href","#page-content-"+subjIndex+"-"+chapIndex+"-test"+(i+1));
	 	}
};

var mathGame= {
		refNumber:1,
		currentRound: 0,
		results: [
			0,
			0
		],
		create: function(tableLength) {		
			var currentNumber=1;
			var tableContent='';

			for(rowIndex=0; rowIndex<tableLength; rowIndex++) {
				tableContent+='<tr>';
				for(colIndex=0; colIndex<tableLength; colIndex++) {
					tableContent+='<td style=""><button id="dataSubj2chap2-game-button-'+rowIndex+'-'+colIndex+'" class="mathGameButton" value="'+currentNumber+'" onclick="buttonClicked(value, id)" style="font-size:1.5em;width:100%;background-color:transparent; border:none;outline:none;background-repeat:no-repeat;">'+currentNumber+'</button></td>';
					currentNumber++;
				}
				tableContent+='</tr>';			
			}
			$("#requestTableLength").hide();
			$("#table-1").append(tableContent);
			mathGame.refNumber=Math.floor((Math.random() * (tableLength)) + 1);
			if (selectedLang.localeCompare("es") == 0)
				alert("EMPEZAMOS CON EL NÚMERO: "+mathGame.refNumber);
			else 
				if (selectedLang.localeCompare("eu") == 0)
					alert(mathGame.refNumber+" zenbakiarekin hasiko gara");
				
			$(".mathGameButton[value='"+mathGame.refNumber+"']").addClass("ui-disabled");
		},
		reset: function() {
			mathGame.currentRound=0;
			mathGame.results[0]=0;
			mathGame.results[1]=0;
			
			$("#marcador0").text(0);
			$("#marcador1").text(0);
			
		}
	};

	var mathGamePage = {
			create: function(subjIndex, chapIndex) {
				var pageDiv=$('<div data-role="page" id="page-content-'+subjIndex+'-'+chapIndex+'-mathGame"></div>');
				
				var headerDiv = '<div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">'
					+ '<a href="#page-content'+subjIndex+'-'+chapIndex+'-links" class="ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button"'
					+ 'style="text-align: center;" onclick="mathGamePage.load('+subjIndex+','+ chapIndex+')">'
					+ '<i class="zmdi zmdi-mail-reply"></i></a>'
					+ '<h1 style="text-align:center;margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">gurasApp</h1>'
					+ '</div>'; 
				
				var contentDiv=
					'<div data-role="content" style="text-align:center;">'+
					'<h3 style="text-align:center;text-decoration:underline;font-weight:bold;margin-bottom:10px;margin-top:10px;">'+
					'<span id="titleSubj'+subjIndex+'chap'+chapIndex+'-mathGame" class="appSubj'+subjIndex+'chap'+chapIndex+'">MÚLTIPLOS Y DIVISORES</span></h3>'+
					'<div id="dataSubj'+subjIndex+'chap'+chapIndex+'-mathGame" style="">'+	
						'<table id="table-0-'+subjIndex+'chap'+chapIndex+'-mathGame" style="width:60%;margin:auto; border:black solid 1px;">'+
								'<tr>'+
									'<td colspan="4" style="width:100%;"><span class="trn">Scoreboard</span></td>'+
								'</tr>'+
								'<tr>'+
									'<td style="width:10%;"><button style="background-color:blue;"></button></td>'+
									'<td style="width:40%; text-align:left;">: <span id="marcador0">0</span></td>'+
									'<td style="width:10%;"><button style="background-color:green;"></button></td>'+
									'<td style="width:40%; text-align:left;">: <span id="marcador1">0</span></td>'+
								'</tr>'+
						'</table>'+
						'<div class="ui-grid-c" id="requestTableLength" style="padding:5%; margin:auto;">'+
							'<div class="ui-block-a" style="width:100%;"><span class="trn">Select table size</span></div>'+
							'<div class="ui-block-a" style="width:25%; padding:2px;"><button onclick="mathGame.create(4)" style="padding-left:25%;">4x4</button></div>'+
							'<div class="ui-block-b" style="width:25%; padding:2px;"><button onclick="mathGame.create(5)" style="padding-left:25%;">5x5</button></div>'+
							'<div class="ui-block-c" style="width:25%; padding:2px;"><button onclick="mathGame.create(6)" style="padding-left:25%;">6x6</button></div>'+
							'<div class="ui-block-d" style="width:25%; padding:2px;"><button onclick="mathGame.create(7)" style="padding-left:25%;">7x7</button></div>'+					
						'</div>'+				
						'<table id="table-1" style="width:100%;margin:auto;margin-top:12px;">'+				
						'</table>'+
					'</div>';
							
				pageDiv.append(headerDiv,contentDiv,footerDiv);
							
				return pageDiv;
			},
			load: function(subjIndex, chapIndex) {
				mathGame.reset();
				
				$("#table-1").empty();
				$("#requestTableLength").show();
		 	}
	};


var forumsPage = {
		load: function() {
			
			//var contentDiv = '<h1><span class="trn">Forums</span></h1>';
			var contentDiv='';

			for(var i=0;i < forums.total;i++) { 
	    		contentDiv +=  '<div data-role="collapsible" data-inset="false" data-collapsed-icon="plus" data-expanded-icon="minus">';
	    		contentDiv +=  '<h3>'+forums.forum[i].title+'</h3>';
	    		contentDiv +=  '<p>';
	    		contentDiv +=  '<div>'
	    		contentDiv +=  '<div style="text-align:left;font-weight:bold;margin-bottom:10px;font-size:1.5em;"><span class="trn">Quest</span>:</div>';
	    		contentDiv +=  '<audio id="recorded-audio-'+i+'" controls src="'+appConstants.localPermanentStorageFolderAudio()+forums.forum[i].question+'" style="width: 75%;" onplay="stopOtherPlayers(this)"><span class="trn">No audio</span></audio>';
	    		contentDiv +=  '</div>';
	    			    		
	    		if(forums.forum[i].answer != null) {
	    		contentDiv +=  '<div><div style="text-align:left;font-weight:bold;font-size:1.5em;"><span class="trn">Ans</span>:</div><p style="word-wrap:break-word;text-align:left;margin-top:5px;">'+forums.forum[i].answer+'</p></div>';
	    		
	    		if(forums.forum[i].teacher != null)
	    		contentDiv +=  '<div><div style="text-align:left;font-weight:bold;font-size:1.5em;"><span class="trn">Teacher</span>:</div><p style="word-wrap:break-word;text-align:left;margin-top:5px;">'+forums.forum[i].teacher+'</p></div>';
	    	
	    		}
			
	    		contentDiv +=  '</p>';
		    	contentDiv +=  '</div>';
	    	}
			
			contentDiv += '<a href="#page-add-quest" class="ui-btn ui-btn-raised ui-btn-inherit ui-corner-all" style="margin-top:30px;"><span class="trn">Make quest</span></a>';
			
			var forum=$("#forums-content");
	    	
	    	forum.empty();
	    	forum.append(contentDiv);
		}
};

var fileUtilities = { 
		contentRead: null,
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
			var url="file://"+sourceFullPath;
			var destFile=destFolder+destName;
			var fileTransfer = new FileTransfer();

			fileTransfer.download(
				url,
				destFile,
				function() {
					window.resolveLocalFileSystemURL(url,
		    				function(fileEntry) {
								fileEntry.remove(onSuccess);
		    				},
		    				function(error) {
		    					//alert("Source file NOT removed");
		    				}
		    		);			
				},
				
				function (error) {
					//alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);		
		},
		uploadFileAsync: function(sourceFullPath,fileType,uploadFileServiceURL,onSuccess,onError) {
			var fileURL="file://"+sourceFullPath;
			var fileName=sourceFullPath.substring(sourceFullPath.lastIndexOf("/")+1);
			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.mimeType = "multipart/form-data";
			options.fileName = fileName;
			var params = {filetype:fileType};
			options.params=params;
			var ft = new FileTransfer();
			ft.upload(fileURL, encodeURI(uploadFileServiceURL), 
				function() {
// alert("File uploaded");
					if(onSuccess!=false)
						onSuccess();
				}, 
				function(error) {
	// alert("File upload ERROR: "+error.code);
					if(onError!=false)
						onError();
				}, 
				options
			);
		},
		writeContentToFileAsync: function(fileFolderURL,fileName,content,onSuccess) {
			window.resolveLocalFileSystemURL(
				fileFolderURL,
				function(dirEntry){
					dirEntry.getFile(
						fileName, 
						{create:true},
						function(fileEntry) {
							fileEntry.createWriter(
								function(fileWriter) {
									fileWriter.onwriteend=function() {
										fileWriter.onwriteend=function() {
											//alert("Content written to file: "+fileFolderURL+fileName);
											if(onSuccess!=false)
												onSuccess();
										};
										fileWriter.write(content);
									}
									fileWriter.truncate(0);
								},
								function(error) {
									//alert("Writing error: code "+error.code);
								}
							);
						},
						function(error) {
							//alert("File error: code "+error.code);
						}					
					);
				},
				function(error) {
					//alert("FileSystem error: code "+error.code);
				}				
			);
		},
		readTextFromFileAsync: function(fileFolderURL,fileName,onSuccess) { 

			window.resolveLocalFileSystemURL(
					fileFolderURL+fileName,
					function(fileEntry) {
						fileEntry.file(
							function(file) {
								var reader = new FileReader();
								reader.onloadend = function() {
									fileUtilities.contentRead=reader.result; 
									if(onSuccess!=false)
										onSuccess();								
								}
								reader.readAsText(file);
							},
							function(error) {
								//alert("File error: code "+error.code);
							}						
						);
					},
					function(error) {
						//alert("No session information is saved");
					}				
			);
		}
};

var audio = {
		media:null,
		fileFolder:null,
		fileName:null,
		create: function(fileFolder,fileName) {
			this.fileFolder=fileFolder;
			this.fileName=fileName;
			if(this.media)
				this.media.release(); 
			this.media = new Media(this.fileFolder+this.fileName);
		},
		doStartRecord: function() {

			this.create("", "tmprecording.3gp");
			if(this.media) {
		        this.media.startRecord();
		    }
			else {
				//alert("No hay file media");
			}
	
		},		
		doStopRecordAsync: function(fileFolder,fileName,onSuccess) {

			if(this.media) {
		        this.media.stopRecord();
		        fileUtilities.moveAsync("/sdcard/tmprecording.3gp",fileFolder,fileName,
		        	function() {
			    		audio.media.release();
			    		audio.media=null;
			    		audio.fileFolder=fileFolder;
			    		audio.fileName=fileName;
						if(onSuccess!=false)
							onSuccess();
		        	}
		        );
		    }
			else {
				//alert("No hay file media");
			}	
		}		
};

var user= {
		login: null,
		name: null,
		email: null,
		password: null
};