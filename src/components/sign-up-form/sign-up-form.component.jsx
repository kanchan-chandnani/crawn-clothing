import { useState } from "react";

import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss';
import Button from '../button/button.component'
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event) => {
        console.log(event.target.value);

        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const resetToBlank = () => {
        setFormFields(defaultformFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("passowrds do not match");
            return;
        }
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert("email already exists")
            }
            else {
                console.log('user creation encountered an error', error)
            }
            resetToBlank()
        }
    }
    return (
        <div>
            <h2>Don't have an account
            </h2>
               
            <span> Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    name="displayName" 
                    onChange={handleChange} 
                    value={displayName} 
                    type="text" 
                    required /> 
                    <br />
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

                <FormInput
                    label="Confirm Password"
                    name="confirmPassword" 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    type="password"
                    required
                    /><br />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;