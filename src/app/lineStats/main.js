ns('app.lineStats.main', function () {
    return {
        init : function () {
            $('<p>Dupa</p>').appendTo('#js-lineStats');

            $('#js-lineStats').click(function () {

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://jsonplaceholder.typicode.com/users",
                    success: function(data){
                        console.log(data);
                        $select = $('<select/>');
                        data.forEach(function (row) {
                            $select.prepend($('<option>', {
                                value : row.name
                            }).text(row.name))
                        });
                        $('#js-lineStats').prepend($select);

                    }
                });

            });
        }
    };
});