const router = require('express').Router();

const { authorize } = require('../middlewares/auth');

const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user');

router.post('/', authorize(['user']), createUser);

router.get('/', authorize(['admin', 'user']), getUsers);

router.get('/:id', authorize(['admin','user']), getUser);

router.put('/:id', authorize(['admin', 'user']), updateUser);

router.delete('/:id', authorize(['admin', 'user']), deleteUser);

module.exports = router;