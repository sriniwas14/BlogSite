const multer = require('multer');
const sharp = require('sharp');

module.exports.multerStorage = (filetype, uploadLocation) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `static/uploads/${uploadLocation}`)
        },
        filename: function (req, file, cb) {
            const fileTypes = {
                profile: req.params.userId,
                featured: req.params.postId
            }
            cb(null, fileTypes[filetype] + '_temp')
        }
    })
}

module.exports.resizeAndConvert = async (imageSize, newFileName, oldFilePath) => {
    return sharp(oldFilePath)
        .resize(imageSize[0],imageSize[1])
        .jpeg({quality: 50})
        .toFile(newFileName)
}