const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { phone, email, password, name, role } = req.body;

    if (!password || !name || !role) {
      return res.status(400).json({ message: '请填写必填字段' });
    }

    if (!['tenant', 'landlord'].includes(role)) {
      return res.status(400).json({ message: '角色无效' });
    }

    if (!phone && !email) {
      return res.status(400).json({ message: '手机号和邮箱至少填一个' });
    }

    // Check duplicate account
    let existingUser = null;
    if (phone) {
      existingUser = await User.findOne({ phone });
    }
    if (!existingUser && email) {
      existingUser = await User.findOne({ email });
    }
    if (existingUser) {
      return res.status(400).json({ message: '该账号已被注册' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      phone: phone || undefined,
      email: email || undefined,
      passwordHash