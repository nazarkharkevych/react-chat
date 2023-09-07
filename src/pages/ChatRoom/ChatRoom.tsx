import './ChatRoom.scss';
import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import uniqid from 'uniqid';
import users from '../../data/users.json';
import { useParams } from 'react-router-dom';
import { getUser } from '../../helpers/getUser';
import send from '../../images/send.png';
import { Message } from '../../components/Message';
import { wait } from '../../helpers/wait';
import { GoBackLink } from '../../components/GoBackLink';
import { User } from '../../types/User';
import { MessagesContext } from '../../hooks/MessagesProvider';

export const ChatRoom = () => {
  const { chatId = '' } = useParams();
  const [inputValue, setInputValue] = useState('');
  const { messages, setMessages } = useContext(MessagesContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = useMemo(() => {
    return getUser(users.results, chatId);
  }, [chatId]) as User;

  const chatMessages = useMemo(() => {
    return messages.filter(message => message.chatId === chatId);
  }, [messages, chatId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    setMessages((allMessages) => [
      ...allMessages,
      {
        id: uniqid(),
        chatId: user.login.username,
        text: inputValue,
        type: 'user',
        time: Date.now(),
      },
    ]);

    setInputValue('');

    try {
      await wait(5000);

      const response = await fetch('https://api.chucknorris.io/jokes/random');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setMessages((allMessages) => [
        ...allMessages,
        {
          id: uniqid(),
          chatId: user.login.username,
          text: data.value,
          type: 'response',
          time: Date.now(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatId]);

  return (
    <div className="ChatRoom">
      {user
        ? (
          <>
            <div className="ChatRoom__top">
              <div className="ChatRoom__top-go-back">
                <GoBackLink to="/" />
              </div>

              <div className="ChatRoom__top-user-image">
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </div>

              <h2 className="ChatRoom__top-user-name">
                {user.name.first}
              </h2>
            </div>

            <div className="ChatRoom__messages">
              <ul>
                {chatMessages.map(message => (
                  <li key={message.id}>
                    <Message message={message} user={user} />
                  </li>
                ))}
              </ul>

              <div
                ref={messagesEndRef}
                data-info="messagesEnd"
              />
            </div>

            <div className="ChatRoom__send-form">
              <form onSubmit={handleFormSubmit}>
                <input
                  name="message"
                  type="text"
                  value={inputValue}
                  className="ChatRoom__send-form-input"
                  placeholder="Type your message"
                  onChange={handleInputChange}
                />

                <button
                  className="ChatRoom__send-form-button"
                  type="submit"
                >
                  <img src={send} alt="send" />
                </button>
              </form>
            </div>
          </>
        )
      : (
        <h3 className="ChatRoom__not-found">
          User with this username was not found
        </h3>
      )}
    </div>
  );
};
