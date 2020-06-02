const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ =  require('lodash');
const mongoose = require('mongoose');
require('dotenv').config();
const url = 'mongodb://127.0.0.1:27017/blogDB';



const home = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad veritatis provident doloremque saepe. Illum vitae, voluptas quae natus ut quos nostrum in! Id est sapiente esse tenetur. Omnis, temporibus culpa!';
const about = 'Hello, My name is Anthony Whyte. A Junior Web developer. I am interested in web development and web app development. I am very good in web page structure with HTML, web design with css and web page animation and automation with Javascript. Ping me for more details';
const contact = 'Contact me by email at whyte.jnr@gmail.com or by phone at 999-9999-9999';

const app = express();

app.use(express.static(`${__dirname}/public`)); 


app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true});
const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    post: String
});

const Article = mongoose.model('Article', ArticleSchema);

const article1 = new Article({
    title: 'Welcome',
    post: 'Welcome to your new Blog, Add new content by clicking the + sign below'
});

const article2 = new Article({
    title: 'The storm in a teacup',
    post: 'This happened on the 27th of October 2019. This is where an issue was blown out of proportion and it effects were unprecedented. Two friends had entered into patnership'

});

const article3 = new Article({
    title: 'Onine Business',
    post: "Making money online is not for the faint hearted. You will have to do a lot of research in order to avoid online scams. This is your hard earned money and you wouldn't want it to go down the drain. I think the stock markets are one of the best ways to make money. One question I have been asking myself is, If stocks can only move in 3 directions, i.e upwards, downwards or sideways, why do a lot of people lose money? This is a million dollar question because figuring the answer to this question could mean that you can profit almost 100% of the time on all your investments in the stock markets. Is it that we make a lot of bad decision or our risk management is poor? Join me as we gather some insights into the world of trading. Let's see what the data is telling us."
});

const defaultArray = [article1, article2, article3];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Article.find({}, (err, articlesFound) => {
        console.log(articlesFound);
        if(articlesFound.length === 0) {
            Article.insertMany(defaultArray, (err) => {
                if(err) {
                    console.log(`Error from inserting documents: ${err}`);
                } else {
                    console.log(`Documents inserted successfully`);
                }
            });
            res.redirect('/');
        } else {
            res.render('home', {
                home: home,
                articles: articlesFound
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        about: about
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        contact: contact
    });
});

app.get('/compose', (req, res) => {
    res.render('compose');
})

app.post('/', (req, res) => {

    const article = new Article({
        title: req.body.blogTitle,
        post: req.body.blogPost 
    });
    article.save((err) => {
        if(!err) {
            res.redirect('/');
        }
    });
    
});

app.get('/:postName', (req, res) => {
    const id = req.params.postName
    Article.findOne({_id: id}, (err, itemFound) => {
        if(!err) {
            res.render('post', {
                post: itemFound
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port 3000');
});