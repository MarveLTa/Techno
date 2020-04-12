let id = getParameterByName('id')
let from = getParameterByName('from')
if( id == null || from == null){
    window.location.href = ".";
}
      
getProduct(from, id, (product) => {
    $("#detail_image").attr("src", product.photoUrl)
    $("#modal_detail_image").attr("src", product.photoUrl)
    $("#btn-beli-sekarang").attr("onclick", "addCart('"+from+"','"+ id+"'); window.location.href = 'keranjang.html'")
    $("#wishlistbtn").attr("onclick", "addWishList('"+from+"','"+ id+"'); notifikasi('success', 'Berhasil menambah ke buku impian')")
    $("#btn-tambah-keranjang").attr("onclick", "addCart('"+from+"','"+ id+"')")
    $("#detail_judul").html(product.judul)
    $("#modal_detail_judul").html(product.judul)
    $("#detail_judul1").html(product.judul)
    $("#detail_harga").html(formatter.format(product.harga - product.harga * ((product.persenDiskon === undefined || product.persenDiskon == 0 ) ? 0 : product.persenDiskon)/100))
    $("#modal_detail_harga").html(formatter.format(product.harga - product.harga * ((product.persenDiskon === undefined || product.persenDiskon == 0 ) ? 0 : product.persenDiskon)/100))
    $("#harga_asli").html(formatter.format(product.harga) + '</del>' + '<span class="badge badge-danger ml-2"> HEMAT ' + product.persenDiskon + ' %' + '</span>')
    if (product.persenDiskon !== undefined && product.persenDiskon > 0) {
        $("#harga_asli_container").removeClass("d-none")
    }
    $("#detail_genre").html(product.genre)
    $("#modal_detail_genre").html(product.genre)
    $("#detail_penulis").html(product.pengarang)
    $("#detail_jmlh_hal").html(product.jumlah_hal)
    $("#detail_tgl_terbit").html(product.tanggal_terbit)
    $("#detail_penerbit").html(product.penerbit)
    $("#detail_sinopsis").html(product.sinopsis)
})

getRandomKomentar((arr) => {
    var totalBtg = 0

    arr.forEach((komentar, a) =>{
        totalBtg+= komentar.bintang
        var bintang = ""
        var i = 0;
        for (i = 0; i < komentar.bintang;i++) {
            bintang+='<span class="fa fa-star checked"></span>'
        }
        for (; i < 5; i++){
            bintang+='<span class="fa fa-star"></span>'
        }
        $("#nav-panel_komentar").append(
            '<div id="" class="card mb-2">'+
            '<div class="card-body p-4">'+
            '<div class="row">'+
                '<div class="ml-4 image-fluid overflow-hidden rounded-circle border" style="height: 80px; width: 80px;">'+
                    '<img class="img-fluid" src="'+komentar.photoUrl+'" alt="pp">'+
                '</div>'+
                '<div class="ml-3 align-middle mb-3">'+
                    '<div><b>'+komentar.nama+'</b></div>'+
                    '<div style="font-weight: 300;">'+komentar.tgl_post+'</div>'+
                    '<div>'+
                    bintang+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<hr>'+
            '<div class="row px-4 pt-2">'+
                '<p class="mt-0 text-secondary">'+
                komentar.komentar+
                '</p> '+
            '</div>'+
            '</div>'+
            '<div class="card-footer text-muted px-4" style="font-size: 12px;">'+
            '<span class="ml-2 mr-2 align-middle">Apakah review ini membantu Anda?</span>'+
            '<i class="far fa-thumbs-up align-middle" style="height: 20px; width: 20px;"></i>'+
            '</div>'+
            '</div>')
        if (a == arr.length - 1) {
            $('#total_rating').html((totalBtg/arr.length).toFixed(1))
        }
    })
    if (arr.length == 0) {
        $('#total_rating').html("-")
    }
})

