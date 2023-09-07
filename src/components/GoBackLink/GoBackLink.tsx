import './GoBackLink.scss';
import { Link, LinkProps } from 'react-router-dom';

type Props = LinkProps;

export const GoBackLink: React.FC<Props> = ({ ...props }) => {

  return (
    <Link
      {...props}
      className="GoBackLink"
    >
      Back
    </Link>
  );
};
