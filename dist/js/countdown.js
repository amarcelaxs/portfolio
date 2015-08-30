var getUpdateFor = 0;
var running = [];
var refreshID_1;
var Timer = 0;
var getUpdateData = false;
var getCurrentData = false;

var LastUpdateEvent = 0;

var AUCTION_ID_LIST;
var AUCTION_ID_LIST_ARRAY;

var userIsIdle = false;

var AUCTION_API_VERSION = "V1";
var AUCTION_API_VERSION_HISTORY_STYLE = 'table';
var AUCTION_API_COUNTER_STYLE = 'default';
var AUCTION_HANDLE_ACTIVE_EVENT_AT = 0;
var BUY_MORE_BIDS_MESSAGE = 'default';

var format_percent_digits = 2;

var FIRST_BID_ENABLED = false;
var FIRST_BID_TIME = 0; // em minutos
var FIRST_BID_HEIGHT = 0; // em pixels
var SERVER_TIME = 9999999999999;
var USER_IDLE_MAX_TIME = 5;

var PAGE_HAS_SCROLLED = false;

var TIMER_WITH_PAUSE_ENABLED = false;

var SITE_DOMAIN = "";
var IS_TEMPLATE_MOBILE = false;
var IS_ANDROID = false;
var IS_IOS = false;
// var AUCTION_SHOW_CLOSED_LAYER = false;

// dados do usuário
var userLoggedIn                         = false;
var userBlockMaxAuction                  = false;
var userCanUpdate                        = false;
var userGetFavorites                     = true;
var userGetAuction                       = 0;
var userFavorites                        = [];
var userHideAuctionBuyItNowWhenNotLogged = true;

var updateIgnoreTime = 300;

var autoBidsEnabled   = false;
var autoBidsQty       = 0;
var autoBidsInterval  = 0;
var autoBidsLeft      = 0;
var autoBidsTimer     = null;
var autoBidsAuctionId = 0;

function isUndefined(data)
{
	return ('undefined' == typeof data);
}

function getTimeDifference(earlierDate, laterDate)
{
	var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
	var oDiff = new Object();

	oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
	nTotalDiff -= oDiff.days*1000*60*60*24;

	oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
	nTotalDiff -= oDiff.hours*1000*60*60;

	oDiff.minutes = Math.floor(nTotalDiff/1000/60);
	nTotalDiff -= oDiff.minutes*1000*60;

	oDiff.seconds = Math.floor(nTotalDiff/1000);

	return oDiff;
}

function createCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + "; domain=" + SITE_DOMAIN + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return decodeURI(y);
        }
    }
    return null;
}

function getDateFromTimestamp(timestamp)
{
    return new Date(timestamp * 1000);
}

function is_array(obj)
{
	return (obj.constructor.toString().indexOf("Array") != -1);
}

function highlightAuction(id)
{
	$('#Amt' + id).effect("highlight", {color: '#FF0000'}, 1000);
}

function float2currency(num, fixed)
{
	isnegative = false;
	if(num < 0)
		isnegative = true;

	var result;

	if (typeof fixed == 'undefined')
	{
		result = num.toFixed(2);
	}
	else
	{
		result = num.toFixed(fixed);
	}

	result = result.replace(".", ",");

	if(isnegative)
		return '- ' + result;
	else
		return result;
}

function getCounterByTime(diff, unit)
{
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var rest;
	var diff;
	var rest1;
	var rest2;
	var partialDays;
	var partialHours;
	var partialMinutes;
	var difference;

	if (diff % 86400 <= 0)  // there are 86,400 seconds in a day
	{
		days = diff / 86400;
	}

	if(diff % 86400 > 0)
	{
		rest = (diff % 86400);
		days = (diff - rest) / 86400;

		if( rest % 3600 > 0 )
		{
			rest1 = (rest % 3600);
			hours = (rest - rest1) / 3600;

			if( rest1 % 60 > 0 )
			{
				rest2 = (rest1 % 60);
				minutes = (rest1 - rest2) / 60;
				seconds = rest2;
			}
			else
			{
				minutes = rest1 / 60;
			}
		}
		else
		{
			hours = rest / 3600;
		}
	}

	switch(unit)
	{
		case 'd':
		case 'D':

			partialDays = 0;

			partialDays += (seconds / 86400);
			partialDays += (minutes / 1440);
			partialDays += (hours / 24);

			difference = days + partialDays;

		break;

		case 'h':
		case 'H':

			partialHours = 0;

			partialHours += (seconds / 3600);
			partialHours += (minutes / 60);

			difference = hours + (days * 24) + partialHours;

		break;

		case 'm':
		case 'M':

			partialMinutes = 0;

			partialMinutes += (seconds / 60);

			difference = minutes + (days * 1440) + (hours * 60) + partialMinutes;

		break;

		case 's':
		case 'S':

			difference = seconds + (days * 86400) + (hours * 3600) + (minutes * 60);

		break;

		case 'a':
		case 'A':

			difference = {
				"days" : days,
				"hours" : hours,
				"minutes" : minutes,
				"seconds" : seconds
			};

		break;
	}

	if (difference && unit != 'A' && unit != 'a')
	{
		if (difference['days'] > 1)
		{
			return difference['days'] + ' dias + ' + difference['hours'] + ':' + difference['minutes'] + ':' + difference['seconds'];
		}
		else if (difference['days'] == 1)
		{
			return difference['days'] + ' dia + ' + difference['hours'] + ':' + difference['minutes'] + ':' + difference['seconds'];
		}

		return difference['hours'] + ':' + difference['minutes'] + ':' + difference['seconds'];
	}

	return difference;
}

function randomParamForNoCache()
{
	var date = new Date();
	return date.getTime();
}

function MM_findObj(n, d)
{
	//v4.01
	var p, i, x;
	if (!d)	{d = document;}

	if ((p = n.indexOf("?")) > 0 && parent.frames.length)
	{
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}

	if (!(x = d[n]) && d.all) {x = d.all[n];}

	for (i = 0; !x && i < d.forms.length; i++)
	{
		x = d.forms[i][n];
	}
	for (i = 0; !x && d.layers && i < d.layers.length; i++)
	{
		x = MM_findObj(n, d.layers[i].document);
	}
	if (!x && d.getElementById) {x = d.getElementById(n);}
	return x;
}

function cleanArray(actual, element)
{
	var newArray = [];

	for (var i = 0; i < actual.length - 1; i++)
	{
		if (actual[i] != element)
		{
			newArray.push(actual[i]);
		}
	}
	return newArray;
}

function enableAutoBids(auctionId)
{
    var selectedAutoBidsQty      = $('#autoBidsQty').val();
    var selectedAutoBidsInterval = $('#autoBidsInterval').val();

    if (selectedAutoBidsQty < 1 || selectedAutoBidsQty > 50)
    {
        alert('Selecione a quantidade de lances que você deseja usar;');
        return;
    }

    if (selectedAutoBidsInterval < 5 || selectedAutoBidsInterval > 10)
    {
        alert('Selecione o intervalo de tempo em segundos que você deseja usar;');
        return;
    }

    autoBidsQty       = selectedAutoBidsQty;
    autoBidsLeft      = selectedAutoBidsQty;
    autoBidsInterval  = selectedAutoBidsInterval;
    autoBidsAuctionId = auctionId;

    if (confirm("Você está ativando a auto-oferta e autorizando que sejam utilizados até " + autoBidsQty + " lances em seu nome.\nA auto-oferta só funcionará enquanto esta página estiver aberta em seu navegador web\n\nDeseja iniciar a execução da auto-oferta ?"))
    {
        autoBidsEnabled = true;

        $('#autoBidsQtyPH').html(selectedAutoBidsQty);
        $('#autoBidsIntervalPH').html(selectedAutoBidsInterval + ' segundos');
        $('#autoBidsLeftPH').html(selectedAutoBidsQty);

        $('#autoBidsPH1').hide();
        $('#autoBidsPH2').show();

        autoBidsTimer = setTimeout(function() {
            if (autoBidsEnabled)
            {
                bidnow(autoBidsAuctionId);
            }
        }, (autoBidsInterval * 1000));
    }
    else
    {
        autoBidsEnabled = false;
    }
}

function disableAutoBids()
{
    autoBidsTimer   = null;
    autoBidsEnabled = false;

    $('#autoBidsPH2').hide();
    $('#autoBidsPH1').show();
}

function updateAutoBids(decrementBids)
{
    if (!autoBidsEnabled)
    {
        disableAutoBids();
        return;
    }

    if (decrementBids)
    {
        autoBidsLeft = autoBidsLeft - 1;

        if (autoBidsLeft < 1)
        {
            disableAutoBids();
        }
        else
        {
            $('#autoBidsLeftPH').html(autoBidsLeft);

            autoBidsTimer = setTimeout(function() {
                if (autoBidsEnabled)
                {
                    bidnow(autoBidsAuctionId);
                }
            }, (autoBidsInterval * 1000));
        }
    }
    else
    {
        $('#autoBidsLeftPH').html(autoBidsLeft);

        autoBidsTimer = setTimeout(function() {
            if (autoBidsEnabled)
            {
                bidnow(autoBidsAuctionId);
            }
        }, (autoBidsInterval * 1000));
    }
}

function addToFavorites(pid)
{
    if (IS_TEMPLATE_MOBILE)
    {
        // tenta chamar função do android
        try
        {
            MobileBridge.addPushNotificationForFavoriteAuction(pid);
        }
        catch(e) {}

        // tenta chamar função do ios
        try
        {
            NativeBridge.call("addPushNotificationForFavoriteAuction", [pid]);
        }
        catch(e) {}
    }

    // faz operações web
    if (jQuery.inArray(parseInt(pid), userFavorites) < 0)
    {
        userFavorites.push(parseInt(pid));
    }

	$.get("favoritos_ajax.php", {
		productid: pid,
		action: 'add'
	}, function (data)
	{
		if($.trim(data) == 'ok')
		{
            $('[id=favoriteAdd' + pid + ']').hide();
            $('[id=favoriteRemove' + pid + ']').show();
		}
	});
}

