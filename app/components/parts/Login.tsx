import { Button } from "@mui/material";

type Props = {
  handleLoginClick: () => void;
};

const Login: React.VFC<Props> = ({ handleLoginClick }) => {
  return (
    <>
      <Button onClick={handleLoginClick} variant="outlined">
        ログイン
      </Button>
    </>
  );
};

export default Login;
