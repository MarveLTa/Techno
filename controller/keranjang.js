var keranjang
fetchCart((arr) => {
    console.log(arr);
    
    $('#jumlah_keranjang').html(arr.length)
    keranjang = arr
    var harga = 0
    var i = 0
    if (arr.length == 0) {
        $('#kontainer-keranjang').remove()
        $('.emptycart').removeClass('d-none')
    }
    arr.forEach((product) => {
        var harga_satuan = product.harga - product.harga * ((product.persenDiskon === undefined || product.persenDiskon == 0 ) ? 0 : product.persenDiskon)/100
        harga+=harga_satuan
        $('#keranjang').append(
            '<div class="card-body d-flex flex-column" id="keranjang-item-'+i+'">'+
                '<div class="row p-2">'+
                    '<div class="col-2">'+
                    '<div class="ml-2 mr-2 image-container" style="max-height: 100px;">'+
                        '<img id="modal_detail_image" class="mx-auto" src="'+product.photoUrl+'" alt="pp" style="display: block;">'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<div class="row">'+
                        '<a style="font-size: 16px; max-lines: 2; text-overflow:clip; overflow: hidden;" class="mb-1 text-uppercase text-dark" href="detail.html'+"?from="+product.from+"&id="+product.id+'">'+product.judul+'</a>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="text-muted" id="modal_detail_genre" style="font-size: 14px;">'+product.genre+'</div>'+
                    '</div>'+
                   ' </div>'+
                    '<div class="col-3">'+
                    '<div class="text-orange" ><b id="modal_detail_harga">'+formatter.format(harga_satuan)+'</b></div>'+
                    '<div class="">'+
                        '<p class="card-text text-orange mb-1" ><b id="detail_harga" style="font-weight: 900; font-size: 18px;"></b></p>'+
                        '<p class="card-text '+((product.persenDiskon === undefined || product.persenDiskon <=0)? 'd-none':'')+' text-muted" id="harga_asli_container" style="font-size:12px;"><del id="harga_asli">'+formatter.format(product.harga) + '</del>' + '<span class="badge badge-danger ml-2"> HEMAT ' + product.persenDiskon + ' %' + '</span>'+'</del></p>'+
                    '</div>'+
                   ' </div>'+
                    '<div class="col-3 text-muted" style="display: block;">'+
                    '<button class="my-auto text-muted" style="display: block; background: transparent; border: none;" onclick=\'addWishList("'+product.from+'", "'+product.id+'"); notifikasi("success", "Berhasil menambah ke buku impian")\'>'+
                        '<i class="fas fa-heart align-middle mr-1" style="width: 20px; height: 20px;"></i>'+
                        '<span class="align-middle" style="font-size: 13px;">Buku Impian</span>'+
                   ' </button>'+
                    '<button class="my-auto text-muted" style="display: block; background: transparent; border: none;" onclick="showDeleteBox('+i+')">'+
                        '<i class="fas fa-trash align-middle mr-1" style="width: 20px; height: 20px;"></i>'+
                        '<span class="align-middle" style="font-size: 13px;">Hapus</span>'+
                    '</button>'+
                    '</div>'+
                '</div>'+
                '</div>'+
            '<hr class="my-0"></hr>')
        i++
    })
    $('#total_harga').html(formatter.format(harga))
})

function showDeleteBox(i) {
    $("#modal_detail_pic").attr("src", keranjang[i].photoUrl)
    $("#modal_detail_judul").html(keranjang[i].judul)
    $("#modal_detail_harga").html(formatter.format(keranjang[i].harga - keranjang[i].harga * ((keranjang[i].persenDiskon === undefined || keranjang[i].persenDiskon == 0 ) ? 0 : keranjang[i].persenDiskon)/100))
    $("#modal_detail_genre").html(keranjang[i].genre)
    $("#deleteCartModal").modal('show')
    $("#delete-action").attr("onclick", "show_snack(); deleteCart('" + keranjang[i].from + "', " + keranjang[i].id + ");$('#keranjang-item-" + i + "').hide('slow', function(){ $(this).remove(); });$('#jumlah_keranjang').html(getCartCount());updateCartNumber();if (getCartCount() == 0) {$('#kontainer-keranjang').remove();$('.emptycart').removeClass('d-none')} updateIndex()")
}
function updateIndex() {
    
}

