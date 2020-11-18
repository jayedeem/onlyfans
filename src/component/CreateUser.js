import React from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.firstname}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const CreateUser = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string()
          .email('Invalid Email Address')
          .required('Email is required'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 3000);
      }}
    >
      {(props) => (
        <Form style={styles.formContainer}>
          <h1>Create a user</h1>
          <CustomTextInput
            label="First Name"
            name="firstname"
            type="text"
            placeholder="First Name"
          />
          <CustomTextInput
            label="Last Name"
            name="lastname"
            type="text"
            placeholder="Last Name"
          />
          <CustomTextInput
            label="email"
            name="email"
            type="text"
            placeholder="Email"
          />
          <Button color="primary" type="submit">
            {props.isSubmitting ? 'Loading..' : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;

const styles = {
  container: {
    display: 'flex',
  },
  formContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
