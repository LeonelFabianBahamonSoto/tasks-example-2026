import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

const Home = lazy(() => import('./component/home/Home'));
const TaskMain = lazy(() => import('./component/task/taskMain/TaskMain'));
const ItemCounterFather = lazy(() => import('./component/counter/ItemCounterFather'));
const FormWithHook = lazy(() => import('./component/form-with-hook/FormWithHook'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home"    element={<Home />} />
          <Route path="/task"    element={<TaskMain />} />
          <Route path="/counter" element={<ItemCounterFather />} />
          <Route path="/useForm" element={<FormWithHook />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
