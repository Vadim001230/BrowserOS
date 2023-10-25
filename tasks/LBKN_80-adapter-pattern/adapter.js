function api() {
  return [
    {
      id: 1,
      user_name: 'Александр',
      email_address: 'sanya@sanya.com',
      user_role_admin: true,
    },
    {
      id: 2,
      user_name: 'Петр',
      email_address: 'petya@petya.com',
      user_role_admin: false,
    },
  ]
}

function ApiAdapter(response) {
  const transformResponse = response.map((item) => {
    const transformedItem = {};
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const words = key.split('_');
        const camelCaseKey = words[0] +
          words
            .slice(1)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join('');
        transformedItem[camelCaseKey] = item[key];
      }
    }
    return transformedItem;
  });

  return transformResponse;
}

const response = api();
console.log(ApiAdapter(response));
