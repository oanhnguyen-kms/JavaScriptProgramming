const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};

let books = {
    1: {
        author: "John smith",
        title: "John book",
        review: {}
    },
    2: {
        author: "Anna smith",
        title: "Anna book",
        review: {}
    },
    3: {
        author: "Peter smith",
        title: "Peter book",
        review: {}
    },
}

const bookArr = [
    {
        author: "John smith",
        title: "John book",
        review: {}
    },
    {
        author: "Anna smith",
        title: "Anna book",
        review: {}
    },
    {
        author: "Peter smith",
        title: "Peter book",
        review: {}
    },
]


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(books,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:id",(req,res)=>{
    return new Promise((resolve, reject) => {
        const id = req.params.id;
        res.send(books[id]);
        resolve();
    });
});

// GET by specific ID request: Retrieve a single friend with author
router.get("/author/:name",(req,res)=>{
    const name = req.params.name;
    const booksfiltered = bookArr.filter(b=>b.author===name)
    res.send(booksfiltered);
});

router.get("/title/:name",(req,res)=>{
    const name = req.params.name;
    const booksfiltered = bookArr.filter(b=>b.title===name);
    res.send(booksfiltered);
});

router.get("/review/:id",(req,res)=>{
    const id = req.params.id;
    res.send(books[id].review);
});


// POST request: Add a new friend
router.post("/", function(req, res) {
    if (req.body.id) {
        books[req.body.id] = {
            "author": req.body.author,
            "title": req.body.title,
            "review": req.body.review,
        };
    }

    res.send("The book" + (' ') + (req.body.title) + " Has been added!");
});

// PUT request: Update the details of a friend with email id
router.put("/:id", function(req, res) {
    const id = req.params.id;
    let book = books[id];  

    if (book) {
        let author = req.body.author;
        let title = req.body.title;
        let review = req.body.review;

        // Update DOB if provided in request body
        if (author) {
            book["author"] = author;
        }
        if (title) {
            book["title"] = title;
        }
        if (review) {
            book["review"] = review;
        }

        books[id] = book;
        res.send(`${books[id].title} updated.`);
    } else {
        res.send("Unable to find book!");
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        delete books[id];
    }
    res.send("The book deleted");
});

router.delete("review/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        books[id].review = {};
    }
    res.send("The book review deleted");
});

module.exports=router;
