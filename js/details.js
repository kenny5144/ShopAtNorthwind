"use strict"

window.onload=function (){
viewAllOption()
}

function viewAllOption(){
    const urlParams = new URLSearchParams(location.search);
    let id = -1;
        if (urlParams.has("productId") === true)
    {
        id = urlParams.get("productId")
    }
    
   

    fetch (`http://localhost:8081/api/products/${id}`)
        .then(response => response.json())
        .then (data=>
            {
                
            let detailslist= document.getElementById("detailsList")  
            let li = document.createElement('li') 
            li.appendChild(document.createTextNode("Name"+ data.productName ))
            li.setAttribute("class" , "list-group-item")
            let li2 = document.createElement('li') 
            li2.appendChild(document.createTextNode("Price: "+ data.unitPrice))
            li2.setAttribute("class" , "list-group-item")

            let li3 = document.createElement('li') 
            li3.appendChild(document.createTextNode("Unit Available: "+ data.unitsInStock))
            li3.setAttribute("class" , "list-group-item")

            detailslist.appendChild(li)
            detailslist.appendChild(li2)
            detailslist.appendChild(li3)
            

            })
}



