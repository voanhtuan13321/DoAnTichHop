if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}

const urlApiDonHang = 'http://localhost:8080/api/v1/donhang/';

fetch(urlApiDonHang)
    .then(response => response.json())
    .then(data => {
        let htmls = data.data.map(item => 
            (`
                <article class="card card-product-list"> 
                    <div class="row no-gutters">
                        <aside class="col-md-3">
                            <a href="#">
                                <img src="" alt="">
                            </a>
                        </aside>
                        <div class="col-md-7">
                            <div class="info-main">
                                <a href="#" class="h6 title title-hover title-focus">Laptop ASUS TUF GAMING F15</a>
                                <p class="content-uudai">Số lượng : 1 Giá : 20000000 VNĐ</p>
                                <p class="content-uudai">Tên khách hàng: Võ Anh Tuấn</p>
                                <p class="content-uudai">Số điện thoại: 189374</p>
                            </div>
                        </div>
                        <aside class="col-md-2">
                            <div class="info-aside">
                                <button type="button" class="btn site-btn btn-margin-bottom">Phê duyệt</button>
                            </div>
                        </aside>
                    </div>
                </article>
            `)
        );
    });

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});