var keranjang
var harga = 0
var total_diskon = 0
fetchCart((arr) => {
    keranjang = arr
    if (arr.length == 0) {
        window.location.href = "."
    }
    arr.forEach((product) => {
        var harga_satuan = product.harga - product.harga * ((product.persenDiskon === undefined || product.persenDiskon == 0 ) ? 0 : product.persenDiskon)/100
        harga += product.harga
        total_diskon += product.harga - harga_satuan
        
    })
    $('#total_harga').html(formatter.format(harga))
    $('#total_tagihan').html(formatter.format(harga-total_diskon))
    if (total_diskon == 0) {
        $('#total_diskon').html('-')
    } else {
        
        $('#total_diskon').html(formatter.format(total_diskon))
    }
    $('#total_voucher').html('-')
})

function checkKode() {
    if ($('#kode_voucher').val().toUpperCase() == "PALU GA ADA") {
        $('#title-failed').addClass('d-none')
        $('#content-failed').addClass('d-none')
        $('#title-success').removeClass('d-none')
        $('#content-success').removeClass('d-none')
        $('#notifVoucher').modal('show')
        $('#tambah-voucher').addClass('d-none')
        $('#delete-voucher').removeClass('d-none')
        $('#total_voucher').html(formatter.format((harga-total_diskon)*.2))
        $('#total_tagihan').html(formatter.format((harga-total_diskon)*.8))
    } else {
        $('#title-failed').removeClass('d-none')
        $('#content-failed').removeClass('d-none')
        $('#title-success').addClass('d-none')
        $('#content-success').addClass('d-none')
        $('#notifVoucher').modal('show')
    }
}
function hapusKode() {
    $('#tambah-voucher').removeClass('d-none')
    $('#delete-voucher').addClass('d-none')
    $('#total_voucher').html('-')
    $('#total_tagihan').html(formatter.format(harga-total_diskon))
}