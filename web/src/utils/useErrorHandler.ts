import { useState } from 'react';
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import ValidationException from "../../../core/src/exceptions/validationException.ts";
import CustomException from "../../../core/src/exceptions/customException.ts";
import {useTranslation} from "react-i18next";

function useErrorHandler() {
    const [errors, setErrors] = useState<{[key: string]: string[]}>({});
    const {t} = useTranslation('errors');

    function handleError(err: Error) {
        if (err instanceof AxiosError && err.status === 422) {
            setErrors(err.response?.data.errors ?? {});
        }
        else if (err instanceof AxiosError && err.status === 403) {
            toast.error(err.response?.data.message);
        }
        else if (err instanceof ValidationException) {
            setErrors((errors) => {
                const copy = {...errors}
                copy[err.category] = [t(err.constructor.name)];

                return copy;
            })
        }
        else if (err instanceof CustomException) {
            toast.error(t(err.constructor.name));
        }
    }

    function clearErrors() {
        setErrors({});
    }

    return { errors, handleError, clearErrors };
}

export default useErrorHandler