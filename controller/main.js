document.title = 'Atma Book Store'
document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}
changeFavicon('images/logo.ico');
var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});
$('#account_action, #account_menu').hover(() => {

    $('#account-modal-backdrop').addClass('show').css({ "z-index": "888" });
}, () => {
    $('#account-modal-backdrop').removeClass('show').css({ "z-index": "-1" });
})


function getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
}
function login(email, password, href=".") {
    let user = { email: email, name: "", telp: "", tgl_lahir:"", mailbox: true, jenis_kelamin: "", password: password }
    setUser(user)
    var url = getParameterByName('ref')
    if (url != null) {
        window.location.href = window.location.pathname
    } else {
        window.location.href = href;
    }
    
}

function setUser(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
}
function logout() {
    window.localStorage.removeItem('user');
    window.location.reload()
    clearCart()
    clearWishList()
    clearBooks()
}

function isLoggedIn() {
    return getUser() != null
}

function getCart() {
    return JSON.parse(window.localStorage.getItem('cart'));
}

function getCartCount() {
    let obj = getCart()
    if (obj == null) {
        return 0
    } else {
        var i = 0
        Object.keys(obj).forEach(function (key, index) {
            i += obj[key].length
        });
        return i
    }
}
function updatetCart(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
}
function clearCart() {
    window.localStorage.removeItem('cart');
}

function addCart(from, id) {
    var cart = getCart()
    if (cart == null) {
        cart = {}
    }
    if (cart[from] === undefined) {
        cart[from] = [id]
    } else {
        var isFound = false
        
        for (var i in cart[from]) {
            if (cart[from][i] == id) {
                isFound = true
            }
        }
        if (!isFound) {
            cart[from].push(id)
        }
        
    }
    updatetCart(cart)
    $("#tambahKeranjangModal").modal('show')
    updateCartNumber()
}
function deleteCart(from, id) {
    var cart = getCart()
    if (cart[from] !== undefined) {
        for (var i in cart[from]) {
            if (cart[from][i] == id) {
                cart[from].splice(i, 1)
                updateCartNumber()
            }
        }
    }
    updatetCart(cart)   
}
function fetchCart(callback) {
    var cart = getCart()
    if (cart == null) {
        callback([])
        return
    }
    var arr = []
    var keys = Object.keys(cart)
    keys.forEach(function (key, index) {
        getProducts(key, (products) => {
            for (var i in cart[key]) {
                var p = products[cart[key][i]]
                p.from = key
                p.id = cart[key][i]
                arr.push(p)
            }
            if (index == keys.length - 1) {
                callback(arr)
            }
        })
    });
}

function updateCartNumber() {
    var i = getCartCount()
    if (i > 0) {
        $("#cart_number").removeClass("d-none").html(i)
    } else {
        $("#cart_number").addClass("d-none")
    }
}


function getWishList() {
    return JSON.parse(window.localStorage.getItem('wishList'));
}

function getWishListCount() {
    let obj = getWishList()
    if (obj == null) {
        return 0
    } else {
        var i = 0
        Object.keys(obj).forEach(function (key, index) {
            i += obj[key].length
        });
        return i
    }
}
function updatetWishList(WishList) {
    window.localStorage.setItem('wishList', JSON.stringify(WishList));
}
function clearWishList() {
    window.localStorage.removeItem('wishList');
}

function addWishList(from, id) {
    mustLogin()
    var WishList = getWishList()
    if (WishList == null) {
        WishList = {}
    }
    if (WishList[from] === undefined) {
        WishList[from] = [id]
    } else {
        var isFound = false
        
        for (var i in WishList[from]) {
            if (WishList[from][i] == id) {
                isFound = true
            }
        }
        if (!isFound) {
            WishList[from].push(id)
        }
        
    }
    updatetWishList(WishList)
    updateWishListNumber()  
}
function deleteWishList(from, id) {
    var WishList = getWishList()
    if (WishList[from] !== undefined) {
        for (var i in WishList[from]) {
            if (WishList[from][i] == id) {
                WishList[from].splice(i, 1)
                updateWishListNumber()
            }
        }
    }
    updatetWishList(WishList)   
}
function fetchWishList(callback) {
    var WishList = getWishList()
    if (WishList == null) {
        callback([])
        return
    }
    var arr = []
    var keys = Object.keys(WishList)
    keys.forEach(function (key, index) {
        getProducts(key, (products) => {
            for (var i in WishList[key]) {
                var p = products[WishList[key][i]]
                p.from = key
                p.id = WishList[key][i]
                arr.push(p)
            }
            if (index == keys.length - 1) {
                callback(arr)
            }
        })
    });
}
function updateWishListNumber() {
    var i = getWishListCount()
    
    $(".wishList_number").html(i)   
    $(".wishList_number2").html(i)
}

function getBooks() {
    return JSON.parse(window.localStorage.getItem('books'));
}

function getBooksCount() {
    let obj = getBooks()
    if (obj == null) {
        return 0
    } else {
        var i = 0
        Object.keys(obj).forEach(function (key, index) {
            i += obj[key].length
        });
        return i
    }
}
function updatetBooks(Books) {
    window.localStorage.setItem('books', JSON.stringify(Books));
}
function clearBooks() {
    window.localStorage.removeItem('books');
}

