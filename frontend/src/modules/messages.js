import { normalize } from 'normalizr';
import { createSelector } from 'reselect'; 
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import messageSchema from '../schemas/message';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';               
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';               
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';  

export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';               
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';               
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';  

export const CLEAN_MESSAGES = 'CLEAN_MESSAGES'; 

const initialState = {
  items: [],
}

export default function reducer(state = initialState, action) {   
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS: {
      const { entities } = action.payload;

      if (entities && entities.messages) {                 
        return {
          ...state,
          items: entities.messages,
        };
      }
      return state;
    }
    case CREATE_MESSAGE_SUCCESS:
      const { payload } = action;

      const newMessage = {
        ...state.items,
        [payload._id]: payload,
      };

      return {
        ...state,
        items: newMessage,
      };
    case CLEAN_MESSAGES:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}

export function fetchMessages(socket) {
	return (dispatch) => {
    dispatch(messageResponse(FETCH_MESSAGES_REQUEST)); 
    socket.on('loadCategoryData', (data) => {
      const normalizedData = normalize(data.messages, [messageSchema]);
      dispatch(messageResponse(FETCH_MESSAGES_SUCCESS, normalizedData));
    });
    socket.on('updateMessages', (message) => {
      dispatch(messageResponse(CREATE_MESSAGE_SUCCESS, message));
    });
	}	
}

export function sendMessage(socket, id, message) {
  return () => {
    socket.emit('sendMessage', { id, message });
  }
}

export function cleanMessages(socket, id, message) {
  return (dispatch) => {
    dispatch(messageResponse(CLEAN_MESSAGES));
  }
}

function messageResponse(type, payload = {}, meta = {}) {
  return {
    type,
    payload,
    meta
  }
}

// SELECTORS

const fetchMessagesSelector = state => {                                    
  return Object.keys(state.messages.items).map(id => {  
    const message = state.messages.items[id];             
    return message;                                        
  });                                                                    
}; 

export const getMessagesCount = createSelector(
  [fetchMessagesSelector],
  (messages) => {
    return messages.length
  }
);

export const groupMessagesByDate = createSelector(
  [fetchMessagesSelector],                          
  (messages) => {
    const list = messages.map((message) => {
      message.day = moment(message.createdAt).format('MMMM Do');
      return message;
    });

    const groupedMessages = groupBy(list, 'day');
    const dayGroups = [];

    mapKeys(groupedMessages, (value, key) => {
      dayGroups.push({ date: key, messages: value });
    });

    return dayGroups;
  },
);