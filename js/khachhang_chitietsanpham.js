
if (!localStorage.getItem('idKhachHang')) {
    location.href = 'khachhang_dangnhap.html';
}

const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';
const urlApiSanPham = 'http://localhost:8080/api/v1/sanpham/';

const idKhachHang = localStorage.getItem('idKhachHang');
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
console.log(id);

fetch(urlApiSanPham + id)
    .then(response => response.json())
    .then(({ data }) => {
        console.log(data);
        const htmls = `
            <div class="image_Product mr-5">
                <img src="${data.anh}" style="width: 245px" alt="">
            </div>
            <div>
                <div class="d-flex align-items-center justify-content-center mb-3">
                    <h5 class="name_product mr-3">Tên sản phẩn : </h5>
                    <h3>${data.tenSanPham}</h3>
                </div>
                <h5 class="describe_product mb-2">Mô Tả sản phẩm:</h5>
                <p>${data.moTa}</p>
                <div class="">
                    <span>Giá : <b>${data.gia} VND</b> </span>
                </div>
                <div class="mt-5"><button class="site-btn" onclick="themVaoGioHang(${data.id})">Thêm vào giỏ hàng</button></div>
            </div>
        `;
        $('#content').html(htmls);
    });


const loadSoLuongSanPham = () => {
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(({data}) => {
            $('#soluong').text(data);
        });
}
loadSoLuongSanPham();

const themVaoGioHang = (id) => {
    const data = {
        'idKhachHang' : idKhachHang,
        'idSanPham' : id,
        'soLuong' : 1
    }

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
            location.href = 'khachhang_giohang.html'
        });
}

const logout = () => {
    localStorage.removeItem('idKhachHang');
    location.href = 'khachhang_trangchu_unlogin.html';
};