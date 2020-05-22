const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ =  require('lodash');

const home = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad veritatis provident doloremque saepe. Illum vitae, voluptas quae natus ut quos nostrum in! Id est sapiente esse tenetur. Omnis, temporibus culpa!';
const about = 'Hello, My name is Anthony Whyte. A Junior Web developer. I am interested in web development and web app development. I am very good in web page structure with HTML, web design with css and web page animation and automation with Javascript. Ping me for more details';
const contact = 'Contact me by email at whyte.jnr@gmail.com or by phone at 999-9999-9999';
const posts = [];

const app = express();

app.use(express.static(`${__dirname}/public`)); 


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {
        home: home,
        articles: posts
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

    const article = {
        title: req.body.blogTitle,
        post: req.body.blogPost 
    };
    posts.push(article);
    res.redirect('/');
});

app.get('/:postName', (req, res) => {
    posts.forEach((x) => {
        if(_.lowerCase(x.title) === _.lowerCase(req.params.postName)) {
            res.render('post', {
                post:x
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port 3000');
});