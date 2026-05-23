const supabase = require('../config/supabaseClient');

const SUPERUSER_EMAIL = 'admin@giftoria.com';

function toSafeUser(user) {
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    isSuperuser: user.email === SUPERUSER_EMAIL,
  };
}

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
  
  try {
    // Check if email exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ 
        username, 
        email, 
        password, // Plain text for now to match old logic, though hashing is recommended
        image: '/assets/product-images/product-image2.jpg',
        phone: '' 
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: toSafeUser(newUser),
      token: `mock-jwt-token-${newUser.id}` // Still using mock JWT format for now to avoid breaking frontend completely
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: toSafeUser(user),
      token: `mock-jwt-token-${user.id}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  const userId = token.replace('mock-jwt-token-', '');
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({ user: toSafeUser(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));
  
  const { currentPassword, newPassword, username, email, phone, image } = req.body;

  try {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const updates = {};

    if (currentPassword && newPassword) {
      if (currentPassword !== user.password) {
        return res.status(400).json({ error: 'Incorrect current password' });
      }
      updates.password = newPassword;
    }

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (image) updates.image = image;

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({ message: 'Profile updated successfully', user: toSafeUser(updatedUser) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;

    const safeUsers = users.map(u => toSafeUser(u));
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = Number(req.params.id);
  
  try {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('email')
      .eq('id', userId)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.email === SUPERUSER_EMAIL) {
      return res.status(400).json({ error: 'Cannot delete the superuser account' });
    }

    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteError) throw deleteError;

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
