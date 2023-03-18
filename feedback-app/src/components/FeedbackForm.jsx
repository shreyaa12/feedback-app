import {useState,useContext, useEffect} from 'react'
import Card from "./shared/Card";
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const [text, sendText] = useState('')
    const [btnDisabled,setBtnDiabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)
    
    const {addFeedback,feedbackEdit,updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDiabled(false)
            sendText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
        
    },[feedbackEdit])

    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDiabled(true)
            setMessage(null)
        }else if(text!= null && text.trim().length <=10 ){
            setBtnDiabled(true)
            setMessage('Text must be atleast 10 characters!')
        }else{
            setBtnDiabled(false)
            setMessage(null)
        }
        sendText(e.target.value);
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(text.trim().length >10){
            const newFeedback= {
                text,
                rating
            }
            
            if(feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }else{
                addFeedback(newFeedback)
            }
           
            sendText('')
        }
    }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How should you rate the service with us?</h2>

       <RatingSelect select={(rating)=>setRating(rating)}/>

        <div className="input-group">
            <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>  
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
