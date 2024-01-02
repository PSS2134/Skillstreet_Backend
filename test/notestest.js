let chai =require("chai");
let {expect,assert} = require("chai");
let chaiHttp=require("chai-http");
chai.should();
chai.use(chaiHttp);

/* Lets Start Testing the API Endpoints */

/*POST REQUEST i.e. Create a Note*/ 

describe("Creating A Note", function(){
    it("POST Request 1 / success", async()=>{
        let res=await chai.request("http://localhost:5000/api/notes").post('/create?user=testuser@gmail.com').send({
            "title": "Test Title",
            "body": "This is a demo note , Just for testing and checking purpose"
          }).set('Content-Type', 'application/json')
          expect(res).to.have.status(200);
          console.log(res.body);
    })

    it("POST Request 2 / failed", async()=>{
      let res=await chai.request("http://localhost:5000/api/notes").post('/create?user=testuser@gmail.com').send({
          "title": " ",
          "body": "This"
        }).set('Content-Type', 'application/json')
        expect(res).to.have.status(400);
        console.log(res.body);
  })
  it("POST Request 3 / failed_no_valid_userid", async()=>{
    let res=await chai.request("http://localhost:5000/api/notes").post('/create?user=testuserm').send({
        "title": " ",
        "body": "This"
      }).set('Content-Type', 'application/json')
      expect(res).to.have.status(400);
      console.log(res.body);
})
})

/*GET REQUEST i.e. GET Note*/ 

describe("GET Note", function(){
  /*Get ALL Notes */
  it("GET Request 1 / success_all_notes_of_a_user", async()=>{
      let res=await chai.request("http://localhost:5000/api/notes").get('?user=testuser@gmail.com')
        expect(res).to.have.status(200);
        console.log(res.body);
  })
  it("GET Request 2 / success_no_note_found", async()=>{
    let res=await chai.request("http://localhost:5000/api/notes").get('?user=testusercom')
      expect(res).to.have.status(400);
      console.log(res.body);
})
/*Get a single note with id 6593a49f4b9fd15beb417d4e*/
it("GET Request 3 / success_single_note", async()=>{
  let id="6593a49f4b9fd15beb417d4e";
  let res=await chai.request("http://localhost:5000/api/notes").get(`/${id}/?user=testuser@gmail.com`)
    expect(res).to.have.status(200);
    console.log(res.body);
})
})

/*Update/PUT REQUEST i.e. Update Note*/ 

describe("Update Note", function(){
  /*Update Note with MongoDB ObjectId Eg:id 6593a49f4b9fd15beb417d4e */
 it("Update Request 1 / success", async()=>{
  let id="6593a49f4b9fd15beb417d4e";
        let res=await chai.request("http://localhost:5000/api/notes").put(`/update/${id}?user=testuser@gmail.com`).send({
            "title": "Test Title updated",
            "body": "This is a demo note , Just for testing and checking purpose (updated)",
          }).set('Content-Type', 'application/json')
          expect(res).to.have.status(200);
          console.log(res.body);})
 
})

/*Delete Request*/
 describe("Delete Note", function(){
  /*Delete Note with MongoDB ObjectId Eg:id 6593a49f4b9fd15beb417d4e (mongodb object id) */
  it("Update Request 1 / success", async()=>{
    let id="6593a49f4b9fd15beb417d4e";
          let res=await chai.request("http://localhost:5000/api/notes").delete(`/delete/${id}?user=testuser@gmail.com`)
            expect(res).to.have.status(400);
            console.log(res.body);})
   
/*Not a valid id*/
  it("Update Request 1 / failed_not_valid_id", async()=>{
    let id="abcde";
          let res=await chai.request("http://localhost:5000/api/notes").delete(`/delete/${id}?user=testuser@gmail.com`)
            expect(res).to.have.status(400);
            console.log(res.body);})
   
  })
