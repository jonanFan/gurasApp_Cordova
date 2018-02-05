/*function unsetExit() {
	document.removeEventListener("backbutton", exit);
}*/

function exit(e) {
	var id = $.mobile.activePage.attr('id');

	if (id.localeCompare("page-menu") == 0
			|| id.localeCompare("page-init") == 0) {
		navigator.app.exitApp();
	}/* else if (id.localeCompare("page-reg") == 0) {
		$("input[id$='input-reg']").each(function() {
			$(this).val("");
		});
		window.location = "#page-init";

	} else if (id.localeCompare("page-log") == 0) {
		$("input[id$='input-log']").each(function() {
			$(this).val("");
		});
		window.location = "#page-init";
	}
	
	  else { window.history.back(); }
	 */
}

function resetLog(){
	$("input[id$='input-log']").each(function() {
		$(this).val("");
	});
}

function resetReg(){
	$("input[id$='input-reg']").each(function() {
		$(this).val("");
	});
}

function register() {

	var name = $("#name-input-reg").val();
	var email = $("#email-input-reg").val();
	var password = $("#password-input-reg").val();

	if (name == null || name == undefined || name == "" || email == null
			|| email == undefined || email == "" || password == null
			|| password == undefined || password == "") {
		if (selectedLang.localeCompare("es") == 0) {
			window.plugins.toast
					.showShortBottom('\tSe deben introducir todos los datos');
		} else if (selectedLang.localeCompare("eu") == 0) {
			window.plugins.toast
					.showShortBottom('\tDatu guztiak sartu behar dira');
		}
	} else {
		user.name = name;
		user.email = email;
		user.password = password;

		var proceed = true;
		if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
			if (selectedLang.localeCompare("es") == 0) {
				proceed = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
			} else if (selectedLang.localeCompare("eu") == 0) {
				proceed = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
			}
			noWifiConfirmed = proceed;
		}

		if (proceed == true) {
			if (selectedLang.localeCompare("es") == 0) {
				SpinnerPlugin.activityStart("Registrando...", {
					dimBackground : true
				});
			} else if (selectedLang.localeCompare("eu") == 0) {
				SpinnerPlugin.activityStart("Erregistratzen...", {
					dimBackground : true
				});
			}

			$
					.ajax({
						type : "POST",
						url : appConstants.register(),
						data : JSON.stringify(user),
						dataType : "text",
						timeout : 10000,
						success : function(data) {
							if (data.localeCompare("ERROR") == 0) {
								if (selectedLang.localeCompare("es") == 0) {
									window.plugins.toast
											.showShortBottom('\tEl correo electronico proporcionado ya se encuentra vinculado a una cuenta');
								} else if (selectedLang.localeCompare("eu") == 0) {
									window.plugins.toast
											.showShortBottom('\tEmandako emaila beste kontu batera lotuta dago');
								}
							} else {
								$("input[id$='input-reg']").each(function() {
									$(this).val("");
								});
								user.login = data;
								$("#login-input-log").val(data);
								window.location = "#page-log";
							}
							SpinnerPlugin.activityStop();
						},
						error : function(request, status, err) {
							if (selectedLang.localeCompare("es") == 0) {
								window.plugins.toast
										.showShortBottom('\tEl servidor no responde');
							} else if (selectedLang.localeCompare("eu") == 0) {
								window.plugins.toast
										.showShortBottom('\tZerbitzariak ez du erantzuten');
							}

							SpinnerPlugin.activityStop();
						}
					});

			/*
			 * $ .post( appConstants.register(), JSON.stringify(user),
			 * function(data, status) { if (status == "success") { if
			 * (data.localeCompare("ERROR") == 0) { if
			 * (selectedLang.localeCompare("es") == 0) { window.plugins.toast
			 * .showShortBottom('\n\tEl correo electronico proporcionado ya se
			 * encuentra vinculado a una cuenta\t\n'); } else if (selectedLang
			 * .localeCompare("eu") == 0) { window.plugins.toast
			 * .showShortBottom('\n\tEmandako emaila beste kontu batera lotuta
			 * dago\t\n'); } } else { $("input[id$='input-reg']").each(
			 * function() { $(this).val(""); }); user.login = data;
			 * $("#login-input-log").val(data); window.location = "#page-log"; } }
			 * else { if (selectedLang.localeCompare("es") == 0) {
			 * window.plugins.toast .showShortBottom('\n\tEl servidor no
			 * responde\t\n'); } else if (selectedLang.localeCompare("eu") == 0) {
			 * window.plugins.toast .showShortBottom('\n\tZerbitzariak ez du
			 * erantzuten\t\n'); } } SpinnerPlugin.activityStop(); }, "text");
			 */
		}
	}
};

