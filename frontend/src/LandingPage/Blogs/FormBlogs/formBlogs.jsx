import { Fragment, useRef } from "react";
import './formBlogs.css'

export default function FormBlogs(){


    const nomRef = useRef();
    const prenomRef = useRef();
    const emailRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();

        const formdata = {
            nom : nomRef.current.value,
            prenom : prenomRef.current.value,
            email : emailRef.current.value,
        }

        // axios.post('API', formData)
        // .then(response => {
        //     nomRef.current.value = '';
        //     prenomRef.current.value = '';
        //     emailRef.current.value = '';
        // })
        // .catch(error => {
        //     console.error(error);
        // });

    }

    return (
        <Fragment>
            <div className="parentFormBlogs">
                <h1 className="h1Blogs PresseTitle">NE MANQUEZ PAS NOS ACTUALITES</h1>
                <form className="formBlogs" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nom" className="nomBlogs" ref={nomRef}/>
                    <input type="text" placeholder="Prenom" className="prenomBlogs" ref={prenomRef}/>
                    <input type="text" placeholder="Email" className="emailBlogs" ref={emailRef}/>
                    <input type="submit" value='Envoyer' className="submitBlogs" />
                </form>
            </div>
        </Fragment>
    )
}