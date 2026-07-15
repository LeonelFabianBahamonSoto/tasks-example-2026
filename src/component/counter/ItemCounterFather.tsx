import { useRef } from "react";
import { ItemCounter, ItemCounterHandle } from "./ItemCounter"

import styles from "./ItemCounterFather.module.css";


export const ItemCounterFather = () => {
    const counterRef = useRef<ItemCounterHandle>(null);

    return (
        <div className={styles.counterContent}>

            <ItemCounter
                ref={counterRef}
                initialCount={7}
            />

            <div className={styles.buttonContent}>
                <button
                    onClick={() => counterRef.current?.decreaseCount()}
                >
                    Decrementar
                </button>

                <button
                    onClick={() => counterRef.current?.increaseCount()}
                >
                    Incrementar
                </button>
            </div>
        </div>
    )
}