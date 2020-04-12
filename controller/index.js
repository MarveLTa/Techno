

var pos = 0
var max = 0
var owl
var items_shown = 6
$.getJSON("json/flash-sale.json", function (json) {
    i = 0;

    json.forEach(element => {
        $(".flash-sale-carousel").append('<a href="detail.html'+"?from=flash-sale.json&id="+i+'"><div class="item rounded overflow-hidden bg-light text-dark">' +
        '<div class="image-container">'+
        '<img src="'+element.photoUrl+'" alt="Tuner Image"/>'+
        '</div>'+
        '<div class="p-2 pb-3">'+
          '<div class="text-truncate katalog-judul">'+
            element.judul+
            '</div>'+
              '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
              '<div class=" katalog-harga mt-1">'+formatter.format(element.harga - element.harga * ((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? 0 : element.persenDiskon)/100)+'</div>'+
              '<div class=" katalog-diskon">'+((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? "-": '<del class="mr-2">'+ formatter.format(element.harga) +'</del>'+ '<span class="badge badge-danger">'+element.persenDiskon + ' %'+'</span>') +'</div>'+
            '</div>'+
        '</div></a>')
        i++;
    });
    max = json.length - items_shown
    owl = $(".flash-sale-carousel").owlCarousel({
        items: items_shown,
        loop: false,
        margin: 10,
        onDragged: (event) => {
            pos = event.item.index
            if (pos == 0) {
                $(".nav-left").addClass("d-none")
            } else {
                $(".nav-left").removeClass("d-none")
            }
            if (pos >= max) {
                $(".nav-right").addClass("d-none")
            } else {
                $(".nav-right").removeClass("d-none")
            }
        }
    });
    if (max <= 0) {
        $(".nav-right").addClass("d-none")
    }
})

$.getJSON("json/paling-laris.json", function (json) {
    i = 0;
    json.forEach(element => {
        $(".paling-laris-container").append('<a href="detail.html'+"?from=paling-laris.json&id="+i+'" class= "overflow-hidden flex-shrink-1 rounded shadow" style="max-width: 176px;"><div class="bg-white  text-dark">' +
        '<div class="image-container">'+
        '<img src="'+element.photoUrl+'" alt="Tuner Image" class="d-block mx-auto"/>'+
        '</div>'+
        '<div class="p-2 pb-3">'+
          '<div class="text-truncate katalog-judul">'+
            element.judul+
          '</div>'+
            '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
            '<div class=" katalog-harga mt-1">'+formatter.format(element.harga - element.harga * ((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? 0 : element.persenDiskon)/100)+'</div>'+
            '<div class=" katalog-diskon">'+((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? "-": '<del class="mr-2">'+ formatter.format(element.harga) +'</del>'+ '<span class="badge badge-danger">'+element.persenDiskon + ' %'+'</span>') +'</div>'+
          '</div>'+
        '</div></a>')
        i++;
    });
})
$.getJSON("json/paling-populer.json", function (json) {
    i = 0;
    json.forEach(element => {
        $(".paling-populer-container").append('<a href="detail.html'+"?from=paling-populer.json&id="+i+'" class= "overflow-hidden flex-shrink-1 rounded shadow" style="max-width: 176px;"><div class=" bg-white text-dark">' +
        '<div class="image-container">'+
        '<img src="'+element.photoUrl+'" alt="Tuner Image" class="d-block mx-auto"/>'+
        '</div>'+
        '<div class="p-2 pb-3">'+
          '<div class="text-truncate katalog-judul">'+
            element.judul+
          '</div>'+
            '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
            '<div class=" katalog-harga mt-1">'+formatter.format(element.harga - element.harga * ((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? 0 : element.persenDiskon)/100)+'</div>'+
            '<div class=" katalog-diskon">'+((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? "-": '<del class="mr-2">'+ formatter.format(element.harga) +'</del>'+ '<span class="badge badge-danger">'+element.persenDiskon + ' %'+'</span>') +'</div>'+
          '</div>'+
        '</div></a>')
        i++;
    });
})

var all = null
$.getJSON("json/all.json", function (json) {
    i = 0;
    all = json
    json.forEach(element => {
        $(".rekomendasi-container").append('<a href="detail.html'+"?from=all.json&id="+i+'" class= "overflow-hidden flex-shrink-1 rounded shadow" style="width: 176px; margin-bottom:12px"><div class=" bg-white text-dark">' +
        '<div class="image-container">'+
        '<img src="'+element.photoUrl+'" alt="Tuner Image" class="d-block mx-auto"/>'+
        '</div>'+
        '<div class="p-2 pb-3">'+
          '<div class="text-truncate katalog-judul">'+
            element.judul+
          '</div>'+
            '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
            '<div class=" katalog-harga mt-1">'+formatter.format(element.harga - element.harga * ((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? 0 : element.persenDiskon)/100)+'</div>'+
            '<div class=" katalog-diskon">'+((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? "-": '<del class="mr-2">'+ formatter.format(element.harga) +'</del>'+ '<span class="badge badge-danger">'+element.persenDiskon + ' %'+'</span>') +'</div>'+
          '</div>'+
        '</div></a>')
        i++;
    });
})
function left_flash_sale() {
    owl.trigger('prev.owl.carousel')
    pos--
    if (pos == 0) {
        $(".nav-left").addClass("d-none")
    }
    $(".nav-right").removeClass("d-none")
}
function right_flash_sale() {
    owl.trigger('next.owl.carousel')
    pos++
    console.log(pos)
    if (pos >= max) {
        $(".nav-right").addClass("d-none")
    }
    $(".nav-left").removeClass("d-none")
}
