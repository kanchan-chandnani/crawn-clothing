import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../components/contexts/user.context";
import { CartContext } from "../../components/contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation.styles.scss'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import userEvent from "@testing-library/user-event";

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    const signOutHandler = async () => {
        const response = await signOutUser();
    }
    return (
        <Fragment>
            <div class="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-conatiner">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (<span className="nav-link" onClick={signOutHandler}>
                            SIGN OUT
                        </span>) : (<Link className="nav-link" to="/auth">
                            SIGN IN </Link>)
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;