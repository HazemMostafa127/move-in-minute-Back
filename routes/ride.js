const router = require('express').Router();

const { authorize } = require('../middlewares/auth');

const { createRide, getRides, getRide, updateRide, deleteRide, bookRide, searchRides, cancelRide } = require('../controllers/ride');

router.post('/', authorize(['admin']), createRide);

router.get('/', authorize(['admin', 'user']), getRides);

router.get('/search', authorize(['admin', 'user']), searchRides);

router.get('/:id', authorize(['admin', 'user']), getRide);

router.put('/:id', authorize(['admin']), updateRide);

router.delete('/:id', authorize(['admin']), deleteRide);

router.post('/:id/book', authorize(['user']), bookRide);

router.post('/:id/cancel', authorize(['user']), cancelRide);

module.exports = router;