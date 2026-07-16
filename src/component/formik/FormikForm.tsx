import { useFormik } from 'formik';

import { useEffect, useState } from 'react';

import { Button, Input, MenuItem, Select } from '@mui/material';

import style from './FormikForm.module.css';

import { Country } from '../../interfaces/Country.interface';

import { countriesService } from '../../services/countries';

type MyForm = {
    nombre: string;
    apellidos: string;
    edad: number | unknown;
    ciudad: string;
    observaciones: string;
}

const FormikForm = () => {

    const [countriesOption, setCountriesOption] = useState<Country[]>([]);

    useEffect(() => {
        getAllCities();
    }, []);

    const validate = values => {
        const errors = {};

        if (!values.nombre) {
            errors.nombre = 'Campo requerido';
        } else if (values.nombre.length > 15) {
            errors.nombre = 'Máximo 15 caracteres';
        }

        if (!values.apellidos) {
            errors.apellidos = 'Campo requerido';
        } else if (values.apellidos.length > 20) {
            errors.apellidos = 'Máximo 15 caracteres';
        }

        // if (!values.email) {
        //     errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid email address';
        // }

        return errors;
    };

    const form = useFormik({
        initialValues: {
            nombre: "",
            apellidos: "",
            edad: "",
            ciudad: "",
            observaciones: "",
        },
        validate,
        onSubmit: values => {
            console.info('values: ', values);
            alert(JSON.stringify(values, null, 2));
        },
    });

    const getAllCities = async(): Promise<void> => {
        const response: Country[] = await countriesService.getAllCities();
        console.info('Res: ', response);
        setCountriesOption(response);
    }

    return (
        <div className='w-screen h-screen p-5   '>
            formik-form

            <form onSubmit={form.handleSubmit}>
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    lg:grid-cols-3
                    gap-1
                "
                >
                    <div
                        className={`col-span-1 ${style.inputCheckBoxContent}`}
                    >
                        <label htmlFor="nombre">Nombres</label>
                        <Input
                            id="nombre"
                            name="nombre"
                            type="text"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.nombre}
                        />
                        {form.errors.nombre ? <div className={style.errorForm}>{form.errors.nombre}</div> : null}
                    </div>

                    <div
                        className={`col-span-1 ${style.inputCheckBoxContent}`}
                    >
                        <label htmlFor="apellidos">Apellidos</label>
                        <Input
                            id="apellidos"
                            name="apellidos"
                            type="text"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.apellidos}
                        />
                        {form.errors.apellidos ? <div className={style.errorForm}>{form.errors.apellidos}</div> : null}
                    </div>

                    <div
                        className={`col-span-1 ${style.inputCheckBoxContent}`}
                    >
                        <label htmlFor="edad">Edad</label>
                        <Input
                            id="edad"
                            name="edad"
                            type="number"
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            value={form.values.edad}
                        />
                        {form.errors.edad ? <div className={style.errorForm}>{form.errors.edad}</div> : null}
                    </div>

                    <div
                        className={`col-span-1 ${style.inputCheckBoxContent}`}
                    >
                        <label htmlFor="edad">Ciudad</label>
                        <Select
                            name='ciudad'
                            labelId="ciudad"
                            id="ciudad"
                            label="ciudad"
                            value={form.values.ciudad}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        >
                            <MenuItem value={""}>Seleccione</MenuItem>

                            {
                                countriesOption.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                                ))
                            }
                        </Select>
                        {form.errors.edad ? <div className={style.errorForm}>{form.errors.edad}</div> : null}
                    </div>

                </div>

                <div
                    style={{
                        marginTop: "1rem",
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        type='submit'
                    >
                        Guardar
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default FormikForm;