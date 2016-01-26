ns('app.yourStopInfo.filters', function ()  {

        function startFilters() {

            function addSelect(filters) {
                var filtersArray = ["Przystanki, których nazwa zaczyna się na M","Przystanki, których nazwa jest krótsza niż 5 znaków"];
                $('#js-yourStopInfo')
                    .prepend($('<button id="myFilter">').text("Filtruj")).append($('<div class="selectedFilter">'))
                    .prepend($('<input list="filters">').append($('<datalist id="filters">')
                        .prepend(
                            filtersArray.map(
                                function (filtersArray) {
                                    return $('<option>').attr('value', filtersArray);
                                })
                        ))
                    )
            }
            addSelect();
    }

    function filterData() {
        var filtersArray = ["Przystanki, których nazwa zaczyna się na M","Przystanki, których nazwa jest krótsza niż 5 znaków"];
        $('#myFilter').on('click', function () {

                //console.log($('#js-yourStopInfo input').val());

            if($('#js-yourStopInfo input').val()==filtersArray[0]){
                console.log ('filtr 1')
            }else{console.log ('filtr 2')}

            });

    }

    return {
        init: function () {
            startFilters();
            filterData();
        }
    }

});
