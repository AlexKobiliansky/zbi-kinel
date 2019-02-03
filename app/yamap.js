ymaps.ready(function(){
    var mapId = $('#map'),
        attitude = mapId.data("att"),
        longtitude = mapId.data("long"),
        zoom = mapId.data("zoom"),
        marker = mapId.data("marker"),
        map = new ymaps.Map("map", {
            center: [attitude, longtitude],
            controls: ['zoomControl'],
            zoom: zoom
        }),

        myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: marker,
            // Размеры метки.
            iconImageSize: [26.6, 42.4],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-16, -30]
        });

    map.geoObjects.add(myPlacemark);
    map.behaviors.disable('scrollZoom');

    if ($(window).width() <= 480) {
        map.behaviors.disable('drag');
    }
});