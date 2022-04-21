import {useState, useEffect} from 'react';

export function useDebounce(args, delay = 2000) {
    const [value, setValue] = useState(args);

    useEffect(() => {
        const timeout = setTimeout(() => setValue(args), delay);
        return () => clearTimeout(timeout);
    }, [args, delay]);

    return value;
}