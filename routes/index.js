var express = require('express');
var router = express.Router();

var Activity = require('../models/activity');
var Cart = require('../models/cart');
var Order = require('../models/order');

router.get('/', function(req, res, next) {
    var successMgs = req.flash('success')[0];
    Activity.find({}).lean().exec(function(error, docs){ //database comes with the name docs
        var ActivityChunks = [];
        var chunkSize = 3;//in 1 row 3 items
        for (var i = 0; i < docs.length; i += chunkSize) {
          ActivityChunks.push(docs.slice(i, i  + chunkSize));
        }
        res.render('fest/index', { title: 'Fest Website', activities: ActivityChunks, successMgs: successMgs, noMessage: !successMgs });      
    });
}); 
router.get('/add-to-cart/:id', function (req, res) {
    var ActivityId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Activity.findById(ActivityId, function (err, Activity) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(Activity, Activity.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
});

router.get('/reduce/:id', function (req, res, next) {
    var ActivityId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(ActivityId);
    req.session.cart = cart;
    res.redirect('/fest-cart');
});

router.get('/remove/:id', function (req, res, next) {
    var ActivityId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(ActivityId);
    req.session.cart = cart;
    res.redirect('/fest-cart');
});

router.get('/fest-cart', function (req, res, next) {
    if(!req.session.cart) {
        return res.render('fest/fest-cart', {activities: null});
    }
    var cart = new Cart(req.session.cart);
    return res.render('fest/fest-cart', {activities: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/fest-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    return res.render('fest/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if(!req.session.cart) {
        return res.redirect('/fest-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_pVJhFSD0tie3QmfWqzusM6ib"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken,
        description: "Test Charge"
    }, function(err, charge) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought Activity!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}