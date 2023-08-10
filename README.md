# VS code set up

- Word wrap
- cursor expand
- Prettier - Code formatter
- formatter: format on save ,prettier formatter
- vs code font family
- Mouse Wheel zoom
- mini map
- Material icon theme
- Path Intelligence
- Markdown Preview Enhanced
- Image preview
- Markdown Preview Enhanced
- Live server
- code runner
- Code Spell Check
- Tailwind CSS intelligence
- Learn with sumit
- Terminal set up
- React Extension Pack
- ES7+ React/Redux/React-Native snippets
- React Native Tools

## step by step project setup

- React Router
- Tailwind
- .env.local: 69-7 (Recap) Create a simple Login page with firebase integration
- eslint file error solve: "react/prop-types","off",

## step by step

- project build command
  ```sh
   >mkdir coffee-store-server
   >npm init -y
   >npm i express cors mongodb dotenv
   >nodemon index.js
   >In index.js file: require('dotenv').config()
   >npm install sweetalert2
  ```
- Mongodb Database connection for new database
  ```sh
   Go to mongodb atlas site
   > Database Access: create username password
   > Database > connect >Drivers >copy
  ```

### POST Method

- create POST Method api in backend
  ```sh
    > app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      console.log("new NewCoffee", newCoffee);
      });
  ```
- Send data from client side to server side using fetch
  ```sh
  > fetch("http://localhost:5000/coffee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  ```
- create database & collection name

  ```sh
   > const database = client.db("usersDB");
     const usersCollection = database.collection("users");

   or
   > const coffeeCollection=client.db('coffeeDB').collection('coffee');
  ```

- In POST method API >send server data to Database
  ```sh
   > const result=await coffeeCollection.insertOne(newCoffee);
      res.send(result)
  ```
- Give a response to a user from client side
  ```sh
   >npm install sweetalert2
   >import Swal from 'sweetalert2'
   >if(data.insertedId){
          Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
  ```

### READ Method

- Data READ

  ```sh
   step-1:get/read data from server site
   > app.get('/coffee',async(req,res)=>{
      const cursor=coffeeCollection.find()
      const result=await cursor.toArray()
      res.send(result)
    })
   step-2: load data in client side from server link
   >path: "/",
    element: <App></App>,
    loader: () => fetch("http://localhost:5000/coffee"),
   step-2.1: In the created file use useLoaderData
   >const coffees=useLoaderData()

  ```

### DELETE Method

- Data DELETE

  ```sh
            send user delete data to backend
   step-1: In users file create delete button and handler
   > <button
            onClick={()=>handleDelete(user._id)}
            >X</button>
   > const handleDelete=_id=>{
    console.log('delete',_id)
    fetch(`http://localhost:5000/users/${_id}`,{
      method:'DELETE',

    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.deletedCount>0){
          alert('Deleted successfully');
        }
    })
   }
   or, if use sweet alert:
   >const handleDelete=_id=>{
    console.log(_id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
               Swal.fire("Deleted!", "Your coffee has been deleted.", "success");
            }
          });
      }
    });
  }


    Remove data from server side
   step-2: In server file
   > app.delete('/users/:id', async(req,res)=>{
      const id=req.params.id;
      console.log('please delete from database',id);
      const query={_id: new ObjectId(id)}
      const result=await userCollection.deleteOne(query);
      res.send(result)
      })

   step-3: Delete without Refresh
   > const loadedUsers=useLoaderData();
     const [users,setUsers]=useState(loadedUsers);
   > const remaining=users.filter(user=>user._id!==_id);
     setUsers(remaining);
  ```

### Update Data

- Update data

  ```sh
  step-1: create user data loader api in backend side
   > app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeeCollection.findOne(query);
      res.send(result);
      //after write this method check by id in browser
    });

   step-2: create a file and dynamic route
   > {
    path: "/updateCoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`),
  },

   step-3: create a dynamic link button
    > <Link to={`/updateCoffee/${_id}`}>
      <button className="btn">Edit</button>
      </Link>
   step-4: display coffee in update route
    > const coffee=useLoaderData()

   step-4.1:create the UI like post method(if need copy then copy)

   step-5: set default value for update data entry like create value
    > defaultValue={loadedUser?.name} or, > defaultValue={name}

   step-6: Now change the handle  name, object name, method name,update condition & make dynamic fetch path

    send from client-side> receive server-side> update database>client side>display user
    step-4: client side data send by PUT method like post method
    > fetch(`http://localhost:5000/users/${loadedUser._id}`,{
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(updatedUser)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    step-5: Receive backend data by PUT method
    > /* put method update data */
       app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCoffee = req.body;
      console.log(updatedCoffee);
      });
    step-6: Database receive :In server file
    > const filter={_id: new ObjectId(id)}
       const options={upsert: true}
       const updatedUser={
        $set: {
          name:user.name,
          email:user.email
        }
       }
       const result=await userCollection.updateOne(filter,updatedUser,options);
       res.send(result);


    step-5&6: Together
    >app.put("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCoffee = req.body;
      // console.log(updatedCoffee);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const coffee = {
        $set: {
          // name: user.name,
          // email: user.email,
          name: updatedCoffee.name,
          quantity: updatedCoffee.quantity,
          supplier: updatedCoffee.supplier,
          taste: updatedCoffee.taste,
          category: updatedCoffee.category,
          details: updatedCoffee.details,
          photo: updatedCoffee.photo,
        },
      };
      const result = await coffeeCollection.updateOne(
        filter,
        coffee,
        options
      );
      res.send(result);
     });

  ```

# Reuse:step by step set-up express.js

```sh
                After going to express js
