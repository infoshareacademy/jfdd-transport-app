(function(){
    var app = angular.module('transport');

    app.config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
        $mdDateLocaleProvider.shortMonths = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        $mdDateLocaleProvider.days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];
        $mdDateLocaleProvider.shortDays = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('YYYY-MM-DD');

        };
    });

    app.controller('AppCtrl', function($scope) {
        //$scope.myDate = new Date();
        //$scope.addDate = function(selected){
        //    console.log(myDate)
        //    $scope.travelObject['date']= selected;
        //    console.log( $scope.travelObject['date'])
        //    $('#disabledSelect2').attr('disabled',false);
        //}

    });
})();