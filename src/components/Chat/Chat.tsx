import './Chat.scss';
import { useState, useMemo, useContext } from 'react';
import user from '../../images/user.png';
import users from '../../data/users.json';
import { UserLink } from '../UserLink';
import { debounceQuery } from '../../helpers/debounceQuery';
import { normalizeString } from '../../helpers/normalizeString';
import { MessagesContext } from '../../hooks/MessagesProvider';
import { LoggedUser } from '../../types/LoggedUser';

type Props = {
  loggedUser: LoggedUser,
  onLogout: (user: LoggedUser | null) => void,
}

export const Chat: React.FC<Props> = ({ loggedUser, onLogout }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { messages } = useContext(MessagesContext);

  const setDebouncedQuery = debounceQuery(setSearchQuery, 300);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
    setDebouncedQuery(value.trim());
  };

  const filteredUsers = useMemo(() => {
    return users.results.filter(user => {
      const query = normalizeString(searchQuery);
      const values = [
        normalizeString(user.name.first),
        normalizeString(user.name.last),
      ];

      return values.some(value => value.includes(query));
    });
  }, [searchQuery]);

  const sortedUsers = useMemo(() => {
    return filteredUsers.sort((a, b) => {
      const timeA = messages
        .filter(message => message.chatId === a.login.username)
        .pop()?.time || 0;

      const timeB = messages
        .filter(message => message.chatId === b.login.username)
        .pop()?.time || 0;

      switch (true) {
        case timeA > timeB:
          return -1;

        case timeA < timeB:
          return 1;
      
        default:
          return 0;
      }
    });
  }, [filteredUsers, messages]);

  return (
    <div className="Chat">
      <div className="Chat__header">
        <div className="Chat__header-top">
          <div className="Chat__user-image">
            <img src={user} alt="user" />
          </div>

          <div className="Chat__user-name">
            {`${loggedUser.given_name} ${loggedUser.family_name}`}
          </div>

          <button
            type="button"
            className="Chat__logout"
            onClick={() => onLogout(null)}
          >
            Log Out
          </button>
        </div>

        <input
          type="text"
          value={inputValue}
          className='Chat__search'
          placeholder='Search or start new chat'
          onChange={handleQueryChange}
        />
      </div>

      <div className="Chat__users">
        <h2>
          Chats
        </h2>

        {sortedUsers.length
          ? (
            <ul>
              {sortedUsers.map(user => (
                <li key={user.login.uuid}>
                  <UserLink user={user} />
                </li>
              ))}
            </ul>
          )
          : (
            <p className="Chat__users-not-found">
              No users found
            </p>
          )}
      </div>
    </div>
  );
};
