const usersService = require('./usersService');

exports.register = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).json({ message: 'All inputs are required' });
    }

    const existingUser = await usersService.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exist. Please Login' });
    }

    const registerResult = await usersService.register(firstName, lastName, email, password);

    res.status(201).json({ data: registerResult });
  }
  catch (e) {
    return res.status(500).json({ message: 'An error occured' });
  }
}

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send('All input is required');
    }

    const user = await usersService.login(email, password);
    if (user) {
      res.status(200).json({ data: user });
    }
    else {
      res.status(400).json({ message: 'Login Failed' });
    }

  }
  catch (e) {
    return res.status(500).json({ message: 'An error occured' });
  }
}