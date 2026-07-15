import { forwardRef, useImperativeHandle, useState } from 'react';

export interface ItemCounterHandle {
    increaseCount: () => void;
    decreaseCount: () => void;
}

interface ItemCounterProps {
    initialCount: number;
}

export const ItemCounter = forwardRef<ItemCounterHandle, ItemCounterProps>((props, ref) => {
    const [count, setCount] = useState( props.initialCount );
    const color = count === 0 ? 'black' : count > 0 ? 'green' : 'red';

    const increaseCount = (): void => {
        setCount((currentValue) => {
            return currentValue + 1
        });
    }

    const decreaseCount = (): void => {
        setCount((currentValue) => {
            return currentValue - 1
        });
    }

    useImperativeHandle(ref, () => ({
        increaseCount,
        decreaseCount
    }));

    return (
        <div
            style={{
                textAlign: 'center',
                marginBottom: '2%',
                fontWeight: '600',
                fontSize: '1.5rem',
                color: color,
            }}
        >
            <h1>ItemCounter</h1>

            { count }

        </div>
    )
})
