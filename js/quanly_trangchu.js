if (!localStorage.getItem('idNhanVien')) {
    location.href = 'quanly_dangnhap.html';
}

const urlApiDanhMuc = 'http://localhost:8080/api/v1/danhmuc/';
const urlApiSanPham = 'http://localhost:8080/api/v1/sanpham/';

fetch(urlApiDanhMuc)
    .then((response) => response.json())
    .then((data) => {
        const listDanhMuc = data.data;
        const htmls = listDanhMuc.map((item) => (`
                <li><a href="#" onclick="searchSanPhamTheoDanhMuc(${item.id})">${item.tenDanhMuc}</a></li>
            `)
        );
        $('#ul-danhsach-danhmuc').html(htmls);
    });

fetch(urlApiSanPham)
    .then((response) => response.json())
    .then((data) => {
        const listSanPham = data.data;
        renderSanPham(listSanPham);
    });

const searchSanPhamTheoDanhMuc = (id) => {
    fetch(urlApiSanPham + "danhmuc/" + id)
        .then((response) => response.json())
        .then((data) => {
            const listSanPham = data.data;
            renderSanPham(listSanPham);
        });
}

const renderSanPham = (datas) => {
    const htmls = datas.map((item) => 
        (`
            <div class="col-lg-4 col-md-4 col-sm-6 mix oranges fresh-meat">
                <div class="featured__item">
                    <div class="featured__item__pic set-bg">
                        <img src="${item.anh}" style="height: 100%;" alt="ảnh bị lỗi">
                        <ul class="featured__item__pic__hover">
                            <li><a href="./quanly_suasanpham.html?id=${item.id}">Sửa</a></li>
                            <li><a href="#" onclick="deleteSanPham(${item.id})">Xoá</a></li>
                        </ul>
                    </div>
                    <div class="featured__item__text">
                        <h6><a href="#">${item.tenSanPham}</a></h6>
                        <h5>${item.gia} VND</h5>
                    </div>
                </div>
            </div>
        `)
    );
    $('#noi-chua-san-pham').html(htmls);
}

const deleteSanPham = (id) => {
    if (confirm(`Bạn có chắc là muốn xoá sản phẩm có id là ${id} không ?`)) {
        async function deleteData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
        
        deleteData(urlApiSanPham + id, {})
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
            });

        window.location = window.location;
    }
}

$('#btn-tim-kiem').click((e) => {
    let value = $('#input-tim-kiem').val();

    if (value === '') {
        return;
    }
    
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
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data//JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    postData(urlApiSanPham + 'timkiem', value)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            renderSanPham(data.data);
        });
});

$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});