import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Data = () => {
    const [data,setData] = useState([]);
    useEffect(() =>{
        const getToken = window.sessionStorage.getItem('token')
        axios.get(`/api/users?token=${getToken}`).then(response =>{
            console.log(response.data.data);
            setData(response.data.data)
        }).catch(error => {
            console.log(error);
          });
    },[])
    // console.log(data, 'data');
    return (
        <div className='row'>
            {data.map((data) =>{
                console.log(data, 'f1')
                return(
                    <div className="col-md-4 col-12">
                        <div className="card mb-3">
                            <h3 className="card-header">{data.name}</h3>
                            <div className="card-body">
                                <h5 className="card-title">{data.login}</h5>
                                <p className="card-text">{data.email}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Data