const Subsciber = require('../database/models/Subscribers');
exports.getAllSubscribers = async(req, res, ) => {}
exports.getSubscriber = async(req, res, ) => {
    try {
        const { id } = req.params;
        const subscriber = await Subsciber.findById(id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found', sucess: false, statusCode: 404 });
        }
        return res.status(200).json({ subscriber, sucess: true, statusCode: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
exports.createSubscriber = async(req, res, ) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required', sucess: false, statusCode: 400 });
        }
        const subscriber = await Subsciber.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ message: 'Subscriber already exists', sucess: false, statusCode: 400 });
        }
        const createdSubscriber = await Subsciber.create({ email });
        return res.status(201).json({ subscriber: createdSubscriber, sucess: true, statusCode: 201 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })
    }
}
exports.updateSubscriber = async(req, res, ) => {}
exports.deleteSubscriber = async(req, res, ) => {}