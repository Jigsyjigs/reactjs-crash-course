import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Create = () => {
    const [title,setTitle]= useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] = useState('jigs');
    const [isPending,setisPending] = useState(false);
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setisPending(true);

        fetch('http://localhost:8000/blogs',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }) .then (()=> {
            console.log('new blog added')
            setisPending(false);
            Navigate('/')
        })
    }

    return (
        <div className = "create">
            <h2>Add a New Blog</h2>
            <form onSubmit = {handleSubmit}>
                <label>Blog title: </label>
                    <input 
                        type = "text"
                        required
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                    />
                <label>Blog body: </label>
                    <textarea 
                        required
                        value = {body}
                        onChange ={(e) => setBody(e.target.value)}
                    ></textarea>
                <label>Blog Author: </label>
                    <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                        <option value ="jigs">jigs</option>
                        <option value ="alyssa">alyssa</option>
                        <option value ="sofia">sofia</option>
                    </select>
            {!isPending && <button>Add blog</button>}
            {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
      );
}
 
export default Create;