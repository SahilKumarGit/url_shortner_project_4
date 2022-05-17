const shortid = require('shortid');
const validation = require('./../utility/validation');
const urlModel = require('./../models/urlModel');
const create = async (req, res) => {
    try {
        const data = req.body
        const sortUrlDomain = `${req.protocol}://${req.headers.host}`

        if (validation.emptyObject(data)) return res.status(400).send({
            status: false,
            message: "POST body must be required!"
        })

        let {
            longUrl
        } = data

        if (validation.isEmpty(longUrl)) return res.status(400).send({
            status: false,
            message: "longUrl must be required!"
        })

        if (validation.notURL(longUrl)) return res.status(400).send({
            status: false,
            message: `'${longUrl}' is NOT a valid Url!`
        })

        /*------ generate short id -------*/
        const urlCode = shortid.generate().toLowerCase();

        /*------ check if unique id already exist or NOT -------*/
        const isExistUrlCode = await urlModel.findOne({
            urlCode: urlCode
        })
        if (isExistUrlCode) return res.status(404).send({
            status: false,
            message: `Something wents worng, generated urlCode is already exist. Please try again!`
        })

        /*------ check if unique id already exist or NOT -------*/
        const isExistLongUrl = await urlModel.findOne({
            longUrl
        }).select({
            _id: 0,
            __v: 0
        })
        if (isExistLongUrl) return res.status(200).send({
            status: false,
            data: isExistLongUrl
        })

        const rawData = {
            urlCode,
            longUrl,
            shortUrl: `${sortUrlDomain}/${urlCode}`
        }

        /*--------- save in db ----------*/
        await urlModel.create(rawData)
        res.status(200).send({
            status: true,
            data: rawData
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: e.message
        })
    }
}

const redirectUrl = async (req, res) => {

    try {
        const urlCode = req.params.urlCode

        const chkUrlCode = await urlModel.findOne({
            urlCode: urlCode
        })

        if (!chkUrlCode) return res.status(404).send({
            status: false,
            message: "Url Not Found!"
        })

        res.writeHead(301, {
            "Location": chkUrlCode.longUrl
        });
        res.end()


    } catch (err) {
        res.status(500).send({
            status: false,
            message: e.message
        })
    }

}



module.exports = {
    create,
    redirectUrl
}