var Describe = function() {
	// 20180730
}
Describe.splitValue = function(str) {
	if (str) {
		if (str.length > 0) {
			return str.split(',');
		}
	}
	return [];
}
Describe.joinValue = function(o, split) {
	var s = ',';
	if (split) {
		s = '' + split;
	}
	if (o) {
		if (toString.apply(o) === '[object Array]') {
			return o.join(s);
		}
	}
	return o;
}
Describe.doPost = function(address, m, data) {
	$('#url').html(address);
	if ((m.resultContentType) && m.resultContentType.indexOf('application/json') > -1) {
		$.ajax({
			url : address,
			type : 'POST',
			headers : {
				'x-debugger' : true
			},
			contentType : (m.contentType.indexOf('application/json') > -1) ? m.contentType : false,
			processData : (m.contentType.indexOf('application/json') > -1) ? true : false,
			xhrFields : {
				'withCredentials' : true
			},
			data : ((m.contentType.indexOf('application/json') > -1) && (!m.useStringParameter) ? JSON.stringify(data) : data)
		}).always(function(resultJson) {
			$('#result').html(JSON.stringify(resultJson, null, 4));
			Describe.writeOut(m.outs, resultJson);
		});
	} else {
		$.ajax({
			url : address,
			type : 'POST',
			headers : {
				'x-debugger' : true
			},
			contentType : (m.contentType.indexOf('application/json') > -1) ? m.contentType : false,
			processData : (m.contentType.indexOf('application/json') > -1) ? true : false,
			xhrFields : {
				'withCredentials' : true
			},
			data : ((m.contentType.indexOf('application/json') > -1) && (!m.useStringParameter) ? JSON.stringify(data) : data)
		});
	}
}
Describe.doPut = function(address, m, data) {
	$('#url').html(address);
	if ((m.resultContentType) && m.resultContentType.indexOf('application/json') > -1) {
		$.ajax({
			url : address,
			type : 'PUT',
			headers : {
				'x-debugger' : true
			},
			contentType : (m.contentType.indexOf('application/json') > -1) ? m.contentType : false,
			processData : (m.contentType.indexOf('application/json') > -1) ? true : false,
			xhrFields : {
				'withCredentials' : true
			},
			data : ((m.contentType.indexOf('application/json') > -1) && (!m.useStringParameter) ? JSON.stringify(data) : data)
		}).always(function(resultJson) {
			$('#result').html(JSON.stringify(resultJson, null, 4));
			Describe.writeOut(m.outs, resultJson);
		});
	} else {
		$.ajax({
			url : address,
			type : 'PUT',
			headers : {
				'x-debugger' : true
			},
			contentType : (m.contentType.indexOf('application/json') > -1) ? m.contentType : false,
			processData : (m.contentType.indexOf('application/json') > -1) ? true : false,
			xhrFields : {
				'withCredentials' : true
			},
			data : ((m.contentType.indexOf('application/json') > -1) && (!m.useStringParameter) ? JSON.stringify(data) : data)
		});
	}
}
Describe.doGet = function(address, m) {
	$('#url').html(address);
	if ((m.resultContentType) && m.resultContentType.indexOf('application/json') > -1) {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : address,
			headers : {
				'x-debugger' : true
			},
			contentType : m.contentType,
			xhrFields : {
				'withCredentials' : true
			},
			crossDomain : true
		}).always(function(resultJson) {
			$('#result').html(JSON.stringify(resultJson, null, 4));
			Describe.writeOut(m.outs, resultJson);
		});
	} else {
		window.open(address, '_blank');
	}
}
Describe.doDelete = function(address, m) {
	$('#url').html(address);
	if ((m.resultContentType) && m.resultContentType.indexOf('application/json') > -1) {
		$.ajax({
			type : 'DELETE',
			dataType : 'json',
			url : address,
			headers : {
				'x-debugger' : true
			},
			contentType : m.contentType,
			xhrFields : {
				'withCredentials' : true
			},
			crossDomain : true
		}).always(function(resultJson) {
			$('#result').html(JSON.stringify(resultJson, null, 4));
			Describe.writeOut(m.outs, resultJson);
		});
	} else {
		$.ajax({
			type : 'DELETE',
			dataType : 'json',
			url : address,
			headers : {
				'x-debugger' : true
			},
			contentType : m.contentType,
			xhrFields : {
				'withCredentials' : true
			},
			crossDomain : true
		});
	}
}
Describe.writeOut = function(outs, json) {
	if (outs && (outs.length) && json && json.data) {
		$.each(Object.keys(json.data), function(i, k) {
			$('#out_' + k + '_out', '#outs').html(json.data[k]);
		});
	}
}

