import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const FormikYupPage = () => {
  return (
		<>
			
			<h1>Formulario con Formik</h1>

      <Formik
        initialValues={{
          firstName: "",
          email: "",
					terms: false,
					jobType: ''
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Debe tener máx 15 caracteres.")
						.required("Campo requerido"),
					
          email: Yup.string()
            .email("Email no válido")
            .required("Campo requerido"),

					terms: Yup.boolean()
						.oneOf([true], 'Debes aceptar las condiciones'),
					
					jobType: Yup.string()
						// La opción siguiente no puede ser elegida
						.notOneOf(['it-jr'], 'Esta opción no es permitida')
						.required('Campo requerido')
					
        })}
      >
        {
          // Aquí dentro va tu "Form" de Formik, abajo es tipo un "children"
          (formik) => (
            <Form>
              <div>
                <label htmlFor="firstName">Nombre:</label>
								<Field name= "firstName" type= "text" placeholder="Ingresa tu nombre"/>

                {/* Si tenemos un error en firstName muestrame el span... */}
								{/* {touched.firstName && errors.firstName && (<span>{errors.firstName}</span>)} */}
								
								<ErrorMessage name= "firstName" component="span" />

              </div>

              <div>
								<label htmlFor="name">Email:</label>
								<Field name="email" type="email" placeholder="Ingresa tu email" />
                {/* <input type="email" {...getFieldProps("email")} /> */}
                <ErrorMessage name="email" component="span" />
              </div>

              <div style={{ marginTop: 12 }}>
                <Field name="terms" type="checkbox"/>
								<p>
								<ErrorMessage name="terms" component= "span" />
									Acepto los términos y condiciones
								</p>
							</div>

							<div style={{ marginTop: 12 }}>
								<label htmlFor="jobType">Email:</label>
								<Field name="jobType" as="select">
									<option value="">Selecciona una opción</option>
									<option value="developer">Developer</option>
									<option value="designer">Designer</option>
									<option value="it-jr">IT Jr.</option>
								</Field>
								<ErrorMessage name="jobType" component="span" />
							</div>

              <button type="submit">Enviar</button>
            </Form>
          )
        }
      </Formik>
    </>
  );
};
