const url = "https://jsonplaceholder.typicode.com/todos";
let page = 1;
let limit = 10;
let todos = [];
let keyword = "";


fetch(url)
    .then((d)=>{
        console.log(d);
        return d.json();
    }).then((d)=>{
        todos = d
        render();

    })

function render (){

    const filter = todos.filter(todo => {
        if (todo.title.toLowerCase().includes(keyword)) return todo
    })
    const sliceTodos = filter.slice( (page-1)*limit, page*limit );
    const viewCard = sliceTodos.reduce((v,i)=>{
        return (v +=`
        
            <div class="card">
                <div id="card" class="card-body">
                        <h3>${i.title}</h3>
                        <h4>${i.completed ? `<span style="color:green">Completed</span>` : `<span style="color:red">Not Completed</span>`}</h4>
                </div>    
            </div>
            
        `
            
            )
    },'')
    document.getElementById("number").innerHTML=page;
    document.getElementById("card").innerHTML=viewCard;

}

document.getElementById("next").addEventListener("click",()=>{
    if(page===10){
        return
    }
    page = page+1;
    render()
    
})

document.getElementById("prev").addEventListener("click",()=>{ 
    if(page===1){
        return 
    }
    page = page-1;
    render()
    
})

document.getElementById("search-data").addEventListener("keyup",(e)=>{ 
    keyword = e.target.value;
    render()
})

document.getElementById("select").addEventListener("change",(e)=>{
    limit = e.target.value;
    render()
})