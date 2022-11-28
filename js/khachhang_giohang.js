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

const urlApiGioHang = 'http://localhost:8080/api/v1/giohang/';
const urlApiDonHang = 'http://localhost:8080/api/v1/donhang/';
const idKhachHang = localStorage.getItem('idKhachHang');

const loadSoLuongSanPham = () => {
    fetch(urlApiGioHang + "soluong/" + idKhachHang)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $('#soLuong').text(data.data);
        });
}
loadSoLuongSanPham();

const loadDanhSachGioHang = () => {
    fetch(urlApiGioHang + idKhachHang)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderGioHang(data.data);
        })
}
loadDanhSachGioHang();

const renderGioHang = (arrays) => {
    const htmls = arrays.map(item => (`
        <tr class="text-center">
            <th style="width: 180px;">
                <img src="${item.sanPham.anh}" alt="">
            </th>
            <th>
                <div class="h4 title title-hover title-focus">${item.sanPham.tenSanPham}</div>
            </th>
            <th>${item.sanPham.gia} VND</th>
            <th>
                <button class="buttun_quantity pl-2 pr-2" onclick="themSoLuong(${item.id}, ${item.sanPham.id}, ${item.soLuong})">+</button>
                <span><input class="quantity" type="text" name="" id="inputSoLuong${item.id}" value="${item.soLuong}"></span>
                <button class="buttun_quantity pl-2 pr-2" onclick="giamSoLuong(${item.id}, ${item.sanPham.id}, ${item.soLuong})">-</button>
            </th>
            <th id="inputTongTien${item.id}">${item.soLuong * item.sanPham.gia} VND</th>
            <th><button class="btn btn-danger pl-3 pr-3 btn-xoa" onclick="deleteSanPham(${item.id})" data-id="${item.id}">X</button></th>
        </tr>
    `));
    $('#noiChuaGioHang').html(htmls);
}

const deleteSanPham = (idGioHang) => {
    if (confirm(`Bạn có chắc là muốn xoá sản phẩm này không ?`)) {
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
        
        deleteData(urlApiGioHang + idGioHang, {})
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                location.href = location.href;
            });

    }
}

const deleteSanPham2 = (idGioHang) => {
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
    
    deleteData(urlApiGioHang + idGioHang, {})
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
}

const themSoLuong = (id, idSanPham, soLuong) => {
    const data = {
        'id' : id,
        'idKhachHang' : idKhachHang,
        'idSanPham' : idSanPham,
        'soLuong' : soLuong
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
            $('#inputSoLuong' + id).val(data.data.soLuong);
            $('#inputTongTien' + id).text((data.data.soLuong * data.data.sanPham.gia) + ' VND');
            loadSoLuongSanPham();
        });
}

const giamSoLuong = (id, idSanPham, soLuong) => {
    const data = {
        'id' : id,
        'idKhachHang' : idKhachHang,
        'idSanPham' : idSanPham,
        'soLuong' : soLuong
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
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    postData(urlApiGioHang, data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            $('#inputSoLuong' + id).val(data.data.soLuong);
            $('#inputTongTien' + id).text((data.data.soLuong * data.data.sanPham.gia) + ' VND');
            loadSoLuongSanPham();
        });
}

$('#btn_thanhtoan').click(() => {
    fetch(urlApiGioHang + idKhachHang)
        .then(response => response.json())
        .then((datas) => {
            
            datas.data.forEach(item => {
                let data = {
                    idKhachHang: item.khachHang.id,
                    idSanPham: item.sanPham.id,
                    soLuong: item.soLuong
                }

                console.log(datas.id);

                async function postData(url = '', data = {}) {
                    // Default options are marked with *
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                    });
                    return response.json(); // parses JSON response into native JavaScript objects
                }
                
                postData(urlApiDonHang, data);
                
            });

            $('.btn-xoa').each((index, element) => {
                deleteSanPham2(element.dataset.id)
            });
            
            location.href = location.href;
        })
});