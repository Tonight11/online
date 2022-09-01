import * as yup from 'yup';
import {useField, useForm} from "vee-validate";

export function useCreateForm(fn){
    const {handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField('fio',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите ФИО')
    )
    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField('phone',
        yup
            .string()
            .required('Пожалуйста введите номер')
    )
    const {value: sum, errorMessage: sError, handleBlur: sBlur} = useField('sum',
        yup
            .number()
            .typeError('Пожалуйста используйте цифровое значение')
            .required('Пожалуйста введите сумму')
            .min(0, 'Значение должно быть выше 0')
    )
    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        status,
        fio, fError, fBlur,
        sum, sError, sBlur,
        phone, pError, pBlur,
        onSubmit, isSubmitting
    }
}