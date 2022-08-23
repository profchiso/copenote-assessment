const Subsciber = require('../database/models/subscribers');
exports.getAllSubscribers = async(req, res, ) => {
    try {
        let requestQueryObject = {...req.query }


        let excludedQueryFields = ['sort', 'page', 'pageSize', 'fields']; //fields to exclude from the query
        excludedQueryFields.forEach(
            (element) => delete requestQueryObject[element]
        ); //delete any key in the requestQueryObject containing an element in the  excludedQueryFields  array

        //advance query using gte,lte,gt,lt
        let queryToString = JSON.stringify(requestQueryObject);
        queryToString = queryToString.replace(
            /\b(gte|lte|gt|lt)\b/g,
            (match) => `$${match}`
        );

        let parsedQuery = JSON.parse(queryToString);

        let query = Subsciber.find(parsedQuery); // the .select excludes any spacified field before sending the document

        //sorting query result
        if (req.query.sort) {
            // to sort pass the sort param ie ?sort="field1,field2,..." //ascending
            // to sort pass the sort param ie ?sort="-field1,-field2,..." //descending
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }



        //field limiting
        //pass a parameter called field eg. ?fields=field1,field2,...
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v ');
        }

        //pagination
        //pass page and pageSize params  eg  ?page=1&pageSize=20
        const page = req.query.page * 1 || 1;
        const pageSize = req.query.pageSize * 1 || 50;
        const skip = (page - 1) * pageSize;
        query = query.skip(skip).limit(pageSize);

        //handle a case where user specify page that does not exists
        if (req.query.page) {
            let numberOfDocument = await Subsciber.countDocuments();
            if (skip >= numberOfDocument) {
                return res.status(404).json({ message: 'Page not found', statusCode: 404 });
            }
        }
        //execute query
        const result = await query; // query.sort().select().skip().limit()

        res.status(200).json({ message: "Subsciber data fetched  successfully", statusCode: 200, subscibers: result, sucess: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
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
exports.updateSubscriber = async(req, res, ) => {
    try {
        const { id } = req.params;
        const subscriber = await Subsciber.findById(id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found', sucess: false, statusCode: 404 });
        }
        const updatedSubscriber = await Subsciber.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ subscriber: updatedSubscriber, sucess: true, statusCode: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
exports.deleteSubscriber = async(req, res, ) => {
    try {
        const { id } = req.params;
        const subscriber = await Subsciber.findById(id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found', sucess: false, statusCode: 404 });
        }
        const updatedSubscriber = await Subsciber.findByIdAndDelete(id);
        return res.status(204).json({ subscriber: updatedSubscriber, sucess: true, statusCode: 204 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}