Describe.createSample= function(m) {
	var address = window.location.href;
	address = address.substring(0,address.indexOf("/jest/"));
	var address = address +"/"+ m.path;
	if (m.pathParameters && m.pathParameters.length > 0) {
		$.each(m.pathParameters, function(pi, p) {
			address = address.replace('{' + p.name + '}', '替换参数'+pi);
		});
	}
	if (m.queryParameters && m.queryParameters.length > 0) {
		$.each(m.queryParameters, function(pi, p) {
			var query = p.name + '=' + '替换参数'+pi;
			if (address.indexOf("?") > 0) {
				address += '&' + query;
			} else {
				address += '?' + query;
			}
		});
	}
	
	var strSample="";
	if (m.contentType.indexOf('application/json') > -1) {
		  strSample =  "var data = {};" + "\n";
			if (m.ins && m.ins.length > 0) {
				$.each(m.ins, function(ii, i) {
					switch (i.type) {
					default:
						if (i.isBaseType) {
							if (i.isCollection) {
								  strSample += 'data["'+i.name+'"] = ["参数1"];' + "\n";
							} else {
								  strSample += 'data["'+i.name+'"] = "参数";' + "\n";
							}
						} else {
							      strSample += 'data["'+i.name+'"] = {"参数1":"value1","参数2":"value2"};'+"\n";
						}
					}
				});
			} else if (m.useJsonElementParameter) {
				strSample += 'data = {"参数1":"value1","参数2":"value2"};' +"\n";
			} else if (m.useStringParameter) {
				strSample += 'data = "参数";'+"\n";
			}
			
			strSample += "$.ajax({" + "\n";
			strSample += "type : '"+ m.type + "',\n";
			strSample += "dataType : 'json'" + ",\n";
			strSample += "url : '"+address + "',\n";
			strSample += "headers : {'x-debugger' : true}" + ",\n";
			strSample += "contentType : '"+m.contentType+ "',\n";
			strSample += "xhrFields : {'withCredentials' : true}" + ",\n";
			strSample += "crossDomain : true"+ ",\n";
			strSample += "data : data"+"\n";
			strSample += "}).always(function(resultJson) {"+"\n";
			strSample += "alert(JSON.stringify(resultJson, null, 4))" +"\n";
			strSample += "});";
			
	} else {
			strSample = "var formData = new FormData();" + "\n";
			if (m.formParameters && m.formParameters.length > 0) {
				$.each(m.formParameters, function(pi, p) {
					if (p.type == "File") {
							//formData.append(p.name, $('input[type=file]', '#formParameters')[0].files[0]);
					strSample += 'formData.append("'+p.name+'", $("input[type=file]")[0].files[0]);' +  "\n";
					} else {
					strSample += 'formData.append("'+p.name+'", "参数'+pi+'");' +  "\n";
					}
				});
			}
			strSample += "$.ajax({" + "\n";
			strSample += "type : '"+ m.type + "',\n";
			strSample += "url : '"+address + "',\n";
			strSample += "headers : {'x-debugger' : true}" + ",\n";
			strSample += "contentType : false,\n";
			strSample += "processData  : false,\n";
			strSample += "xhrFields : {'withCredentials' : true}" + ",\n";
			strSample += "crossDomain : true"+ ",\n";
			strSample += "data : formData"+"\n";
			strSample += "});";	
	}

	return  strSample;
   }