function login() {

	var login = $("#login-input-log").val();
	var password = $("#password-input-log").val();

	if (login == null || login == undefined || login == "" || password == null
			|| password == undefined || password == "") {
		if (selectedLang.localeCompare("es") == 0) {
			window.plugins.toast
					.showShortBottom('\tSe deben introducir todos los datos');
		} else if (selectedLang.localeCompare("eu") == 0) {
			window.plugins.toast
					.showShortBottom('\tDatu guztiak sartu behar dira');
		}
	} else {

		user.login = login;
		user.password = password;

		tryLogin();
	}

};

function tryLogin() {

	var proceed = true;
	if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
		if (selectedLang.localeCompare("es") == 0) {
			proceed = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
		} else if (selectedLang.localeCompare("eu") == 0) {
			proceed = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
		}
		noWifiConfirmed = proceed;
	}

	if (proceed == true) {
		if (selectedLang.localeCompare("es") == 0) {
			SpinnerPlugin.activityStart("Iniciando sesión...", {
				dimBackground : true
			});
		} else if (selectedLang.localeCompare("eu") == 0) {
			SpinnerPlugin.activityStart("Sesioa hasten...", {
				dimBackground : true
			});
		}

		$
				.ajax({
					type : "POST",
					url : appConstants.login(),
					data : JSON.stringify(user),
					dataType : "text",
					timeout : 10000,
					success : function(data) {
						if (data.localeCompare("LOGIN OK") == 0) {
							window.location = "#page-menu";
							
							if ($("#store-user:checked").length > 0) {
								localStorage.setItem("user_login", user.login);
								localStorage.setItem("user_password",
										user.password);
							}

							$("input[id$='input-log']").each(function() {
								$(this).val("");
							});

							getTests(user.login, function() {
								reloadTests(); 
							});

							if (lastDate == null || lastDate == undefined) {
								getForums(
										user.login,
										0,
										function() {
											if ($("#store-user:checked").length > 0) {
												var dateNow = new Date();
												lastDate=dateNow.getFullYear()* 10000+ (dateNow.getMonth() + 1)* 100+ dateNow.getDate();
												localStorage
														.setItem(
																"last_date", lastDate);
											}
											reloadForums();
											checkForumQuestions();
										});
							} else {
								getForums(
										user.login,
										lastDate,
										function() {
											if ($("#store-user:checked").length > 0) {
												var dateNow = new Date();
												lastDate=dateNow.getFullYear()* 10000+ (dateNow.getMonth() + 1)* 100+ dateNow.getDate();
												localStorage
														.setItem(
																"last_date", lastDate);
											}
											reloadForums();
											checkForumQuestions();
										});
							}

						} else {
							if (selectedLang.localeCompare("es") == 0) {
								window.plugins.toast
										.showShortBottom('\tNo se ha podido iniciar sesión');
							} else if (selectedLang.localeCompare("eu") == 0) {
								window.plugins.toast
										.showShortBottom('\tEzin izan da sesioa hasi');
							}
							if ($.mobile.activePage.attr('id').localeCompare(
									"page-log") != 0)
								logout(0); // Clear data
						}
						SpinnerPlugin.activityStop();
					},
					error : function(request, status, err) {
						SpinnerPlugin.activityStop();
						if (selectedLang.localeCompare("es") == 0) {
							window.plugins.toast
									.showShortBottom('\tEl servidor no responde');
						} else if (selectedLang.localeCompare("eu") == 0) {
							window.plugins.toast
									.showShortBottom('\tZerbitzariak ez du erantzuten');
						}
					}
				});

		/*
		 * $ .post( appConstants.login(), JSON.stringify(user), function(data,
		 * status) { if (status == "success") { if (data.localeCompare("LOGIN
		 * OK") == 0) { window.location = "#page-menu"; if
		 * ($("#store-user:checked").length > 0) {
		 * localStorage.setItem("user_login", user.login);
		 * localStorage.setItem("user_password", user.password); }
		 * 
		 * $("input[id$='input-log']").each( function() { $(this).val(""); });
		 * 
		 * getTests(user.login, function() { reloadTests(); // TODO STORE
		 * LOCALLY });
		 * 
		 * if (lastDate == null || lastDate == undefined) { getForums(
		 * user.login, 0, function() { if ($("#store-user:checked").length > 0) {
		 * var dateNow = new Date(); localStorage .setItem( "last_date", dateNow
		 * .getFullYear() 10000 + (dateNow .getMonth() + 1) 100 + dateNow
		 * .getDate()); } reloadForums(); checkForumQuestions(); }); } else {
		 * getForums( user.login, lastDate, function() { if
		 * ($("#store-user:checked").length > 0) { var dateNow = new Date();
		 * localStorage .setItem( "last_date", dateNow .getFullYear() 10000 +
		 * (dateNow .getMonth() + 1) 100 + dateNow .getDate()); }
		 * reloadForums(); checkForumQuestions(); }); }
		 *  } else { if (selectedLang.localeCompare("es") == 0) {
		 * window.plugins.toast .showShortBottom('\n\tNo se ha podido iniciar
		 * sesión\t\n'); } else if (selectedLang.localeCompare("eu") == 0) {
		 * window.plugins.toast .showShortBottom('\n\tEzin izan da sesioa
		 * hasi\t\n'); } if ($.mobile.activePage.attr('id')
		 * .localeCompare("page-log") != 0) logout(); // Clear data } } else {
		 * if (selectedLang.localeCompare("es") == 0) { window.plugins.toast
		 * .showShortBottom('\n\tEl servidor no responde\t\n'); } else if
		 * (selectedLang.localeCompare("eu") == 0) { window.plugins.toast
		 * .showShortBottom('\n\tZerbitzariak ez du erantzuten\t\n'); } }
		 * SpinnerPlugin.activityStop(); }, "text");
		 */
	}
};

