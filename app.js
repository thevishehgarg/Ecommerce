import express from "express";
import { fileURLToPath } from "url";
import path from "path"
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import bodyParser from "body-parser"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', handlebars.engine({
    extname: '.hbs', defaultLayout: 'layout', layoutDir: path.join(__dirname, '/views/layouts/'), helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get("/", function (req, res) {
    res.render('index');
})
app.get("/index", function (req, res) {
    res.render('index');
})
app.get("/about", function (req, res) {
    res.render('about');
})
app.get("/blog", function (req, res) {
    res.render('blog');
})
app.get("/login", function (req, res) {
    res.render('login');
})
app.get("/Prod", function (req, res) {
    res.render('Prod');
})
app.get("/Shop", function (req, res) {
    res.render('Shop');
})
app.get("/signup", function (req, res) {
    res.render('signup');
})
app.get("/cart", function (req, res) {
    res.send('Will be coming soon');
})
app.get("/loginned", function (req, res) {
    res.render('loginned');
})

mongoose.connect("mongodb://localhost:27017/ecommerceDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successfull`);
}).catch((e) => {
    console.log(e);
    console.log(`no connection`);
});

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ConfirmPassword: {
        type: String,
        required: true
    }
})

const Register = new mongoose.model("userData", userSchema);

app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const Cpassword = req.body.confirmPassword;

        if (password === Cpassword) {
            console.log("passowrd matched");
            const registerUser = new Register({
                Name: req.body.username,
                Email: req.body.email,
                Password: req.body.password,
                ConfirmPassword: req.body.confirmPassword,
            });
            const registered = await registerUser.save();
            res.redirect('index');
        } else {
            res.send('Passwords are not matching');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ Email: email });
    if (!useremail) {
      throw new Error('unable to find user');
    }
    
    if (password === useremail.Password) {
      console.log("login successfully");  
      res.redirect('loginned');
    } else {
      res.send("Credentials do not match");
    }
  } catch (error) {
    console.log(error);
    res.redirect('index');
  }
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
})