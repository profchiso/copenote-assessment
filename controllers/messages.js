const Message = require('../database/models/messages');

exports.getAllMessages = async(req, res, ) => {
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

        let query = Message.find(parsedQuery); // the .select excludes any spacified field before sending the document

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
            let numberOfDocument = await Message.countDocuments();
            if (skip >= numberOfDocument) {
                return res.status(404).json({ message: 'Page not found', statusCode: 404 });
            }
        }
        //execute query
        const result = await query; // query.sort().select().skip().limit()

        res.status(200).json({ message: "Messages fetched  successfully", statusCode: 200, messages: result, sucess: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
exports.getMessage = async(req, res, ) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found', sucess: false, statusCode: 404 });
        }
        return res.status(200).json({ message, sucess: true, statusCode: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
exports.createMessage = async(req, res, ) => {
    try {
        const { message, subject } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'message is required', sucess: false, statusCode: 400 });
        }
        let messageId = await Message.estimatedDocumentCount();
        const createdMessage = await Message.create({ message, messageId: messageId + 1, subject: subject || "Cope Notes Health mail" });
        return res.status(201).json({ message: createdMessage, sucess: true, statusCode: 201 });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })
    }
}
exports.updateMessage = async(req, res, ) => {
    try {
        const { id } = req.params;
        const Message = await Subsciber.findById(id);
        if (!Message) {
            return res.status(404).json({ message: 'Message not found', sucess: false, statusCode: 404 });
        }
        if (req.body.messageId) {
            delete req.body.messageId
        }
        const updatedMessage = await Subsciber.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ Message: updatedMessage, sucess: true, statusCode: 200 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}
exports.deleteMessage = async(req, res, ) => {
    try {
        const { id } = req.params;
        const Message = await Subsciber.findById(id);
        if (!Message) {
            return res.status(404).json({ message: 'Message not found', sucess: false, statusCode: 404 });
        }
        const updatedMessage = await Subsciber.findByIdAndDelete(id);
        return res.status(204).json({ Message: updatedMessage, sucess: true, statusCode: 204 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "something went wrong", statusCode: 500 })

    }
}