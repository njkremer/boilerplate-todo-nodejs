const usersService = require('./usersService');

exports.register = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      return res.status(400).json({ message: 'All inputs are required' });
    }

    const existingUser = await usersService.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exist. Please Login' });
    }

    const registerResult = await usersService.register(firstName, lastName, email, password);

    return res.status(201).json({ data: registerResult });
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'An error occured' });
  }
}

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }

    const user = await usersService.login(email, password);
    if (user) {
      return res.status(200).json({ data: user });
    }
    else {
      return res.status(401).json({ message: 'Login Failed' });
    }

  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'An error occured' });
  }
}