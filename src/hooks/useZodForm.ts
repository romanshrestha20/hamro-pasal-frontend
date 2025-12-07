import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";


export function useZodForm<T extends ZodType<any>>(
    schema: T,
) {
    return useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });
}