import Button from '@mui/material/Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from "./Home.module.css";

interface HomeButton {
    id: number;
    buttonName: string;
    navigateRoute: string;
}

const Home = () => {
    const navigate = useNavigate();

    const homeButtons: HomeButton[] = [
        { id: 1, buttonName: "Tasks",   navigateRoute: "/task" },
        { id: 2, buttonName: "Counter", navigateRoute: "/counter" },
        { id: 3, buttonName: "UseForm", navigateRoute: "/useForm" },
    ];

    const [currentOption, setOption] = useState<null | number>(null);

    const changeOption = (homeOption: HomeButton): void => {
        setOption(homeOption.id);
        navigate(`${homeOption.navigateRoute}`);
    }

    return (
        <div className={`w-screen h-screen ${style.content}`}>
            <h1>Home</h1>

            <div className={style.buttonsContent}>
                {
                    homeButtons.map((btn) => (
                        <Button
                            onClick={() => changeOption( btn )}
                            variant="contained"
                        >
                            { btn.buttonName }
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;