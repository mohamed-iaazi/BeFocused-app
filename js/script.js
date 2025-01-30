const popup=document.getElementById("add-popup");
const main=document.querySelector('main');
const list =[];


window.addEventListener("load",()=>{
  

    document.querySelectorAll("#add-note").forEach((e)=>{
     e.addEventListener('click',()=>{
        popup.classList.remove("d-none");
    main.style.filter='blur(5px)'
 add();
    
     });
    })
})


function add(){

    
    document.getElementById("cancel").addEventListener('click',(e)=>{
        popup.classList.add("d-none");
        main.style.filter='none'
        deleteinput();

    });
    document.getElementById("save").addEventListener('click',(e)=>{
        popup.classList.add("d-none");
        main.style.filter='none';
        let title= document.getElementById("title").value.trim();
        let description= document.getElementById("Description").value.trim();
        let prioroty= document.getElementById("Priorité").value.trim();
        const data={title:title , description : description , prioroty: prioroty};
        list.push(data)
        alert(list.length);
        localStorage.setItem("notes",JSON.stringify(list))
        deleteinput();
        

    });
}

function deleteinput(){
    document.getElementById("title").value='';
   document.getElementById("Description").value='';
   document.getElementById("Priorité").value='';
 

}