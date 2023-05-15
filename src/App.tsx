import { FormikErrors, useFormik } from "formik";

export const App = () => {

	interface FormValues {
		firstName: string,
		email: string
	}

	// Aquí realizaremos las validaciones para el formulario!!!
	// values: FormValues
	const validate = ({firstName, email}: FormValues) => {

		const errors: FormikErrors<FormValues> = {};
		
		if ( !firstName ) {
			errors.firstName = 'Campo requerido'
		} else if ( firstName.length > 15 ) {
			errors.firstName = 'Máx. 15 carácteres'
		}

		if (!email) {
			errors.email = 'Campo requerido'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			errors.email = 'Correo electrónico inválido'
		}

		return errors;

	}

	// Puedes hacer destructuring a "formik"
	const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
		// touched: si es que el campo ha sido tocado
		// Los valores iniciales son lo que se muestra en tus inputs del formulario
		initialValues: {
			firstName: '',
			email : ''
		},
		// Solo se ejecuta si todos los campos son válidos
		onSubmit: (values) => {
			console.log(values);
		},
		validate
	});

  return (
    <>
      <h1>Formularios con Formik</h1>

      <form onSubmit={ handleSubmit }>
        <div>
					<label htmlFor="firstName">Nombre:</label>
					
					{/* No olvides poner tu "name" que sea igual que value */}
					<input
						type="text"
						name="firstName"
						// Primera forma: {formik.handleChange}
						// Segunda forma: { handleChange }
						onBlur={ handleBlur }
						onChange={ handleChange }
						value={ values.firstName }
					/>
					{/* Si tenemos un error en firstName muestrame el span... */}
					{ touched.firstName && errors.firstName && <span>{ errors.firstName }</span> }
        </div>

        <div>
          <label htmlFor="name">Email:</label>
					<input
						type="email"
						name="email"
						onBlur={ handleBlur }
						onChange={ handleChange }
						value={ values.email }
					/>
					{ touched.email && errors.email && <span>{ errors.email }</span> }
        </div>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
};
