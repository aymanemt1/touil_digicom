import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Alert } from "../../../../../Components/Alert/Alert";
import './subscriptions.css';

export default function Subscriptions(){

    const [subscriptions, setSubscriptions] = useState([]);
    const [responseMessage, setResponseMessage] = useState();


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const deleteSubscription = async (id) => {
        if(window.confirm('Êtes-vous sûr de supprimer cet abonnement ?')){
            try {
                await axios.delete(`http://127.0.0.1:8000/api/subscriptions/${id}`);
                setResponseMessage('Abonnement supprimé avec succès');
                setSubscriptions(subscriptions.filter(subscription => subscription.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };
    

    return (
        <Fragment>
            <div className="parentSubscriptions">
                <h2><i className='bx bx-data' ></i> Subscriptions </h2>
                <table border='1' cellSpacing='0'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th colSpan='2'>EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subscriptions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.Email}</td> 
                                    <td>
                                        <button className="actionSubscription" onClick={() => deleteSubscription(item.id)}> {/* Pass the id of the subscription */}
                                            <i className='bx bxs-trash-alt' ></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                { responseMessage && <Alert msg={responseMessage} />}
            </div>
        </Fragment>
    )
}
