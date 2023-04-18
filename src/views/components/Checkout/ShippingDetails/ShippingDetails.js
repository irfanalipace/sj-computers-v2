import { useFormValidation } from "@hooks/useFormValidation";

export default function ShippingDetails() {
    const { values, handleChange, handleSubmit, errors } = useFormValidation(
        {
            state: "",
            name: "",
            phoneNumber: "",
            streetAddress: "",
            floorAddress: "",
            city: "",
            state: "",
            zipCode: "",
            saveAddress: false,
        },
        {
            fieldLengths: {
                state: { min: 3, max: 50 },
                name: { min: 3, max: 100 },
            },
        }
    );

    return <div>ShippingDetails</div>;
}
