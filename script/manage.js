const URL = 'http://localhost:8000'

window.onload = async () => {  
    await loadData()
}

const loadData = async () => {
    const response = await axios.get(`${URL}/users`)
    const users = response.data
    console.log('response', response.data)

    // ประกอบ HTML จาก user data โดยใช้ <li> และ สร้างปุ่มสำหรับ Edit และ Delete
    let userHTMLData = '<ul>'
        for (let i = 0; i < users.length; i++) {
        userHTMLData += `<li class="mb-2">${users[i].firstname} ${users[i].lastname}
        <a href='index.html?id=${users[i].id}'><button class="btn btn-secondary ms-2" data-id='${users[i].id}'>Edit</button></a>
        <button class='delete btn btn-danger ms-2' data-id='${users[i].id}'>Delete</button>
        </li><hr>`
    } //tag <a href='index.html?id=${id}'></a> ครอบปุ่มเพื่อให้สามารถกลับไปยังหน้าเดิมพร้อม parameter ได้

    userHTMLData += '</ul>'

    // นำ html ที่ประกอบใส่กลับเข้าไปใน DOM html
    let usersDOM = document.getElementById('users')
    usersDOM.innerHTML = userHTMLData

    let deleteDOMs = document.getElementsByClassName('delete')
        for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
        let id = event.target.dataset.id

        try {
        await axios.delete(`${URL}/users/${id}`)
        loadData()
        } catch (error) {
        console.log('error', error)
        }
        })
    }
}