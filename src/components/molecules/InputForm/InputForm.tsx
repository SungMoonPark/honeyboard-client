import { Button, ErrorMessage, Input, Label } from '@/components/atoms';

interface InputFormProps {
    id: string;
    label: string;
    showLabel?: boolean;
    placeholder?: string;
    type?: 'text' | 'email' | 'number' | 'password';
    value?: string;
    readonly?: boolean;
    buttonName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    errorMessage?: string;
}

const InputForm = ({
    id,
    label,
    showLabel = true,
    placeholder,
    type,
    value,
    readonly,
    buttonName,
    onChange,
    onClick,
    errorMessage,
}: InputFormProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                {showLabel && <Label text={label} htmlFor={id} />}
                <ErrorMessage>{errorMessage}</ErrorMessage>
            </div>
            <div className="flex items-center gap-2">
                <Input
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    readonly={readonly}
                    aria-label={!showLabel && label}
                    onChange={onChange}
                />
                {buttonName && onClick && (
                    <Button onClick={onClick}>{buttonName}</Button>
                )}
            </div>
        </div>
    );
};

export default InputForm;
