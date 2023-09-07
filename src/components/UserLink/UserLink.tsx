import { useContext, useMemo } from 'react';
import { Link } from "react-router-dom";
import './UserLink.scss';
import { User } from "../../types/User";
import { getFormattedDate } from "../../helpers/getFormattedDate";
import { MessagesContext } from '../../hooks/MessagesProvider';

type Props = {
  user: User,
};

export const UserLink: React.FC<Props> = ({ user }) => {
  const {
    name,
    picture,
    registered,
    login
  } = user;
  const { messages } = useContext(MessagesContext);

  const lastMessage = useMemo(() => {
    return messages
      .filter(message => message.chatId === user.login.username)
      .pop();
  }, [user, messages]);

  const date = getFormattedDate(registered.date);

  return (
    <Link to={login.username} className="UserLink">
      <div className="UserLink__image">
        <img src={picture.thumbnail} alt="user" />
      </div>

      <div className="UserLink__body">
        <div className="UserLink__text">
          <p className="UserLink__text-name">
            {`${name.first} ${name.last}`}
          </p>

          <p className="UserLink__text-message">
            {lastMessage?.type === 'user'
              ? `Me: ${lastMessage?.text}`
              : lastMessage?.text}
          </p>
        </div>

        <div className="UserLink__date">
          <p>
            {date}
          </p>
        </div>
      </div>
    </Link>
  );
};
