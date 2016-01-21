(function () {
    pickYourStops = pickYourStops || {};

    pickYourStops.main = {
        init: function () {
            var data = pickYourStops.persist.loadFromFile();
            pickYourStops.view.update(data);
        }





    }
}());

