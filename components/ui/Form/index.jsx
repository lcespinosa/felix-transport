import Button from "../Button";

export default function Form({onSubmit, ...props}) {
  return <form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
    <>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        {props.children}
      </div>


      <div className="pt-5">
        <div className="flex justify-end gap-x-2">
          <Button variant="white" label="Cancel"/>
          <Button type="submit" label="Save"/>
        </div>
      </div>
    </>
  </form>
}
