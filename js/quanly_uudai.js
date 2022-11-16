if (!localStorage.getItem('idNhanVien')) {
    location.href = './quanly_dangnhap.html';
}

const urlApiUuDai = 'http://localhost:8080/api/v1/uudai/';

fetch(urlApiUuDai)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let htmls = data.data.map((item) => 
            (`
                <article class="card card-product-list"> 
                    <div class="row no-gutters">
                        <div class="col-md-8 quanly-align-center">
                            <div class="info-main">
                                <a href="./quanly_suauudai.html?id=${item.id}" class="h5 title title-hover title-focus">${item.tieuDe}</a>
                                <p class="content-uudai">${item.noiDung}</p>
                            </div>
                        </div>
                        <aside class="col-md-4">
                            <div class="info-aside quanly-justify-center">
                                <a href="./quanly_suauudai.html?id=${item.id}"><button type="button" class="btn site-btn" >Sửa</button></a>
                                <br>
                                <button type="button" class="btn site-btn" style="height: 49px;" onclick="deleteUuDai(${item.id})">Xoá</button>
                            </div>
                        </aside>
                    </div>
                </article>
            `)
        );

        $('#noichua-uudai').html(htmls);
    });

const deleteUuDai = (id) => {
    if (confirm(`Bạn có chắc là muốn xoá ưu đãi có id là ${id} không ?`)) {
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
        
        deleteData(urlApiUuDai + id, {})
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
            });

        window.location = window.location;
    }
}



$('#btnDangXuat').click((e) => {
    localStorage.removeItem('idNhanVien');
    localStorage.removeItem('base64IMG');
    location.href = './quanly_dangnhap.html';
});