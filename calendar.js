/**
 * @author Oscar Villarreal
 */

var calendar = {}; // global namespace
			
		///////////GLOBAL VARIABLES////////////////
		    function daysInMonth(month,year) {	
				var dd = new Date(year, month, 0);
				return dd.getDate();
			}
			
			
			function createGlobals(redraw){
				
				if(redraw!==undefined){
					calendar = {};
				}
				calendar.Weekday=new Array(7);
				calendar.Weekday[0]="Sunday";
				calendar.Weekday[1]="Monday";
				calendar.Weekday[2]="Tuesday";
				calendar.Weekday[3]="Wednesday";
				calendar.Weekday[4]="Thursday";
				calendar.Weekday[5]="Friday";
				calendar.Weekday[6]="Saturday";
				
				
				
				calendar.NumOfPeople = 0; //count of number of people
				calendar.PeopleArr = new Array(); //array of people
				calendar.PeopleEvtArr = new Array(); //this is the array that holds all of the events for every person
				calendar.Inc = 0;
				calendar.Inc2 = 0; //incrementos for the arrays while looping through the people and events in the xml
				calendar.PeopleCont = ''; //people containers on the left hand side
				calendar.WeekInc = 0; //variable that contains the week incrementor to set the different weeks
				calendar.WeekPointer = 0; //pointer to the current week we are in, so that we can go back and fourth
				
				calendar.HoursArray = new Array();
				calendar.HoursArray[0] = "120000PM";
				calendar.HoursArray[1] = "123000PM";
				calendar.HoursArray[2] = "010000AM";
				calendar.HoursArray[3] = "013000AM";
				calendar.HoursArray[4] = "020000AM";
				calendar.HoursArray[5] = "023000AM";
				calendar.HoursArray[6] = "030000AM";
				calendar.HoursArray[7] = "033000AM";
				calendar.HoursArray[8] = "040000AM";
				calendar.HoursArray[9] = "043000AM";
				calendar.HoursArray[10] = "050000AM";
				calendar.HoursArray[11] = "053000AM";
				calendar.HoursArray[12] = "060000AM";
				calendar.HoursArray[13] = "063000AM";
				calendar.HoursArray[14] = "070000AM";
				calendar.HoursArray[15] = "073000AM";
				calendar.HoursArray[16] = "080000AM";
				calendar.HoursArray[17] = "083000AM";
				calendar.HoursArray[18] = "090000AM";
				calendar.HoursArray[19] = "093000AM";
				calendar.HoursArray[20] = "100000AM";
				calendar.HoursArray[21] = "103000AM";
				calendar.HoursArray[22] = "110000AM";
				calendar.HoursArray[23] = "113000AM";
				calendar.HoursArray[24] = "120000AM";
				calendar.HoursArray[25] = "123000AM";
				calendar.HoursArray[26] = "010000PM";
				calendar.HoursArray[27] = "013000PM";
				calendar.HoursArray[28] = "020000PM";
				calendar.HoursArray[29] = "023000PM";
				calendar.HoursArray[30] = "030000PM";
				calendar.HoursArray[31] = "033000PM";
				calendar.HoursArray[32] = "040000PM";
				calendar.HoursArray[33] = "043000PM";
				calendar.HoursArray[34] = "050000PM";
				calendar.HoursArray[35] = "053000PM";
				calendar.HoursArray[36] = "060000PM";
				calendar.HoursArray[37] = "063000PM";
				calendar.HoursArray[38] = "070000PM";
				calendar.HoursArray[39] = "073000PM";
				calendar.HoursArray[40] = "080000PM";
				calendar.HoursArray[41] = "083000PM";
				calendar.HoursArray[42] = "090000PM";
				calendar.HoursArray[43] = "093000PM";
				calendar.HoursArray[44] = "100000PM";
				calendar.HoursArray[45] = "103000PM";
				calendar.HoursArray[46] = "110000PM";
				calendar.HoursArray[47] = "113000PM";
				calendar.HoursArray[48] = "120000PM";
				
				calendar.CalMNumtoTxt = new Array();
				calendar.CalMNumtoTxt[1] = 'January';
				calendar.CalMNumtoTxt[2] = 'February';
				calendar.CalMNumtoTxt[3] = 'March';
				calendar.CalMNumtoTxt[4] = 'April';
				calendar.CalMNumtoTxt[5] = 'May';
				calendar.CalMNumtoTxt[6] = 'June';
				calendar.CalMNumtoTxt[7] = 'July';
				calendar.CalMNumtoTxt[8] = 'August';
				calendar.CalMNumtoTxt[9] = 'September';
				calendar.CalMNumtoTxt[10] = 'October';
				calendar.CalMNumtoTxt[11] = 'November';
				calendar.CalMNumtoTxt[12] = 'December';
			}
			
			
			createGlobals();//creates all of the global variables needed in the app. This runs only on the first run
			

			
			function startApSelDate(date){
				
				//calendar.StartDate = new Date("June 01, 2011 00:00:00 AM");
				if(date==undefined){
					calendar.StartDate = new Date();
				}else{
					calendar.StartDate = new Date(date);
				}
				
				calendar.DayTxt = calendar.StartDate.getDay();
				
			
				// date object set to this date in order to view events
				calendar.MonthNum = calendar.StartDate.getMonth(); //get the month in number
				calendar.MonthNum = parseInt(calendar.MonthNum)+1;
				calendar.DayNum = calendar.StartDate.getDate(); //get the day un number
				calendar.YearNum = parseInt(calendar.StartDate.getFullYear()); //get the year in number
	
				if(calendar.DayNum >12){ /////////////////////////check this contition it works but Im not 100% sure its right
					calendar.NextMonthMaxDays = daysInMonth((calendar.MonthNum)+1,calendar.YearNum);
					
					calendar.NextNextMonthMaxDays = daysInMonth(calendar.MonthNum+2,calendar.YearNum);
					
				}
			
				calendar.totalDaysInMonth = daysInMonth(calendar.MonthNum,calendar.YearNum);
			}

			

			
			
			
			function makeAjax(){
				$.ajax({
				  type: "GET",
				  url: "https://libraries.supportcentral.occamsresources.com/scproxy/dataforms/sup_dataform_viewall.asp?prod_id=1165&form_id=2110&xsl=&page_size=500",
				  //url:"dummyXML.xml",
				  dataType:"xml",
				  success: function(xml){
				  	
				    $(xml).find("ViewAll").each(function(){
				    	$(this).children('row').each(function(){
					    	
					    	var prev = $(this).find("SC_SYS_DF_LOGGED_BY");
							
					    	var ssoId = "";
					    	var sDate= $(this).find("SC_DF_FIELD_2").text();
							
							
					    	
					    	var changedDate = sDate + ' UTC';
							changedDate = dateFormat(new Date(changedDate),"mm/dd/yyyy hh:MM:ss TT");
							
							
							

					    	var eDate = $(this).find('SC_DF_FIELD_3').text();
							
							
							
					    	
					    	var changedEndDate = eDate + ' UTC';
					    	changedEndDate = dateFormat(new Date(changedEndDate),"mm/dd/yyyy hh:MM:ss TT");
							
							//console.log("eventStartsAt "+changedDate+" eventEndsAt "+changedEndDate);
	
					    	
					    	
							var eHour = changedEndDate.split(" ");
							eHour = eHour[1]+eHour[2];
							
					    	var acName = $(this).find("SC_DF_FIELD_5").text();
					    	var contract = $(this).find("SC_DF_FIELD_6").text();
					    	var activityTitle = $(this).find("SC_DF_FIELD_10").text();
					    	var activityDesc = $(this).find("SC_DF_FIELD_11").text();
					    	var caseId = $(this).find('SC_DF_FIELD_9').text();
					    	$(this).find("SC_DF_FIELD_1").children('person').each(function(){
					    		ssoId = $(this).find("SC_DF_SSO").text();
					    		calendar.PeopleCont = '<div class="person" id="'+ssoId+'" pos="'+calendar.Inc+'"><span class="centerPerson">';
					    							    		
					    		var personLink = $(this).find("SC_DF_PERSON_LINK").text();
					    		var acName = $(this).find('SC_DF_FIELD_5').text();
					    		var email = $(this).find("SC_DF_EMAIL").text();
					    		var fName = $(this).find("SC_DF_FIRST_NAME").text();
					    		var lName = $(this).find("SC_DF_LAST_NAME").text();
					    		var color = "red" //what ever field we are reading from the xml
					    		addPerson = jQuery.inArray(ssoId, calendar.PeopleArr);
					    		
					    		if(addPerson==-1){
					    			calendar.PeopleArr[calendar.Inc] = ssoId;
					    			calendar.PeopleCont = calendar.PeopleCont+fName+" "+lName+"</span></div>";
					    			$("#peopleWithEvents").append(calendar.PeopleCont);
				    				calendar.NumOfPeople++;
									calendar.Inc++;
					    		}
					    		
					    		calendar.PeopleEvtArr[calendar.Inc2] = new Array(ssoId, changedDate, changedEndDate, activityTitle, activityDesc, acName, contract, caseId,color,"sHour",eHour);
					    		calendar.Inc2++;
					    	});
					    	
					    	
					    });
					    
					    
				    })	
				    
				    createHtml(calendar.NumOfPeople,6);	    
				  }
				  
				 
				  
				});
				
				
			}
			
			
			
			
			
			function createHtml(rows,weeks){	
				
					var toAppend="";
					var time = 11;
					var mins = '';
					var spec = 'pm';
					var inLoop = 0;
					for(var i =0,ii=weeks*7; i<ii; i++){
						if(i!==0 && calendar.DayTxt!==6){
							calendar.DayTxt++;
						}else if(calendar.DayTxt == 6){
							
							calendar.DayTxt = 0;
						}
						if(i%7==0){
							calendar.WeekInc++;
						}
						
						if(calendar.Weekday[calendar.DayTxt]=="Monday"){
							toAppend+='<td class="day'+[i+1]+' week'+calendar.WeekInc+'"><table cellspacing="0" cellpadding="0" class="content">';
						}else{
							toAppend+='<td class="day'+[i+1]+'"><table cellspacing="0" cellpadding="0" class="content">';
						}
						
						
						toAppend+='<tr><td colspan="48">'+calendar.Weekday[calendar.DayTxt]+' '+calendar.CalMNumtoTxt[calendar.MonthNum]+' '+calendar.DayNum+'</td></tr><tr>';
						for(var j = 0, jj=24; j<jj; j++){
							if(j===1){
						   		time = 0;
						   		spec = 'am';
						   	}
						   	if(j===13){
						   		time=0;
						   		spec = 'pm';
						   	}
						   	
						   	time++;
							toAppend+='<td colspan="2" class="hour"><div class="fixedWidthHead">'+time+':00'+spec+'</div></td>';
						}
						toAppend+='</tr>';
						for(var k = -1, kk=rows; k<kk; k++){			
							toAppend+='<tr class="eventRow">';
							for(var l=0,ll=48; l<ll; l++){
								toAppend+='<td id="'+k+calendar.MonthNum+calendar.DayNum+calendar.YearNum+calendar.HoursArray[l]+'"><div class="fixedWidth"></div></td>';
							}
							calendar.DayNum = parseInt(calendar.DayNum);
							calendar.MonthNum = parseInt(calendar.MonthNum);
							toAppend+='</tr>';
						}
						toAppend+='</table></td>';
						calendar.DayNum++;
						
						
						if(calendar.DayNum > calendar.totalDaysInMonth && inLoop == 0){
							calendar.DayNum = 1;
							calendar.MonthNum++;
							inLoop++;
						}else if( inLoop == 1 && calendar.DayNum > calendar.NextMonthMaxDays ){
							calendar.DayNum = 1;
							calendar.MonthNum++;
							inLoop++;
						}else if(inLoop == 2 && calendar.DayNum > calendar.NextNextMonthMaxDays){
							calendar.DayNum = 1;
							calendar.MonthNum++;
						
						}
						
															
					}
					
					$("#firstRow").append(toAppend);
					var heightForTable = (rows+1)*43+10+'px';
					
					$(".calendarTableCont").css('height',heightForTable);
					
					createEvents();
					
					$(".hasEvent").hover(
					  function () {
					  	$(".toolTip").remove();
						var p = $(this);
						var position = p.position();
						//alert("left "+position.left + "top" + position.top );
						position.left = position.left+20;
						position.top = position.top-50;
					  	var info = $(this).attr('data');
					  	var toolTip = '<div class="toolTip" style="position:absolute; left:'+position.left+'px; top:'+position.top+'px; z-indez:1000">';
						toolTip+=info+'</div>';
					  	$('body').append(toolTip);
					  },
					  function () {					  	
					    $(".toolTip").remove();
					  }
					);
					
					
					
				}
			
			
			function createEvents(){
					
					
					for(var i=0,ii=calendar.PeopleEvtArr.length; i<ii; i++){
						//console.log("calendar.PeopleEvtArr "+calendar.PeopleEvtArr);
						var personId = calendar.PeopleEvtArr[i][0];
						
						
						//this we should replace with a regex
						var evtSt = calendar.PeopleEvtArr[i][1];
						
						
						evtSt = evtSt.replace("/","");
						evtSt = evtSt.replace("/","");
						evtSt = evtSt.replace(" ","");
						evtSt = evtSt.replace(" ","");
						evtSt = evtSt.replace(":","");
						evtSt = evtSt.replace(":","");

						
						if(evtSt[2]==0){
							var evtStLast = evtSt.slice(3,evtSt.length); //slice the day if it has ceroes
							var evtFirst = evtSt.slice(0,2); 
							evtSt = evtFirst+evtStLast;
							
						}
						if(evtSt[0]==0){
							evtSt = evtSt.slice(1,evtSt.length); //slice the month if it has ceroes
							
						}

						

						
						var evtEnd = calendar.PeopleEvtArr[i][2];
						var evtEndTime = calendar.PeopleEvtArr[i][10];
						//console.log("eventEndTime "+evtEndTime);
						
						
						evtEnd = evtEnd.replace("/","");
						evtEnd = evtEnd.replace("/","");
						evtEnd = evtEnd.replace(" ","");
						evtEnd = evtEnd.replace(" ","");
						evtEnd = evtEnd.replace(":","");
						evtEnd = evtEnd.replace(":","");
						
	
						
						
						
						
						if(evtEnd[2]==0){
							var evtEndLast = evtEnd.slice(3,evtEnd.length); //slice the day if it has ceroes
							var evtFirstLast = evtEnd.slice(0,2); 
							evtEnd = evtFirstLast+evtEndLast;
							
						}
						if(evtEnd[0]==0){
							evtEnd = evtEnd.slice(1,evtEnd.length); //slice the month if it has ceroes
							
						}
						
						//console.log("Event Starts At "+evtSt+" Event Ends At "+evtEnd);
						
						var evtName = calendar.PeopleEvtArr[i][3];
						var evtDesc = calendar.PeopleEvtArr[i][4];
						var evtAcName = calendar.PeopleEvtArr[i][5];
						var evtContract = calendar.PeopleEvtArr[i][6];
						var evtCaseId = calendar.PeopleEvtArr[i][7];
						var colorForBox = calendar.PeopleEvtArr[i][8];

						
						var finalData = "<div><strong>Title: </strong>"+evtName+"</div>";
						finalData+="<div><strong>Description: </strong>"+evtDesc+"</div>";
						finalData+="<div><strong>Account: </strong>"+evtAcName+"</div>";
						finalData+="<div><strong>Contract: </strong>"+evtContract+"</div>";
						finalData+="<div><strong>Case ID: </strong>"+evtCaseId+"</div>";
						
						var posPersonInList = $("#peopleWithEvents").find("#"+personId).attr('pos');
						
						var eventStartsAt = posPersonInList+evtSt;
						
						var eventStartToCompare = eventStartsAt.slice(0,eventStartsAt.length-2);
						
						eventStartToCompare = parseFloat(eventStartToCompare); // variable to compare when an event starts
						
						//console.log("eventStartToCompare "+eventStartToCompare);
						
						var eventEndsAt = posPersonInList+evtEnd;
						var eventEndToCompare = eventEndsAt.slice(0,eventEndsAt.length-2);
						eventEndToCompare = parseFloat(eventEndToCompare); //variable to compare when an event ends
						
						//console.log("eventEndtoCompare "+eventEndToCompare);

						//console.log("evtStartsAt "+eventStartToCompare +" eventEndsAt "+eventEndToCompare);	
						
						$("#"+eventStartsAt).each(function(){							
							var e = $(this);
							setEventColor(e,finalData,colorForBox);
							
							$(e).nextAll().each(function(){
								var nextE = $(this);
								var nextToCompare = $(nextE).attr('id');
								
								nextToCompare = nextToCompare.slice(0,nextToCompare.length-2); //remove AM or PM from then next TD's id
								
								 // variable that we are going to use to comare the next tds hour with the end hour
								nextToCompare = parseFloat(nextToCompare);
								
								//console.log("eventEndssAt "+eventEndToCompare+" nextToCompare "+nextToCompare);
								
								if(eventEndToCompare !== nextToCompare){ 
									
									setEventColor(nextE,finalData,colorForBox);
								}else{ // if the event start time is bigger than the end time ex: 11 - 4
									//check for 12 noon
									if(evtEndTime=="12:00:00PM"){ //if the event runs until midnight keep it going
										setEventColor(nextE,finalData,colorForBox);
									}else{
										return false;
									}
									
									
								}
								
							});
							
						
						});
						
						

					}
					
					
				}
			
				function setEventColor(e,finalData,color){
					var setColor ="";
					switch(color)
					{
					case "red":
					  setColor ="#ff0000";
					  break;
					case "green":
					  setColor ="#00ff00";
					  break;
					default:
					  setColor ="#0000ff";
					}
					$(e).attr('data',finalData).css('backgroundColor',setColor).addClass("hasEvent");
				}
				
				function resetEverything(date){
					
					calendar = null;
					
				
			  		$("#firstRow").children().remove();
			  		$(".person").remove();
					createGlobals("redraw");
			  		startApSelDate(date);
					makeAjax();			
								
				}
				
				$(document).ready(function(){
				startApSelDate();
				makeAjax();
				
 				$("#moveToWeek").click(function(){
				  	
				  
				  	if(calendar.WeekPointer!==7){
						calendar.WeekPointer++;
				  		var goTo = ".week"+calendar.WeekPointer;
						$(".calendarTableCont").scrollTo(goTo, 800 );	
						
				  	}else{
						
					}
				  									
				 });
				 
				 $("#backToWeek").click(function(){
				  	if(calendar.WeekPointer>1){
				  		calendar.WeekPointer--;
					  	var goTo = ".week"+calendar.WeekPointer;
						$(".calendarTableCont").scrollTo(goTo, 800 );	
				  	}else{
						
					}
				  								
				 });
				 
				 $("#moveToToday").click(function(){				  	
				  	var goTo = ".day1";
					$(".calendarTableCont").scrollTo(goTo, 800 );	
					calendar.WeekPointer=0;								
				 });
				 
			});