step-1: create file >mkdir file-name, run command on this file >npm init -y & Express install: npm install express or npm i express
step-2: Add in script > "start": "node index.js",

                Go to hello world doc
step-3.1:  create file named same as entry point from package.json file (index.js)
step-3.2: In index.js file import express > const express=require('express') (it used after come ES6 module)
step-3.3: create app using express > const app=express();
step-3.4: create port > const port =process.env.PORT ||5000;  (port)server entry point(a server has multiple entry point)
step-3.5: get data by root path from server
> app.get('/',(req,res)=>{res.send('Hello from my first ever server')}) it send response when get  request is made
step-3.6: get data by custom path from server
> app.get('/data',(req,res)=>{res.send('Hello from my first ever server')})
step-3.7: check connection with app & port(check the console In which server port is running the app)
 > app.listen(port,()=>{
   console.log(`My first server is running on port:${port}`)
   })
 This code starts the server and listens on a specified port, printing a message to the console indicating that the server is running.
step-3.8: check by nodemon for watch live updating
    check version >nodemon -v
    start server watch >nodemon index.js

                       middleware setup
               To  Allow access-control-allow-origin
               Need middleware from express>resource
step-4.1: In server folder >npm install cors
step-4.2: In server index.js file import
 > const cors=require('cors')
 > app.use(cors())
```

- Additional > if I want to run data from json file

  ```sh
    step-1: import file in a variable
    > const phones=require('./phones.json');
    step-2: Get data by server path
    > app.get('/phones',(req,res)=>{
    res.send(phones);
    })

                    Now to get id data from json file
    step-1: create server path for dynamic id  or specific id news
    > app.get('/phones/:id',(req,res)=>{
      const id=parseInt(req.params.id);
      console.log('I need data for id:',id);
      const phone=phones.find(phone=>phone.id===id) ||{};
      res.send(phone);
    })

    or,
    app.get('/news/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const selectedNews=news.find(n=>n._id===id);
    res.send(selectedNews)
    })

    or,
    pp.get('/categories/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    console.log(id)
    if(id===0){
    res.send(news)
    }
    else{
    const categoryNews=news.filter(n=>parseInt(n.category_id)===id)
    res.send(categoryNews);
    }
    })
  ```

- connect api from created server if there had no route
  ```sh
  step-1: fetch by state
  >const [categories,setCategories]=useState([]);
   useEffect(()=>{
   fetch("https://the-news-dragon-server-bariulmunshi.vercel.app/categories")
  .then(res=>res.json())
  .then(data=>setCategories(data))
  .catch(error=>console.error(error))
   },[])
  step-2: check length
  ```
- connect sever api with client side if there had route

  ```sh
    create component for fetch data use
              for fetch all data
   step-1: create route for component
   > path: "/phones",
    element: <Phones />,
    loader:()=>fetch('https://the-news-dragon-server-bariulmunshi.vercel.app/phones')

   step-2: load data in created component
   > const phones=useLoaderData();
   > <div>
    <h2>all phones here:{phones.length}</h2>
   {
    phones.map(phone=><li key= {phone.id}>
      <Link to={`/phone/${phone.id}`}>{phone.name}</Link></li>)
   }
  </div>

              for fetch individual data
   step-1: create dynamic route for component
   > {
    path:'/phone/:id',
    element:<Phone></Phone>,
    loader:({params})=>fetch(`https://the-news-dragon-server-bariulmunshi.vercel.app/phones/${params.id}`)
   }
   step-2: load individual data by dynamic id
  > const phone =useLoaderData();
  > <div>
  <h2>{phone.name}</h2>
  <img src={phone.image} alt="" />
  </div>
  ```

  step-5: add file >.gitignore write > node_modules & check it by git init

  step-8: create a post api on the server side

  > app.post('/users',(req,res)=>{
  > console.log('Post API hitting')
  > console.log(req.body);
  > const newUser=req.body;
  > newUser.id=users.length+1;
  > users.push(newUser);
  > res.send(newUser);
  > })

# ReUse: Step by step express.js set up

```sh
 step-1: > npm init -y
 step-2: > npm i express cors mongodb
 step-3: in package.json file create >"start": "node index.js",
 step-4: create file > index.js
 step-5: In index.js file
 >const express = require('express');
  const cors = require('cors');
  const app=express();
  const port=process.env.PORT || 5000;

  /* middleware */
  app.use(cors());
  app.use(express.json());

  /* check path */
  app.get('/',(req,res)=>{
    res.send('Simple crud running')
  })

  /* data path */

  app.listen(port,()=>{
    console.log(`Simple crud is running:${port}`);
  })

 step-6: import code from atlas dbms
 step-7: set password carefully and see the server is pinged or not
 step-8: Now go to for > set up client side
 step-9: send server data to mongodb
 >  const database = client.db("usersDB");
    const usersCollection = database.collection("users");
    const result = await usersCollection.insertOne(user);
    res.send(result);
```
