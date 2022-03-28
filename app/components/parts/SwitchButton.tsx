import { FormControlLabel, FormGroup, Switch } from "@mui/material";

type Props = {
  label: string;
};

const SwitchButton: React.FC<Props> = ({ label }) => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label={label}
    ></FormControlLabel>
  );
};

export default SwitchButton;
