import { Fragment, useContext, useRef } from "react";
import "./formBlogs.css";
import { LangueContext } from "../../../Context/LangueContext";
import { formBlogsTranslate } from './formBlogs_Translate';

export default function FormBlogs() {

  const {langue} = useContext(LangueContext);

  const formTranslate = formBlogsTranslate.formBlogs.find(item => item.id == langue);


  const nomRef = useRef();
  const prenomRef = useRef();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const formdata = {
      nom: nomRef.current.value,
      prenom: prenomRef.current.value,
      email: emailRef.current.value,
    };

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
        <h1 className={langue == 'fr' ? "h1Blogs PresseTitle" : "h1Blogs PresseTitle h1BlogsAr"}>{formTranslate.titre}</h1>
        <form className={langue == 'fr' ? "formBlogs" : "formBlogs formBlogsAr"} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={formTranslate.nom}
            className="nomBlogs"
            ref={nomRef}
          />
          <input
            type="text"
            placeholder={formTranslate.prenom}
            className="prenomBlogs"
            ref={prenomRef}
          />
          <input
            type="text"
            placeholder={formTranslate.email}
            className="emailBlogs"
            ref={emailRef}
          />
          <input type="submit" value={formTranslate.submit} className="submitBlogs" />
        </form>
      </div>
    </Fragment>
  );
}
