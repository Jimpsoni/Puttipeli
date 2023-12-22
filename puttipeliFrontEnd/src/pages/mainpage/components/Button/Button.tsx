import './buttonstyles.css'

interface ButtonProps {
  header: string
  action: () => null   
}


const Button = (props: ButtonProps) => {
    return <div onClick={() => props.action}>{props.header}</div>
}

export default Button