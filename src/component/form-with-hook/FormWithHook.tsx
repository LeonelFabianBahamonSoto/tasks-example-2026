import { SubmitHandler, useForm } from "react-hook-form"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Icon from '@mui/material/Icon';

import style from "./FormWithHook.module.css";

type MyForm = {
    nombre: string;
    apellidos: string;
    edad: number | unknown;
    ciudad: string;
    observaciones: string;
}

type City = {
    id: number,
    city: string,
}

const citiesList: City[] = [
    {id: 1, city: "Bogota"},
    {id: 2, city: "Medellin"},
    {id: 3, city: "Otro"}
];

const FormWithHook = () => {
    const navigate = useNavigate();

    const formRules = z.object({
        nombre: z
            .string()
            .min(1, "El campo es obligatorio")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),

        apellidos: z
            .string()
            .min(1, "El campo es obligatorio")
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres"),

        edad: z.coerce
            .number()
            .min(1, "El campo es obligatorio")
            .min(1, "La edad mínima es 1")
            .max(100, "La edad máxima es 100"),

        ciudad: z
            .string()
            .min(1, "El campo es obligatorio")
            .min(1, "La ciudad es obligatoria"),

        observaciones: z
            .string()
    })
    .superRefine((data, ctx) => {
        if (data.ciudad !== "1") {
            if (data.observaciones.trim().length === 0) {
                ctx.addIssue({
                    code: "custom",
                    path: ["observaciones"],
                    message: "El campo es obligatorio",
                });
            } else if (data.observaciones.trim().length < 3) {
                ctx.addIssue({
                    code: "custom",
                    path: ["observaciones"],
                    message: "Mínimo 3 caracteres",
                });
            } else if (data.observaciones.length > 50) {
                ctx.addIssue({
                    code: "custom",
                    path: ["observaciones"],
                    message: "Máximo 50 caracteres",
                });
            }
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<MyForm>({
        mode: "all",
        resolver: zodResolver(formRules),
        defaultValues: {
            nombre: "",
            apellidos: "",
            edad: undefined,
            ciudad: "",
            observaciones: "",
        },
    });

    const ciudadSeleccionada = watch('ciudad');

    useEffect(() => {
        if(ciudadSeleccionada === '1') {
            setValue("observaciones", "", {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [ ciudadSeleccionada ])

    const mySubmit: SubmitHandler<MyForm> = (data): void => {
        console.info('isDirty: ', isDirty);
        console.log('Formulario: ', data);
    }

    return (
        <div className="p-2">
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <div style={{ flex: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Icon>arrow_back_ios</Icon>}
                        onClick={() => { navigate("/home") }}
                    >
                        Volver
                    </Button>
                </div>

                <div style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
                    Formulario ngForm
                </div>

                <div style={{ flex: 1 }}></div>
            </div>


            <form
                onSubmit={handleSubmit(mySubmit)}
            >
                <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        lg:grid-cols-3
                        gap-1
                    "
                >
                    {/* Nombre */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Nombre</span>
                        <input
                            {...register("nombre")}
                            placeholder="Ingrese los nombres"
                        />

                        { errors.nombre && <span className={style.errorForm}>{errors.nombre.message}</span> }
                    </div>

                    {/* Apellido */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Apellidos</span>
                        <input
                            {...register("apellidos")}
                        />

                        {errors.apellidos && <span className={style.errorForm}>{errors.apellidos.message}</span>}
                    </div>

                    {/* Edad */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Edad</span>
                        <input
                            {...register("edad")}
                            type="number"
                        />

                        {errors.edad && <span className={style.errorForm}>{errors.edad.message}</span>}
                    </div>

                    {/* Observaciones */}
                    <div className={`${style.inputContent} col-span-1 md:col-span-2`}>
                        <span className={style.labelTitle}>Observaciones</span>
                        <textarea
                            {...register("observaciones")}
                            disabled={ (ciudadSeleccionada === '1') ? true : false }
                        >
                        </textarea>

                        {errors.observaciones && <span className={style.errorForm}>{errors.observaciones.message}</span>}
                    </div>

                    {/* Ciudades */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Ciudad</span>
                        <select
                            {...register("ciudad")}
                        >
                            <option value="">Seleccione una ciudad</option>

                            { citiesList.map((city) => (
                                    <option value={city.id} key={city.id}>{city.city}</option>
                                ))
                            }
                        </select>

                        {errors.ciudad && <span className={style.errorForm}>{errors.ciudad.message}</span>}
                    </div>

                </div>

                <div
                    className="flex align-center justify-center p-4 w-full"
                >
                    <button
                        className={`${isSubmitting || !isValid ? style.disabledButton : style.submitButton}`}
                        type="submit"
                        disabled={ isSubmitting || !isValid }
                    >
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    )
}

export default FormWithHook;