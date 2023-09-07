import { getCurrentTime } from "../../helpers/getCurrentTime";
import { MessageType } from "../../types/MessageType";
import { User } from "../../types/User";
import './Message.scss';

type Props = {
  message: MessageType,
  user: User,
};

export const Message: React.FC<Props> = ({ message, user }) => {
  const time = getCurrentTime(message.time);

  return (
    <div className="Message" data-type={message.type}>
      <div className="Message__body">
        {message.type === 'response' && (
          <div className="Message__user-image">
            <img
              src={user.picture.thumbnail}
              alt={user.name.first}
            />
          </div>
        )}

        <p className="Message__text">
          {message.text}
        </p>
      </div>

      <p className="Message__time">
        {time}
      </p>
    </div>
  );
};
