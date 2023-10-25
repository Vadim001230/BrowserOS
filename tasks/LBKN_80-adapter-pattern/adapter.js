class OldApi {
  request() {
    return [
      {
        id: 1,
        userName: 'Александр',
        email: 'sanya@sanya.com',
      },
      {
        ID: 2,
        userName: 'Петр',
        email: 'petya@petya.com',
      },
    ]
  }
}

class NewApi {
  newRequest() {
    return [
      {
        ID: 1,
        user_name: 'Александр',
        email_address: 'sanya@sanya.com',
      },
      {
        ID: 2,
        user_name: 'Петр',
        email_address: 'petya@petya.com',
      },
    ]
  }
}

class ApiAdapter extends OldApi {
  constructor(api) {
    super();
    this.api = api;
  }

  request() {
    const response = this.api.newRequest();
    return response.map((el) => ({
      id: el.ID,
      userName: el.user_name,
      email: el.email_address,
    }))
  }
}

const apiAdapter = new ApiAdapter(new NewApi);
console.log(apiAdapter.request());