Describe.prototype = {
	"load" : function() {
		var str = '<ul>';
		$.getJSON('../describe/describe.json?rd=' + Math.random(), function(json) {
			$.each(json.jaxrs, function(ji, j) {
				str += '<li xtype="menu" >' + j.name;
				$.each(j.methods, function(mi, m) {
					str += '<ul><li xtype="li"><a id ="' + j.name + '_' + m.name + '" href="#">' + m.name + '</a></li></ul>';
				});
				str += '</li>'
			});
			str += '</ul>';
			$("#menu").html(str);
			$.each(json.jaxrs, function(ji, j) {
				$.each(j.methods, function(mi, m) {
					$('#' + j.name + '_' + m.name).click(
							function() {
								$('#result').html('');
								var sample = "";
								var txt = '<fieldset id="method"><legend>Method</legend>';
								txt += '<table>';
								txt += '<tr><td>name:</td><td><a href="../describe/sources/' + m.className.replace(/\./g, '/') + '.java">' + m.name + '</a></td></tr>';
								txt += '<tr><td>path:</td><td>' + m.path + '</td></tr>';
								txt += '<tr><td>type:</td><td>' + m.type + '</td></tr>';
								txt += '<tr><td>description:</td><td>' + m.description + '</td></tr>';
								txt += '</table>';
								txt += '<button id="' + m.name + "_" + m.type + '">' + m.type + '</button>';
								txt += '<div id="url">&nbsp;</div>';
								txt += '</fieldset>';
								if (m.pathParameters && m.pathParameters.length > 0) {
									txt += '<fieldset id="pathParameters"><legend>Path Parameter</legend>';
									txt += '<table >';
									$.each(m.pathParameters, function(pi, p) {
										if (m.name == 'listNext' || m.name == 'listPrev') {
											switch (p.name) {
											case 'flag':
											case 'id':
												txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid" value="(0)"/></td><td>' + p.name
														+ ':' + p.description + '</td></tr>';
												break;
											case 'count':
												txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid" value="20"/></td><td>' + p.name + ':'
														+ p.description + '</td></tr>';
												break;
											default:
												txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + p.name + ':'
														+ p.description + '</td></tr>';
												break
											}
										} else {
											txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + p.name + ':'
													+ p.description + '</td></tr>';
										}
									});
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								if (m.formParameters && m.formParameters.length > 0) {
									txt += '<fieldset id="formParameters"><legend>Form Parameter</legend>';
									txt += '<table >';
									$.each(m.formParameters, function(pi, p) {
										if (p.type == "File") {
											txt += '<tr><td><input type="file" name="' + p.name + '" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>'
													+ p.name + ':' + p.description + '</td></tr>';
										} else {
											txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + p.name + ':'
													+ p.description + '</td></tr>';
										}
									});
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								if (m.queryParameters && m.queryParameters.length > 0) {
									txt += '<fieldset id="queryParameters"><legend>Query Parameter</legend>';
									txt += '<table >';
									$.each(m.queryParameters, function(pi, p) {
										txt += '<tr><td><input type="text" id="' + p.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + p.name + ':' + p.description
												+ '</td></tr>';
									});
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								if (m.ins && m.ins.length > 0) {
									txt += '<fieldset id="ins"><legend>In</legend>';
									txt += '<table>';
									$.each(m.ins, function(ii, i) {
										if (i.isCollection) {
											txt += '<tr><td><textarea id="' + i.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + i.name + ':' + i.description
											'</td></tr>';
										} else {
											txt += '<tr><td><input type="text" id="' + i.name + '" style="width:600px; padding:1px; border:1px #000000 solid"/></td><td>' + i.name + ':'
													+ i.description
											'</td></tr>';
										}
									});
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								
								if (m.useJsonElementParameter) {
									txt += '<fieldset><legend>JsonElement</legend>';
									txt += '<table><tr><td>';
									txt += '<textarea id="jsonElement" style="height:300px; width:600px; padding:1px; border:1px #000000 solid"/>';
									txt += '</td><td>json</td></tr>';
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								if (m.useStringParameter) {
									txt += '<fieldset><legend>String</legend>';
									txt += '<table><tr><td>';
									txt += '<textarea id="string" style="height:300px; width:600px; padding:1px; border:1px #000000 solid"/>';
									txt += '</td><td>string</td></tr>';
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								if (m.outs && m.outs.length > 0) {
									txt += '<fieldset id="outs"><legend>Out</legend>';
									txt += '<table>';
									$.each(m.outs, function(oi, o) {
										txt += '<tr><td>' + o.name + '</td><td>' + o.type + '</td><td>' + (o.isCollection ? 'multi' : 'single') + '</td><td>' + o.description + '</td><td id="out_'
												+ o.name + '_out">&nbsp;</td></tr>';
									});
									txt += '</table>';
									txt += '</fieldset>';
								}
								
								$('#content').html(txt);
								
								$('#' + m.name + '_' + m.type, '#method').click(function() {
									var address = '../' + m.path;
									if (m.pathParameters && m.pathParameters.length > 0) {
										$.each(m.pathParameters, function(pi, p) {
											address = address.replace('{' + p.name + '}', encodeURIComponent($('#' + p.name, '#pathParameters').val()));
										});
									}
									if (m.queryParameters && m.queryParameters.length > 0) {
										$.each(m.queryParameters, function(pi, p) {
											var query = p.name + '=' + encodeURIComponent($('#' + p.name, '#queryParameters').val());
											if (address.indexOf("?") > 0) {
												address += '&' + query;
											} else {
												address += '?' + query;
											}
										});
									}
									if (m.contentType.indexOf('application/json') > -1) {
										switch (m.type) {
										case 'POST':
											var data = {};
											if (m.ins && m.ins.length > 0) {
												$.each(m.ins, function(ii, i) {
													switch (i.type) {
													default:
														if (i.isBaseType) {
															if (i.isCollection) {
																data[i.name] = Describe.splitValue($('#' + i.name, '#ins').val());
															} else {
																data[i.name] = $('#' + i.name, '#ins').val();
															}
														} else {
															data[i.name] = $.parseJSON($('#' + i.name, '#ins').val());
														}
													}
												});
											} else if (m.useJsonElementParameter) {
												data = $.parseJSON($('#jsonElement').val());
											} else if (m.useStringParameter) {
												data = $('#string').val();
											}
											Describe.doPost(address, m, data);
											break;
										case 'PUT':
											var data = {};
											if (m.ins && m.ins.length > 0) {
												$.each(m.ins, function(ii, i) {
													switch (i.type) {
													default:
														if (i.isBaseType) {
															if (i.isCollection) {
																data[i.name] = Describe.splitValue($('#' + i.name, '#ins').val());
															} else {
																data[i.name] = $('#' + i.name, '#ins').val();
															}
														} else {
															data[i.name] = $.parseJSON($('#' + i.name, '#ins').val());
														}
													}
												});
											} else if (m.useJsonElementParameter) {
												data = $.parseJSON($('#jsonElement').val());
											} else if (m.useStringParameter) {
												data = $('#string').val();
											}
											Describe.doPut(address, m, data);
											break;
										case 'GET':
											Describe.doGet(address, m);
											break;
										case 'DELETE':
											Describe.doDelete(address, m);
											break;
										default:
											break;
										}
										
									} else {
										switch (m.type) {
										case 'POST':
											var formData = new FormData();
											if (m.formParameters && m.formParameters.length > 0) {
												$.each(m.formParameters, function(pi, p) {
													if (p.type == "File") {
														formData.append(p.name, $('input[type=file]', '#formParameters')[0].files[0]);
													} else {
														formData.append(p.name, $('#' + p.name, '#formParameters').val());
													}
												});
											}
											Describe.doPost(address, m, formData);
											break;
										case 'PUT':
											var formData = new FormData();
											if (m.formParameters && m.formParameters.length > 0) {
												$.each(m.formParameters, function(pi, p) {
													if (p.type == "File") {
														formData.append(p.name, $('input[type=file]', '#formParameters')[0].files[0]);
													} else {
														formData.append(p.name, $('#' + p.name, '#formParameters').val());
													}
												});
											}
											Describe.doPut(address, m, formData);
											break;
										case 'GET':
											Describe.doGet(address, m);
											break;
										case 'DELETE':
											Describe.doDelete(address, m);
											break;
										default:
											break;
										}
									}
								})
								
								debugger;
							 $('#Sample').html(Describe.createSample(m));
							});
				});
			});
		 
		  $("[xtype='menu']").click(
				  function(event) {
					    if(event.stopPropagation){
						    event.stopPropagation();
						  }else{
						     event.cancelBubble = true;
						  }
					    $(this).children().toggle();
					});
		  $("[xtype='li']").click( function(event) {
			    if(event.stopPropagation){
				    event.stopPropagation();
				  }else{
				     event.cancelBubble = true;
				  }
			})
		});
		
	
	}
}