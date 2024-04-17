import React, { useContext, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Snack from "../snack/Snack";
import Loader from "../loader/Loader";
const Contact = () => {
  const usersCollectionRef = collection(db, 'users')
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  let [isLoading, setIsLoading] = useState(false);
  let [openSnack, setOpenSnack] = useState(false);
  let [severity, setSeverity] = useState('error')
  let [snackMsg, setSnackMsg] = useState('');
  const form = useRef();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("")

  const handleCloseSnack = () => {
    setOpenSnack(false);
    setSnackMsg('');
    setSeverity('error');
  }

  function getCurrentDate() {
    const currentDate = new Date();
    // Get day, month, and year
    const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear();

    // Format the date as "DD-MM-YYYY"
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }





  const sendEmail = async (e) => {
    e.preventDefault();
    let userObj = {
      name,
      email,
      message,
      isProcessed: "false",
      date: getCurrentDate(),
    }

    if (name && email && message) {
      setIsLoading(true);



      // sending email 
      const data = {
        service_id: 'service_x9pcopn',
        template_id: 'template_dfpec7v',
        user_id: 'cqvvxyDj2QRuaiCpL',
        template_params: {
          name,
          email,
          message,
          'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
        }
      };

      try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          // storing data in firestore database
          try {
            await addDoc(usersCollectionRef, userObj);
            setSnackMsg("Thanks for Contacting me");
            setSeverity("success");
            setOpenSnack(true)
            setIsLoading(false)
            setEmail('')
            setName('')
            setMessage('')

          } catch (error) {
            console.log(error.text);
            setSnackMsg(error.message)
            setOpenSnack(true)
          }
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Oops... ' + JSON.stringify(error));
      }


    } else {
      setSnackMsg("Required Fields are missing.");
      setOpenSnack(true);
    }






  };

  return (
    <div className="contact-form" id="contact">
      {/* left side copy and paste from work section */}
      <div className="w-left">
        <div className="awesome">
          {/* darkMode */}
          <span style={{ color: darkMode ? 'white' : '' }}>Get in Touch</span>
          <span>Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" className="user" placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="email" name="user_email" className="user" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea name="message" className="user" placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" value="Send" className="button" />
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
      <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Contact;
