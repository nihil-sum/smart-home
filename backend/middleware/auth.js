const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Verify login status
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: '请先登录' });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }
    if (user.status === 'disabled') {
      return res.status(403).json({ message: '账号已被禁用' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: '登录已过期，请重新登录' });
  }
};

// Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '无权限执行此操作' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
