import {useState, useEffect} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Layout from '../shared/Layout';
import apiUrl from '../../config/config';

const Item = () =>{
    const [item,setItem] = useState([])
    const [deleted,setDeleted] = useState(false)
    const {id} = useParams()

    let navigate = useNavigate()

    useEffect(()=>{
        async function getItem(){
            try{
                const response = await axios(`${apiUrl}/items/${id}`)
                console.log(response)
                const results = response.data.item
                setItem(results)
            }catch(err){
                console.error(err)
            }
        }
        getItem()
    },[])


    const destroy = ()=>{
        axios({
            url:`${apiUrl}/items/${id}`,
            method: 'DELETE'
        }).then(()=>setDeleted(true)).catch(console.error)
    }

    useEffect(()=>{
        if(deleted){
            return navigate("/")
        }
    },[deleted, navigate])

    useEffect(()=>{
        if(!item){
            return <><p>loading...</p></>
        }
    },[item])

    return(
        <Layout>
            <h4>{item.title}</h4>
            <p>Link: {item.link}</p>
            <NavLink to={`/items/${id}/edit`} >
            <button>Edit Item</button>
            </NavLink>
            <button onClick={()=>destroy()}>Delete Item</button>
            <br/>
            <br/>
            <NavLink to="/items">Back to List</NavLink>
        </Layout>
    )
}

export default Item