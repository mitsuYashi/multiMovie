import { Button } from "@mui/material";
import { loginAuth } from "./firebase";
import axios from "axios";

const Login: React.VFC = () => {
  const handleClick = () => {
    loginAuth().then((res) => {
      try {
        axios
          .post(
            `${process.env.originAPI}/registration`,
            {
              registration: {
                name: res.displayName,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${res.accessToken}`,
              },
            }
          )
          .then((res) => res.data);
      } catch (err) {
        console.log(err);
      }
      console.log(res);
    });
  };
  return (
    <>
      <Button onClick={handleClick} variant="outlined">
        ログイン
      </Button>
    </>
  );
};

export default Login;
