const multer = require('multer');
const sharp = require('sharp');

module.exports.multerStorage = (uploadLocation) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, `uploads/${uploadLocation}`)
        },
        filename: function (req, file, cb) {
            cb(null, req.params.userId + '_temp')
        }
    })
}

module.exports.resizeAndConvert = async (imageSize, newFileName, oldFilePath) => {
    return sharp(oldFilePath)
        .resize(imageSize[0],imageSize[1])
        .jpeg({quality: 50})
        .toFile(`${newFileName[0]}.jpg`)
}