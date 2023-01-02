import { useState } from "react";

import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import Button from '../button/button.component'
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
const defaultformFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultformFields);
    const { email, password} = formFields;
    const handleChange = (event) => {
        console.log(event.target.value);

        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const resetToBlank = () => {
        setFormFields(defaultformFields);
    }
    const signInWithGoogle = async() => {
         const { user } = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetToBlank()
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
            }
            console.log(error);
        }
    }
    return (
        <div>
            <h2>Already have an account</h2>
            <span> Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    name="email" 
                    onChange={handleChange} 
                    value={email} 
                    type="email" 
                    required /><br />

                <FormInput 
                    label="Password"
                    name="password" 
                    onChange={handleChange} 
                    value={password} 
                    type="password" 
                    required 
                    /><br />
                    <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                    </div>
            </form>
        </div>
    );
};

export default SignInForm;