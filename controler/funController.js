const Post=require('../model/article')
const { validationResult } = require("express-validator");
const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
//require('cookie-parser')

const getHome = (req, res) => {
  res.render("home" , { loginError: "",});
};
const getHomePage=(req,res)=>{
Post.find().sort({createdAt: -1})
.then((respone)=>{res.render('homePage' ,{allArticles:respone})})
.catch(err=> console.log(err))
}
const createPost =  (request, response) => {
    const { title, content } = request.body;

    if (title.length < 5 || content.length < 25) {
        response.send('The title must be at least 5 characters long, and the text must be at least 25 characters long');
    }else{
        const newpost = new Post({ title, content });
        newpost.save()
        .then(response.redirect('/'))
        .catch(err=> console.log(err))
    }

}
const showCreateForm = (request, response) => {
    response.render('addNew');
}

const showPost = async (request, response) => {
    const post = await Post.findById(request.params.id);

    response.render('fullArticle', {post})
}

const getEditArticlePage = (req, res) => {

    console.log("Get req for edit article page sent.", req.body);
    Post.findById(req.params.id)
      .then((result) => {
        res.render("edit", {
          article: result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 const updateArticle = (req, res) => {
    console.log("Request to update article sent.");
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.render("fullArticle", {
          post: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteArticle = (req, res) => {
    console.log("Request to delete article has been sent");
    Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

const getRegisterPage = (req, res) => {
  const errors = validationResult(req);
  
  const errorMessages = errors.array();
  if (!errors.isEmpty()) {
    console.log(errorMessages);
    res
      .status(400)
      .render("register", { errors: errorMessages, hashWrong: "" });
  } else {
    res.render("register", { errors: errorMessages, hashWrong: "" });
  }
};

const registerUser = async (req, res) => {
  //validate the user input using express-validator
  const errors = validationResult(req);
  const errorMessages = errors.array();
  console.log(errorMessages);
  if (!errors.isEmpty()) {
    console.log(errorMessages);
    res
      .status(400)
      .render("register", { errors: errorMessages, hashWrong: "" });
  }

  const { firstName, lastName, email, password } = req.body;

  await User.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      const errorMessages = [{ path: "email", msg: "Email already in use" }];
      res
        .status(400)
        .render("register", { errors: errorMessages, hashWrong: "" });
    } else {
      const hash = bcrypt.hashSync(password, 10);
      if (!hash) {
        res.render("register", {
          errors: errorMessages,
          hashWrong: "Something went wrong",
        });
      } else {
        let userObj = {
          ...req.body,
          password: hash,
          messages:[]
        };
        const user = new User(userObj);

        user
          .save()
          .then(() => res.redirect(`/tweet`))
          .catch((err) => console.log(err));
      }
    }
  });
};


const loginUser = async (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.render("home", {
      loginError: "All fields are required",
    });
  } else {
    let existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      res.render("home", {
        loginError: "Email does not exist please register first.",
      });
    } else {
      let correctPassword = bcrypt.compareSync(
        req.body.password,
        existUser.password
      );

      if (!correctPassword) {
        res.render("home", {
          loginError: "Password is not correct",
        });
      } else {
        //Create user token
        let userDataForToken = {
          id: existUser._id,
          firstName: existUser.firstName,
          lastName: existUser.lastName,
          email: existUser.email,
        }
        let userToken = jwt.sign({user: userDataForToken}, "akram")
        /*console.log(existUser);
        console.log(userDataForToken)
        console.log(userToken)*/
        res.cookie("userToken", userToken)
        res.redirect("/tweet")
        //Redirect to new page
      }
    }
  }
};





module.exports={
    getHome,
    getRegisterPage,
    registerUser,
    loginUser,
    getHomePage,
    createPost,
    showCreateForm,
    showPost,
    getEditArticlePage,
    updateArticle,
    deleteArticle
}