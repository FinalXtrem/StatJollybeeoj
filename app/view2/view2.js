'use strict';

angular.module('myApp.view2', ['ngRoute'])

    /*.config(['$routeProvider', function ($routeProvider) {
     $routeProvider.when('/view2', {
     templateUrl: 'view2/view2.html',
     controller: 'View2Ctrl'
     });
     }])*/

    .controller('View2Ctrl', ['$scope', '$http', '$q', function (s, $http, $q) {
        $http.defaults.headers.put = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };
        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With'];
        s.verdicts = [
            'Accepted',
            'Output Limit Exceeded',
            'Time Limit Exceeded',
            'Compile Error',
            'Memory Limit Exceeded',
            'Run Time Error',
            'Wrong Answer',
        ];
        s.verdictLabel = [
            'AC',
            'OLE',
            'TLE',
            'CE',
            'MLE',
            'RTE',
            'WA',
        ];
        //s.user = ['FinalX', 'RianySantoso', 'BobyHartanto', 'VLinda', 'MettaHandika', 'firdarinoa', 'paulusrobin', 'stanleygiovany'];
        s.users = [
            {nim: '1801373990', name: 'RIANY', username: 'rianysantoso', jml: []},
            {nim: '1801374223', name: 'BILLY SAPUTRA', username: 'billysaputra', jml: []},
            {nim: '1801374646', name: 'PAULUS ROBIN', username: 'paulusrobin', jml: []},
            {nim: '1801377742', name: 'BOBY HARTANTO', username: 'bobyhartanto', jml: []},
            {nim: '1801380573', name: 'ANDREW DEAN BACHTIAR', username: 'Andrew', jml: []},
            {nim: '1801381430', name: 'METTA HANDIKA', username: 'mettahandika', jml: []},
            {nim: '1801382042', name: 'STANLEY GIOVANY', username: 'stanleygiovany', jml: []},
            {nim: '1801382295', name: 'GRIFFIN SEANNERY', username: 'griff88', jml: []},
            {nim: '1801384350', name: 'YACOB', username: 'yacob21', jml: []},
            {nim: '1801384590', name: 'JASON NATHANAEL', username: 'JasonN', jml: []},
            {nim: '1801385555', name: 'ARIEF SURYA', username: 'conglip', jml: []},
            {nim: '1801385901', name: 'VANIA CHRIST FINA', username: 'cehaa12', jml: []},
            {nim: '1801385990', name: 'VELINDA DWI PUSPA', username: 'Vlinda', jml: []},
            {nim: '1801386476', name: 'ARIO MANON SEJATI', username: 'manjatgones', jml: []},
            {nim: '1801389282', name: 'FIRDA SAHIDI', username: 'firdarinoa', jml: []},
            {nim: '1801391122', name: 'FERNANDO PRAYOGO', username: 'nandohendo', jml: []},
            {nim: '1801391495', name: 'FRANSISCUS WIRAPUTRA', username: 'fransis10', jml: []},
            {nim: '1801391816', name: 'RICKY RAY', username: 'RR27', jml: []},
            {nim: '1801397391', name: 'WILLIAM', username: 'william06', jml: []},
            {nim: '1801399270', name: 'YUKIANTO DARMAWAN WIJAYA', username: 'yukianto', jml: []},
            {nim: '1801400101', name: 'MIKA OCTO FRENTZEN', username: 'STRIDER', jml: []},
            {nim: '1801400846', name: 'AURELIA FRISKA WIDJAJA', username: 'aureliafriska', jml: []},
            {nim: '1801409580', name: 'JERRY LUIS', username: 'jerry', jml: []},
            {nim: '1801414744', name: 'RAOUL VENDREO ACHDIYAT', username: 'RVA', jml: []},
            {nim: '1801417733', name: 'TADEO LEMUEL CHRISTIAN LIANDA', username: 'tadeolcl', jml: []},
            {nim: '1801417815', name: 'THEODORE JUNOT HARBANGAN', username: 'Junot', jml: []},
            {nim: '1801418894', name: 'PETTER JOHN', username: 'PetterJohn', jml: []},
            {nim: '1801426800', name: 'JONATHAN SAPUTRA HALIM ( JOY )', username: 'raphaeljonathan88', jml: []},
            {nim: '1801427324', name: 'REZADI FALAH', username: 'rezadif', jml: []},
            {nim: '1801431201', name: 'WILLI SEPTIANSYAH', username: 'williseptiansyah', jml: []},
            {nim: '1801434191', name: 'RENGKUAN RICHARD JOSHUA TIMOTHY', username: 'RJTimothy', jml: []},
            {nim: '1801435282', name: 'LUSYA RANI SITUMORANG', username: 'lusyarani', jml: []},
            {nim: '1801441556', name: 'DIONISIUS ANDRIAN HADIPURNAWAN', username: 'dionhadipurnawan', jml: []},
            {nim: '1801451292', name: 'RAHMA AISYAH QADARY', username: 'rqadary', jml: []},
        ];
        s.showLoad = true;
        s.userData = [];
        var arr = [];
        for (var i = 0; i < s.users.length; i++) {
            arr.push($http.post('https://jollybeeoj.com/submission/statistic/user/u/' + s.users[i].username, []));
        }

        $q.all(arr).then(function (response) {
            for (var i in response) {
                //console.log(i, response[i].data);
                var d = response[i].data;
                for (var j = 0; j < s.verdicts.length; j++) {
                    s.userData[i] = s.users[i];
                    s.userData[i].jml.push(getVerdict(d, s.verdicts[j]));
                }
            }
            s.userData.sort(function (a, b) {return b.jml[0] - a.jml[0];});
            s.showLoad = false;
        });

        s.sorted = {selected: 0, asc: 0};
        s.sortD = function (i) {
            if (s.sorted.selected != i) {
                s.sorted.selected = i;
                s.sorted.asc = 0;
            } else {
                s.sorted.asc++;
                s.sorted.asc %= 2;
            }
            if (s.sorted.asc == 0)
                s.userData.sort(function (a, b) {
                    return b.jml[i] - a.jml[i];
                });
            else
                s.userData.sort(function (a, b) {
                    return a.jml[i] - b.jml[i];
                });
        };
        s.sortNim = function(){
            if (s.sorted.selected != i) {
                s.sorted.selected = i;
                s.sorted.asc = 0;
            } else {
                s.sorted.asc++;
                s.sorted.asc %= 2;
            }
            if (s.sorted.asc == 0)
                s.userData.sort(function (a, b) {
                    return b.nim - a.nim;
                });
            else
                s.userData.sort(function (a, b) {
                    return a.nim - b.nim;
                });
        };
        s.sortName = function(){
            if (s.sorted.selected != i) {
                s.sorted.selected = i;
                s.sorted.asc = 0;
            } else {
                s.sorted.asc++;
                s.sorted.asc %= 2;
            }
            if (s.sorted.asc == 0)
                s.userData.sort(function (a, b) {
                    return b.name - a.name;
                });
            else
                s.userData.sort(function (a, b) {
                    return a.name - b.name;
                });
        };
        s.sortUser = function(){
            if (s.sorted.selected != i) {
                s.sorted.selected = i;
                s.sorted.asc = 0;
            } else {
                s.sorted.asc++;
                s.sorted.asc %= 2;
            }
            if (s.sorted.asc == 0)
                s.userData.sort(function (a, b) {
                    return b.username - a.username;
                });
            else
                s.userData.sort(function (a, b) {
                    return a.username - b.username;
                });
        };
    }]);

function getVerdict(json, verdict) {
    for (var i = 0; i < json.length; i++) {
        if (json[i].verdictDisplayName == verdict)return json[i].count;
    }
    return 0;
}

