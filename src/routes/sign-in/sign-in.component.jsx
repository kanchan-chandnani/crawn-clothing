import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'

import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    auth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>sign</h1>
            <button onClick={logGoogleUser}>sign in with google popup </button>
            <button onClick={signInWithGoogleRedirect}>sign in with google redirect </button>
        <SignUpForm /> 
        </div>
    );
}

export default SignIn;