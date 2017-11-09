$("document").ready(function () {


    // запрос для получения данныъ справочника географических областей Украины
    $("#getData").on("click", function () {
        event.preventDefault();

        //параметры для запроса
        var params = {
            'apiKey': '28f832f1925c0bf1cb166d878ae02ae7',
            "modelName": "Address",
            "calledMethod": "getAreas",
            "methodProperties": {}
        };

        //запрос
        $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/?',
            contentType: "application/json",
            type: 'POST',
            dataType: 'jsonp',
            data: params
        }).done(function (response) {
            $('.data-list .data__query').append(JSON.stringify(response));

            for (var i = 0; i < response.data.length; i++) {
                $('.data-list .data__text').append(response.data[i].Description + '<br/>');
            }
        }).fail(function () {
            alert('error');
        });

    });
    

    // запрос для расчёта стоимости доставки
    $("#sendRequest").on("click", function () {
        event.preventDefault();

        var CitySender = $('#CitySender').val(),
            CityRecipient = $('#CityRecipient').val(),
            Weight = $('#Weight').val(),
            Cost = $('#Cost').val();

        //параметры для запроса
        var params = {
            "apiKey": "28f832f1925c0bf1cb166d878ae02ae7",
            "modelName": "InternetDocument",
            "calledMethod": "getDocumentPrice",
            "methodProperties": {
                "CitySender": CitySender,
                "CityRecipient": CityRecipient,
                "Weight": Weight,
                "ServiceType": "DoorsDoors",
                "Cost": Cost,
                "CargoType": "Cargo",
                "SeatsAmount": "1"

            }
        };

        //запрос
        $.ajax({
            url: 'https://api.novaposhta.ua/v2.0/json/?',
            contentType: "application/json",
            type: 'POST',
            data: params,
            dataType: 'jsonp'
        }).done(function (response) {
            $('.data__query-text').html(JSON.stringify(response));

            for (var i = 0; i < response.data.length; i++) {
                $('.data__text-text').html(response.data[i].Cost + '<br/>');
            }
        }).fail(function () {
            alert('error');
        });

    });

});


