const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./Routes/blogRoutes');

const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.vkko6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT ||3000))
    .catch((err) => console.log(err));
//Register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
 
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'About my new Blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6054d41109597a33e4582d45')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

//Blog route
app.get('/', (req, res) => {
//   res.sendFile('./views/index.html', { root: __dirname})
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
//   res.sendFile('./views/about.ejs', { root: __dirname})
res.render('about', { title: 'About'})
})

//Blog route
app.use('/blogs', blogRoutes)
// app.get('/about-us', (req, res) => {
//   res.redirect('/about')
// })

app.use( (req, res) => {
  res.status(404).render('404', { title: '404'})
})