function logout(ask) {
	
	
	var confirmLogOut=true;
	
	if(ask==1)
	{
		if (selectedLang.localeCompare("es") == 0) {
			confirmLogOut = confirm("¿Deseas cerrar sesión?");
		} else if (selectedLang.localeCompare("eu") == 0) {
			confirmLogOut = confirm("Sesioa itxi nahi duzu?");
		}
	}

	if (confirmLogOut == true) {
		user.login = null;
		user.password = null;
		localStorage.removeItem("user_login");
		localStorage.removeItem("user_password");
		localStorage.removeItem("last_date");
		localStorage.removeItem("forums");
		
		forums = {
				total: 0,
				forum: []
		};
		
		var dirURL = "file://"
				+ appConstants.localPermanentStorageFolderAudio();
		dirURL.slice(0, -1);
		window.resolveLocalFileSystemURL(dirURL, function(dirEntry) {
			dirEntry.createReader().readEntries(function(entries) {
				if (entries.length != 0) {
					for (var i = 0; i < entries.length; i++) {
						entries[i].remove(function() {
						});
					}
				}

			});
		}, function(error) {
			//alert("Dir no existe");
		});

		window.location = "#page-init";
	}
}

function getTests(login, onSuccess) {
	var proceed = true;
	if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
		if (selectedLang.localeCompare("es") == 0) {
			proceed = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
		} else if (selectedLang.localeCompare("eu") == 0) {
			proceed = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
		}
		noWifiConfirmed = proceed;
	}

	if (proceed == true)
		$
				.ajax({
				type: "GET",
				url: appConstants.getTests(),
				data:{login : login},
				dataType: "json",
				timeout: 10000,
				success: function(response) {
								if (response.total != 0) {
									tests.total = response.total;
									tests.test = response.test;
								

								if ($("#store-user:checked").length > 0) {
									localStorage.setItem("tests", JSON
											.stringify(tests));
								 }
								}

								if (onSuccess != false)
									onSuccess();
				},
				error: function (response, status, err) {
								if (selectedLang.localeCompare("es") == 0) {
									window.plugins.toast
											.showShortBottom('\tEl servidor no responde');
								} else if (selectedLang.localeCompare("eu") == 0) {
									window.plugins.toast
											.showShortBottom('\tZerbitzariak ez du erantzuten');
								}
							}
				});
	
	/*$
	.getJSON(
			appConstants.getTests(),
			{
				login : login
			},
			function(response, status) {
				if (status == "success") {

					if (response.total != 0) {
						tests.total = response.total;
						tests.test = response.test;
					}

					if ($("#store-user:checked").length > 0) {
						localStorage.setItem("tests", JSON
								.stringify(tests));
					}

					if (onSuccess != false)
						onSuccess();
				} else {
					if (selectedLang.localeCompare("es") == 0) {
						window.plugins.toast
								.showShortBottom('\n\tEl servidor no responde\t\n');
					} else if (selectedLang.localeCompare("eu") == 0) {
						window.plugins.toast
								.showShortBottom('\n\tZerbitzariak ez du erantzuten\t\n');
					}
				}
			});*/
}

