import {useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

function Items(){
    const [items, setItems] = useState([])

    const list = async () =>{
        try{
            const res = await axios('http://localhost:3000/api/items')
            console.log(res)
            setItems(res.data.items)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        list()
    },[])

    const itemsList = items.map((item)=>{
        return <li key={item._id}>
            <NavLink to={`/items/${item._id}`}>{item.title}</NavLink>
        </li>
    })


    return(
        <div>
            <h4>Items</h4>
            <ul>{itemsList}</ul>
        </div>
    )
}

export default Items