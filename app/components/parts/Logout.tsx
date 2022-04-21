import { Button } from "@mui/material";

type Props = {
  handleLogoutClick: () => Promise<void>;
};

const Logout: React.FC<Props> = ({ handleLogoutClick }) => {
  return (
    <Button variant="outlined" onClick={handleLogoutClick}>
      ログアウト
    </Button>
  );
};

export default Logout;