function reloadTests() {

	$("div[id^='page-content-'][id*='-test']").each(function() {
		$(this).remove();
	});

	$("a[id^='hrefSubj'][href*='test']").each(
			function() {
				var hrefArray = $(this).attr('href').split('-');
				var subjIndex = hrefArray[2];
				var chapIndex = hrefArray[3];

				var testsOrder = randomList(0, tests.total - 1);
				for (var k = 0; k < testsOrder.length; k++) {
					pageDiv = testPage.create(subjIndex, chapIndex, k);
					$("body").append(pageDiv);
					testPage.load(subjIndex, chapIndex, k,
							tests.test[(testsOrder[k])]);
				}

				$("#prev-" + subjIndex + "-" + chapIndex + "-test0").remove();
				var lastTest = $("#next-" + subjIndex + "-" + chapIndex
						+ "-test" + (tests.total - 1));
				lastTest.empty();
				lastTest.attr("href", "#page-menu");
				lastTest.attr("onclick", "returnMenu(" + subjIndex + ","
						+ chapIndex + ")");
				lastTest.append('<span class="trn">Return to menu</span>');
			});

	$("body").enhanceWithin();

	$(window).bind('resize', fitImg);

	translateToLang(selectedLang);
}

function getForums(login, date, onSuccess) {

	var proceed = true;
	if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
		if (selectedLang.localeCompare("es") == 0) {
			proceed = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
		} else if (selectedLang.localeCompare("eu") == 0) {
			proceed = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
		}
		noWifiConfirmed = proceed;
	}

	if (proceed == true)
		$
				.ajax({
						type:"GET",
						url:appConstants.getForums(),
						data:{
							login : login,
							date : date
						},
						dataType: "json",
						timeout: 10000,
						success: function(response) {
								if (response.total != 0) {
									if (lastDate == null
											|| lastDate == undefined) {
										forums.total = response.total;
										forums.forum = response.forum;
									} else {
										var i = forums.total - 1;
										for (i = forums.total - 1; i >= 0; i--) {
											if (forums.forum[i].date >= lastDate) {
												if (i == forums.total - 1) {
													forums.forum.pop();
												} else {
													forums.forum.splice(i, 1);
												}
												forums.total--;
											}
										}
										
										for (i = 0; i < response.total; i++) {
											for (var j = forums.total - 1; j >= 0; j--) {
													if(response.forum[i].question.localeCompare(forums.forum[j].question) == 0)
													{
														if (j == forums.total - 1) {
															forums.forum.pop();
														} else {
															forums.forum.splice(j, 1);
														}
														forums.total--;
													}
											}
										}
										
										for (i = 0; i < response.total; i++) {
											forums.forum
													.push(response.forum[i]);
											forums.total++;
										}
									}
									if ($("#store-user:checked").length > 0) {
										localStorage.setItem("forums", JSON
												.stringify(forums));
									}
								}

								if (onSuccess != false)
									onSuccess();
							},
							error: function(response, status, err) {
								if (selectedLang.localeCompare("es") == 0) {
									window.plugins.toast
											.showShortBottom('\tEl servidor no responde');
								} else if (selectedLang.localeCompare("eu") == 0) {
									window.plugins.toast
											.showShortBottom('\tZerbitzaria ez du erantzuten');
								}
							}
						});
	
	/*$
	.getJSON(
			appConstants.getForums(),
			{
				login : login,
				date : date
			},
			function(response, status) {
				if (status == "success") {
					if (response.total != 0) {
						if (lastDate == null
								|| lastDate == undefined) {
							forums.total = response.total;
							forums.forum = response.forum;
						} else {
							var i = forums.total - 1;
							for (i = forums.total - 1; i >= 0; i--) {
								if (forums.forum[i].date >= lastDate) {
									if (i == forums.total - 1) {
										forums.forum.pop();
									} else {
										forums.forum.splice(i, 1);
									}
									forums.total--;
								}
							}
							for (i = 0; i < response.total; i++) {
								forums.forum
										.push(response.forum[i]);
								forums.total++;
							}
						}
						if ($("#store-user:checked").length > 0) {
							localStorage.setItem("forums", JSON
									.stringify(forums));
						}
					}

					if (onSuccess != false)
						onSuccess();
				} else {
					if (selectedLang.localeCompare("es") == 0) {
						window.plugins.toast
								.showShortBottom('\n\tEl servidor no responde\t\n');
					} else if (selectedLang.localeCompare("eu") == 0) {
						window.plugins.toast
								.showShortBottom('\n\tZerbitzaria ez du erantzuten\t\n');
					}
				}
			});*/
}

function reloadForums() {
	forumsPage.load();

	$("body").enhanceWithin();

	$(window).bind('resize', fitImg);

	translateToLang(selectedLang);
}

function checkForumQuestions() {

	$("audio[id^='recorded-audio-").each(
			function() {
				var localUrl = $(this).attr('src');
				window.resolveLocalFileSystemURL("file://" + localUrl,
						function(fileEntry) {
						}, function(error) {
							var remoteUrl = appConstants.getAudioFile()
									+ localUrl.substring(localUrl
											.lastIndexOf("/") + 1);
							var fileTransfer = new FileTransfer();
							fileTransfer.download(remoteUrl, localUrl,
									function() {
										reloadForums();
									}, function(error) {
										/*alert('Archivo no descargado. '
												+ 'error.code: ' + error.code
												+ '\nerror.source: '
												+ error.source
												+ '\nerror.target: '
												+ error.target
												+ '\nerror.http_status: '
												+ error.http_status);*/
									});
						});
			});
}

