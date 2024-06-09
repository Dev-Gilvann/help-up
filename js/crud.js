// Utils
const localUsers = () => {
  const users = localStorage.getItem("users");

  if (!users) {
    localStorage.setItem("users", JSON.stringify([]));
    return [];
  }

  return JSON.parse(users);
};

// Authentication
const auth = (email, passw) => {
  const { status, user } = getUserByEmail(email);      

  if (status === 404 || user.password !== passw) 
    return { status: 403, message: 'As credencias estão incorretas!' }
  localStorage.setItem('logged', 'true')
  localStorage.setItem('loggedUser', JSON.stringify(user))
  return { status: 200, user }
}

/* ==========================================
 *  CRUD Users
 * ===========================================
 */

// Create
const setUser = (data) => {
  const users = localUsers();
  const { name, email, telefone, password } = data;

  if (!name || !email || !telefone || !password)
    return { status: 400, message: "Há campos inválidos." };

  if (getUserByEmail(email).status === 200)
    return { status: 400, message: "Este e-mail já está cadastrado." };

  const newData = { name, email, telefone, password };
  localStorage.setItem("users", JSON.stringify([...users, newData]));

  return { status: 201, user: newData };
};

// Read
const getUserByEmail = (email) => {
  const dbUsers = localUsers();
  const user = dbUsers.find((u) => u.email === email);

  if (user) return { status: 200, user };
  return { status: 404, user: null };
};

// Update
// Delete
