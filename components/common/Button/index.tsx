interface IProps {
  text: string;
}

function Button({ text }: IProps) {
  return (
    <button type="button" aria-label="Save">
      <span>{text}</span>
    </button>
  );
}

export default Button;
