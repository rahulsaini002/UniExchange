const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const app = express()

// const hbs = require("hbs")
const {LogInCollection} = require("./mongo")
const {Product} = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('login') 
})
app.get('/', (req, res) => {
    res.render('login')
})


app.get('/home', (req, res) =>{
    res.render("electronics", {
        naming: req.body.name
    })  
})


app.get('/products', async (req, res) => {
    try {
        const allProducts = await Product.find({});
        if(!allProducts){
            throw new Error('No products found');
        }
        // const products = JSON.parse(fs.readFileSync('src/products.json'));
        res.status(201).json(allProducts);
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({ error });
    }
});


app.post('/products', async (req, res) => {
    console.log("adding")
    try {
        const productDetails = req.body;
        console.log(productDetails)
        const newProduct = new Product(productDetails);
        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product added successfully!' });
      
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({success: false, error: error.message})
    }
});


// in get request user ask 


// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        email: req.body.email,
        rno: req.body.rno,
        pno: req.body.pno,   
        department: req.body.department,
        hostel: req.body.hostel,
        password: req.body.password
    }

    // const checking = await LogInCollection.findOne({ name: req.body.name })
    const checking = await LogInCollection.findOne({ email: req.body.email })


   try{
    // if ( checking.name === req.body.name && checking.password===req.body.password) {
    if (checking) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch(e){
    res.send(e.message)
   }
    res.status(201).render("electronics", {
        naming: req.body.name
    })
})



app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const foundUser = await LogInCollection.findOne({ name: req.body.name})
        // console.log("The email entered is : ", foundUser.email);
        if (foundUser.password === req.body.password) {
            res.status(201).redirect('/home')
            // res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }
        else {
            res.send("incorrect password")
        }
    } 
    catch (e) {
        res.send("wrong details")
    }
})
app.get('/logout', (req, res) => {
    res.redirect('/')
})


app.listen(port, () => {
    console.log('port connected');
})


// Endpoint to handle POST requests to add a product
// app.post('/products', (req, res) => {
//     const newProduct = req.body;

//     // Read existing data from src/products.json
//     const products = JSON.parse(fs.readFileSync('src/products.json'));

//     // Add the new product
//     products.push(newProduct);

//     // Write updated data back to src/products.json
//     fs.writeFileSync('src/products.json', JSON.stringify(products, null, 2));

//     res.send('Product added successfully!');
// });
  // fs.readFile('src/products.json', (err, data) => {
        //     if (err) throw err;

        //     const products = JSON.parse(data);

        //     // Add the new product
        //     products.unshift(newProduct);

        //     // Write updated data back to src/products.json
        //     fs.writeFile('src/products.json', JSON.stringify(products, null, 2), (err) => {
        //         if (err) throw err;
        //     });
        // });