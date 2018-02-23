var path = require('path');
var appDir = path.dirname(require.main.filename);

// configurations for media
module.exports = {
    // max size in bytes
    maxSize: {
        all: 104857600,
        image: 12582912,
        video: 104857600
    },
    media: {
        accepted_format: [
            'mp4', 'mkv'
        ]
    },
    image: {
        default: {},
        accepted_format: [
            'png', 'jpg', 'jpeg'
        ],
        sizes: [
            {
                name: 'large',
                width: 1600,
                height: 900
            },
            {
                name: 'medium',
                width: 1366,
                height: 768
            },
            {
                name: 'small',
                width: 600,
                height: 338
            },
            {
                name: 'thumbnails',
                width: 200,
                height: 113
            },
            {
                name: 'avatar',
                width: 41,
                height: 41
            }
        ]

    },
    uploadDir: path.join(ROOTURL, '/storage/upload/')
}
