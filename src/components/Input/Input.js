import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClass = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched)
        inputClass.push(classes.Invalid)

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.typed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.typed} />;
            break;
        case ('select'):
            inputElement = <select 
                className={inputClass.join(' ')}
                value={props.value}
                onChange={props.typed}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} 
                                value={option.value}> 
                            {option.displayValue}</option>
                })}
            </select>
            break;
        default:
            inputElement = <input 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.typed} />
    }

    let validationError = null;
    if(props.touched && props.invalid) {
        validationError = <p>Please enter valid data</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {validationError}
            {inputElement}
        </div>
    );
}

export default input;