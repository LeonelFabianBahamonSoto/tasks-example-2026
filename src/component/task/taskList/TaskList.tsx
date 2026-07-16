import { useEffect } from "react";

import { Checkbox, IconButton, List, ListItem, ListItemText } from "@mui/material";

import { useTaskContext } from "../TaskProvider";

import { Task } from "../../../interfaces/Task.interface";

import DeleteIcon from '@mui/icons-material/Delete';

import style from "./TaskList.module.css";

export const TaskList = () => {
    const { state, dispatch } = useTaskContext();

    useEffect(() => {
        console.info('Lista de tareas: ', state.tasks);
    }, [state])

    const handleToggle = (value: Task) => () => {
        dispatch({
            type: "changeStatusTask",
            payload: {
                id: value.id,
                isComplete: !value.isComplete,
            }
        });
    };

    const deleteTask = (valueId: number): void => {
        dispatch({
            type: "deleteTask",
            payload: valueId,
        });
    };

    return (
        <div className={style.content}>
            <List className={style.listContent}>
                {
                    state.tasks.map((task: Task) => {
                        return (
                            <ListItem
                                className={style.listItem}
                                key={task.id}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            edge="end"
                                            aria-label="Eliminar"
                                            onClick={() => deleteTask(task.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                                disablePadding
                            >
                                <Checkbox
                                    style={{ marginLeft: "1px" }}
                                    edge="start"
                                    onChange={handleToggle(task)}
                                    slotProps={{ input: { 'aria-labelledby': task.taskName } }}
                                />

                                <ListItemText id={(task.id).toString()} primary={`${task.taskName}`} />
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}
