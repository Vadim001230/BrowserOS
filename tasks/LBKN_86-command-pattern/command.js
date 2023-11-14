const API_URL = 'https://jsonplaceholder.typicode.com';

const addToDoAction = (todo) => {
  return {
    type: 'ADD_TODO',
    payload: todo,
  };
};

const getToDoAction = (todo) => {
  return {
    type: 'GET_TODO',
    payload: todo,
  };
};

const updateToDoAction = (todo) => {
  return {
    type: 'UPDATE_TODO',
    payload: todo,
  };
}

const deleteToDoAction = (id) => {
  return {
    type: 'DELETE_TODO',
    payload: id,
  };
}

function handleCommand(command) {
  switch (command.type) {
    case 'ADD_TODO':
      fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command.payload),
      })
        .then((response) => response.json())
        .then((data) =>
          console.log(`Добавлена задача: ${JSON.stringify(data)}`)
        )
        .catch((error) => console.error('Ошибка:', error));
      break;

    case 'GET_TODO':
      fetch(`${API_URL}/todos/${command.payload}`)
        .then((response) => response.json())
        .then((data) => console.log(`Получена задача: ${JSON.stringify(data)}`))
        .catch((error) => console.error('Ошибка:', error));
      break;

    case 'UPDATE_TODO':
      fetch(`${API_URL}/todos/${command.payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command.payload.todo),
      })
        .then((response) => response.json())
        .then((data) =>
          console.log(`Обновлена задача: ${JSON.stringify(data)}`)
        )
        .catch((error) => console.error('Ошибка:', error));
      break;

    case 'DELETE_TODO':
      fetch(`${API_URL}/todos/${command.payload}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Задача с ID ${command.payload} удалена`);
          } else {
            console.error('Ошибка:', response.status);
          }
        })
        .catch((error) => console.error('Ошибка:', error));
      break;

    default:
      console.error('Неизвестная команда:', command.type);
  }
}

const addCommand = addToDoAction({ userId: 3, title: 'Новая задача', completed: false });
handleCommand(addCommand);

const getCommand = getToDoAction(1);
handleCommand(getCommand);

const updateCommand = updateToDoAction({
  id: 1,
  todo: { title: 'Обновленная задача', completed: true },
});

handleCommand(updateCommand);

const deleteCommand = deleteToDoAction(1);
handleCommand(deleteCommand);
