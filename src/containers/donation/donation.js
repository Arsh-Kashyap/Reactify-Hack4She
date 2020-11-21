import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import UserContext from "../../context/userContext";
import NgoContext from '../../context/ngoContext';
import Button from 'react-bootstrap/Button'
import classes from './donation.module.css';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';

const Donation = (props) => {

    const [donateForm, setDonateForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        amount: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter amount'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
                maxLength: 6,
                isNumeric: true
            },
            isValid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            isValid: false,
            touched: false
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const userContext = useContext(UserContext);
    const ngoContext = useContext(NgoContext);

    useEffect(() => {
        if (userContext.uid.length === 0) {
            history.push('/login');
        }
    }, [])

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {}
        for (let inputType in donateForm) {
            formData[inputType] = donateForm[inputType].value;
        }
        const order = {
            orderData: formData,
            userId: userContext.uid,
            name: userContext.name,
            ngo: props.match.params.id
        }
        let index = +props.match.params.id[3];
        index = index - 1;
        let ngoData = [...ngoContext.ngo];
        ngoData[index].fund += (+donateForm.amount.value);
        ngoContext.setNgo(ngoData);
        axios.post('https://hooks-practce.firebaseio.com/donations.json', order)
            .then(response => {
                setLoading(true);
                history.push('/');
            })
            .catch(error => {
                setLoading(true);
                console.log(error);
            })
        // props.onOrderBurger(order, props.history, props.token);
    }

    const checkValidity = (inputType) => {
        let isValid = true;
        let rules = inputType.validation;
        if (!rules)
            return true;
        if (rules.required) {
            isValid = isValid && (inputType.value !== '');
        }
        if (rules.minLength) {
            isValid = isValid && (inputType.value.length >= rules.minLength);
        }
        if (rules.maxLength) {
            isValid = isValid && (inputType.value.length <= rules.maxLength);
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(inputType.value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(inputType.value) && isValid
        }
        return isValid;
    }

    const inputChangedHandler = (event, inputType) => {
        const updatedForm = {
            ...donateForm
        };
        const updatedEl = {
            ...updatedForm[inputType]
        };
        updatedEl["value"] = event.target.value;
        updatedEl.isValid = checkValidity(updatedEl);
        updatedEl.touched = true;
        updatedForm[inputType] = updatedEl;
        let isFormValid = true;
        for (let key in updatedForm) {
            isFormValid = isFormValid && updatedForm[key].isValid;
        }
        setDonateForm(updatedForm);
        setIsFormValid(isFormValid);
    }

    const formArray = [];
    for (let key in donateForm) {
        formArray.push({
            id: key,
            config: donateForm[key]
        })
    }

    let form = (
        <div>
            <h4>Enter your Contact Details</h4>
            <form onSubmit={orderHandler}>
                {formArray.map(formEl => {
                    return <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        invalid={!formEl.config.isValid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        typed={(event) => inputChangedHandler(event, formEl.id)} />
                })}
                <Button type="submit" variant="info" disabled={!isFormValid}>Donate!</Button>
            </form>
        </div>
    );
    if (loading)
        form = <Spinner />;

    return (
        <div className={classes.ContactData}>
            {form}
        </div>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         loading: state.order.loading,
//         token: state.auth.tokenId,
//         userId: state.auth.userId
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onOrderBurger: (orderData, history, token) => dispatch(actions.purchaseBurger(orderData, history, token))
//     }
// }

export default Donation;