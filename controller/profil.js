let show = getParameterByName('show')
if( show != null){
    // $('#v-pills-home').removeClass('show')
    $('#v-pills-tab a[href="#' + show + '"]').tab('show')
}


function updateProfile() {
    var user = getUser()
    user.name = $('#username').val()
    user.telp = $('#telp').val()
    user.tgl_lahir = $('#tgl_lahir').val()
    user.mailbox = $('#mailbox').prop("checked")
    user.jenis_kelamin = $('input[name$="jenis_kelamin"]').val()
    setUser(user)
    
    notifikasi('success', "Sukses Update Profil")
    return false
    
}
function loadProfile() {
    var user = getUser()
    $('#username').val(user.name)
    $('#email').val(user.email)
    $('#telp').val(user.telp)
    $('#tgl_lahir').val(user.tgl_lahir)
    $('#mailbox').prop("checked", user.mailbox)
    $('input[name$="jenis_kelamin"]').val(user.jenis_kelamin)
    
}
loadProfile()

function shake(id) {
    var div = document.getElementById(id);
    var interval = 100;
    var distance = 10;
    var times = 4;

    $(div).css('position', 'relative');

    for (var iter = 0; iter < (times + 1) ; iter++) {
        $(div).animate({
            left: ((iter % 2 == 0 ? distance : distance * -1))
        }, interval);
    }                                                                                                          
    $(div).animate({ left: 0 }, interval);
}

function updatePassword() {
    var err =false
    if ($('#password_change').val() != getUser().password) {
        
        $('#error_passLama').removeClass('d-none')
        shake("error_passLama")
        err = true
        // $('#error_passLama').effect('shake')
        
    } else {
        $('#error_passLama').addClass('d-none')
    }
        
    if ($('#repassword_baru_change').val() != $('#password_baru_change')) {
        $('#error_passBaru').removeClass('d-none')
        err = true
        
        shake("error_passBaru")
    } else {
        
        $('#error_passBaru').addClass('d-none')
    }
    if (err) {
        return
    }
    var user = getUser()
    user.password = $('#repassword_baru_change').val()
    setUser(user)
    $('#modalGantiPassword').modal('show')
    $('#password_change').val('')
    $('#repassword_baru_change').val('')
    $('#password_baru_change').val('')
}
// $.getJSON("json/paling-laris.json", function (json) {
//     i = 0;
//     json.forEach(element => {
//         $(".paling-laris-container").append('<a href="detail.html'+"?from=paling-laris.json&id="+i+'" class= "overflow-hidden flex-shrink-1 rounded shadow" style="max-width: 156px; margin-bottom: 12px"><div class="bg-white  text-dark">' +
//         '<div class="image-container">'+
//         '<img src="'+element.photoUrl+'" alt="Tuner Image" class="d-block mx-auto"/>'+
//         '</div>'+
//         '<div class="p-2 pb-3">'+
//           '<div class="text-truncate katalog-judul">'+
//             element.judul+
//           '</div>'+
//             '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
//             '<div class=" katalog-harga mt-1">'+formatter.format(element.harga - element.harga * ((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? 0 : element.persenDiskon)/100)+'</div>'+
//             '<div class=" katalog-diskon">'+((element.persenDiskon === undefined || element.persenDiskon == 0 ) ? "-": '<del class="mr-2">'+ formatter.format(element.harga) +'</del>'+ '<span class="badge badge-danger">'+element.persenDiskon + ' %'+'</span>') +'</div>'+
//           '</div>'+
//         '</div></a>')
//         i++;
//     });
// })

var wishlist = null
fetchWishList((arr) => {
    wishlist = arr
    var harga = 0
    var i = 0
    if (arr.length == 0) {
        $('#kontainer-keranjang').remove()
        $('.emptywishlist').removeClass('d-none')
        $('.emptywishlist').addClass('d-block')
        $('#delete-all-btn').addClass('d-none')
    }
    arr.forEach((element) => {
        $(".wishlist-container").append('<div id="wishlist-item-'+i+'" class="overflow-hidden flex-shrink-1 rounded shadow" style="max-width: 156px; margin-bottom: 12px; margin-right: 8px"><a href="detail.html' + "?from=" + element.from + "&id=" + element.id + '" class= "" ><div class="bg-white  text-dark">' +
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
        '</div></a><button class="btn btn-danger w-100"  onclick="showDeleteBox('+i+')"><i class="fas fa-trash mr-2"></i><small>Hapus</small></button></div>')
        i++
    })
})

fetchBooks((arr) => {
    // wishlist = arr
    var harga = 0
    var i = 0
    if (arr.length == 0) {
        $('#kontainer-keranjang').remove()
        $('.emptybooks').removeClass('d-none')
        $('.emptybooks').addClass('d-block')
    }
    
    arr.forEach((element) => {
        $(".books-container").append('<div id="wishlist-item-'+i+'" class="overflow-hidden flex-shrink-1 rounded shadow" style="max-width: 156px; margin-bottom: 12px; margin-right: 8px"><a href="baca.html' + "?from=" + element.from + "&id=" + element.id + '" class= "" ><div class="bg-white  text-dark">' +
        '<div class="image-container">'+
        '<img src="'+element.photoUrl+'" alt="Tuner Image" class="d-block mx-auto"/>'+
        '</div>'+
        '<div class="p-2 pb-3">'+
          '<div class="text-truncate katalog-judul">'+
            element.judul+
          '</div>'+
            '<div class=" katalog-pengarang text-truncate"><b>'+element.genre+'</b></div>'+
            '<div class=" katalog-pengarang text-truncate">'+element.pengarang+'</div>'+
          '</div>'+
        '</div></a></div>')
        i++
    })
})

function showDeleteBox(i) {
    $("#modal_detail_pic").attr("src", wishlist[i].photoUrl)
    $("#modal_detail_judul").html(wishlist[i].judul)
    $("#modal_detail_harga").html(formatter.format(wishlist[i].harga - wishlist[i].harga * ((wishlist[i].persenDiskon === undefined || wishlist[i].persenDiskon == 0 ) ? 0 : wishlist[i].persenDiskon)/100))
    $("#modal_detail_genre").html(wishlist[i].genre)
    $("#deleteCartModal").modal('show')
    $("#delete-action").attr("onclick", "show_snack(); deleteWishList('" + wishlist[i].from + "', " + wishlist[i].id + ");$('#wishlist-item-" + i + "').hide('slow', function(){ $(this).remove(); if (getWishListCount() == 0) {$('.wishlist-container').remove();$('#delete-all-btn').addClass('d-none');$('.emptywishlist').removeClass('d-none').addClass('show')}});$('#jumlah_keranjang').html(getCartCount());updateCartNumber(); updateWishListNumber()")
}
function deleteAllWishList() {
    clearWishList()
    $('.wishlist-container').hide('slow', function () {
        $(this).remove(); setInterval(() => {
            $(".emptywishlist").removeClass('d-none').addClass('show')
            $('#delete-all-btn').addClass('d-none')
        }, 10)
    });
    updateWishListNumber()
}