function removeFavorites(pid)
{
    if (IS_TEMPLATE_MOBILE)
    {
        // tenta chamar função do android
        try
        {
            MobileBridge.removePushNotificationForFavoriteAuction(pid);
        }
        catch(e) {}

        // tenta chamar função do ios
        try
        {
            NativeBridge.call("removePushNotificationForFavoriteAuction", [pid]);
        }
        catch(e) {}
    }

    userFavorites.splice( $.inArray(parseInt(pid), userFavorites), 1 );

    $.get("favoritos_ajax.php", {
		productid: pid,
		action: 'remove'
	}, function (data)
	{
		if($.trim(data) == 'ok')
		{
            $('[id=favoriteRemove' + pid + ']').hide();
            $('[id=favoriteAdd' + pid + ']').show();
		}
	});
}

function createHistoryHtml(data)
{
	var colunaOferta  = '';
	var colunaUsuario = '';

	var dataArr = cleanArray(data.split('/'), '');
	var html1 = '';
	var html2 = '';
	var html3 = '';
	var dataLength = dataArr.length / 2;
	var x = 0;

	if(AUCTION_API_VERSION == 'V2')
	{
		if(AUCTION_API_VERSION_HISTORY_STYLE == 'table')
		{
			html1 += "<table cellpadding=\"0\" cellspacing=\"0\" width=\"150\">";
			for (x = 0; x < dataLength; x++)
			{
				colunaOferta  = 'R$ ' + dataArr[(x * 2)];
				colunaUsuario = dataArr[(x * 2) + 1];
				html2 += "<tr" + (isCurrentUsername(colunaUsuario) ? " style=\"background-color: #EFEFEF;\"" : "") + " height=\"18\"><td width=\"60\">" + colunaOferta + "</td><td>" + colunaUsuario + "</td></tr>";
			}
			html3 = "</table>";
			return html1 + html2 + html3;
		}
		else //formatar como 'ul'
		{
			html1 = "<ul>";
			for (x = 0; x < dataLength; x++)
			{
				colunaOferta  = 'R$ ' + dataArr[(x * 2)];
				colunaUsuario = dataArr[(x * 2) + 1];
				html2 += "<li" + (isCurrentUsername(colunaUsuario) ? " class=\"preto\"" : "") + "><span><strong>" + colunaUsuario + "</strong></span><span class=\"valor\">" + colunaOferta + "</span></li>";
			}
			html3 = "</ul>";
			return html1 + html2 + html3;
		}
	}
	else
	{
		html1 += "<table style=\"font-size:11px;\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">";
		for (x = 0; x < dataLength; x++)
		{
			colunaOferta  = 'R$ ' + dataArr[(x * 2)];
			colunaUsuario = dataArr[(x * 2) + 1];
			html2 += "<tr>";
			html2 += "<td align='center' width='5%' height='16'>&nbsp;</td>";
			html2 += "<td align='left' width='30%'>" + colunaOferta + "</td>";
			html2 += "<td align='left' width='65%' " + (isCurrentUsername(colunaUsuario) ? "style='font-weight: bold;'" : "") + " >" + colunaUsuario + "</td>";
			html2 += "</tr>";
		}
		html3 = "</table>";

		return html1 + html2 + html3;
	}
}

