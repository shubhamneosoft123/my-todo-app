import React,{useState,useEffect} from "react";
import List from "./components/List";
import Alert from "./components/Alert";
function App() {

  const getLocalStorage=()=>{
    let list = localStorage.getItem("list");
    if(list){
      return(list=JSON.parse(localStorage.getItem("list")))
    }
  }

  const [name,setName]=useState("");
  const [list,setList]=useState(getLocalStorage("list"));
  const [isEditing,setidEditing]=useState(false);
  const [ediitID,seteditID]=useState(null);
  const [alert,setAlert]=useState({show:false,msg:"",type:""});

  useEffect(() => {
    localStorage.setItem("list",  JSON.stringify(list))
  },[list]);

const handleSubmit=(e)=>{
  e.preventDefault();
  if(!name){
    showAlert(true,"danger","plx enter value");
  }else if(name&& isEditing){
    setList(
      list.map((item)=>{
        if(item.id=ediitID){
          return {...item,title:name}
        }
        return item
      })
    )
    setName("");
    seteditID(null);
    setidEditing(false);
    showAlert(true,"success","Item Updated");
  }else{
    showAlert(true,"success","Item Added")
    const newItem={id:new Date().getTime().toString(),title:name}
    setList([...list,newItem])
    setName("");
  }
};
//end
const showAlert=(show= false,type="",msg="")=>{

  setAlert({show,type,msg});
  

  };
const removeItem=(id)=>{
  showAlert(true,"danger","item removed");
  setList(list.filter((item)=>item.id!==id))
};
const editItem=(id)=>{
  const editItem=list.find((item)=>item.id===id);
  setidEditing(true);
  seteditID(id);
  setName(editItem.title);

};
const clearList=()=>{
  showAlert(true,"danger","Empty List");
  setList([]);
};


  return (
    <div>
    <div className="text-center bg-primary py-2 text-white">
      <h1 className="text-center">Todo List App</h1>
    </div>
  <section className="section-center">
    <form onSubmit={handleSubmit}>
      {alert.show&& <Alert {...alert}removeAlert={showAlert} list={list}/>}

      <h3 style={{marginBottom:"1.5rem",textAlign:"center"}}>
        Todo List App
      </h3>
      <div className="mb-3 form" >
        <input type="text" className="form-control" placeholder="Enter Item" 
        onChange={(e)=>setName(e.target.value)} value={name}/>&nbsp;

        <button type="submit" className="btn btn-success">{isEditing ?"Edit":"Submit"}</button>

      </div>

    </form>
    {list.length > 0 && (
      <div style={{marginTop:"2rem"}}>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <div className="text-center">
          <button className="btn btn-warning" onClick={clearList}>clear Items

          </button>

        </div>
      </div>
    )}
  </section>
  </div>
  );
}

export default App;
