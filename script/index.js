const URL = 'http://localhost:8000'

// default mode ของหน้านี้คือ mode สร้าง
let mode = 'CREATE'
let selectedId = -1
let obj = 0

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (id) {
        mode = 'EDIT'
        selectedId = id

        try {
            const response = await axios.get(`${URL}/users/${id}`)
            const user = response.data
            console.log(user)

            let usernameDOM = document.querySelector('input[name=username]')
            let passwordDOM = document.querySelector('input[name=password]')
            let firstNameDOM = document.querySelector('input[name=firstname]')
            let lastNameDOM = document.querySelector('input[name=lastname]')
            let genderDOM = document.querySelector('input[name=gender]')
            let ageDOM = document.querySelector('input[name=age]')
            let addressDOM = document.querySelector('input[name=address]')
            let phoneNumberDOM = document.querySelector('input[name=phonenumber]')

            //loop array index
            for(let i=0; i < user.length; i++){
                usernameDOM.value = user[i].username
                passwordDOM.value = user[i].password
                firstNameDOM.value = user[i].firstname
                lastNameDOM.value = user[i].lastname
                genderDOM.value = user[i].gender
                ageDOM.value = user[i].age
                addressDOM.value = user[i].address
                phoneNumberDOM.value = user[i].phonenumber
            }

        } catch (error) {
            console.log('error', error)
        }
    }
}


const submitButton = async () => {
    let usernameDOM = document.querySelector('input[name=username]')
    let passwordDOM = document.querySelector('input[name=password]')

    let firstNameDOM = document.querySelector('input[name=firstname]')
    let lastNameDOM = document.querySelector('input[name=lastname]')
    let genderDOM = document.querySelector('input[name=gender]:checked')
    let ageDOM = document.querySelector('input[name=age]')
    let addressDOM = document.querySelector('input[name=address]')
    let phoneNumberDOM = document.querySelector('input[name=phonenumber]')

    let responseMessageDOM = document.getElementById('response-message')
    
    try {
    //สร้าง object รับค่าเพื่อไปแปลงเป็น JSON ส่งข้อมูลให้กับ Backend
    let userData = {
        username: usernameDOM.value,
        password: passwordDOM.value,
        firstname: firstNameDOM.value,
        lastname: lastNameDOM.value,
        gender: genderDOM.value,
        age: ageDOM.value,
        address: addressDOM.value,
        phonenumber: phoneNumberDOM.value
    }

    let response = {}
    let successText = 'เพิ่มข้อมูลเรียบร้อย!'
    // เพิ่ม condition มาดัก mode เอาไว้ 
        if (mode == 'EDIT') {
      // นำ selectedId เอาไว้
        response = await axios.put(`${URL}/users/${selectedId}`, userData)

      // เปลี่ยน message เมื่อเป็น mode แก้ไข
    successText = 'แก้ไขข้อมูลเรียบร้อย!'
    } else {
        response = await axios.post(`${URL}/users`, userData)
    }

        responseMessageDOM.innerText = successText
        responseMessageDOM.className = 'message success'

    } catch (error) {
        responseMessageDOM.innerText = 'กรุณากรอกข้อมูลให้ครบถ้วน!'
        responseMessageDOM.className = 'message danger'
    }
}

//ปุ่ม clear forms
let clearDOM = document.querySelectorAll('.form-control')
function clearButton(){
    for (let i = 0; i < clearDOM.length ; i++){
        console.log(clearDOM[i].value = "")
    }
}