function drawClockNEW(auction_id, timeToLeft, current_time)
{
	var status = $('#status' + auction_id).text();
	var paus = $('#pause' + auction_id).text();
	var us_id = $('#us_id' + auction_id).text();
	var countdown = $('#countdown' + auction_id).text();
	var start_countdown = $('#start_countdown' + auction_id).text();

	var current_user_id = $('#current_user_id').html();
	var user_id = '';

	if (us_id != '')
	{
		var temp_user_data = us_id.split('-');
		us_id   = temp_user_data[0];
		user_id = temp_user_data[1];
	}

	if (status == "closed" || status == "closing")
	{
		$('#Bid' + auction_id).hide();
		$('#End' + auction_id).hide();
		$('#bt-verificando' + auction_id).hide();

		$('#bt-on' + auction_id).hide();
		$('#bt-off' + auction_id).show();

		if (us_id == "winner" && user_id == current_user_id)
		{
			$('#end_msg1' + auction_id).show();
			$('#end_msg2' + auction_id).hide();
		}
		else
		{
			$('#end_msg2' + auction_id).show();
		}

	}
//	else if (status == "closing")
//	{
//		$('#bt-on' + auction_id).hide();
//		$('#bt-off' + auction_id).hide();
//		$('#bt-verificando' + auction_id).show();
//
//		valll = "<span class=\"countDown0s\">00:00:00</span>";
//		$('#Bid' + auction_id).html(valll);
//		$('#Bid' + auction_id).show();
//	}
	else
	{
		$('#End' + auction_id).hide();
		$('#Bid' + auction_id).show();

		$('#bt-on' + auction_id).show();
		$('#bt-off' + auction_id).hide();
		$('#bt-verificando' + auction_id).hide();


		var cdd = timeToLeft;
		var valll;

		if (cdd < 0)
		{
			timeToLeft = cdd = 0;
		}

		timeToLeft = timeToLeft * 1000;

		var dateData = getCounterByTime(cdd, 'a');
		dday  = dateData['days'];
		dhour = dateData['hours'];
		dmin  = dateData['minutes'];
		dsec  = dateData['seconds'];


		if (dhour <= 9)
		{
			dhour = "0" + dhour;
		}
		if (dmin <= 9)
		{
			dmin = "0" + dmin;
		}
		if (dsec <= 9)
		{
			dsec = "0" + dsec;
		}


		if (timeToLeft >= 1000)
		{
			if (dday > 0)
			{
				if(AUCTION_API_COUNTER_STYLE == 'compact')
				{
					valll = "" + dday + "d " + dhour + ":" + dmin + ":" + dsec;
				}
				else
				{
					valll = "<span style=\"font-size: 10px;\">" + dday + " dia" + (dday == 1 ? "" : "s") + " + </span>" + dhour + ":" + dmin + ":" + dsec;
				}
			}
			else
			{
				valll = dhour + ":" + dmin + ":" + dsec;
			}
		}

		if (paus == 'yes')
		{
			//$('#auction_paused_' + auction_id).show();
			valll = "Parado";
		}
		else if (timeToLeft <= 5000)
		{
			valll = "<span class=\"countDown5s\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}
		else if (timeToLeft <= 10000)
		{
			valll = "<span class=\"countDown10s\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}
		else if (timeToLeft <= (countdown * 1000))
		{
			valll = "<span class=\"countDownIniciado\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}

		if (timeToLeft < 1000)
		{
			valll = "<span class=\"countDown0s\">00:00:00</span>";
			$('#bt-on' + auction_id).hide();
			$('#bt-off' + auction_id).hide();
			$('#bt-verificando' + auction_id).show();
			$('#bt-verificando' + auction_id).show();
		}

		$('#Bid' + auction_id).html(valll);
		$('#Bid' + auction_id).show();
	}

	if (start_countdown == '')
	{
		$('#tarja' + auction_id).hide();
	}
	else if(start_countdown == 1)
	{
		$('#tarja' + auction_id).hide();

		var btBidActive = $('#btBidActive_' + auction_id);

		if (btBidActive)
		{
			if(AUCTION_API_VERSION == "V2")
			{
				if(!btBidActive.is(':visible') && status != "closing" && status != "closed")
				{
					$('#btBidOn_' + auction_id).hide();
					btBidActive.show();
					try
					{
                        auctionEventProcessor('startCountDown', auction_id);
					}
					finally
					{}
				}

				var btBuyItNowActive = $('#btButItNowEnable_' + auction_id);
				auction_time = $('#start_date' + auction_id).html();
				if(current_time >= auction_time && !btBuyItNowActive.is(':visible'))
				{
					$('[id=btButItNowDisable_' + auction_id + ']').hide();
					$('[id=btButItNowEnable_' + auction_id + ']').show();
				}

			}
			else
			{
				$('#btBidOn_' + auction_id).hide();
				btBidActive.show();
				$('#btButItNowDisable_' + auction_id).hide();
				$('#btButItNowEnable_' + auction_id).show();

			}
		}
	}
	else if (timeToLeft > countdown * 1000)
	{
		$('#tarja' + auction_id).show();
	}
	else if (start_countdown == '0')
	{
		$('#tarja' + auction_id).show();
	}

	return status;
}

function drawClock(auction_id, timeToLeft, current_time)
{
	var status = $('#status' + auction_id).text();
	var paus = $('#pause' + auction_id).text();
	var us_id = $('#us_id' + auction_id).text();
	var countdown = $('#countdown' + auction_id).text();
	var start_countdown = $('#start_countdown' + auction_id).text();

	var current_user_id = $('#current_user_id').html();
	var user_id = '';

	if (us_id != '')
	{
		var temp_user_data = us_id.split('-');
		us_id   = temp_user_data[0];
		user_id = temp_user_data[1];
	}

	if (status == "closed" || status == "closing")
	{
		$('#Bid' + auction_id).hide();
		$('#End' + auction_id).hide();
		$('#bt-verificando' + auction_id).hide();

		$('#bt-on' + auction_id).hide();
		$('#bt-off' + auction_id).show();

		if (us_id == "winner" && user_id == current_user_id)
		{
			$('#end_msg1' + auction_id).show();
			$('#end_msg2' + auction_id).hide();
		}
		else
		{
			$('#end_msg2' + auction_id).show();
		}

	}
//	else if (status == "closing")
//	{
//		$('#bt-on' + auction_id).hide();
//		$('#bt-off' + auction_id).hide();
//		$('#bt-verificando' + auction_id).show();
//
//		valll = "<span class=\"countDown0s\">00:00:00</span>";
//		$('#Bid' + auction_id).html(valll);
//		$('#Bid' + auction_id).show();
//	}
	else
	{
		$('#End' + auction_id).hide();
		$('#Bid' + auction_id).show();

		$('#bt-on' + auction_id).show();
		$('#bt-off' + auction_id).hide();
		$('#bt-verificando' + auction_id).hide();


		var cdd = timeToLeft;
		var valll;

		if (cdd < 0)
		{
			timeToLeft = cdd = 0;
		}

		timeToLeft = timeToLeft * 1000;

		var dateData = getCounterByTime(cdd, 'a');
		dday  = dateData['days'];
		dhour = dateData['hours'];
		dmin  = dateData['minutes'];
		dsec  = dateData['seconds'];


		if (dhour <= 9)
		{
			dhour = "0" + dhour;
		}
		if (dmin <= 9)
		{
			dmin = "0" + dmin;
		}
		if (dsec <= 9)
		{
			dsec = "0" + dsec;
		}


		if (timeToLeft >= 1000)
		{
			if (dday > 0)
			{
				if(AUCTION_API_COUNTER_STYLE == 'compact')
				{
					valll = "" + dday + "d " + dhour + ":" + dmin + ":" + dsec;
				}
				else
				{
					valll = "<span style=\"font-size: 10px;\">" + dday + " dia" + (dday == 1 ? "" : "s") + " + </span>" + dhour + ":" + dmin + ":" + dsec;
				}
			}
			else
			{
				valll = dhour + ":" + dmin + ":" + dsec;
			}
		}

		if (paus == 'yes')
		{
			valll = "Parado";
		}
		else if (timeToLeft <= 5000)
		{
			valll = "<span class=\"countDown5s\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}
		else if (timeToLeft <= 10000)
		{
			valll = "<span class=\"countDown10s\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}
		else if (timeToLeft <= (countdown * 1000))
		{
			valll = "<span class=\"countDownIniciado\">" + dhour + ":" + dmin + ":" + dsec + "</span>";
		}

		if (timeToLeft < 1000)
		{
			valll = "<span class=\"countDown0s\">00:00:00</span>";
			$('#bt-on' + auction_id).hide();
			$('#bt-off' + auction_id).hide();
			$('#bt-verificando' + auction_id).show();
			$('#bt-verificando' + auction_id).show();
		}

		$('#Bid' + auction_id).html(valll);
		$('#Bid' + auction_id).show();
	}

	if (start_countdown == '')
	{
		$('#tarja' + auction_id).hide();
	}
	else if(start_countdown == 1)
	{
        $('#tarja' + auction_id).hide();

		var btBidActive = $('#btBidActive_' + auction_id);

		if (btBidActive)
		{
			if(AUCTION_API_VERSION == "V2")
			{
				if(!btBidActive.is(':visible') && status != "closing" && status != "closed")
				{
					$('#btBidOn_' + auction_id).hide();
					btBidActive.show();
					try
					{
						auctionEventProcessor('startCountDown', auction_id);
					}
					finally
					{}
				}

				var btBuyItNowActive = $('#btButItNowEnable_' + auction_id);
				auction_time = $('#start_date' + auction_id).html();
				if(current_time >= auction_time && !btBuyItNowActive.is(':visible'))
				{
					$('[id=btButItNowDisable_' + auction_id + ']').hide();
					$('[id=btButItNowEnable_' + auction_id + ']').show();
				}

			}
			else
			{
				$('#btBidOn_' + auction_id).hide();
				btBidActive.show();
				$('#btButItNowDisable_' + auction_id).hide();
				$('#btButItNowEnable_' + auction_id).show();

			}
		}
	}
	else if (timeToLeft > countdown * 1000)
	{
		$('#tarja' + auction_id).show();
	}
	else if (start_countdown == '0')
	{
		$('#tarja' + auction_id).show();
	}

	return status;
}

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function GetUpdate(auctionid)
{
	AUCTION_ID_LIST_ARRAY = [];
	var ids = auctionid.split('|');
	for (var x = 0; x < ids.length; x++)
	{
		if ($('#totb' + ids[x]).length >= 0)
		{
			AUCTION_ID_LIST_ARRAY.push(ids[x]);
		}
	}

	bubbleSort(AUCTION_ID_LIST_ARRAY);

	AUCTION_ID_LIST = AUCTION_ID_LIST_ARRAY.join('|');

	if(TIMER_WITH_PAUSE_ENABLED == true)
	{
		GetUpdateNEW();
	}
	else
	{
		GetUpdate2();
	}
}

function GetUpdateNEW()
{
	var timeToRefresh = 1000;
	var canExecute = true;

	if (userCanUpdate == false)
	{
		timeToRefresh = 300;
		canExecute	= false;
	}

	if (userCanUpdate)
	{
		if (userIsIdle == false)
		{
			var gauctions;
			var gdivis;
			var current_time;
			var auction_time;

			ServerMonitor.reset();

			if(getUpdateFor > 0)
				MonitoredPrice = $('#totb'+getUpdateFor).html();
			else
				MonitoredPrice = 0;

			$.ajax({
				type: "GET",
				url: "ex_date.php",
				timeout: 2000,
				dataType: "html",
				data: {id: AUCTION_ID_LIST, getUpdateFor: getUpdateFor, monitoredPrice: MonitoredPrice},
				success: function (data)
				{
					ServerMonitor.update(false);

					dataArr = data.split("|||");

					data = dataArr[0];
					current_time = dataArr[1];
					SERVER_TIME = current_time;

					if(current_time < LastUpdateEvent)
						return;
					else
						LastUpdateEvent = current_time;

					gauctions = data.split("||");

					for (m = 0; m <= gauctions.length - 1; m++)
					{
						if (gauctions[m] != undefined)
						{
							gdivis = gauctions[m].split("##");

							gdivis[1] = parseFloat(gdivis[1]);
							gdivis[0] = parseFloat(gdivis[0]);
							gdivis[3] = parseFloat(gdivis[3]);
							gdivis[4] = parseFloat(gdivis[4]);

							var username	 = gdivis[5];
							var currentPrice = gdivis[1];
							var closetime = gdivis[7];
							var closetime_date = gdivis[8];

							if(closetime == 0)
							{
								$("#auction_paused_" + gdivis[0]).hide();
							}
							else
							{
								$("#auction_paused_" + gdivis[0]).show();
								if(gdivis[2] == "no"){
									$("#auction_paused_restartAt_" + gdivis[0]).show();
									if(closetime_date != "null"){
										$("#closetime-block-back" + gdivis[0]).html(closetime_date);
									}
								}
								else
								{
									$("#auction_paused_restartAt_" + gdivis[0]).hide();
								}
							}

							var auctionStatus = drawClockNEW(gdivis[0], gdivis[4], current_time);

							if(auctionStatus == "closed" && gdivis[2] != 'yes')
							{
								var z = 0;
								for (z = 0; z <= AUCTION_ID_LIST_ARRAY.length - 1; z++)
								{
									if (AUCTION_ID_LIST_ARRAY[z] == gdivis[0])
									{
										AUCTION_ID_LIST_ARRAY.splice(z, 1);
										break;
									}
								}
								if(AUCTION_ID_LIST_ARRAY.length > 0)
								{
									AUCTION_ID_LIST = AUCTION_ID_LIST_ARRAY.join('|');
								}
								else
								{
									AUCTION_ID_LIST = "";
								}

								if($.browser.msie)
								{
									if($.browser.version > 7)
										$('.boxProdLayerClosed' + gdivis[0]).show();
								}
								else
								{
									$('.boxProdLayerClosed' + gdivis[0]).show();
								}

							}

							auction_time = $('#start_date' + gdivis[0]).html();

							$('#pause' + gdivis[0]).html(gdivis[2]);

							if ($('#totb' + gdivis[0]).length > 0)
							{
								var gtotb = $('#totb' + gdivis[0]).text();
								gtotb = parseFloat(gtotb);

								if(gdivis[6] != null)
								{
									ReceivedStatus = gdivis[6].split("-");
									switch(ReceivedStatus[0])
									{
										case 'w':
											$('#us_id'+gdivis[0]).html('winner-' + ReceivedStatus[1]);
											$('#status'+gdivis[0]).html('closed');
											break;
										case 'c':
											$('#status'+gdivis[0]).html('closed');
											break;
										case 'i':
											$('#status'+gdivis[0]).html('closing');
											break;
										case 'l':
											$('#status'+gdivis[0]).html('live');
											break;
									}
								}
								else
								{
									$('#status'+gdivis[0]).html('live');
								}

								if(gdivis[1] > gtotb)
								{
									
									min_bid_amount = parseFloat($('#min_bid_amount-' + gdivis[0]).html());
									if(min_bid_amount > 0 && currentPrice < min_bid_amount)
									{
										$('#Amt' + gdivis[0]).html('R$ ' + float2currency(min_bid_amount));
										gdivis[1] = min_bid_amount;
									}
									else
									{
										$('#Amt' + gdivis[0]).html('R$ ' + float2currency(currentPrice));
									}
									$('#totb' + gdivis[0]).html(currentPrice);
									$('#Usr' + gdivis[0]).html(username);
									highlightAuction(gdivis[0]);

									if(gdivis[0] == getUpdateFor)
									{
										or_price = parseFloat($('#op-'+ gdivis[0]).html());
										discount = (or_price - gdivis[1]);

										if(discount < 0) discount = 0;

										savingDiscount = discount * 100 / or_price;

										if(AUCTION_API_VERSION == "V2")
										{
											try
											{
												if(format_percent_digits == 0)
												{
													savingDiscount = savingDiscount.toFixed(0);
													if(savingDiscount > 99) savingDiscount = 99;
													if(savingDiscount < 0) savingDiscount = 0;
												}
												else
												{
													savingDiscount = savingDiscount.toFixed(2);
													if(savingDiscount > 99.99) savingDiscount = 99.99;
													if(savingDiscount < 0) savingDiscount = 0;
													savingDiscount = float2currency(parseFloat(savingDiscount));
												}
											}
											catch(expection)
											{
												if(format_percent_digits == 0) {savingDiscount = '0';}
												else {savingDiscount = '0,00';}
											}
										}
										else
										{
											try
											{
												savingDiscount = savingDiscount.toFixed(2);
												if(savingDiscount > 99.99) savingDiscount = 99.99;
												if(savingDiscount < 0) savingDiscount = 0;
												savingDiscount = float2currency(parseFloat(savingDiscount));
											}
											catch(expection) {savingDiscount = '0,00';}
										}

										$('#Sav' + gdivis[0]).html('R$ ' + float2currency(discount));
										$('#desc_final' + gdivis[0]).html(savingDiscount + '%');
										$('#His' + gdivis[0]).html(createHistoryHtml(gdivis[9]));
									}
								}
							}

							displayStatus = $('#d-' + gdivis[0]).html();

							if (current_time >= auction_time)
							{
								$('#start_countdown' + gdivis[0]).html('1');
							}
							else
							{
								$('#start_countdown' + gdivis[0]).html('0');
							}

							var countdown_time = $('#countdown' + gdivis[0]).text();
							countdown_time = parseInt(countdown_time);

							if (current_time >= (auction_time - (AUCTION_HANDLE_ACTIVE_EVENT_AT - countdown_time)))
							{
								if(displayStatus != 'ativo')
								{
									$('#d-' + gdivis[0]).html('ativo');
									try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
								}
							}
							else if (current_time >= auction_time)
							{
								if(displayStatus != 'iniciado')
								{
									$('#d-' + gdivis[0]).html('iniciado');
									try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
								}
							}
							else
							{
								if(displayStatus != 'normal')
								{
									$('#d-' + gdivis[0]).html('normal');
									try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
								}
							}

							// exibe dados do leilão
							if (isNaN(gdivis[0]) == false && 'undefined' != typeof gdivis[0])
							{
								$('.placeHolderDetailsAuction_' + gdivis[0]).show();

								if (userLoggedIn == true)
								{
									if (userBlockMaxAuction == true)
									{
										$('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).hide();
										$('.placeHolderDetailsAuctionLogged_' + gdivis[0]).hide();
										$('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).show();
									}
									else
									{
										$('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).hide();
										$('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).hide();
										$('.placeHolderDetailsAuctionLogged_' + gdivis[0]).show();
									}

									if (jQuery.inArray(gdivis[0], userFavorites) > -1)
									{
										$('.placeHolderDetailsAuctionNotFavorite_' + gdivis[0]).css('display', 'none');
										$('.placeHolderDetailsAuctionFavorite_' + gdivis[0]).show();
									}
									else
									{
										$('.placeHolderDetailsAuctionFavorite_' + gdivis[0]).css('display', 'none');
										$('.placeHolderDetailsAuctionNotFavorite_' + gdivis[0]).show();
									}

									$('.placeHolderDetailsAuctionBuyItNowNotLogged_' + gdivis[0]).hide();
									$('.placeHolderDetailsAuctionBuyItNowLogged_' + gdivis[0]).show();
								}
								else
								{
									$('.placeHolderDetailsAuctionLogged_' + gdivis[0]).hide();
									$('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).hide();
									$('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).show();

									$('.placeHolderDetailsAuctionBuyItNowLogged_' + gdivis[0]).hide();
									$('.placeHolderDetailsAuctionBuyItNowNotLogged_' + gdivis[0]).show();

									$('#buyItNowDiscount' + gdivis[0]).html('R$ 0,00');
								}

								$('.placeHolderDetailsAuctionLoader_' + gdivis[0]).hide();
							}
						}
					}
				}
				,
				error: function (jqXHR, textStatus, errorThrown)
				{
					ServerMonitor.update(true);
				}
			});
		}
	}

	refreshID_1 = setTimeout("GetUpdateNEW()", timeToRefresh);
}

function GetUpdate2()
{
    var timeToRefresh = 1000;
    var canExecute    = true;

    if (userCanUpdate == false)
    {
        timeToRefresh = 300;
        canExecute    = false;
    }

    if (userCanUpdate)
    {
        if (userIsIdle == false)
        {
            var gauctions;
            var gdivis;
            var current_time;
            var auction_time;

            ServerMonitor.reset();

            if(getUpdateFor > 0)
                MonitoredPrice = $('#totb'+getUpdateFor).html();
            else
                MonitoredPrice = 0

            //data: {id: AUCTION_ID_LIST, rnd: randomParamForNoCache(), getUpdateFor: getUpdateFor, monitoredPrice: MonitoredPrice},
            $.ajax({
                type: "GET",
                url: "ex_date.php",
                timeout: 2000,
                dataType: "html",
                data: {id: AUCTION_ID_LIST, getUpdateFor: getUpdateFor, monitoredPrice: MonitoredPrice},
                success: function (data)
                {
                    ServerMonitor.update(false);

                    dataArr = data.split("|||");

                    data = dataArr[0];
                    current_time = dataArr[1];
                    SERVER_TIME = current_time;

                    if(current_time < LastUpdateEvent)
                        return;
                    else
                        LastUpdateEvent = current_time;

                    gauctions = data.split("||");

                    for (m = 0; m <= gauctions.length - 1; m++)
                    {
                        if (gauctions[m] != undefined)
                        {
                            gdivis = gauctions[m].split("##");

                            gdivis[1] = parseFloat(gdivis[1]);
                            gdivis[0] = parseFloat(gdivis[0]);
                            gdivis[3] = parseFloat(gdivis[3]);
                            gdivis[4] = parseFloat(gdivis[4]);

                            var username	 = gdivis[5];
                            var currentPrice = gdivis[1];

                            var auctionStatus = drawClock(gdivis[0], gdivis[4], current_time);

                            if(auctionStatus == "closed")
                            {
                                var z = 0;
                                for (z = 0; z <= AUCTION_ID_LIST_ARRAY.length - 1; z++)
                                {
                                    if (AUCTION_ID_LIST_ARRAY[z] == gdivis[0])
                                    {
                                        AUCTION_ID_LIST_ARRAY.splice(z, 1);
                                        break;
                                    }
                                }
                                if(AUCTION_ID_LIST_ARRAY.length > 0)
                                {
                                    AUCTION_ID_LIST = AUCTION_ID_LIST_ARRAY.join('|');
                                }
                                else
                                {
                                    AUCTION_ID_LIST = "";
                                }

								if($.browser.msie)
								{
									if($.browser.version > 7)
										$('.boxProdLayerClosed' + gdivis[0]).show();
								}
								else
								{
									$('.boxProdLayerClosed' + gdivis[0]).show();
								}

                            }

                            auction_time = $('#start_date' + gdivis[0]).html();

                            $('#pause' + gdivis[0]).html(gdivis[2]);

                            if ($('#totb' + gdivis[0]).length > 0)
                            {
                                var gtotb = $('#totb' + gdivis[0]).text();
                                gtotb = parseFloat(gtotb);

                                if(gdivis[6] != null)
                                {
                                    ReceivedStatus = gdivis[6].split("-");
                                    switch(ReceivedStatus[0])
                                    {
                                        case 'w':
                                            $('#us_id'+gdivis[0]).html('winner-' + ReceivedStatus[1]);
                                            $('#status'+gdivis[0]).html('closed');
                                            break;
                                        case 'c':
                                            $('#status'+gdivis[0]).html('closed');
                                            break;
                                        case 'i':
                                            $('#status'+gdivis[0]).html('closing');
                                            break;
                                        case 'l':
                                            $('#status'+gdivis[0]).html('live');
                                            break;
                                    }
                                }
                                else
                                {
                                    $('#status'+gdivis[0]).html('live');
                                }

                                if(gdivis[1] > gtotb)
                                {
									min_bid_amount = parseFloat($('#min_bid_amount-' + gdivis[0]).html());
									if(min_bid_amount > 0 && currentPrice < min_bid_amount)
									{
										$('#Amt' + gdivis[0]).html('R$ ' + float2currency(min_bid_amount));
										gdivis[1] = min_bid_amount;
									}
									else
									{
										$('#Amt' + gdivis[0]).html('R$ ' + float2currency(currentPrice));
									}
                                    $('#totb' + gdivis[0]).html(currentPrice);
                                    $('#Usr' + gdivis[0]).html(username);
                                    highlightAuction(gdivis[0]);
                                    //GetBid(gdivis[0], showUser_history, 0);

                                    if(gdivis[0] == getUpdateFor)
                                    {
                                        or_price = parseFloat($('#op-'+ gdivis[0]).html());
                                        discount = (or_price - gdivis[1]);

                                        if(discount < 0) discount = 0;

                                        savingDiscount = discount * 100 / or_price;

                                        if(AUCTION_API_VERSION == "V2")
                                        {
                                            try
                                            {
                                                if(format_percent_digits == 0)
                                                {
                                                    savingDiscount = savingDiscount.toFixed(0);
                                                    if(savingDiscount > 99) savingDiscount = 99;
                                                    if(savingDiscount < 0) savingDiscount = 0;
                                                }
                                                else
                                                {
                                                    savingDiscount = savingDiscount.toFixed(2);
                                                    if(savingDiscount > 99.99) savingDiscount = 99.99;
                                                    if(savingDiscount < 0) savingDiscount = 0;
                                                    savingDiscount = float2currency(parseFloat(savingDiscount));
                                                }
                                            }
                                            catch(expection)
                                            {
                                                if(format_percent_digits == 0) {savingDiscount = '0';}
                                                else {savingDiscount = '0,00';}
                                            }
                                        }
                                        else
                                        {
                                            try
                                            {
                                                savingDiscount = savingDiscount.toFixed(2);
                                                if(savingDiscount > 99.99) savingDiscount = 99.99;
                                                if(savingDiscount < 0) savingDiscount = 0;
                                                savingDiscount = float2currency(parseFloat(savingDiscount));
                                            }
                                            catch(expection) {savingDiscount = '0,00';}
                                        }


                                        $('#Sav' + gdivis[0]).html('R$ ' + float2currency(discount));
                                        $('#desc_final' + gdivis[0]).html(savingDiscount + '%');
                                        $('#His' + gdivis[0]).html(createHistoryHtml(gdivis[7]));
                                    }
                                }
                            }

                            displayStatus = $('#d-' + gdivis[0]).html();

                            if (current_time >= auction_time)
                            {
                                $('#start_countdown' + gdivis[0]).html('1');
                            }
                            else
                            {
                                $('#start_countdown' + gdivis[0]).html('0');
                            }

                            var countdown_time = $('#countdown' + gdivis[0]).text();
                            countdown_time = parseInt(countdown_time);

                            if (current_time >= (auction_time - (AUCTION_HANDLE_ACTIVE_EVENT_AT - countdown_time)))
                            {
                                if(displayStatus != 'ativo')
                                {
                                    $('#d-' + gdivis[0]).html('ativo');
                                    try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
                                }
                            }
                            else if (current_time >= auction_time)
                            {
                                if(displayStatus != 'iniciado')
                                {
                                    $('#d-' + gdivis[0]).html('iniciado');
                                    try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
                                }
                            }
                            else
                            {
                                if(displayStatus != 'normal')
                                {
                                    $('#d-' + gdivis[0]).html('normal');
                                    try	{auctionEventProcessor('displayStatusChanged', gdivis[0]);} finally {}
                                }
                            }

                            // exibe dados do leilão
                            if (isNaN(gdivis[0]) == false && 'undefined' != typeof gdivis[0])
                            {
                                $('.placeHolderDetailsAuction_' + gdivis[0]).show();

                                if (userLoggedIn == true)
                                {
                                    if (userBlockMaxAuction == true)
                                    {
                                        $('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).hide();
                                        $('.placeHolderDetailsAuctionLogged_' + gdivis[0]).hide();
                                        $('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).show();
                                    }
                                    else
                                    {
                                        $('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).hide();
                                        $('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).hide();
                                        $('.placeHolderDetailsAuctionLogged_' + gdivis[0]).show();
                                    }

                                    if (jQuery.inArray(gdivis[0], userFavorites) > -1)
                                    {
                                        $('.placeHolderDetailsAuctionNotFavorite_' + gdivis[0]).css('display', 'none');
                                        $('.placeHolderDetailsAuctionFavorite_' + gdivis[0]).show();
                                    }
                                    else
                                    {
                                        $('.placeHolderDetailsAuctionFavorite_' + gdivis[0]).css('display', 'none');
                                        $('.placeHolderDetailsAuctionNotFavorite_' + gdivis[0]).show();
                                    }

                                    $('.placeHolderDetailsAuctionBuyItNowNotLogged_' + gdivis[0]).hide();
                                    $('.placeHolderDetailsAuctionBuyItNowLogged_' + gdivis[0]).show();
                                }
                                else
                                {
                                    $('.placeHolderDetailsAuctionLogged_' + gdivis[0]).hide();
                                    $('.placeHolderDetailsAuctionBlockMaxAuction_' + gdivis[0]).hide();
                                    $('.placeHolderDetailsAuctionNotLogged_' + gdivis[0]).show();

                                    $('.placeHolderDetailsAuctionBuyItNowLogged_' + gdivis[0]).hide();
                                    $('.placeHolderDetailsAuctionBuyItNowNotLogged_' + gdivis[0]).show();

                                    $('#buyItNowDiscount' + gdivis[0]).html('R$ 0,00');
                                }

                                $('.placeHolderDetailsAuctionLoader_' + gdivis[0]).hide();
                            }
                        }
                    }
                }
                ,
                error: function (jqXHR, textStatus, errorThrown)
                {
                    ServerMonitor.update(true);
                }
            });
        }
    }

    refreshID_1 = setTimeout("GetUpdate2()", timeToRefresh);
}

function bidnow(idleilao)
{
    if (FIRST_BID_ENABLED)
    {
		var cookieName = 'first_bid_' + idleilao;
		var startDate   = $('#start_date' + idleilao).html();
		var limitDate   = startDate - (FIRST_BID_TIME * 60);

		/*
		console.log('StartDate: ' + startDate);
		console.log('LimitDate: ' + limitDate);
		console.log('ServerTime: ' + SERVER_TIME);
		*/

		if (SERVER_TIME < limitDate)
		{
			if ('disabled' != getCookie(cookieName))
			{
				if (screen.width < 1024 || screen.height < 600)
				{
					createCookie(cookieName, 'disabled', null);
				}
				else
				{
					createCookie(cookieName, 'disabled', null);

					$.fancybox.open({
						type: 'iframe',
						href: 'lightboxTutorial.php?type=primeiro-lance&auction_id=' + idleilao,
						width: 950,
						height: FIRST_BID_HEIGHT,
						beforeShow: function() {
							$('.hideOnLightbox').hide();
						},
						afterClose: function() {
							$('.hideOnLightbox').show();
						}
					});

					$('#auctionLoader_' + idleilao).hide();
					return;
				}
			}
		}
    }

    var removeAutoBids = false;

	$.ajax({
		type: "GET",
		url: "bid_now.php",
		dataType: "html",
		data: {id:+ idleilao, updateBuyItNow: (getUpdateFor == idleilao?1:0), rnd: randomParamForNoCache()},
		success: function(data)
		{
			if(data.substring(0, 11) == 'setusername')
			{
				window.location.href = "definir_username.php?pid=" + idleilao;
				return;
			}

			var data_array = data.split("#");
			var success = false;

			switch(data_array[0])
			{
				case "0":
					if(getUpdateFor == idleilao)
					{
						$('#bidsPlaced' + idleilao).html(data_array[1]);
						$('#buyItNowDiscount' + idleilao).html(data_array[2]);
						$('#buyItNowPrice' + idleilao).html(data_array[3]);
					}

					success = true;
					break;
				case "1":
					break;
				case "2":
					//alert("Aguarde a verificação do ganhador");
					break;
				case "3":
					alert("Você comprou este produto utilizando o 'Compre Agora'");
                    removeAutoBids = true;
					break;
				case "4":
					switch(BUY_MORE_BIDS_MESSAGE)
					{
						case 'alert':
							alert("Seus Lances terminaram!");
							break;
						default: //'default'
							var buy_bid1 = confirm("Seus Lances terminaram. Você gostaria de adquirir mais Lances ?");
							if (buy_bid1)
							{
								if(AUCTION_API_VERSION == "V2")
								{
									window.location = "comprar-lances.php";
								}
								else
								{
									window.location = "myauction.php?type=buybid";
								}
							}
							break;
					}
					break;
				case "5":
					alert("Leilão válido somente para lances por SMS e Portal de Voz.");
                    removeAutoBids = true;
					break;
				case "6":
					alert("Leilão válido somente para lances por SMS.");
                    removeAutoBids = true;
					break;
				case "7":
					alert("Leilão válido somente para lances por Portal de Voz.");
                    removeAutoBids = true;
					break;
				case "9":
					alert("Leilão válido somente para lances de Iniciantes.");
                    removeAutoBids = true;
					break;
				case "10":
					alert("Este leilão ainda não iniciou.");
                    removeAutoBids = true;
					break;
				case "11":
					alert("Produto inválido.");
                    removeAutoBids = true;
					break;
				case "12":
					alert("Você atingiu o limite máximo de arremates no mês vigente, para mais detalhes consulte os Termos de Uso");
                    removeAutoBids = true;
					break;
				case "13":
					alert("Este leilão não está aceitando lances neste momento! Aguarde alguns instantes e tente novamente.");
                    removeAutoBids = true;
					break;
				case "14":
					alert("Este leilão não aceita ofertas gratuitas (bonus) !");
                    removeAutoBids = true;
					break;
				case "15"://usuário suspenso
					break;
			}

			if (success)
			{
				$('#auctionLoader_' + idleilao).addClass('loaderSuccessIcon').fadeOut(1000);
                updateAutoBids(true);
			}
			else
			{
				$('#auctionLoader_' + idleilao).addClass('loaderErrorIcon').fadeOut(1000);
                updateAutoBids(false);
			}

            if (removeAutoBids)
            {
                disableAutoBids();
            }
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			// tratar erro
			$('#auctionLoader_' + idleilao).addClass('loaderErrorIcon').fadeOut(1000);
            updateAutoBids(false);
		}
	});
}

function GetBidNum()
{
	if (userIsIdle)
	{
		setTimeout("GetBidNum()", 5000);
		return;
	}

	var callAgain = true;

	$.ajax({
		type: "POST",
		url: "getbidnum.php",
		dataType: "html",
		timeout: 3000,
		data: {rnd: randomParamForNoCache(), getFavorites: (userGetFavorites == true ? '1' : '0'), getAuction: userGetAuction},
		success: function(data)
		{
            userCanUpdate    = true;

//			if(data.substring(0, 4) == 'pred')
//			{
//				window.location.href = data.substring(4);
//			}

			dados = data.split("|");

			$('[id=bid_num]').html($.trim(dados[0]));
			$('[id=fav_num]').html($.trim(dados[1]));
			$('#current_user_id').html($.trim(dados[2]));
			$('#current_username').val($.trim(dados[3]));

			$('.placeHolderUserData_Id').html($.trim(dados[2]));
			$('.placeHolderUserData_Username').val($.trim(dados[3]));
            $('.placeHolderUserData_BidNum').html($.trim(dados[0]));

			$('div.placeHolderUserData_Username').html($.trim(dados[3]));
			$('span.placeHolderUserData_Username').html($.trim(dados[3]));
			$('strong.placeHolderUserData_Username').html($.trim(dados[3]));

			$('.placeHolderUserData_Bonus').html($.trim(dados[4]));

			var logged          = $.trim(dados[5]);
			var blockMaxAuction = $.trim(dados[6]);
			var favorites       = $.trim(dados[7]);
            var auction         = $.trim(dados[8]);

            if (userGetFavorites)
            {
                userGetFavorites = false;
                userFavorites    = [];

                if (favorites != '')
                {
                    var favoritesList = favorites.split('-');
                    var x = 0;

                    for(x = 0; x < favoritesList.length; x++)
                    {
                        userFavorites.push(parseInt(favoritesList[x]));
                    }
                }
            }

            if (userGetAuction > 0)
            {
                userGetAuction = 0;

                var auctionData                   = auction.split('#');
                var auctionId                     = auctionData[0];
                var auctionBuyItNowEnabled        = parseInt(auctionData[1]);
                var auctionBuyItNowGotMaxDiscount = parseInt(auctionData[2]);
                var auctionBuyItNowMaxDiscount    = auctionData[3];
                var auctionBuyItNowBids           = auctionData[4];
                var auctionBuyItNowDiscount       = auctionData[5];
                var auctionBuyItNowFinalPrice     = auctionData[6];
                var auctionBuyItNowState          = auctionData[7];

                $('#totb' + auctionId).html('-1');

                if (auctionBuyItNowEnabled == 1)
                {
                    $('#buyItNowMaxDiscount_' + auctionId).html(auctionBuyItNowMaxDiscount);
                    $('#bidsPlaced' + auctionId).html(auctionBuyItNowBids);
                    $('#buyItNowDiscount' + auctionId).html(auctionBuyItNowDiscount);
                    $('#buyItNowPrice' + auctionId).html(auctionBuyItNowFinalPrice);

                    if (auctionBuyItNowGotMaxDiscount == 1)
                    {
                        if ($('.placeHolderDetailsAuctionBuyItNowGotMaxDiscount_' + auctionId).hasClass('gotMaxDiscount') == false)
                        {
                            $('.placeHolderDetailsAuctionBuyItNowGotMaxDiscount_' + auctionId).addClass('gotMaxDiscount');
                        }
                    }
                    else if (auctionBuyItNowGotMaxDiscount == 0)
                    {
                        if ($('.placeHolderDetailsAuctionBuyItNowGotMaxDiscount_' + auctionId).hasClass('gotMaxDiscount') == true)
                        {
                            $('.placeHolderDetailsAuctionBuyItNowGotMaxDiscount_' + auctionId).removeClass('gotMaxDiscount');
                        }
                    }

                    if (auctionBuyItNowState == 1)
                    {
                        $('.placeHolderDetailsAuctionBuyItNowStarted_' + auctionId).show();
                    }
                    else if (auctionBuyItNowState == 2)
                    {
                        $('.placeHolderDetailsAuctionBuyItNowEnabled_' + auctionId).show();
                    }

                    if (logged == 1)
                    {
                        $('.placeHolderDetailsAuctionBuyItNowNotLogged_' + auctionId).hide();
                        $('.placeHolderDetailsAuctionBuyItNowLogged_' + auctionId).show();
                    }
                    else
                    {
                        $('.placeHolderDetailsAuctionBuyItNowLogged_' + auctionId).hide();
                        $('.placeHolderDetailsAuctionBuyItNowNotLogged_' + auctionId).show();
                    }

                    $('.placeHolderDetailsAuctionBuyItNow_' + auctionId).show();
                }
                else if (auctionBuyItNowEnabled == 0)
                {
                    $('.placeHolderDetailsAuctionBuyItNow_' + auctionId).hide();
                }
            }

			if (logged == 1)
			{
                userLoggedIn = true;
				$('.placeHolderUserLoader').hide();
                $('.placeHolderUserNotLogged').hide();
                $('.placeHolderDetailsAuctionFreightNotLogged').hide();
                $('.placeHolderStoreCatalogLoader').hide();
                $('.placeHolderStoreCatalogNotLogged').hide();

                $('.placeHolderDetailsAuctionFreightLogged').show();
                $('.placeHolderUserLogged').show();
                $('.placeHolderStoreCatalogLogged').show();

				if(PAGE_HAS_SCROLLED)
				{
					$('.placeHolderUserMenuHeaderNotLogged').hide();
					$('.placeHolderUserMenuHeaderLogged').show();
				}
            }
			else
			{
                userLoggedIn = false;
				$('.placeHolderUserLoader').hide();
				$('.placeHolderUserLogged').hide();
                $('.placeHolderStoreCatalogLoader').hide();
                $('.placeHolderStoreCatalogLogged').hide();

                if (userHideAuctionBuyItNowWhenNotLogged)
                {
                    $('.placeHolderDetailsAuctionBuyItNow').hide();
                }

                $('.placeHolderDetailsAuctionFreightLogged').hide();
                $('.placeHolderDetailsAuctionFreightNotLogged').show();
                $('.placeHolderUserNotLogged').show();

				$('.placeHolderUserMenuHeaderLogged').hide();
				$('.placeHolderUserMenuHeaderNotLogged').show();
                $('.placeHolderStoreCatalogNotLogged').show();

				callAgain = false;
			}

            userBlockMaxAuction = (blockMaxAuction == 1 ? true : false);

            userCanUpdate = true;

            if (callAgain)
			{
				setTimeout("GetBidNum()", 5000);
			}
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			if (textStatus == 'timeout') {setTimeout("GetBidNum()",1000);}
			else {setTimeout("GetBidNum()",5000);}
		}
	});
}

function GetList(alist, acat, totp, productId)
{
	UpdateGeneration++;
	$.ajax({
		type: "GET", url: "list_main.php", dataType: "html",
		data: {listtype:+ alist, catsid:+ acat, pageno:+ totp, product_id:+ productId},
		success: function(data)
		{
			$('#List').html(data);
		},
		error: function (jqXHR, textStatus, errorThrown)
		{ /* erro */ }
	});
}

/** retroative compatibility */
function countdown(auctionid) {
	UpdateGeneration = 0;
}

function isCurrentUsername(username)
{
	return (username == $('#current_username').val());
}

function UserIdle()
{
	this.idleTime		 = 600; // seconds
	this.dialogIsVisible = false;
	this.debugMode	     = false;
	this.startIdleTime   = new Date();

	this.start = function()
	{
		this.debug("start");

		$.idleTimer(this.idleTime * 1000);
		var instance = this;

		$(document).bind("idle.idleTimer", function() {
			instance.debug("idle.idleTimer");
			instance.userIsIdle($(this));
		});

		$(document).bind("active.idleTimer", function() {
			instance.debug("active.idleTimer");
			instance.userIsActive($(this));
		});
	}

	this.userIsIdle = function(el)
	{
		this.debug("userIsIdle");

        if (!autoBidsEnabled)
        {
            userIsIdle   = true;
            var instance = this;

            if (this.dialogIsVisible == false)
            {
                this.dialogIsVisible = true;

                this.startIdleTime = new Date();

                $('#modal_user_idle').dialog({
                    buttons: {"Sim, Voltar ao Site":  function(){
                        instance.debug("OK Clicked");
                        $(this).dialog('close');
                    }},
                    close: function(){
                        instance.debug("Dialog closed");
                        instance.dialogIsVisible = false;
                        userIsIdle = false;
                    },
                    modal: true, resizable: false, closeOnEscape: true, width: '368px', title: ''
                });
            }
        }
	}

	this.userIsActive = function(el)
	{
		this.debug("userIsActive");
		if (this.dialogIsVisible)
		{
			/* TODO: COMENTADO TEMPORARIAMENTE - NAO FUNCIONOU COM TODAS AS PESSOAS
			var diff = getTimeDifference(this.startIdleTime, new Date());

			if (diff.minutes > USER_IDLE_MAX_TIME)
			{
				window.location.reload();
				return;
			}
			*/
			$('#modal_user_idle').dialog('close');
			this.dialogIsVisible = false;
			userIsIdle = false;
		}
	}

	this.debug = function(message)
	{
		if (this.debugMode == true)
		{
			console.log("USER IDLE :: " + message);
		}
	}

}

var ServerMonitor = new function()
{
	this.currentDatetime 	  = new Date();
	this.diffDateTime		  = 0;
	this.oneSecond            = 1000;
	this.valuesOfDelay  	  = [2000, 1750, 1200, 1000, 750, 600, 500, 450, 400];
	this.valuesOfDelayPercent = [0   , 30  , 50  , 65  , 80 , 85 , 90 , 95 , 99];
	this.currentDelay		  = this.valuesOfDelay.length;
	this.showOnConsole		  = false;
	this.currentDelayPercent  = 0;
	this.colorLevel3		  = '#006600';
	this.colorLevel2		  = '#FFA200';
	this.colorLevel1		  = '#FF000A';
	this.data				  = [99, 99, 99, 99, 99];
	this.currentPointer	      = 0;
	this.maxPointer		      = 4;

	this.setColor = function(colorLevel1, colorLevel2, colorLevel3) {this.colorLevel3 = colorLevel3;this.colorLevel2 = colorLevel2;this.colorLevel1 = colorLevel1;}
	this.reset = function() {this.currentDatetime = new Date();}
	this.update = function(error)
	{
		var afterRequestTime = new Date();
		var x = 0;
		if (error == true)
		{
			this.diffDateTime = 0;
			this.currentDelay = this.valuesOfDelay[0];
		}
		else
		{
			this.diffDateTime = ((afterRequestTime.getTime()-this.currentDatetime.getTime()));

			for (x = 0; x < this.valuesOfDelay.length; x++)
			{
				if (this.diffDateTime >= this.valuesOfDelay[x])
				{
					this.currentDelay = this.valuesOfDelay[x];
					break;
				}
			}
		}
		this.currentDelayPercent = this.valuesOfDelayPercent[x];
		this.checkForNaN();
		this.storeCurrentPercent();
		this.currentDelayPercent = this.getPercentAverage();
		this.checkForNaN();
		this.showPercentIndicator();
		this.showIndicatorGraph();
		if (this.showOnConsole == true)
		{
			var message = "Conectividade com o servidor (delay em ms: " + this.diffDateTime + " e delay atual: " + this.currentDelay + "): " + (this.currentDelayPercent) + "% - Nível: " + this.getLevel();
			console.log(message);
			console.log('Dados medidos: ' + this.data);
			console.log('Tempo médio: ' + this.getPercentAverage());
		}
	}

	this.getLevel = function()
	{
		if (this.currentDelayPercent <= 5) {return 1;}
		else if (this.currentDelayPercent <= 30) {return 2;}
		else if (this.currentDelayPercent <= 50) {return 3;}
		else if (this.currentDelayPercent <= 70) {return 4;}
		else if (this.currentDelayPercent <= 80) {return 5;}
		else {return 6;}
	}

	this.showPercentIndicator = function()
	{
		$('#server_connectivity').html(this.currentDelayPercent + '%');
		var level = this.getLevel();
		if (level == 1 || level == 2) {$('#server_connectivity').css('color', this.colorLevel1);}
		else if (level == 3 || level == 4) {$('#server_connectivity').css('color', this.colorLevel2);}
		else if (level == 5 || level == 6) {$('#server_connectivity').css('color', this.colorLevel3);}
	}

	this.showIndicatorGraph = function()
	{
		var level = this.getLevel();
		$('#server_connectivity_container').attr('class', 'conn_status_' + level);
	}

	this.storeCurrentPercent = function()
	{
		this.data[this.currentPointer] = this.currentDelayPercent;

		if (this.currentPointer + 1 > this.maxPointer) {this.currentPointer = 0;}
		else {this.currentPointer++;}
	}

	this.getPercentAverage = function()
	{
		var total = 0;
		var x = 0;

		for (x = 0; x < this.data.length; x++)
		{
			total += this.data[x];
		}

		return (total / this.data.length);
	}

	this.checkForNaN = function()
	{
		if (isNaN(this.currentDelayPercent))
		{
			this.currentDelayPercent = 99;
		}
	}
}

function buscarCep(cep, fillOnlyIfEmpty)
{
	var fill = false;

	if (fillOnlyIfEmpty)
	{
		if ($.trim($('#txtEndereco').val()) == '' && $.trim($('#txtBairro').val()) == '' && $.trim($('#txtCidade').val()) == '')
		{
			fill = true;
		}
	}
	else
	{
		fill = true;
	}

	if (fill)
	{
		$('#buscarCepPlaceHolder1').hide();
		$('#buscarCepPlaceHolder2').show();

		$.ajax({
			type: "GET",
			url: "buscar_cep.php",
			dataType: "json",
			data: {cep: cep, rnd: randomParamForNoCache()},
			success: function (result)
			{
				if (result && result.success && result.data)
				{
					$('#txtEndereco').val(result.data.logradouro);
					$('#txtBairro').val(result.data.bairro);
					$('#txtCidade').val(result.data.cidade);
					$('#cmbEstado').val(result.data.estado);
				}

				$('#buscarCepPlaceHolder2').hide();
				$('#buscarCepPlaceHolder1').show();
			},
			error: function (jqXHR, textStatus, errorThrown)
			{
				alert('Erro ao tentar fazer busca de CEP, tente novamente.');
				$('#buscarCepPlaceHolder2').hide();
				$('#buscarCepPlaceHolder1').show();
			}
		});
	}
}

function buscarCepAdv(cep)
{
	try
	{
		buscarCepAdvEventProcessor('beforeSubmit', null);
	}
	finally {}

	$.ajax({
		type: "GET",
		url: "buscar_cep.php",
		dataType: "json",
		data: {cep: cep, rnd: randomParamForNoCache()},
		success: function (result)
		{
			if (result && result.success && result.data)
			{
				buscarCepAdvEventProcessor('success', result);
			}
			else
			{
				buscarCepAdvEventProcessor('error', result);
			}

			buscarCepAdvEventProcessor('afterSubmitSuccess', result);
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
			buscarCepAdvEventProcessor('afterSubmitError', {xhr: jqXHR, status: textStatus, error: errorThrown});
		}
	});
}

/* tooltip nos botões */
$(document).ready(function() {
	$("a[id^=btBidOn], a[id^=btBidActive]").live('click', function() {
		var pointer	     = $(this);
		var pointerId	 = pointer.attr('id').split('_')[1];
		var loaderTarget = pointer.attr('loaderTarget');

		var pointerImg = pointer.find('img');

		if (pointerImg != undefined)
		{
			pointer = pointerImg;
		}

		if (loaderTarget != undefined && loaderTarget != "")
		{
			pointer = $(loaderTarget);
		}

        if (IS_TEMPLATE_MOBILE)
        {
            pointer = $(this);
        }

		if (pointer.length == 0)
		{
			return;
		}

		var width   = pointer.innerWidth();
		var height  = pointer.innerHeight();
		var left	= pointer.offset().left;
		var top	    = pointer.offset().top;

		var leftOffset = 5;
		var topOffset  = -4;

		var container = $('#auctionLoader_' + pointerId);

		if (container.length > 0)
		{
			container.remove();
		}

		container = $('<div></div>');
		container.attr('id', 'auctionLoader_' + pointerId);
		container.attr('class', 'auctionLoader');

		$('body').append(container);

		// faz reset das propriedades do loader
		var containerHeight = container.innerHeight();

		container.css('left', left + width + leftOffset);
		container.css('top', top + (height / 2) - (containerHeight / 2) + topOffset);
		container.attr('class', 'auctionLoader loaderIcon');
		container.css('opacity', 1);
		container.css('z-index', 1);
		container.show();
	});
});

function addFavs(url, title){

	if(navigator.userAgent.indexOf("Chrome") != -1)
	{
		alert("Para adicionar ao favoritos pressione <CTRL> + D");
	}
	else
	{
		if (window.sidebar) {window.sidebar.addPanel(title, url, "");}
		else if(window.opera && window.print) {
			var mbm = document.createElement('a');
			mbm.setAttribute('rel', 'sidebar');
			mbm.setAttribute('href', url);
			mbm.setAttribute('title', title);
			mbm.click();
		}
		else if(document.all) {window.external.AddFavorite(url, title);}
	}
}

function SiteClock_Initialize(ServerTime, clockMode)
{
	var dateLocal  = new Date();
	var dateServer = new Date(ServerTime);
	var dateOffset = dateServer - dateLocal;
	SiteClock_Update(dateOffset, clockMode);
}

function SiteClock_Update(dateOffset, clockMode)
{
	var currentDate = new Date();
	var currentDateMonthSpell = "";
	currentDate.setTime(currentDate.getTime() + dateOffset);

	var currentDateDay	= String(currentDate.getDate()).length == 1 ? "0" + String(currentDate.getDate()) : currentDate.getDate();
	var currentDateMonth  = String(currentDate.getMonth()+1).length == 1 ? "0" + String(currentDate.getMonth()+1) : currentDate.getMonth()+1;
	var currentDateYear   = String(currentDate.getFullYear()).length == 1 ? "0" + String(currentDate.getFullYear()) : currentDate.getFullYear();
	var currentDateHour   = String(currentDate.getHours()).length == 1 ? "0" + String(currentDate.getHours()) : currentDate.getHours();
	var currentDateMinute = String(currentDate.getMinutes()).length == 1 ? "0" + String(currentDate.getMinutes()) : currentDate.getMinutes();
	var currentDateSecond = String(currentDate.getSeconds()).length == 1 ? "0" + String(currentDate.getSeconds()) : currentDate.getSeconds();

	if(clockMode == "1" || clockMode == 1)
	{
		$("[id=server_time_place_holder]").html(currentDateDay + "/" + currentDateMonth + " " + currentDateHour + ":" + currentDateMinute + ":" + currentDateSecond);
	}
	else if(clockMode == "2" || clockMode == 2)
	{
		if(currentDateMonth == '01') {currentDateMonthSpell = 'Jan';}
		else if(currentDateMonth == '02') {currentDateMonthSpell = 'Fev';}
		else if(currentDateMonth == '03') {currentDateMonthSpell = 'Mar';}
		else if(currentDateMonth == '04') {currentDateMonthSpell = 'Abr';}
		else if(currentDateMonth == '05') {currentDateMonthSpell = 'Mai';}
		else if(currentDateMonth == '06') {currentDateMonthSpell = 'Jun';}
		else if(currentDateMonth == '07') {currentDateMonthSpell = 'Jul';}
		else if(currentDateMonth == '08') {currentDateMonthSpell = 'Ago';}
		else if(currentDateMonth == '09') {currentDateMonthSpell = 'Set';}
		else if(currentDateMonth == '10') {currentDateMonthSpell = 'Out';}
		else if(currentDateMonth == '11') {currentDateMonthSpell = 'Nov';}
		else if(currentDateMonth == '12') {currentDateMonthSpell = 'Dez';}
		$("[id=server_time_place_holder]").html(currentDateDay + " "  + currentDateMonthSpell + " "  + currentDateYear + " - " + currentDateHour + ":" + currentDateMinute + ":" + currentDateSecond);
	}
	else if(clockMode == "3" || clockMode == 3)
	{
		$("[id=server_time_place_holder]").html(currentDateHour + ":" + currentDateMinute + ":" + currentDateSecond);
	}
	else
	{
		if(currentDateMonth == '01') {currentDateMonthSpell = 'Janeiro';}
		else if(currentDateMonth == '02') {currentDateMonthSpell = 'Fevereiro';}
		else if(currentDateMonth == '03') {currentDateMonthSpell = 'Março';}
		else if(currentDateMonth == '04') {currentDateMonthSpell = 'Abril';}
		else if(currentDateMonth == '05') {currentDateMonthSpell = 'Maio';}
		else if(currentDateMonth == '06') {currentDateMonthSpell = 'Junho';}
		else if(currentDateMonth == '07') {currentDateMonthSpell = 'Julho';}
		else if(currentDateMonth == '08') {currentDateMonthSpell = 'Agosto';}
		else if(currentDateMonth == '09') {currentDateMonthSpell = 'Setembro';}
		else if(currentDateMonth == '10') {currentDateMonthSpell = 'Outubro';}
		else if(currentDateMonth == '11') {currentDateMonthSpell = 'Novembro';}
		else if(currentDateMonth == '12') {currentDateMonthSpell = 'Dezembro';}
		$("[id=server_time_place_holder]").html(currentDateDay + " de "  + currentDateMonthSpell + " de "  + currentDateYear + " " + currentDateHour + ":" + currentDateMinute + ":" + currentDateSecond);
	}

	setTimeout("SiteClock_Update("+dateOffset+", "+clockMode+")", 1000);
}

function scrollToId(id, effect)
{
	if (effect == undefined) {effect = 'fast';}
	if ($("#"+id).offset()) {$('html,body').animate({scrollTop: $("#"+id).offset().top}, effect);}
}

function toggleNode(id) {
	toggle(id, function() {
		if ($("#" + id).css('display') == 'block') {
			$("#btn-toggle").html('Minimizar');
		} else {
			$("#btn-toggle").html('Maximizar');
		}
	});
}

function toggle(id, callback) {
	$("#" + id).animate({
		height: "toggle",
		opacity: "toggle"
	}, {
		complete:
		function() {
			setTimeout(function() {
				if (typeof(callback) == 'function') {
					callback();
				}
			}, 100)
		}
	}
	);
}

function twitterShare(a, url) {
	var href = "http://twitter.com/share?text=TEXTO&url=" + url + "&via=umbarato";
	a.setAttribute("target", "_blank");
	a.setAttribute("href", href);
	return true;
}

function paymentSaveAnalytics(transactionId, itemId, transactionType, itemDescription, itemCategory, total, shipping, city, state)
{
    try
    {
        if (typeof(_gaq) == 'undefined')
        {
            // vamos usar o novo código
            ga('ecommerce:addTransaction', {
                'id': transactionId,              // Transaction ID. Required
                'affiliation': transactionType,   // Affiliation or store name
                'revenue': total,                 // Grand Total
                'shipping': shipping,             // Shipping
                'tax': '0',                       // Tax
                'currency': 'BRL'                 // Current Currency
            });

            ga('ecommerce:addItem', {
                'id': transactionId,            // Transaction ID. Required
                'name': itemDescription,        // Product name. Required
                'sku': itemId,                  // SKU/code
                'category': itemCategory,       // Category or variation
                'price': total,                 // Unit price
                'quantity': '1',                // Quantity
                'currency': 'BRL'               // Current Currency
            });

            ga('ecommerce:send');
        }
        else
        {
            // vamos usar o código antigo
            _gaq.push(['_addTrans', transactionId, transactionType, total, "0", shipping, city, state, "Brasil"]);
            _gaq.push(['_addItem', transactionId, itemId, itemDescription, itemCategory, total, "1"]);
            _gaq.push(['_trackTrans']);
        }
    } catch(e) { }
}

function paymentTrackEvent(method, status, value)
{
    try
    {
        if (typeof(_gaq) == 'undefined')
        {
            // vamos usar o novo código
            value = parseInt(value);
            ga('send', 'event', 'Pagamento', method, status, value, {'nonInteraction': 1});
        }
        else
        {
            // vamos usar o código antigo
            value = parseInt(value);
            _gaq.push(['_trackEvent', 'Pagamento', method, status, value]);
        }
    } catch (e) {}
}

function showLightboxTutorial(type)
{
	if (isUndefined(type))
	{
		type = 'introducao-leilao';
	}

	var url = 'lightboxTutorial.php?type=' + type;

	if (screen.width < 1024 || screen.height < 600)
	{
		window.open(url, 'lightbox-tutorial');
	}
	else
	{
		$.fancybox.open({
		    type: 'iframe',
		    href: url,
		    width: 950,
		    height: 500,
			beforeShow: function() {
				$('.hideOnLightbox').hide();
			},
			afterClose: function() {
				$('.hideOnLightbox').show();
			}
		});
	}
}

function createAndSubmitForm(path, params, method)
{
    // exemplo:
    // createAndSubmitForm('http://www.site.com/script.php', {'nome':'nome+sobrenome', 'idade':'100', 'sexo':'m'}, 'post');
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    // move a função de submit para uma outra variável,
    // pois com isso o submit não poderá ser substituido
    form._submit_function_ = form.submit;

    for(var key in params)
    {
        if(params.hasOwnProperty(key))
        {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form._submit_function_();
}

function validateDateBr(valor) {
	var date=valor;
	var ardt=new Array;
	var ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt=date.split("/");
	erro=false;
	if ( date.search(ExpReg)==-1){
		erro = true;
		}
	else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
		erro = true;
	else if ( ardt[1]==2) {
		if ((ardt[0]>28)&&((ardt[2]%4)!=0))
			erro = true;
		if ((ardt[0]>29)&&((ardt[2]%4)==0))
			erro = true;
	}
	if (erro) {
		return false;
	}
	return true;
}

function showMessageBox(opts)
{
    var messageTitle         = opts.title         !== undefined ? opts.title         : '';
    var messageSubTitle      = opts.subTitle      !== undefined ? opts.subTitle      : '';
    var messageMessage       = opts.message       !== undefined ? opts.message       : '';
    var messageMessageHeader = opts.messageHeader !== undefined ? opts.messageHeader : '';
    var messageMessageFooter = opts.messageFooter !== undefined ? opts.messageFooter : '';
    var messagePrefix        = opts.prefix        !== undefined ? opts.prefix        : 'message';
    var messageWrapClass     = opts.wrapClass     !== undefined ? opts.wrapClass     : (messagePrefix + 'BoxDefault');
    var messageList          = opts.messageList   !== undefined ? opts.messageList   : [];
    var messageCloseButton   = opts.closeButton   !== undefined ? opts.closeButton   : true;
    var messageCloseClick    = opts.closeClick    !== undefined ? opts.closeClick    : false;
    var messageModal         = opts.modal         !== undefined ? opts.modal         : false;

    var params = {
        wrapCSS    : messageWrapClass,
        autoSize   : true,
        height     : 'auto',
        minHeight  : 50,
        closeBtn   : messageCloseButton,
        closeClick : messageCloseClick,
        modal      : messageModal
    };

    if (opts.minWidth !== undefined)
    {
        params.minWidth = opts.minWidth;
    }

    if (messageList && messageList.length > 0)
    {
        var messageListMessage = '';

        for(x = 0; x < messageList.length; x++)
        {
            messageListMessage += '<li>' + messageList[x] + '</li>';
        }

        messageMessage = '<ul class="' + messagePrefix + 'BoxErrorList">' + messageListMessage + '</ul>' + messageMessage;
    }

    messageMessage = messageMessageHeader + messageMessage + messageMessageFooter;

    $('#' + messagePrefix + 'BoxTitle').html(messageTitle);
    $('#' + messagePrefix + 'BoxSubTitle').html(messageSubTitle);
    $('#' + messagePrefix + 'BoxMessage').html(messageMessage);

    $.fancybox($('#' + messagePrefix + 'Box'), params);

    $('#' + messagePrefix + 'BoxCloseButton').focus();
}

function showInlineMessageBox(opts)
{
    var messageTitle   = opts.title         !== undefined ? opts.title         : '';
    var messageMessage = opts.message       !== undefined ? opts.message       : '';
    var messageList    = opts.messageList   !== undefined ? opts.messageList   : [];
    var elementId      = opts.elementId     !== undefined ? opts.elementId     : 'inlineMessageBox';
    var visible        = opts.visible       !== undefined ? opts.visible       : true;

    $('#' + elementId).html('');

    // título
    if (messageTitle && messageTitle != '')
    {
        $('#' + elementId).append('<h4></h4>');
        $('#' + elementId + ' h4').html(messageTitle);
        $('#' + elementId + ' h4').show();
    }

    // mensagem
    if (messageList && messageList.length > 0)
    {
        var messageListMessage = '';

        for(x = 0; x < messageList.length; x++)
        {
            messageListMessage += '<li>' + messageList[x] + '</li>';
        }

        $('#' + elementId).append('<ul></ul>');
        $('#' + elementId + ' ul').html(messageListMessage);
        $('#' + elementId + ' ul').show();
    }
    else if (messageMessage && messageMessage != '')
    {
        $('#' + elementId).append('<ul></ul>');
        $('#' + elementId + ' ul').html('<li>' + messageMessage + '</li>');
        $('#' + elementId + ' ul').show();
    }

    if (visible)
    {
        $('#' + elementId).show();
    }
    else
    {
        $('#' + elementId).hide();
    }
}

// Remove caracteres especiais
String.prototype.filterData = function() {
    var
        str = this.toLowerCase(),
        specialChars = [
            {val:'a', let:'áàãâä'},
            {val:'e', let:'éèêë'},
            {val:'i', let:'íìîï'},
            {val:'o', let:'óòõôö'},
            {val:'u', let:'úùûü'},
            {val:'c', let:'ç'}
        ],
        regex;

    for (var i in  specialChars) {
        regex = new RegExp('[' + specialChars[i].let + ']', 'g');
        str = str.replace(regex, specialChars[i].val);
        regex = null;
    }

    return str;
};

function getURLParameter(name)
{
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )    return null;
    else    return results[1];
}

function saveGoogleAnalyticsParameters()
{
    var utm_source         = getURLParameter('utm_source');
    var utm_medium         = getURLParameter('utm_medium');
    var utm_term           = getURLParameter('utm_term');
    var utm_campaign       = getURLParameter('utm_campaign');
    var expire_days        = 30;
    var has_analytics_data = false;
    var has_utm_source     = false;
    var has_utm_medium     = false;
    var has_utm_term       = false;
    var has_utm_campaign   = false;

    utm_source   = decodeURIComponent(utm_source);
    utm_medium   = decodeURIComponent(utm_medium);
    utm_term     = decodeURIComponent(utm_term);
    utm_campaign = decodeURIComponent(utm_campaign);

    if (utm_source && utm_source != "" && utm_source != "null")
    {
        has_analytics_data = true;
        has_utm_source     = true;

        createCookie("ubc_utm_source", "", -1);
        createCookie("ubc_utm_source", utm_source, expire_days);
    }

    if (utm_medium && utm_medium != "" && utm_medium != "null")
    {
        has_analytics_data = true;
        has_utm_medium     = true;

        createCookie("ubc_utm_medium", "", -1);
        createCookie("ubc_utm_medium", utm_medium, expire_days);
    }

    if (utm_term && utm_term != "" && utm_term != "null")
    {
        has_analytics_data = true;
        has_utm_term       = true;

        createCookie("ubc_utm_term", "", -1);
        createCookie("ubc_utm_term", utm_term, expire_days);
    }

    if (utm_campaign && utm_campaign != "" && utm_campaign != "null")
    {
        has_analytics_data = true;
        has_utm_campaign   = true;

        createCookie("ubc_utm_campaign", "", -1);
        createCookie("ubc_utm_campaign", utm_campaign, expire_days);
    }

    if (has_analytics_data)
    {
        if (!has_utm_source)
        {
            createCookie("ubc_utm_source", "", -1);
        }

        if (!has_utm_medium)
        {
            createCookie("ubc_utm_medium", "", -1);
        }

        if (!has_utm_term)
        {
            createCookie("ubc_utm_term", "", -1);
        }

        if (!has_utm_campaign)
        {
            createCookie("ubc_utm_campaign", "", -1);
        }
    }
}

function pageY(elem) {
    return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
}

function goBack()
{
    if (history.length)
    {
        window.history.back();
    }
    else
    {
        window.location.href = "index.php";
    }
}

function clientRedirect(url)
{
    window.location.href = url;
}

$(document).ready(function(){
    // Mask phone accept 11 numbers
    $('#workPhone, #homePhone').mask('(99)9999-9999?9');
    $('#zipcode').mask('99999-999');

    // Adiciona a URL de login do Facebook
    $.get("facebook_login_url.php", {
        rnd: randomParamForNoCache()
    }, function (data) {
        $('.facebook_login_link').attr('onclick', '');
        $('.facebook_login_link').attr('href', data);
    });

    // Salva as tags
    saveGoogleAnalyticsParameters();
});

function showLightBox(){
	$.fancybox({
		autoSize:false,
		width: 300,
		height: 150,
		content : $("#lightboxSuccess").html()
	});
}