function stopPlayers() {
	$('audio, video').each(function() {
		if (this.currentTime > 0) {
			this.pause(); // Stop playing
			this.currentTime = 0; // Reset time
			this.load();
		}
	});

	$('.iframe').each(
			function() {
				this.contentWindow.postMessage('{"event":"command","func":"'
						+ 'stopVideo' + '","args":""}', '*');
				// $(this).attr("src", $(this).attr("src"));
			});
};

function stopOtherPlayers(element) {
	$('audio,video')
			.each(
					function() {
						if ($(this).attr('id').localeCompare(
								$(element).attr('id')) != 0
								&& this.currentTime > 0) {
							this.pause();
							this.currentTime = 0;
						}
					});
};

function openNav(url,place, specs) {
	if (navigator.connection.type == Connection.UNKNOWN
			|| navigator.connection.type == Connection.NONE) {
		if (selectedLang.localeCompare("es") == 0) {
			alert("gurasAPP necesita de conexion a Internet para poder visualizar el link");
		} else if (selectedLang.localeCompare("eu") == 0) {
			alert("gurasAPP-ek Internet konexioa behar du linka erakusteko");
		}
	} else {
		var proceed = true;
		if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
			if (selectedLang.localeCompare("es") == 0) {
				proceed = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
			} else if (selectedLang.localeCompare("eu") == 0) {
				proceed = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
			}
			noWifiConfirmed = proceed;
		}

		if (proceed == true)
			cordova.InAppBrowser.open(url, place, specs);
	}
};

function returnFromAddQuest() {
	if (audio.media) {
		if (selectedLang.localeCompare("es") == 0) {
			window.plugins.toast
			.showShortBottom('\tEs necesario parar la grabación antes de salir');
		} else if (selectedLang.localeCompare("eu") == 0) {
			window.plugins.toast
			.showShortBottom('\tGrabazioa gelditu behar da atera baino lehen');
		}
	} else {
		$("#quest-title").val("");
		$("#quest-title").removeAttr("readonly");
		$("#send-record").css("display", "none");
		$("#audio-tmp").css("display", "none");
		$("#audio-tmp-text").css("display", "none");
		var url = "file://" + $("#audio-tmp").attr("src");
		window.resolveLocalFileSystemURL(url, function(fileEntry) {
			fileEntry.remove(function() {
				// alert("Borrado");
			});
		}, function(error) {
			// alert("Source file NOT removed");
		});

		window.location = "#page-forums";
	}
};

function sendAudioRecord() {

	var audioURL = $("#audio-tmp").attr("src");

	var uploadFile = true;
	if (navigator.connection.type != Connection.WIFI && !noWifiConfirmed) {
		if (selectedLang.localeCompare("es") == 0) {
			uploadFile = confirm("gurasApp requiere conectarse a un servidor. ¿Desea proceder sin WIFI?");
		} else if (selectedLang.localeCompare("eu") == 0) {
			uploadFile = confirm("gurasApp zerbitzari batera konektatu behar da. Aurrera jarraitu nahi duzu WIFI konekziorik gabe?");
		}
		noWifiConfirmed = uploadFile;
	}

	if (uploadFile == true) {
		fileUtilities.uploadFileAsync(audioURL, "audio", appConstants
				.uploadFile(), function() {

			$
			.ajax({
				type : "POST",
				url : appConstants.addQuestion(),
				data : JSON.stringify(newQuest),
				dataType : "text",
				timeout : 10000,
				success : function(data) {
					if (data.localeCompare("QUESTION ADD ERROR") == 0) {
						if (selectedLang.localeCompare("es") == 0) {
							window.plugins.toast
									.showShortBottom('\tNo se ha podido subir la pregunta al servidor');
						} else if (selectedLang.localeCompare("eu") == 0) {
							window.plugins.toast
									.showShortBottom('\tEzin izan da zerbitzarira galdera igo');
						}
					}
				},
				error : function(request, status, err) {
					if (selectedLang.localeCompare("es") == 0) {
						window.plugins.toast
								.showShortBottom('\tEl servidor no responde');
					} else if (selectedLang.localeCompare("eu") == 0) {
						window.plugins.toast
								.showShortBottom('\tZerbitzariak ez du erantzuten');
					}
				}
			});
			
			/*
			 * $ .post( appConstants.addQuestion(), JSON.stringify(newQuest),
			 * function(data, status) { if (status == "success") { if
			 * (data.localeCompare("QUESTION ADD ERROR") == 0) { alert("Ha habido un
			 * problema para subir la preg"); // TODO // CHANGE } } else { if
			 * (selectedLang.localeCompare("es") == 0) { window.plugins.toast
			 * .showShortBottom('\n\tEl servidor no responde\t\n'); } else if
			 * (selectedLang.localeCompare("eu") == 0) { window.plugins.toast
			 * .showShortBottom('\n\tZerbitzariak ez du erantzuten\t\n'); } }
			 * SpinnerPlugin.activityStop(); }, "text");
			 */
			//alert("Subido");
		}, function() {
			//alert("Ha petado");
		});

		var titleQuest = $("#quest-title").val();
		var fileName = audioURL.substring(audioURL.lastIndexOf("/") + 1);
		var dateNow = new Date();
		var dateStr = dateNow.getFullYear() * 10000 + (dateNow.getMonth() + 1)
				* 100 + dateNow.getDate();
		var newQuest = {
			login : user.login,
			title : titleQuest,
			question : fileName,
			answer : null,
			teacher : null,
			date : dateStr
		};

		forums.forum.push(newQuest);
		forums.total++;
		if ($("#store-user:checked").length > 0) {
			localStorage.setItem("forums", JSON.stringify(forums));
		}

		$("#quest-title").val("");
		$("#quest-title").removeAttr("readonly");
		$("#send-record").css("display", "none");
		$("#audio-tmp").css("display", "none");
		$("#audio-tmp-text").css("display", "none");
		reloadForums();
		window.location = "#page-forums";
	}
};

