import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { LoggedUser } from "../../types/LoggedUser";

const CLIENT_ID = process.env.REACT_APP_CLIENT as string;

type Props = {
  onSetUser: (user: LoggedUser | null) => void;
}

export const GoogleLoginProvider: React.FC<Props> = ({ onSetUser }) => {
  const handleCredentialsResponse = (response: any) => {
    const {
      family_name,
      given_name,
    } = jwt_decode<LoggedUser>(response.credential);

    onSetUser({
      family_name,
      given_name,
    });
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleCredentialsResponse}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};
