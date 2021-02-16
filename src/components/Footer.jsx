import React from 'react'

function Footer() {
    return (
        <div className='d-flex justify-content-between align-items-center' style={{ marginTop: '30px' }}>
            <div className="footer-left" style={{ color: '#5a606b', width: '70%' }}>
                <span style={{ fontSize: '25px', color: '#5a606b' }}>About me</span>
                <p style={{ marginTop: '10px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem exercitationem aspernatur nesciunt fugiat rem mollitia iure,
                omnis quis saepe quisquam deleniti. Perferendis provident illum similique. Eum distinctio voluptate aperiam recusandae?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laudantium, similique quam illum nam unde perferendis ratione illo reiciendis quas beatae!</p>
            </div>
            <div className="footer-right" style={{ color: '#5a606b' }}>
                <p>Name: Mihail Shcherbakov</p>
                <p>City: Moscow</p>
                <p>Email: alloha12345@mail.ru</p>
                <p>Front-end developer junior</p>
            </div>
        </div>
    )
}

export default Footer