function startAudioRecord() {

	var questTitle = $("#quest-title").val();
	if (questTitle != null && questTitle != undefined
			&& questTitle.localeCompare("") != 0) {
		$("#quest-title").attr("readonly", true);
		$("#send-record").css("display", "none");
		$("#audio-tmp").css("display", "none");
		$("#audio-tmp-text").css("display", "none");
		audio.doStartRecord();
		$("#start-record").css("display", "none");
		$("#stop-record").css("display", "block");
	} else
	{
		if (selectedLang.localeCompare("es") == 0) {
			window.plugins.toast
					.showShortBottom('\tHay que poner primero el título de la pregunta');
		} else if (selectedLang.localeCompare("eu") == 0) {
			window.plugins.toast
					.showShortBottom('\tGalderari izenburua jarri behar zaio galdera grabatu aurretik');
		}
	}
};

function stopAudioRecord() {
	var fileFolder = appConstants.localPermanentStorageFolderAudio();
	var questTitle = $("#quest-title").val();
	var dateNow = Date.now();

	if (questTitle != null && questTitle != undefined
			&& questTitle.localeCompare("") != 0) {
		var fileName = user.login + "-" + questTitle + "-" + dateNow + ".3gp";

		audio.doStopRecordAsync(fileFolder, fileName,
				function() {
					$("#send-record").css("display", "block");
					$("#audio-tmp").attr("src",
							"" + audio.fileFolder + audio.fileName);
					$("#audio-tmp").css("display", "block");
					$("#audio-tmp-text").css("display", "block");
				});

		$("#start-record").css("display", "block");
		$("#stop-record").css("display", "none");
	}
};

function checkTest(subjIndex, chapIndex, testIndex, correctAnswer) {

	var button = $("input[name='radio-choice-" + subjIndex + "-" + chapIndex
			+ "-test" + testIndex + "']:checked");
	var prevAnswered=$("#form-"+subjIndex+"-"+chapIndex+"-test"+testIndex).attr("data-answered");
	
	if (button.length != 0) {
		
	if (prevAnswered.localeCompare("no") == 0) {
		results.answered++;
		$("#form-"+subjIndex+"-"+chapIndex+"-test"+testIndex).attr("data-answered", "yes");
	}
		
		var answer = button.val();

		if (answer == correctAnswer) {
			// alert("CORRECT");
			if (prevAnswered.localeCompare("no") == 0) {
				results.corrects++;
			}
			else {
				results.corrects+=0.5;
			}
			
			$(
					"#checkButton-" + subjIndex + "-" + chapIndex + "-test"
							+ testIndex).css("display", "none");
			$(
					"#adviceButton-" + subjIndex + "-" + chapIndex + "-test"
							+ testIndex).css("display", "none");

			$(
					"label[id^='label-radio-choice-" + subjIndex + "-"
							+ chapIndex + "-test" + testIndex + "']").each(
					function(index) {
						if (index == answer) {

							$(this).css({
								"color" : "white",
								"background-color" : "green"
							});
							
						} else {
							$(this).css({
								"color" : "#333",
								"background-color" : "#f6f6f6"
							});
						}
					});
			
			$(
					"input[id^='radio-choice-" + subjIndex + "-"
							+ chapIndex + "-test" + testIndex + "']").each(
					function(index) {
							$(this).attr("disabled","disabled");
					});

			$("#next-" + subjIndex + "-" + chapIndex + "-test" + testIndex)
					.css("display", "block");
		} else {
			// alert("WRONG");
		/*	$(
					"#adviceButton-" + subjIndex + "-" + chapIndex + "-test"
							+ testIndex).css("display", "block");*/

			$(
					"label[id|='label-radio-choice-" + subjIndex + "-"
							+ chapIndex + "-test" + testIndex + "']").each(
					function(index) {
						if (index == answer)
							$(this).css({
								"color" : "white",
								"background-color" : "red"
							});
						else
							$(this).css({
								"color" : "#333",
								"background-color" : "#f6f6f6"
							});
					});
		}

		$(".res-1").text("" + results.corrects)
		$(".res-2").text("" + results.answered);

	}
};

