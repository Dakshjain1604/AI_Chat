import { Input } from "@/components/ui/input"

interface Labelprops{
    Label:string,
    inputType:string,
    placeholder:string,

}
export function FormInputAuth(props:Labelprops) {
  return (
    <div className="text-white w-60">
      <div className="text-md">{props.Label}</div>
      <Input type={props.inputType}  placeholder={props.placeholder} />
    </div>
  )
}
