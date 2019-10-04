import React, {useState} from 'react';
import './App.css';

const App = () => {
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="logo" src="https://www.thedesignfrontier.com/wp-content/uploads/2019/05/f1-logo-big.png" alt="" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Drivers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Teams</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
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
      </div>
      <div className="footer bg-primary">
        &copy; Johnny 0983720128 <br />nintendof1@gmail.com <br />https://github.com/capeta0507?tab=repositories
      </div>
    </>
  );
}

export default App;
