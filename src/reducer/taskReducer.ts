import { Task } from "../interfaces/Task.interface";

export interface TaskState {
    tasks: Task[];
}

export type TaskAction =
    { type: "addTask", payload: Task } |
    { type: "deleteTask", payload: number } |
    { type: "changeStatusTask", payload: { id: number, isComplete: boolean } };

export const initialState: TaskState = {
    tasks: [],
};

export const taskReducer = ( state: TaskState, action: TaskAction ) => {
    switch ( action.type ) {
        case "addTask":
            return {
                ...state,
                tasks: [ ...state.tasks, action.payload ]
            };

        case "deleteTask":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            };

        case "changeStatusTask":
            return {
                ...state,
                tasks: state.tasks.map((task) => task.id === action.payload.id
                    ? { ...task, isComplete: action.payload.isComplete }
                    : task
                )
            };

        default: return state;
    }
}