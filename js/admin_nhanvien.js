if (!localStorage.getItem('idAdmin')) {
    location.href = './admin_dangnhap.html';
}

const urlApiNhanVien = 'http://localhost:8080/api/v1/nhanvien/';

// hien thi nhan vien
const getNhanVien = () => {
    fetch(urlApiNhanVien)
        .then(response => response.json())
        .then(data => {
            renderNhanVien(data.data)
        });
}
getNhanVien();

const renderNhanVien = nhanViens => {
    let htmls = nhanViens.map(item => 
        (`
            <div class="col-lg-4 col-md-4 col-sm-6 mix oranges fresh-meat">
                <div class="featured__itemm">
                    <div class="featured__item__picc set-bg">
                        
                        <a href="./admin_thongtinnhanvien.html?id=${item.id}">
                            <img class="" src="${item.anh}" style="withd: 100%;">
                        </a>

                        <ul class="featured__item__pic__hover">
                            <li><a href="./admin_suanhanvien.html?id=${item.id}">Sửa</a></li>
                            <li><a href="#" onclick="deleteNhanVien(${item.id})">Xoá</a></li>
                        </ul>

                    </div>
                    <div class="featured__item__text">
                        <h5>${item.hoTen}</h5>
                    </div>
                </div>
            </div>
        `)
    );
    $('#noi-chua-nhan-vien').html(htmls);
}
// tim kiem
$('#btn-tim-kiem').click(e => {
    let data = $('#input-tim-kiem').val();

    if (!data) {
        getNhanVien();
        return;
    }

    async function deleteData(url = '', data = {}) {
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
            body: data //JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    deleteData(urlApiNhanVien + 'timkiem', data)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            if (data.data.length === 0) {
                alert('Không tìm thấy nhân viên');
                getNhanVien();
                return;
            }
            renderNhanVien(data.data);
        });
});


const deleteNhanVien = id => {
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
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
    deleteData(urlApiNhanVien + id)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            location.href = './admin_nhanvien.html';
        });
}

const logout = () => {
    localStorage.removeItem('idAdmin');
    location.href = './admin_dangnhap.html';
}