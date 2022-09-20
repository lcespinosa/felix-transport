import classNames from "classnames";

const Borders = {
  white: 'border-gray-300',
  primary: 'border-transparent',
}
const Colors = {
  white: 'text-gray-700',
  primary: 'text-white',
}
const Backgrounds = {
  white: 'bg-white',
  primary: 'bg-indigo-600',
}
const Hovers = {
  white: 'hover:bg-gray-50',
  primary: 'hover:bg-indigo-700',
}
const Focuses = {
  white: 'focus:ring-indigo-500',
  primary: 'focus:ring-indigo-500',
}
const Sizes = {
  tiny: 'px-2.5 py-1.5 text-xs font-medium',
  small: 'px-3 py-2 text-sm font-medium leading-4',
  medium: 'px-4 py-2 text-sm font-medium',
  large: 'px-4 py-2 text-base font-medium',
  big: 'px-6 py-3 text-base font-medium',
}

export default function Button({
                                 variant,
                                 size,
                                 label,
                                 type,
                               }) {

  const className = classNames("inline-flex items-center rounded border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2", {
    [Colors[variant]]: true,
    [Borders[variant]]: true,
    [Backgrounds[variant]]: true,
    [Hovers[variant]]: true,
    [Focuses[variant]]: true,
    [Sizes[size]]: true,
  })

  return (
    <button
      type={type}
      className={className}
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  label: 'Button',
  type: 'button',
}
