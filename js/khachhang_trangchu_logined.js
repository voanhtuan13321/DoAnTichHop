
const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';
const urlApiSanPham = 'http://localhost:8080/api/v1/sanpham/';
const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';

if (!localStorage.getItem('idKhachHang')) {
    alert('Vui lòng đăng nhập');
    location.href = './khachhang_dangnhap.html';
}

fetch(urlApiDanhMuc)
    .then(response => response.json())
    .then(data => {
        const htmls = data.data.map(item => (`
            <li><a href="#" onclick="renderSanPhamByDanhMuc(${item.id})">${item.tenDanhMuc}</a></li>
        `));
        $('#noiChuaDanhMuc').html(htmls);
    });

const showSanPham = () => {
    fetch(urlApiSanPham)
        .then(response => response.json())
        .then(data => {
            renderSanPham(data.data);
        });
}
showSanPham();

const renderSanPham = (sanPhams) => {
    const htmls = sanPhams.map(item => (`
        <div class="col-lg-4 col-md-4 col-sm-6 mix oranges fresh-meat">
            <div class="featured__item" onclick="chiTietGioHang(${item.id})">
                <div class="featured__item__pic set-bg">
                    <img src="${item.anh}" style="height: 100%;" alt="" srcset="">
                    <ul class="featured__item__pic__hover">
                        <li><a href="#" onclick="themVaoGioHang(${item.id})"><i class="fa fa-shopping-cart"></i></a></li>
                    </ul>
                </div>
                <div class="featured__item__text">
                    <h4 class="mb-3"><a>${item.tenSanPham}</a></h4>
                    <h6>${item.gia} VND</h6>
                </div>
            </div>
        </div>
    `));
    $('#noiChuaSanPham').html(htmls);
}

const renderSanPhamByDanhMuc = (id) => {
    fetch(urlApiSanPham + 'danhmuc/' + id)
    .then(response => response.json())
    .then(data => {
        renderSanPham(data.data);
    });
}

$('#btnTimKiem').click((e) => {
    const timKiem = $('#inputTimKiem').val();

    if (timKiem === '') {
        showSanPham();
    } else {
        async function putData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: data//JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }
        
        putData(urlApiSanPham + 'timkiem', timKiem)
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                renderSanPham(data.data);
            });
    }
});

const themVaoGioHang = (idSanPham) => {
    const data = {
        'soLuong' : 1,
        'idKhachHang' : localStorage.getItem('idKhachHang'),
        'idSanPham' : idSanPham
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    postData(urlApiGioHang, data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            loadSoLuongSanPham();
        });
}

const loadSoLuongSanPham = () => {
    idKhachHang = localStorage.getItem('idKhachHang');
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('#soluong').text(data.data);
        });
}
loadSoLuongSanPham();

const chiTietGioHang = (id) => {
    location.href = 'khachhang_chiTietsanpham.html?id=' + id;
}

const checkDangNhap = () => {
    if (!localStorage.getItem('idKhachHang')) {
        alert('Vui lòng đăng nhập');
        location.href = './khachhang_dangnhap.html';
    } else {
        location.href = './khachhang_giohang.html';
    }
}