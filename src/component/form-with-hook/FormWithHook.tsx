import { SubmitHandler, useForm } from "react-hook-form"

import style from "./FormWithHook.module.css";

type MyForm = {
    nombre: string;
    apellidos: string;
    edad: number;
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

export const FormWithHook = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MyForm>({
        mode: "onChange",
    });

    const mySubmit: SubmitHandler<MyForm> = (data): void => {
        console.log(data)
    }

    return (
        <div className="p-2">
            <div className="text-[black] p-4 w-full text-center">
                Hola Tailwind
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
                            {...register("nombre", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Máximo 20 caracteres"
                                }
                            })}
                            placeholder="Ingrese los nombres"
                        />

                        {errors.nombre && <span className={style.errorForm}>{errors.nombre.message}</span>}
                    </div>

                    {/* Apellido */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Apellidos</span>
                        <input
                            {...register("apellidos", {
                                required: "El apellido es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Máximo 20 caracteres"
                                }
                            })}
                        />

                        {errors.apellidos && <span className={style.errorForm}>{errors.apellidos.message}</span>}
                    </div>

                    {/* Edad */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Edad</span>
                        <input
                            {...register("edad", {
                                valueAsNumber: true,
                                required: "La edad es obligatoria",
                                min: {
                                    value: 1,
                                    message: "Mínimo 1"
                                },
                                max: {
                                    value: 100,
                                    message: "Máximo 100"
                                }
                            })}
                            type="number"
                        />

                        {errors.edad && <span className={style.errorForm}>{errors.edad.message}</span>}
                    </div>

                    {/* Observaciones */}
                    <div className={`${style.inputContent} col-span-1 md:col-span-2`}>
                        <span className={style.labelTitle}>Observaciones</span>
                        <textarea
                            {...register("observaciones", {
                                required: "El observaciones es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Máximo 50 caracteres"
                                }
                            })}
                        >
                        </textarea>

                        {errors.observaciones && <span className={style.errorForm}>{errors.observaciones.message}</span>}
                    </div>

                    {/* Ciudades */}
                    <div className={`${style.inputContent} col-span-1`}>
                        <span className={style.labelTitle}>Ciudad</span>
                        <select
                            {...register("ciudad", {
                                required: "La ciudad es obligatoria",
                            })}
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
                        className={style.submitButton}
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    )
}