function checkMatchGame(subjIndex, chapIndex, index) {

	var game=matchGame[index];
	var nAnswers=game.answers.length;
	var correctAnswers=0;
	
	$("select[id='select-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"']").each(function(i){
		var selectedValue=$(this).find(":selected").val();
		if(selectedValue != undefined && game.answers[i]==selectedValue) {
			correctAnswers++;
			$(".check-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"-"+i).css("display", "inline");
			$(".wrong-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"-"+i).css("display", "none");
			
		}
		else
			{
			$(".wrong-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"-"+i).css("display", "inline");
			$(".check-"+subjIndex+"-"+chapIndex+"-matchGame"+index+"-"+i).css("display", "none");
			}
	});
		
	if(correctAnswers==nAnswers)
	{
		$(
				"#button-" + subjIndex + "-" + chapIndex + "-matchGame"
						+ index).css("display", "none");

		$("#next-" + subjIndex + "-" + chapIndex + "-matchGame" + index)
				.css("display", "block");
	}

};

function showAdvice(adviceES, adviceEU) {

	if (selectedLang.localeCompare("eu") == 0) {
		alert(adviceEU);
	} else if (selectedLang.localeCompare("es") == 0) {
		alert(adviceES);
	}
};

function returnMenu(subjIndex, chapIndex) {
	showResults();
	resetTests(subjIndex, chapIndex);
};

function showResults() {

	if (selectedLang.localeCompare("eu") == 0) {
		alert("Zorionak, %"
				+ (results.corrects * 100 / results.answered).toFixed(2)
				+ " ondo egin dituzu");
	} else if (selectedLang.localeCompare("es") == 0) {
		alert("Felicidades, has acertado el "
				+ (results.corrects * 100 / results.answered).toFixed(2) + "%");
	}
};

function resetTests(subjIndex, chapIndex) {

	results.answered = 0;
	results.corrects = 0;
	$(".res-1").text("0");
	$(".res-2").text("0");
	
	$("form[id^='form-"+subjIndex+"-"+chapIndex+"-test']").each(function(){
		$(this).attr("data-answered", "no");
	});
	

	$("label[id^='label-radio-choice-" + subjIndex + "-" + chapIndex + "']")
			.each(function(index) {
				$(this).removeClass("ui-radio-on");
				$(this).addClass("ui-radio-off");
				$(this).css({
					"color" : "#333",
					"background-color" : "#f6f6f6"
				});
			});

	$("input[id^='radio-choice-" + subjIndex + "-" + chapIndex + "']")
	.each(function(index) {
		$(this).removeAttr("checked");
		$(this).removeAttr("disabled");
	});

	$("*[id^='checkButton-" + subjIndex + "-" + chapIndex + "-test']").each(
			function(index) {
				$(this).css("display", "block");
			});
	
	$("*[id^='adviceButton-" + subjIndex + "-" + chapIndex + "-test']").each(
			function(index) {
				$(this).css("display", "none");
			});

	$("*[id^='next-" + subjIndex + "-" + chapIndex + "-test']").each(
			function(index) {
				$(this).css("display", "none");
			});

	var testsOrder = randomList(0, tests.total - 1);
	for (var k = 0; k < testsOrder.length; k++) {
		testPage.load(subjIndex, chapIndex, k, tests.test[testsOrder[k]]);
	}

	var lastTest = $("#next-" + subjIndex + "-" + chapIndex + "-test"
			+ (tests.total - 1));
	lastTest.empty();
	lastTest.attr("href", "#page-menu");
	lastTest.attr("onclick", "returnMenu(" + subjIndex + "," + chapIndex + ")");
	lastTest.append('<span class="trn">Return to menu</span>');
};

function resetMatchGame(subjIndex, chapIndex){
		
	for (var k = 0; k < matchGame.length; k++) {
		matchGamePage.load(subjIndex, chapIndex, k);
	}
	
	$("*[id^='button-" + subjIndex + "-" + chapIndex + "-matchGame']").each(
			function(index) {
				$(this).css("display", "block");
			});

	$("*[id^='next-" + subjIndex + "-" + chapIndex + "-matchGame']").each(
			function(index) {
				$(this).css("display", "none");
			});
	
	$("#prev-" + subjIndex + "-" + chapIndex + "-matchGame0").remove();
	var lastMatchGame = $("#next-" + subjIndex + "-" + chapIndex + "-matchGame"
			+ (matchGame.length - 1));
	lastMatchGame.empty();
	lastMatchGame.attr("href", "#page-menu");
	lastMatchGame.attr("onclick", "resetMatchGame(" + subjIndex + "," + chapIndex + ")");
	lastMatchGame.append('<span class="trn">Return to menu</span>');
	
	$("body").enhanceWithin();

	translateToLang(selectedLang);
}


function randomList(minNumber, maxNumber) {
	var array = [];
	var ranArray = [];
	var i;
	var j = 0;

	for (i = minNumber; i <= maxNumber; i++) {
		array.push(i);
	}

	while (i--) {
		j = Math.floor(Math.random() * (i + 1));
		ranArray.push(array[j]);
		array.splice(j, 1);
	}

	return ranArray;
};

function translatedAlert() {
	if (selectedLang.localeCompare("es") == 0)
		alert("No se puede pulsar otra vez");
	else if (selectedLang.localeCompare("eu") == 0)
		alert("Ezin da berriz sakatu");
}

function buttonClicked(currentNumber, buttonId) {

	if (currentNumber % mathGame.refNumber == 0
			|| mathGame.refNumber % currentNumber == 0) {
		mathGame.results[mathGame.currentRound]++;
		$("#marcador" + mathGame.currentRound).text(
				mathGame.results[mathGame.currentRound]);
		mathGame.refNumber = currentNumber;
		if (mathGame.currentRound == 0) {
			mathGame.currentRound = 1;
			$("#" + buttonId).css("background-color", "blue").css("color",
					"white");
		} else {
			mathGame.currentRound = 0;
			$("#" + buttonId).css("background-color", "green").css("color",
					"white");
		}
		$("#" + buttonId).attr("onclick", "translatedAlert()");
	} else {
		if (selectedLang.localeCompare("es") == 0)
			window.plugins.toast
			.showShortBottom('\tJUEGO TERMINADO');
		else if (selectedLang.localeCompare("eu") == 0)
			window.plugins.toast
			.showShortBottom('\tAMAITU DA JOKOA');

		$(".mathGameButton").each(function(index) {
			$(this).addClass("ui-disabled");
		});

		if (mathGame.results[0] == mathGame.results[1]){
			if(mathGame.results[0] != 0) {
			if (selectedLang.localeCompare("es") == 0)
				alert("FELICIDADES A LOS DOS");
			else if (selectedLang.localeCompare("eu") == 0)
				alert("ZORIONAK BIOI!");	
			} else
				{
				if (selectedLang.localeCompare("es") == 0)
					alert("NO HABEIS ACERTADO NINGUNA! INTENTARLO OTRA VEZ");
				else if (selectedLang.localeCompare("eu") == 0)
					alert("BIOK GALDU DUZUE! SAIATU BERRIRO");
				}
		}
		else if (mathGame.results[0] > mathGame.results[1]){
			if (selectedLang.localeCompare("es") == 0)
				alert("FELICIDADES AZUL!");
			else if (selectedLang.localeCompare("eu") == 0)
				alert("ZORIONAK URDIN!");
					}
		else {
			if (selectedLang.localeCompare("es") == 0)
				alert("FELICIDADES VERDE!");
			else if (selectedLang.localeCompare("eu") == 0)
				alert("ZORIONAK BERDEA!");
		}
	}
}

function refreshForums(){
	
	if (lastDate == null || lastDate == undefined) {
		getForums(
				user.login,
				0,
				function() {
					if ($("#store-user:checked").length > 0) {
						var dateNow = new Date();
						lastDate=dateNow.getFullYear()* 10000+ (dateNow.getMonth() + 1)* 100+ dateNow.getDate();
						localStorage
								.setItem(
										"last_date", lastDate);
					}
					reloadForums();
					checkForumQuestions();
				});
	} else {
		getForums(
				user.login,
				lastDate,
				function() {
					if ($("#store-user:checked").length > 0) {
						var dateNow = new Date();
						lastDate=dateNow.getFullYear()* 10000+ (dateNow.getMonth() + 1)* 100+ dateNow.getDate();
						localStorage
								.setItem(
										"last_date", lastDate);
					}
					reloadForums();
					checkForumQuestions();
				});
	}
}
