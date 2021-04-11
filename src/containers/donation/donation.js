import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import UserContext from "../../context/userContext";
import NgoContext from '../../context/ngoContext';
import Button from 'react-bootstrap/Button'
import classes from './donation.module.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/Input/Input';
import StripeCheckout from 'react-stripe-checkout';

const Donation = (props) => {
    const userContext = useContext(UserContext);

    const [donateForm, setDonateForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: localStorage.getItem('username')
            },
            value: localStorage.getItem('username')
            ,
            validation: {
                required: true
            },
            isValid: true,
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
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    // const ngoContext = useContext(NgoContext);

    // useEffect(() => {
    //     if (userContext.uid.length === 0) {
    //         history.push('/login');
    //     }
    // }, [])

    const orderHandler = (event) => {
        // event.preventDefault();
        console.log("in");
        setLoading(true);
        const formData = {}
        for (let inputType in donateForm) {
            formData[inputType] = donateForm[inputType].value;
        }
        const order = {
            orderData: formData,
            userId: props.match.params.id,
            name: userContext.name,
            ngo: props.match.params.id
        }
        let index = +props.match.params.id[3];
        index = index - 1;
        // let ngoData = [...ngoContext.ngo];
        // ngoData[index].fund += (+donateForm.amount.value);
        // ngoContext.setNgo(ngoData);

        axios.post('https://hooks-practce.firebaseio.com/donations.json', order)
            .then(response => {
                setLoading(true);
                history.push('/');
            })
            .catch(error => {
                setLoading(true);
                console.log(error);
            })
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
    if (userContext.name) {
        localStorage.setItem('username', userContext.name);
    }

    let form = (
        <div>
            <h4>Enter your Contact Details</h4>
            <form>
                {formArray.map(formEl => {
                    return <Input
                        key={formEl.id}
                        disabled={formEl.id === "name"}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        invalid={!formEl.config.isValid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        typed={(event) => inputChangedHandler(event, formEl.id)} />
                })}
                {/* <Button type="submit" variant="info" disabled={!isFormValid}>Donate!</Button> */}
            </form>
        </div>
    );
    if (loading)
        form = <Spinner />;

    function handleToken(token, addresses) {
        console.log({ token, addresses });
        orderHandler();
    }
    return (
        <div className={classes.ContactData}>
            {form}
            <StripeCheckout
                stripeKey="pk_test_51IeukeSEjnjBpRhZzEuIlh1wP4vvU8cxtAWhmbQHsS2QMBP54hRm7foHDlmY38Oxc7CVXFGA2ng6Uxg5ueS7wVuC00k21LHWul"
                token={handleToken}
                amount = {donateForm.amount}
            />
        </div>
    );
}

export default Donation;