function addBooks(from, id) {
    var Books = getBooks()
    if (Books == null) {
        Books = {}
    }
    if (Books[from] === undefined) {
        Books[from] = [id]
    } else {
        var isFound = false
        
        for (var i in Books[from]) {
            if (Books[from][i] == id) {
                isFound = true
            }
        }
        if (!isFound) {
            Books[from].push(id)
        }
        
    }
    updatetBooks(Books)
}
function deleteBooks(from, id) {
    var Books = getBooks()
    if (Books[from] !== undefined) {
        for (var i in Books[from]) {
            if (Books[from][i] == id) {
                Books[from].splice(i, 1)
                updateBooksNumber()
            }
        }
    }
    updatetBooks(Books)   
}
function fetchBooks(callback) {
    console.log(getBooks())
    console.log(getCart())
    
    var Books = getBooks()
    if (Books == null) {
        callback([])
        return
    }
    var arr = []
    var keys = Object.keys(Books)
    keys.forEach(function (key, index) {
        getProducts(key, (products) => {
            for (var i in Books[key]) {
                var p = products[Books[key][i]]
                p.from = key
                p.id = Books[key][i]
                arr.push(p)
            }
            if (index == keys.length - 1) {
                callback(arr)
            }
        })
    });
}
function updateBooksNumber() {
    var i = getBooksCount()
    
    $(".books_number").html(i)   
    $(".books_number2").html(i)
}

updateWishListNumber()

if (isLoggedIn()) {
    $('#login_action').addClass('d-none')
    $('#account_action').removeClass('d-none')
    let str = ((getUser().name === undefined || getUser().name =="") ? getUser().email : getUser().name)

    var sbstr = str.substring(0, 9)
    if (str.length > 10) {
        sbstr += '...'
    }
    $('#account_name').html(sbstr)
} else {
    
}


function getProducts(from, callback) {
    $.getJSON("json/" + from, callback)
}
function getProduct(from, id, callback) {
    getProducts(from, function (json) {
        callback(json[id])
    })
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getRandomKomentar(callback) {
    $.getJSON('json/komentar.json', (komentars) => {
        // Shuffle array
        const shuffled = komentars.sort(() => 0.5 - Math.random());
    
        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, Math.floor(Math.random() * shuffled.length));
        callback(selected)
    })
}

updateCartNumber()
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

const TYPES = ['info', 'warning', 'success', 'error'],
      TITLES = {
        'info': 'Notice!',
        'success': 'Awesome!',
        'warning': 'Watch Out!',
        'error': 'Doh!'
      },
      CONTENT = {
        'info': 'Hello, world! This is a toast message.',
        'success': 'Berhasil menghapus buku dari keranjang.',
        'warning': 'It\'s all about to go wrong',
        'error': 'It all went wrong.'
    };
      
(function (b) {
    b.toast = function (a, h, g, l, k) {
        b("#toast-container").length || (b("body").prepend('<div id="toast-container" aria-live="polite" aria-atomic="true"></div>'), b("#toast-container").append('<div id="toast-wrapper"></div>')); var c = "", d = "", e = "text-muted", f = "", m = "object" === typeof a ? a.title || "" : a || "Notice!"; h = "object" === typeof a ? a.subtitle || "" : h || ""; g = "object" === typeof a ? a.content || "" : g || ""; k = "object" === typeof a ? a.delay || 3E3 : k || 3E3; switch ("object" === typeof a ? a.type || "" : l || "info") {
            case "info": c = "bg-info";
                f = e = d = "text-white"; break; case "success": c = "bg-success"; f = e = d = "text-white"; break; case "warning": case "warn": c = "bg-warning"; f = e = d = "text-white"; break; case "error": case "danger": c = "bg-danger", f = e = d = "text-white"
        }a = '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="' + k + '">' + ('<div class="toast-header ' + c + " " + d + '">') + ('<strong class="mr-auto">' + m + "</strong>"); a += '<small class="' + e + '">' + h + "</small>"; a += '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
        a += '<span aria-hidden="true" class="' + f + '">&times;</span>'; a += "</button>"; a += "</div>"; "" !== g && (a += '<div class="toast-body">', a += g, a += "</div>"); a += "</div>"; b("#toast-wrapper").append(a); b("#toast-wrapper .toast:last").toast("show")
    }
})(jQuery);
    

function show_random_toast()
{
  let type = TYPES[Math.floor(Math.random() * TYPES.length)],
      title = TITLES[type],
      content = CONTENT[type];

  $.toast({
    title: title,
    subtitle: '11 mins ago',
    content: content,
    type: type,
    delay: 5000
  });
}

function show_snack()
{
  let type = 'success',
      content = CONTENT[type].replace('toast', 'snack');
      
  $.toast({
    title: content,
    type: type,
    delay: 5000
  });
}
function notifikasi(type, pesan)
{
  content = pesan.replace('toast', 'snack');
      
  $.toast({ 
    title: content,
    type: type,
    delay: 5000
  });
}

function searcha() {
    window.location.href = 'search.html?search='+$('#search').val()
    return false
}

function mustLogin() {
    if (isLoggedIn() == false) {
        window.location.href = 'login.html?ref='+window.location.pathname
    }
}