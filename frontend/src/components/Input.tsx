interface InputProps {
    placeholder: string;
    reference?: any
}

export function Input({reference, placeholder}: InputProps){
    return(
        <input type="text" placeholder={placeholder} ref={reference} className="border border-slate-300 rounded-md p-2" />
    )
}