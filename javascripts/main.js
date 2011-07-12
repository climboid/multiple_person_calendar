$(document).ready(function(){
	 
	//GLOBAL ARRAYS NEEDED

	var daysOfWeek = new Array();
	daysOfWeek[0]='Monday';
	daysOfWeek[1]='Tuesday';
	daysOfWeek[2]='Wednesday';
	daysOfWeek[3]='Thursday';
	daysOfWeek[4]='Friday';
	daysOfWeek[5]='Saturday';
	daysOfWeek[6]='Sunday';
	
	
	var idsOfTheWeek = new Array();
	idsOfTheWeek[0]='Mon';
	idsOfTheWeek[1]='Tue';
	idsOfTheWeek[2]='Wed';
	idsOfTheWeek[3]='Thu';
	idsOfTheWeek[4]='Fri';
	idsOfTheWeek[5]='Sat';
	idsOfTheWeek[6]='Sun';
	
	varTxtOfTheWeek = new Array();
	varTxtOfTheWeek['Mon']=0;
	varTxtOfTheWeek['Tue']=1;
	varTxtOfTheWeek['Wed']=2;
	varTxtOfTheWeek['Thu']=3;
	varTxtOfTheWeek['Fri']=4;
	varTxtOfTheWeek['Sat']=5;
	varTxtOfTheWeek['Sun']=6;
	
	
	var month = new Array(12);
	month["Jan"]=1;
	month["Feb"]=2;
	month["Mar"]=3;
	month["Apr"]=4;
	month["May"]=5;
	month["Jun"]=6;
	month["Jul"]=7;
	month["Aug"]=8;
	month["Sep"]=9;
	month["Oct"]=10;
	month["Nov"]=11;
	month["Dec"]=12;
	
	var monthNum = new Array(12);
	monthNum[1]="January";
	monthNum[2]="February";
	monthNum[3]="March";
	monthNum[4]="April";
	monthNum[5]="May";
	monthNum[6]="June";
	monthNum[7]="July";
	monthNum[8]="August";
	monthNum[9]="September";
	monthNum[10]="October";
	monthNum[11]="November";
	monthNum[12]="December";
	
	var timesInLoop = 0; //times that we loop in a given month, if we reach the end of the month this variable increases
	var daysToSubstract = 0; // days to substract in order to find the number of the day monday of this week. Ex if we are in wed we need to substract 2 to get to 1 (3-2=1)
	

	//MAKES A CALENADR OBJECT AND 
	//SLICES FROM IT THE DAY, MONTH, YEAR AND DAY TEXT

	var calendar = {}; // global namespace
	calendar.ScrolledWeek = 1;
	calendar.StartDate = new Date();
	
	calendar.ToFind = calendar.StartDate.toString();
	calendar.ToFind = calendar.ToFind.split(" ",4);
	calendar.Day = calendar.ToFind[0]; //the text of the current day

	calendar.Month = calendar.ToFind[1]; // the current month
	calendar.DayNum = calendar.ToFind[2]; //the number of the curent day
	calendar.OrgDayNum = calendar.ToFind[2]; //original number of today in order to use for the autoscroll
	
	calendar.Year = calendar.ToFind[3];// the current year
	


	//find the numberday of the monday of the current week
	
	function findMondayNum(){
		for(var i=0,ii=7; i<ii; i++){//loop through the week
			if(idsOfTheWeek[i] == calendar.Day){//if I find a match between today and my array
				daysToSubstract = i; //get the number of days to substract starting from that day to monday
				
				calendar.DayNum=calendar.DayNum - daysToSubstract-1;
			}
		}
	}
	
	findMondayNum();
	
	//gets the total number of days in this month and the next month
	var totalDaysInMonth, totalDaysInNextMonth = 0;	
	function daysInMonth(month,year) {		
		var dd = new Date(year, month, 0);
		return dd.getDate();
		
		
	}
	
	totalDaysInMonth = daysInMonth(month[calendar.Month],calendar.Year);
	totalDaysInNextMonth = daysInMonth(month[calendar.Month]+1,calendar.Year);
	
	//end of getting the total days in a month
	
	
	//get the month full Name
	function getMonthFullName(month){		
		calendar.FullMonthTxt = monthNum[month];
	}
	
	getMonthFullName(month[calendar.Month]);
	//end of getting the FullMonth Name
	

	
	//////////////////////////////////////////////
	///// create the html for the file  /////
	//////////////////////////////////////////////
	var week = 0;
	function createHTML(){
		var sendTo = '';
		week++;
				
		for(var i=0,ii=6; i<=ii;i++){
			var time = 11;
			var spec = 'pm';

			
			if(calendar.DayNum === totalDaysInMonth && timesInLoop!==1){//if we are passing into the next month
				timesInLoop++;
				calendar.DayNum = 0;
				calendar.FullMonthTxt = monthNum[month[calendar.Month]+1];
				
			}else if(calendar.DayNum === totalDaysInNextMonth && timesInLoop ==1){//if we are passing into the month after the next
				calendar.DayNum = 0;
				calendar.FullMonthTxt = monthNum[month[calendar.Month]+2];
			}
			calendar.DayNum++;
			var toAppend='<td id="'+calendar.FullMonthTxt+calendar.DayNum+'" class="week'+week+'"><table cellspacing="0" cellpadding="0" class="content">';
			   toAppend+='<tr><td colspan="48">'+daysOfWeek[i]+' '+calendar.FullMonthTxt+' '+calendar.DayNum+'</td></tr><tr>';
			   for(var j=0,jj=24; j<jj; j++){
			   	if(j===1){
			   		time = 0;
			   		spec = 'am';
			   	}
			   	if(j===13){
			   		time=0;
			   		spec = 'pm';
			   	}
			   	time++;			   	
			   	toAppend+='<td colspan="2" class="hour" id="dateHere"><div class="fixedWidthHead" dataForPopup="My event:Description:Account:Contract:Case ID">'+time+':00'+spec+'</div></td>';
			   }
			   toAppend+='</tr><tr>';
			   for(var k=0,kk=48; k<kk; k++){
			   	toAppend+='<td><div class="fixedWidth"></div></td>';
			   }
			   toAppend+='</tr><tr>';
			   for(var l=0,ll=48; l<ll; l++){
			   	toAppend+='<td><div class="fixedWidth"></div></td>';
			   }
			   toAppend+='</table></td>';
			 sendTo+=toAppend;
			
		}
		
		return sendTo;
		
	}
	
	//creates all of the weeks by calling createHTML to create all of the days needed (5) per week
	function makeFullHtml(){	
		var toAppend='';
		for(var i=0,ii=6; i<ii; i++){

			toAppend+=createHTML(); //here we invoke the previous function
		}		
		finalAppend(toAppend);
	}
	
	//append to the dom the entire created HTML
	function finalAppend(e){
		$("#firstRow").append(e);
	}
	


	//////////////////////////////////////////
	//////// FUNCTIONS TO RUN IN THIS ORDER/////
	//////////////////////////////////////////
	
	makeFullHtml();
	
	
	
	calendar.StartAt = monthNum[month[calendar.Month]]+calendar.OrgDayNum;
	calendar.ScrolledWeek = 1;

	//scroll to the current week
	$(".calendarTableCont").scrollTo("#"+calendar.StartAt,800);
	//scroll forward to the necesary week
	
	
	
	$("#moveToWeek").click(function(){					
		if(calendar.ScrolledWeek<6){
			calendar.ScrolledWeek+=1;
			var goTo = ".week"+calendar.ScrolledWeek;
			$(".calendarTableCont").scrollTo(goTo, 800 );
		}					
	});
	
	$("#backToWeek").click(function(){					
		if(calendar.ScrolledWeek>1){
			calendar.ScrolledWeek-=1;
			var goTo = ".week"+calendar.ScrolledWeek;
			$(".calendarTableCont").scrollTo(goTo, 800 );
		}
	});
	
	
	$("#moveToToday").click(function(){
		calendar.ScrolledWeek = 1;
		$(".calendarTableCont").scrollTo("#"+calendar.StartAt, 800 );
	});
		
	//ajax call to get the xml from libraries with all of the events
	$.ajax({
	  type: "GET",
	  url: "https://libraries.supportcentral.occamsresources.com/scproxy/dataforms/sup_dataform_viewall.asp?prod_id=1165&form_id=2110&xsl=&page_size=500",
	  dataType:"xml",
	  success: function(xml){
	  	console.log('in the success of the ajax call');
	    var first =$(xml).find(":first-child");
	    $(first).children('row').each(function(){
	    	var prev = $(this).find("SC_SYS_DF_LOGGED_BY");
	    	var fField = $(this).find("SC_DF_FIELD_1");
	    	$(fField).children('person').each(function(){
	    		var personLink = $(this).find("SC_DF_PERSON_LINK").text();
	    		var ssoId = $(this).find("SC_DF_SSO").text();
	    		var email = $(this).find("SC_DF_EMAIL").text();
	    		var fName = $(this).find("SC_DF_FIRST_NAME").text();
	    		var lName = $(this).find("SC_DF_LAST_NAME").text();
	    		
	    	});
	    	var sDate= $(this).find("SC_DF_FIELD_2").text();
	    	//console.log("Start date "+sDate);
	    	var eDate = $(this).find('SC_DF_FIELD_3').text();
	    	var acName = $(this).find("SC_DF_FIELD_5").text();
	    	var contract = $(this).find("SC_DF_FIELD_6").text();
	    	var activityTitle = $(this).find("SC_DF_FIELD_10").text();
	    	var activityDesc = $(this).find("SC_DF_FIELD_11").text();
	    });
	  }
	});
	
	
});