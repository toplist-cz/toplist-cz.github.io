function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

var countDownDate = moment().endOf('month').toDate();

var reportCountdown = function() {
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("report-countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s";

    // If the count down is finished, write some text
    if (distance < 0) {
        location.reload();
    }
};

jQuery(function($){
    let charts = {};
    let tables = {};
    let webs = [];
    let STATS = {};
    //let STATSOrder = [];
    let STATS_DATA = {};

    $.ajax({
        method: 'GET',
        crossDomain: true,
        url: API_URL+'/api/v1/sharedData/job',
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 403 || jqXHR.status === 401) {
                document.cookie = "authToken=;samesite=strict;max-age=0";
            }
            location.reload();
        },
        success: function(json){
            STATS = json;
            /* just good to know
            for (let i in STATS) {
                STATSOrder.push({
                    groupId: STATS[i]['jobGroupId'],
                    seq: STATS[i]['seq'],
                    id: i
                });
            }
            STATSOrder.sort(function(a,b){
                return (a.groupId*10000+a.seq) - (b.groupId*10000+b.seq);
            });*/
        }
    });

    let drawPieChart = function(statId) {
        let chartId = 'statChart'+statId;
        let ctx = document.getElementById(chartId).getContext('2d');

        let chartParams = {
            type: 'pie',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
                plugins: {
                    colorschemes: {
                        scheme: 'brewer.SetOne9'
                    }
                },
                tooltips: {
                    mode: 'index'
                }
            }
        };

        let dataset = {
            data: []
        }
        let otherSum = 0;
        for (let i = 0; i < STATS_DATA[statId].result.dataSeries.length; i++) {
            let dataKeyword = STATS_DATA[statId].result.dataSeries[i].keyword;
            if (i<10) {
                chartParams.data.labels.push(STATS_DATA[statId].result.dataSeries[i]['title'] || dataKeyword);
                sumValue = Math.floor(STATS_DATA[statId].result.data[dataKeyword].reduce(function(a,b){return a+b}, 0));
                dataset.data.push(sumValue);
            }
            else {
                otherSum += Math.floor(STATS_DATA[statId].result.data[dataKeyword].reduce(function(a,b){return a+b}, 0));
            }
        };
        if (otherSum > 0) {
            chartParams.data.labels.push('-');
            dataset.data.push(otherSum);
        }
        chartParams.data.datasets.push(dataset);

        chartParams.options.legend = {
            display: true
        };
        if (chartId in charts) {
            charts[chartId].destroy();
        }
        console.log(chartParams);
        charts[chartId] = new Chart(ctx, chartParams);
    };

    let drawGraph = function(statId){
        let chartId = 'statChart'+statId;
        let ctx = document.getElementById(chartId).getContext('2d');

        let chartParams = {
            type: 'bar',
            data: {
                labels: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0, // animation duration after a resize
                plugins: {
                    colorschemes: {
                        scheme: 'brewer.SetOne9'
                    }
                },
                tooltips: {
                    mode: 'index'
                }
            }
        };

        for (let i = 0; i < STATS_DATA[statId].result.timeline.length; i++) {
            chartParams.data.labels.push(moment(STATS_DATA[statId].result.timeline[i]).format("D."));
        };
        chartParams.data.datasets = [];
        let sumValue = 0;
        let maxValue = 0
        for (let i = 0; i < Math.min(STATS_DATA[statId].result.dataSeries.length, 10); i++) {
            let dataKeyword = STATS_DATA[statId].result.dataSeries[i].keyword;
            sumValue = STATS_DATA[statId].result.data[dataKeyword].reduce(function(a,b){return a+b}, 0);
            maxValue = Math.max.apply(null, STATS_DATA[statId].result.data[dataKeyword]);
            let data = [];
            let backgroundColor = [];
            let dataId;
            for (dataId = 0; dataId < STATS_DATA[statId].result.data[dataKeyword].length; dataId++) {
                let color = '#229bdb';
                if (maxValue === STATS_DATA[statId].result.data[dataKeyword][dataId]) {
                    color = '#db2222';
                }
                else if (moment(STATS_DATA[statId].result.timeline[dataId]).day() === 0 || moment(STATS_DATA[statId].result.timeline[dataId]).day() === 6) {
                    color = '#006bab';
                }
                data.push(STATS_DATA[statId].result.data[dataKeyword][dataId]);
                if (chartParams.data.datasets.length<2) {
                    backgroundColor.push(color);
                };
            }
    
            let dataset =  {
                label: STATS_DATA[statId].result.dataSeries[i]['title'] || dataKeyword,
                data: data,
                barPercentage: 0.5,
                fill: false
            };
            if (chartParams.data.datasets.length<2) {
                dataset.backgroundColor = backgroundColor;
            }
            chartParams.data.datasets.push(dataset);
        };

        chartParams.options.legend = {
            display: (chartParams.data.datasets.length<2)?false:true
        };
        chartParams.type = (chartParams.data.datasets.length<2)?'bar':'line';
        if (chartId in charts) {
            charts[chartId].destroy();
        }
        charts[chartId] = new Chart(ctx, chartParams);
        $('#'+chartId).prev().text(STATS_DATA[statId].title);
        let statDiv = $('#statDiv'+statId);
        if (STATS_DATA[statId].result.dataSeries.length === 1) {
            $('div.text', statDiv).text('Celkem: '+sumValue+', maximum: '+maxValue);
        };
    };

    let drawTable = function(statId){
        let tableId = 'statTable'+statId;

        if ( $.fn.dataTable.isDataTable('#'+tableId) ) {
            let datatable = $('#'+tableId).DataTable();
            datatable.clear();
            datatable.rows.add(STATS_DATA[statId].result.data);
            datatable.draw();
        }
        else {
            $('#'+tableId).DataTable({
                language: {
                    url: '/assets/datatables/czech.json'
                },
                data: STATS_DATA[statId].result.data,
                order: [[ 1, "desc" ]],
                columns: [
                    {
                        data: 'description',
                        title: DICT["hodnota"]
                    },
                    {
                        data: 'value',
                        title: DICT["množství"]
                    }
                ]
            });
        }

        if (tableId in charts) {
        }
        else {
            tables[tableId] = 1;
        }
    };

    let loadReportList = function() {
        $('.loading').removeClass('d-none');
        $.ajax({
            method: 'GET',
            crossDomain: true,
            url: API_URL+'/api/v1/profi/'+webs[0]+'/reports/month?limit=12',
            headers: {
                'Authorization': getCookie('authToken')
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403 || jqXHR.status === 401) {
                    document.cookie = "authToken=;samesite=strict;max-age=0";
                    location.reload();
                }
            },
            success: function(json){
                if (json.length === 0 || json[0].dateFrom !== moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD')) {
                    reportCountdown();
                    $('#new-report-month').text(moment().subtract(1, 'months').format('MMMM'));
                    $('#create-report').removeClass('d-none');
                    setInterval(reportCountdown, 1000);
                }
                else {
                    loadReport(json[0].id, true);
                }
                let divReportList = $('div#reportList').html('');
                for (let i = 0; i < json.length; i++) {
                    $('<a>').addClass('dropdown-item').attr('href', '#'+json[i].id).text(moment(json[i].dateFrom).format('MMMM YYYY')).appendTo(divReportList);
                }
            $('.loading').addClass('d-none');
            }
        });
    };

    let loadReport = function(reportId, noHistory) {
        $('.loading').removeClass('d-none');
        $.ajax({
            method: 'GET',
            crossDomain: true,
            url: API_URL+'/api/v1/profi/'+webs[0]+'/report/'+reportId,
            headers: {
                'Authorization': getCookie('authToken')
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403 || jqXHR.status === 401) {
                    document.cookie = "authToken=;samesite=strict;max-age=0";
                    location.reload();
                }
            },
            success: function(json){
                let statsDiv = $('#stats');
                $('#reportDate').text(moment(json.dateFrom).format('MMMM YYYY'));
                if (!noHistory && reportId !== window.location.hash.substr(1)) {
                    history.pushState({reportId:reportId}, moment(json.dateFrom).format('MMMM YYYY'), '/report#'+reportId);
                }
                document.title = 'TOPlist - '+moment(json.dateFrom).format('MMMM YYYY');
                STATS_DATA = {};

                for (let i = 0; i < json.stats.length; i++) {
                    let stat = json.stats[i];
                    STATS_DATA[stat.statId] = stat;
                    let statDiv;
                    if (document.getElementById('statDiv'+stat.statId) === null) {
                        statDiv = $('<div>').addClass('jumbotron bg-white').attr('id','statDiv'+stat.statId).appendTo(statsDiv);
                        let icons = $('<span>').addClass("float-right").appendTo(statDiv);
                        if (STATS[stat.statId]['renderer'] === 'graph' && stat.result.dataSeries.length > 1) {
                            $('<div>').addClass('toggleGraph btn-group btn-group-toggle').data('toggle', 'buttons').html(`
                            <label class="btn btn-sm btn-outline-primary active" data-id="`+stat.statId+`">
                                <input type="radio" name="graphOptions`+stat.statId+`" id="barChart" autocomplete="off" checked><i class="fa fa-bar-chart"></i>
                            </label>
                            <label class="btn btn-sm btn-outline-primary" data-id="`+stat.statId+`">
                                <input type="radio" name="graphOptions`+stat.statId+`" id="pieChart" autocomplete="off"><i class="fa fa-pie-chart"></i>
                            </label>`).appendTo(icons);
                            //$('<i>').data('id', 'statDiv'+stat.statId).addClass("btn btn-primary fa fa-bar-chart").appendTo(icons);
                            //$('<i>').data('id', 'statDiv'+stat.statId).addClass("btn btn-outline-primary fa fa-pie-chart text-black").appendTo(icons);
                        }
                        $('<i>').data('id', 'statDiv'+stat.statId).addClass("stat-switch btn fa fa-times fa-2x text-black").attr('title', DICT["zavřít"]).appendTo(icons);
                        $('<h3>').addClass('mt-1 text-primary').text(stat.title).appendTo(statDiv);
                        $('<span>').data('id', 'statDiv'+stat.statId).addClass('stat-switch btn badge badge-pill badge-primary').text(stat.title).appendTo($('#settingsHidden'));
                    }
                    else {
                        statDiv = $('#statDiv'+stat.statId);
                    }
                    if (STATS[stat.statId]['renderer'] === 'graph') {
                        if (!('statChart'+stat.statId in charts)) {
                            $('<canvas>').addClass('my-4 w-100').attr('id', 'statChart'+stat.statId).appendTo(statDiv);
                            $('<div>').addClass('text').appendTo(statDiv);
                        }
                        drawGraph(stat.statId);
                    }
                    else {
                        if (!('statTable'+stat.statId in tables)) {
                            $('<table>').addClass('table table-striped table-hover table-sm table-responsive-sm').attr('id', 'statTable'+stat.statId).appendTo(statDiv);
                        }
                        drawTable(stat.statId);
                    }
                };
                if (json.prevId) {
                    $('.prev-report').removeClass('d-none').data('report-id', json.prevId);
                }
                else {
                    $('.prev-report').addClass('d-none');
                }
                if (json.nextId) {
                    $('.next-report').removeClass('d-none').data('report-id', json.nextId);
                }
                else {
                    $('.next-report').addClass('d-none');
                }
                window.location.hash = reportId;
                $('.loading').addClass('d-none');
            }
        });
    };

    window.onpopstate = function(event) {
        loadReport(window.location.hash.substr(1), true);
        //alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
    }

    $('.btnSwitchReport').on('click', function(e){
        loadReport($(this).data('report-id'));
    });

    $('.settings-switch').on('click', function(){
        $('#settingsDiv').toggleClass('d-none');
        return false;
    });

    $('#btnLogout').on('click', function(){
        document.cookie = "authToken=;samesite=strict;max-age=0";
        sessionStorage.removeItem('jwt');
    });

    $('div#stats').on('click', 'label.btn', function(event){
        event.preventDefault();
        let statId = $(this).data('id');
        let op = $('input', this).attr('id');
        //$(this).button('toggle');
        $('label', '#statDiv'+statId).button('toggle');
        if (op === 'pieChart') {
            drawPieChart(statId);
        }
        else if (op === 'barChart') {
            drawGraph(statId);
        }
    });

    $('div#stats,div#settingsHidden').on('click', '.stat-switch', function(){
        let invisibleCount = 0;
        $('#'+$(this).data('id')).toggleClass('d-none');
        $.each($('div#settingsHidden span.stat-switch'), function(i, span){
            let $span = $(span);
            if ($('#'+$span.data('id')).hasClass('d-none')) {
                $span.addClass('badge-inactive');
                invisibleCount++;
            }
            else {
                $span.removeClass('badge-inactive');
            }
        });
        if (invisibleCount > 0) {
            $('#navSettingBadge').removeClass('d-none').text(invisibleCount);
        }
        else {
            $('#navSettingBadge').addClass('d-none');
        }
    });

    let jwt = sessionStorage.getItem('jwt');
    if (jwt) {
        for (toplistId in parseJwt(jwt)['sco']) {
            webs.push(toplistId);
        }
    };

    if (!getCookie('authToken')) {
        if (jwt) {
            $.ajax({
                method: 'POST',
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                url: API_URL+'/api/auth',
                data: JSON.stringify({
                    token:jwt
                }),
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 401) {
                        $('#login-info').removeClass('d-none');
                        $('#btnLogin').removeClass('d-none');
                        $('#btnLogout').addClass('d-none');
                    }
                },
                success: function(json) {
                    document.cookie = "authToken="+json.token+";samesite=strict;max-age=3600";
                    loadReportList();
                    topFunction();
                    $('#btnLogin').addClass('d-none');
                    $('#btnLogout').removeClass('d-none');
                }
            });
        }
        else {
            $('#login-info').removeClass('d-none');
            $('#btnLogin').removeClass('d-none');
            $('#btnLogout').addClass('d-none');
        }
    }
    else {
        loadReportList();
        topFunction();
        $('#btnLogin').addClass('d-none');
        $('#btnLogout').removeClass('d-none');
    };

    $('a#createReport').on('click', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            crossDomain: true,
            url: API_URL+'/api/v1/profi/'+webs[0]+'/report/month',
            headers: {
                'Authorization': getCookie('authToken')
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403 || jqXHR.status === 401) {
                    document.cookie = "authToken=;samesite=strict;max-age=0";
                    location.reload();
                }
            },
            success: function(json){
                console.log(json);
            }
        });
    });
});

btnScrollUp = document.getElementById("btnScrollUp");
window.onscroll = function() {scrollFunction();};
function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        btnScrollUp.style.display = "block";
    } else {
        btnScrollUp.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
