import { useFormik } from "formik";

import { Button, Input } from "@mui/material";

import { useTaskContext } from "../TaskProvider";

import style from "./TaskInputName.module.css";

import { Task } from "../../../interfaces/Task.interface";

export const TaskInputName = () => {
    const { state, dispatch } = useTaskContext();

    const validate = (values: Task) => {
        const errors = {};

        if (!values.taskName) {
            errors.taskName = 'Campo requerido';
        } else if (values.taskName.length > 10) {
            errors.taskName = 'Máximo 10 caracteres';
        }

        return errors;
    };

    const form = useFormik({
        initialValues: {
            id: 0,
            taskName: "",
            isComplete: false,
        },
        validate,
        onSubmit: values => {
            createTask(values);
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const createTask = (task: Task): void => {
        const currentTasks = state.tasks;
        const taskNameToCreate = task.taskName.trim();

        if(currentTasks.length === 0) {
            dispatch({
                type: "addTask",
                payload: {
                    id: 1,
                    taskName: taskNameToCreate,
                    isComplete: false
                }
            });

            form.resetForm();

            return;
        }

        const alreadyExist = currentTasks.some((t: Task) => t.taskName === taskNameToCreate);

        if(alreadyExist) {
            alert("El nombre ya esta registrado");
            return;
        }

        const maxId = Math.max(...currentTasks.map(t => t.id)) + 1;

        dispatch({
            type: "addTask",
            payload: {
                id: maxId,
                taskName: taskNameToCreate,
                isComplete: false
            }
        });

        form.resetForm();
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit}>
                <div className={`
                    grid
                    grid-cols-1
                    sm:grid-cols-1
                    md:grid-cols-2

                    ${style.content}
                `}
                >
                    <div className={`col-span-1 ${style.inputCheckBoxContent}`}>
                        <label htmlFor="taskName">Nombre de la tarea</label>
                        <Input
                            id="taskName"
                            name="taskName"
                            onBlur={form.handleBlur}
                            onChange={form.handleChange}
                            type="text"
                            value={form.values.taskName}
                        />

                        {form.errors.taskName ? <div className={style.errorForm}>{form.errors.taskName}</div> : null}
                    </div>

                    <div className={`col-span-1 ${style.buttonContent}`}>
                        <Button
                            variant="contained"
                            type='submit'
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
