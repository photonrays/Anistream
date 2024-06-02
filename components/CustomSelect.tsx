import { Select, SelectItem } from "@nextui-org/select";

interface selectType {
    label: string;
    types: {
        label: string;
        value: string;
    }[]
    type: string,
    value?: string,
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>, key: string) => void
};

export default function CustomSelect({ label, types, type, value, handleSelectionChange }: selectType) {
    return (
        <Select
            size='sm'
            label={label}
            className="max-w-xs"
            classNames={{ listboxWrapper: 'text-foreground' }}
            selectedKeys={value ? [value] : []}
            onChange={e => handleSelectionChange(e, type)}
        >
            {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                    {type.label}
                </SelectItem>
            ))}
        </Select>
    )
}
