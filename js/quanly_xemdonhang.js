if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}

const urlApiDonHang = 'http://localhost:8080/api/v1/donhang/';

fetch(urlApiDonHang)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let htmls = data.data.map(item => 
            (`
                <article class="card card-product-list"> 
                    <div class="row no-gutters">
                        <aside class="col-md-3">
                            <a href="#">
                                <img src="${item.sanPham.anh}" alt="no picture" style="height: 100%">
                            </a>
                        </aside>
                        <div class="col-md-7">
                            <div class="info-main">
                                <a href="#" class="h6 title title-hover title-focus">${item.sanPham.tenSanPham}</a>
                                <p class="content-uudai">Số lượng : ${item.soLuong} Giá : ${item.soLuong * item.sanPham.gia} VNĐ</p>
                                <p class="content-uudai">Tên khách hàng: ${item.khachHang.hoTen}</p>
                                <p class="content-uudai">Số điện thoại: ${item.khachHang.soDienThoai}</p>
                            </div>
                        </div>
                        <aside class="col-md-2">
                            <div class="info-aside">
                                <button type="button" class="btn site-btn btn-margin-bottom" ${item.trangThai ? 'disabled' : ''} onclick="pheDuyet(${item.id})">Phê duyệt</button>
                            </div>
                        </aside>
                    </div>
                </article>
            `)
        );

        $('#noiChuaDonHang').html(htmls);
    });

const pheDuyet = (id) => {
    async function postData(url = '', data = {}) {
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
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    postData(urlApiDonHang + id)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            location.href = './quanly_trangchu.html';
        });
};

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});