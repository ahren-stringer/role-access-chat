import './Auth.module.css';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { Field, reduxForm } from 'redux-form'
import { NavLink, withRouter } from "react-router-dom";
import { required, aol, email, minLength6 } from '../../validators'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        margin: '40px auto 0'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    input: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    }
}));

const input = ({ input, label, type, name, meta: { touched, error, warning } }) => {
    return (
        <div>
            <TextField
                //error
                id="standard-error-helper-text"
                //label="Error"
                label={label}
                type={type}
                {...input}
            // helperText={touched &&
            //     ((error && { error }) ||
            //         (warning && { warning }))}
            />
        </div>
        // <div className="cf">
        //     <label for={name}>{label}<span className="required">*</span></label>
        //     <input {...input} name={name} type={type} id={name} size="35" />
        //     {touched &&
        //         ((error && <span>{error}</span>) ||
        //             (warning && <span>{warning}</span>))}
        // </div>
    )
}

function RegisterForm(props) {
    const { submitting } = props
    const classes = useStyles();

    return <form onSubmit={props.handleSubmit} className={classes.input}>
        <Field
            name="name"
            type="text"
            component={input}
            label="Имя"
            validate={[required]}
            warn={aol}
        />
        <Field
            name="email"
            type="email"
            component={input}
            label="Email"
            validate={[required, email]}
            warn={aol}
        />

        <Field
            name="password"
            type="password"
            component={input}
            label="Пароль"
            validate={[required, minLength6]}
            warn={aol}
        />
        <div style={{ margin: '22px 0 10px 8px' }}>
            <Button type="submit" disabled={submitting} variant="contained" style={{ marginRight: '8px' }}>Зарегистрироваться</Button>
        </div>
    </form>
}

RegisterForm = reduxForm({ form: 'register' })(RegisterForm)

function Register(props) {
    const classes = useStyles();
    let submit = async (formData) => {
        try {
            debugger
            let req = await axios.post('http://localhost:8001/register', { ...formData })
            props.history.goBack()
        } catch (e) { }
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Вход
                </Typography>
            </CardContent>

            <RegisterForm onSubmit={submit} />

        </Card>
    );
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {})(withRouter(Register));