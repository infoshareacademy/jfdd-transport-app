(function () {
    var app = angular.module('transport', ['ngMaterial', 'ngMessages']);

    app.factory('InstancedService', function () {

            function Instance(date, name, line) {
                this.date = date || new Date();
                this.busStop = name || "Nie wybrano przystanku";
                this.line = line || "Nie wybrano linii";
            }

            return {
                Instance: Instance
            }
        })

        .controller('transportCtrl', function ($scope, InstancedService) {

            $scope.myDate = new Date();
            $scope.addDate = function (selected) {
                $scope.travelObject['date'] = selected;
            }


            $scope.travelObject = {
                date: new Date(),
                busStop: "Nie wybrano przystanku",
                line: "Nie wybrano linii",
                time: (new Date).getTime()
            };

            $scope.instancesArray = [];

            $scope.Hello = function (param1, param2, param3) {
                $scope.instanceA = new InstancedService.Instance(param1, param2, param3)

                $scope.instancesArray.push($scope.instanceA);
            }

            $scope.deleteJourney = function(param){

            }

            $scope.addStop = function (selected) {

                $scope.travelObject['busStop'] = selected;

                //$('#disabledSelect3').attr('disabled',false);

                $scope.accumulator = [];

                $scope.filteredLines = $scope.lines.map(function (line) {

                    line.stops.forEach(function (stops) {

                        for (name in stops) {
                            if (stops.name == selected) {
                                console.log(line)
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