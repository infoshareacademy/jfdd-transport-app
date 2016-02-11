(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app.factory('InstancedService', function () {

            function Instance(date, name, line) {
                this.date = date ||new Date();
                this.busStop = name || "Nie wybrano przystanku";
                this.line = line || "Nie wybrano linii";
            }

            return {
                Instance: Instance
            }
        })

        .controller('transportCtrl', function ($scope, InstancedService) {

            $scope.travelObject = {
                date: new Date(),
                busStop: "Nie wybrano przystanku",
                line: "Nie wybrano linii",
                time: (new Date).getTime()
            };

            $scope.instancesArray = [];

            $scope.Hello = function (param1, param2, param3) {
                $scope.instanceA = new InstancedService.Instance(param1, param2, param3);
                $scope.instancesArray.push($scope.instanceA);
            };

            $scope.deleteJourney = function(item){
                console.log($scope.instancesArray)
                console.log(item)
                var index = $scope.instancesArray.indexOf(item);
                $scope.instancesArray.splice(index, 1);

            };

            $scope.addDate = function(selected){
               return $scope.myDate = selected;
                //$('#disabledSelect2').attr('disabled',false);
            };




            $scope.addStop = function (selected) {

                $scope.travelObject['busStop'] = selected;

                //$('#disabledSelect3').attr('disabled',false);

                $scope.accumulator = [];

                $scope.filteredLines = $scope.lines.map(function (line) {
                    line.stops.forEach(function (stops) {
                        for (name in stops) {
                            if (stops.name == selected) {
                                //console.log(line)
                                $scope.accumulator.push(line);
                            }
                        }
                    });
                });
                $scope.uniqueLines = [];
                $.each($scope.accumulator, function (i, el) {
                    if ($.inArray(el, $scope.uniqueLines) === -1) $scope.uniqueLines.push(el);
                });
            }
        })
})();