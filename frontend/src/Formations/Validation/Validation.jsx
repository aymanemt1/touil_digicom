import React, { useContext, useEffect, useState } from 'react'
import './Validation.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Alert } from '../../Components/Alert/Alert';
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './validationTranslate';

export const Validation = ({formData}) => {

    const [responsemessage,setresponsemessage] =useState()
    const [reserved,setreserved] =useState(false)
    const [clicked,setclicked] =useState(false)
  const [Errors,setErrors] = useState({})

    const [dataFormation,setdataFormation] =useState([])
    const {langue} =useContext(LangueContext)

    const [validationData,setvalidationData]=useState({
        date_validation :"",
        time_validation :"",
    })


      
    const validation = Translate.validation.find((lang)=>(
        lang.id == langue
      ))

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvalidationData({
            ...validationData,
            [name]: value
        });
      setErrors({ ...Errors, [e.target.name]: '' });

    };

    const getFormationDates = async (formationId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/GetformationDate/${formationId}`);
            setdataFormation(response.data.dates); 
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching formation data:', error);
        }
    }

    
    useEffect(() => {
        const formationId = formData.formationId; 
        getFormationDates(formationId);
    }, []);
    
     
    const validateForm = () => {
        const validationErrors = {};
  
        if (validationData.date_validation === '') {
            validationErrors.date_validation = 'la date de validation est requise';
        }
        if (validationData.time_validation === '') {
            validationErrors.time_validation = 'une validation du temps est requise';
        }
        setErrors(validationErrors);
  
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setclicked(!clicked);
    
        const updatedFormData = { ...formData, ...validationData };
        if (reserved) {
            updatedFormData = {};
        }
        if (!validateForm()) {
            return;
        }
        
    
        const isFormValid = validateForm();
    
        try {
            const reservationResponse = await axios.post('https://touildigicom.ma/api/reservation', updatedFormData);
            if (reservationResponse.status === 200) {
                setreserved(true);
                setresponsemessage('votre réservation a été ajoutée avec succès')

                try {
                    const emailResponse = await axios.post('https://touildigicom.ma/api/sendmail-reservaion', updatedFormData);
                    if (emailResponse.status === 200) {
                        console.log('Email sent to admin');
                    } else {
                        console.error('Error sending email to admin:', emailResponse.data);
                    }
                } catch (emailError) {
                    console.error('Error sending email to admin:', emailError);
                }
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                const errorMessage = error.response.data.error;
                setresponsemessage(errorMessage);
                setreserved(false);
                
                console.log(responsemessage);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
        }
    }
    

    const nav = useNavigate();

    const handlReservice = () => {
        if(reserved){
            nav(`/service/2`);
        }
    }
    
    const ticketBtn = async () => {
        const ticketData = { ...formData, ...validationData };
        try {
            const response = await axios.post('https://touildigicom.ma/api/ticket', ticketData, {
                responseType: 'blob' // Set response type to blob
            });
    
            // Create a blob from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });
    
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
    
            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ticket.pdf'); // Set the download attribute
            document.body.appendChild(link);
    
            link.click();
    
            // Remove the link from the DOM
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error during request:', error);
        }
    };

    console.log(validationData)
  return (
    <div className='validationParent' >
 
    <div class="validation" id={reserved ? "removingbg" : ''}>

        <form className='validationForm' id={reserved?'reserved':''} onSubmit={handleSubmit}>
   <div className='formdate'>
   
   <select id="date" name="date_validation" value={validationData.date_validation} onChange={handleChange}>
       <option  value=''  selected disabled>
       <label for="date">{validation.date}:</label>
       </option>
 {dataFormation.map(date => (
         <option key={date} value={date}>{date}</option>
        ))}

</select>

   </div>
{Errors.date_validation && <span className='errorValidation'>{Errors.date_validation}<i className='bx bxs-error'></i></span>} 
<div className='formtime'>

  
    <select id="time" name='time_validation'  value={validationData.time_validation}
            onChange={handleChange}>
      <option value="" selected disabled>
    <label for="time">{validation.time} :</label>
      </option>
      <option value="11:00">11:00</option>
      <option value="13:00">13:00</option>
      <option value="15:00">15:00</option>
      <option value="17:00">17:00</option>
    </select>

</div>
    {Errors.time_validation && <span className='errorValidation'>{Errors.time_validation}<i className='bx bxs-error'></i></span>} 

    <div><button className='validationButton' type='submit'> {validation.valider}</button>
  
    </div>
  </form>

  <div className={`validationEntit ${Errors? 'afterErrors' :''}`} id={reserved?'Afterreserved':''}>
    {reserved ? (
        <>
        <h1 className='msgreservation'>{validation.remerci}</h1>
        <div className='btnsAfterReserved'>

        <button className='backServicebtn' onClick={handlReservice}>{validation.back}</button>
        <button className='ticketBtn' onClick={ticketBtn}>{validation.ticket}</button>
        </div>

        </>
    ) : (
        <h1>{validation.etape}</h1>

    )}
  </div>
  {reserved && responsemessage ? <Alert msg={responsemessage} /> : ""}
  
  </div>
  </div>
  
  )
}
