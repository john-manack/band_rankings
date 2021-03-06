'use strict';

const express = require('express'),
    router = express.Router(),
    albumModel = require('../models/albumModel')

router.get('/', async (req, res) => {
    const albumListData = await albumModel.getList();
    console.log("Album List: ", albumListData);
    res.render('template', {
        locals: {
            title: "Album Review | List",
            albumListData,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/album-list",
        }
    });
});

router.get('/:slug', async (req, res) => {
    console.log("Req Params are: ", req.params)
    const { slug } = req.params;
    console.log("Slug is :", slug);
    const album = await albumModel.getBySlug(slug);
    const reviews = await albumModel.getAlbumReview(slug);
    console.log("album data :", album);
    console.log("review data :", reviews);

    if (album) {
        res.render('template', {
            locals: {
                title: `${album.album_name}`,
                album,
                reviews,
                is_logged_in: req.session.is_logged_in
            },
            partials: {
                body: 'partials/album-detail',
            }
        });
    } else {
        res.status(404).send(`No album found that matches slug, ${slug}`)
    }
});

router.post('/add', async (req, res) => {
    const { slug, album_reference, stars, review_content } = req.body;
    const response = await albumModel.postReview(stars, review_content, album_reference);
    console.log("'Post Review' data is :", response);
    if (response.rowCount >= 1) {
        res.redirect(`/bands/${slug}/`)
    } else {
        res.sendStatus(500)
    }
})

module.exports = router;