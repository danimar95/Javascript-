
const axios = require('axios');
const Letter = require('./Letter');

jest.mock('axios');

const user1 = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
};

const user2 = {
  id: 2,
  name: "Ervin Howell",
  username: "Antonette",
  email: "Shanna@melissa.tv",
  address: {
    street: "Victor Plains",
    suite: "Suite 879",
    city: "Wisokyburgh",
    zipcode: "90566-7771",
    geo: {
      lat: "-43.9509",
      lng: "-34.4618"
    }
  },
  phone: "010-692-6593 x09125",
  website: "anastasia.net",
  company: {
    name: "Deckow-Crist",
    catchPhrase: "Proactive didactic contingency",
    bs: "synergize scalable supply-chains"
  }
};

const post1 = {
  userId: 1,
  id: 1,
  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

const post2 = {
  userId: 1,
  id: 2,
  title: "qui est esse",
  body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}

const users = [user1, user2]
const posts = [post1, post2];

describe('Letter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // FIRST TEST
  test.concurrent.each(Array(1000).fill(0))('should bring data', async () => {
    const letter = new Letter();

    axios.get.mockResolvedValueOnce({ data: users }).mockResolvedValueOnce({ data: posts});
    const results = await letter.get();
    expect(results[0].id).toBe(user1.id);
    expect(results[0].name).toBe(user1.name);
    expect(results[0].username).toBe(user1.username)
    expect(results[0].email).toBe(user1.email)
    expect(results[0].address).toBe(`${user1.address.street}, ${user1.address.suite} - ${user1.address.zipcode} ${user1.address.city}`);
    expect(results[0].phone).toBe(user1.phone)
    expect(results[0].website).toBe(user1.website),
    expect(results[0].company).toBe(user1.company.name)
    expect(results[0].posts.length).toBe(posts.length);
    expect(results[0].posts[0].userId).toBeUndefined;
    expect(results[0].posts[0].id).toBe(post1.id);
    expect(results[0].posts[0].title).toBe(post1.title);
    expect(results[0].posts[0].body).toBe(post1.body);
    expect(results[0].posts[1].userId).toBeUndefined;
    expect(results[0].posts[1].id).toBe(post2.id);
    expect(results[0].posts[1].title).toBe(post2.title);
    expect(results[0].posts[1].body).toBe(post2.body);

    expect(results[1].id).toBe(user2.id);
    expect(results[1].name).toBe(user2.name);
    expect(results[1].username).toBe(user2.username)
    expect(results[1].email).toBe(user2.email)
    expect(results[1].address).toBe(`${user2.address.street}, ${user2.address.suite} - ${user2.address.zipcode} ${user2.address.city}`);
    expect(results[1].phone).toBe(user2.phone)
    expect(results[1].website).toBe(user2.website),
    expect(results[1].company).toBe(user2.company.name)
    expect(results[1].posts[0]).toBeUndefined;
  });

  // SECOND TEST
  test.concurrent.each(Array(1000).fill(0))('should throw error if the source does not exist', async() => {
    const letter = new Letter();

    axios.get.mockImplementation(() => {
      return Promise.reject({ code: 'ERR_BAD_REQUEST' })
    });

    await letter.get().catch(e => expect(e.message).toBe('Data could not be found'));
  })

  // THIRD TEST
  test.concurrent.each(Array(1000).fill(0))('should throw authenticationw error', async() => {
    const letter = new Letter();

    axios.get.mockImplementation(() => {
      return Promise.reject({ code: !'ERR_BAD_REQUEST' })
    });

    await letter.get().catch(e => expect(e.message).toBe('Missing authentication token'));
  })
});