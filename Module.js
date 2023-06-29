const porductdb = (dbname, table) =>{
//create database

const db = new Dexie(dbname)
db.version(1).stores(table);
db.open();
/*
const db = new Dexie('myDb');
db.version(1).stores({
  friends: `name, age` 
})
*/
return db;
}

//insert finction
const bulkcreate = (dbtable, data)=>{
  let flag =  empty(data);
  if(flag){
    dbtable.bulkAdd([data]);
    console.log("Data Inserted Successfully")
  }else{
    console.log("Please Provide Data")
  }
  return flag
}

//checking textbox validation
const empty = Object => {
   let flag = false;

   for(const value in Object){
      if(Object[value] != "" && Object.hasOwnProperty(value)){
        flag = true;
      }else{
        flag = false;
      }
   }
   return flag;
}

//Get data from the database
const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table, cursor) => {
        // The second parameter of the each() callback is the cursor object
        // Use cursor.key to get the current object's key (ID)
        obj = Sortobj(table);
        fn(obj, cursor.key); // Pass the key as the index
        index++;
      });
    } else {
      fn(0);
    }
  });
};


//Sort object
const Sortobj = sortobj =>{
  let obj = {};
  obj = {
    id : sortobj.id,
    name: sortobj.name,
    seller: sortobj.seller,
    price: sortobj.price   
  }
  return obj;
}


// creating dynamic elements
const createEle = (tagnme, appendTo, fn) => {
  const element = document.createElement(tagnme);
  if(appendTo) appendTo.appendChild(element);
  if(fn) fn(element);
}

export default porductdb;
export {
  bulkcreate,
  getData,
  createEle
}
