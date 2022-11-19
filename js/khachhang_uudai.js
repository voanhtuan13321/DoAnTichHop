
// truong hop chua dang nhap
if (!localStorage.getItem('idKhachHang')) {
    $('#btnDangNhap').css('display', 'block');
    $('#trangChuUnLogin').css('display', 'block');
    $('#soLuongUnLogin').css('display', 'block');
    $('#btnTaiKhoan').css('display', 'none');
    $('#trangChuLogined').css('display', 'none');
    $('#soLuongLogin').css('display', 'none');
} else {
    $('#btnDangNhap').css('display', 'none');
    $('#trangChuUnLogin').css('display', 'none');
    $('#soLuongUnLogin').css('display', 'none');
    $('#btnTaiKhoan').css('display', 'block');
    $('#trangChuLogined').css('display', 'block');
    $('#soLuongLogin').css('display', 'block');
}

const urlApiUuDai = 'http://localhost:8080/api/v1/uudai/';
const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';

fetch(urlApiUuDai)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const htmls = data.data.map(item => (`
            <article class="card card-product-list">
                <div class="row no-gutters">
                    <div class="col-md-10">
                        <div class="info-main">
                            <a href="#" class="h5 title title-hover title-focus">${item.tieuDe}</a>
                            <p class="content-uudai">${item.noiDung}</p>
                        </div>
                    </div>
                </div>
            </article>
        `));
        $('#MixItUpA26AE7').html(htmls);
    });

const loadSoLuongSanPham = () => {
    idKhachHang = localStorage.getItem('idKhachHang');
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('#soLuong').text(data.data);
        });
}
loadSoLuongSanPham();