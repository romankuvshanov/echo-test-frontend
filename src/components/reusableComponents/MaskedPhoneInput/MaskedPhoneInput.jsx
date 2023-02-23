import MaskedInput from "react-text-mask";

export default function MaskedPhoneInput({
  id,
  name,
  required,
  autoFocus,
  value,
  onChange,
}) {
  return (
    <MaskedInput
      id={id}
      name={name}
      required={required}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      type={"tel"}
      showMask={true}
      onFocus={(e) =>
        e.target.setSelectionRange(
          e.target.value.indexOf("_"),
          e.target.value.indexOf("_")
        )
      }
      onClick={(e) =>
        e.target.setSelectionRange(
          e.target.value.indexOf("_"),
          e.target.value.indexOf("_")
        )
      }
      mask={[
        "+",
        "7",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      pattern={"[+][7][(]\\d{3}[)]\\s\\d{3}[-]\\d{4}"}
      title={"Enter the phone in the following format: +7(xxx) xxx-xxxx"}
    ></MaskedInput>
  );
}
