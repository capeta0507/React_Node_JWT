import React, {useState} from 'react'

const About = () =>  {
    const [f1data] = useState([
        {
          name: 'Mclaren Mercedes',
          img: 'Mercedes-Benz-McLaren-MP4-15-14.jpg',
          title: 'MP4-15'
        },
        {
          name: 'Mika Hakkinen',
          img: 'mika-hakkinen.jpg',
          title: 'Lotus -> Mclaren'
        },
        {
          name: 'David Coulthard',
          img: 'david-coulthard-portrait.jpg',
          title: 'Williams -> Mclaren -> Red Bull'
        }
      ])
    return (
        <>
            <div className="title">
                <h1>West McLaren Mercedes</h1>
            </div>
            <div id='myCard' className="row">
                {f1data.map((data,idx) => {
                    let photo = data.img
                    console.log(data)
                    return (
                    <div className="col-md-4 col-12" key={idx}>
                        <div className="card mb-3">
                        <h3 className="card-header">{data.name}</h3>
                        <img className="cardImg" src={`images/${photo}`} alt="Card image" />
                        <div className="card-body">
                            <p className="card-text">{data.title}</p>
                        </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className="row">
                <ul className="result">
                    <li>隊名：McLaren</li>
                    <li>引擎：Mercedes</li>
                    <li>車型：MP4-15</li>
                    <li>年份：2000</li>
                    <li>勝場：7</li>
                    <li>桿位：7</li>
                    <li>最速圈：12</li>
                    <li>年度排名：2nd</li>
                    <li>車隊經理：Ron Dennis</li>
                    <li>設計師：Adrian Newey</li>
                </ul>
            </div>
        </>
    )
}

export default About