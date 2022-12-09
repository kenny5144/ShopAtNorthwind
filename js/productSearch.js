
let images = []
let toBSelectOptions = ["Select One", "Categories" ,"View All"]
window.onload= function(){
    let selectOptions = document.getElementById("Options")
    populateOptions()
    let byCategory =document.getElementById("byCategory")
    byCategory.style.display= 'none'
    
    let tableOutput = document.getElementById("tableOutput")
    tableOutput.style.display='none'
    let viewAllOutput = document.getElementById("viewAllOutput")
    viewAllOutput.style.display='none'
    
    selectOptions.onchange = onChangeSelectOptions
    byCategory.onchange= onChangeByCategories
    
   
}
function populateOptions(){
    let selectOptions = document.getElementById("Options")
    for(let i of toBSelectOptions){
        let theOption = new Option (i,i)
        selectOptions.appendChild(theOption)
    }
   
}
function onChangeSelectOptions(){
    let selectOptions = document.getElementById("Options").value
    let byCategory =document.getElementById("byCategory")
    let viewAllOutput = document.getElementById("viewAllOutput")
   


    if (selectOptions == "Categories"){
        
        byCategory.style.display='block'
        byCategoryOption()
        clearPreviousOptions()

    }else if (selectOptions=="View All"){
        byCategory.style.display='none'
        viewAllOutput.style.display='block'
        viewAllOption()
    }else{
        byCategory.style.display='none'
        viewAllOutput.style.display='none'
        
        
    }

    
}

function byCategoryOption(){
    let byCategory = document.getElementById("byCategory");
    let tableOutput = document.getElementById("tableOutput")
    tableOutput.style.display='block'


    fetch("http://localhost:8081/api/categories")
        .then (response=>response.json())
        .then (data => {
            for (let categories of data){
                
                let newOption= new Option (categories.name, categories.categoryId)
                
                byCategory.appendChild(newOption)
            }
            
        })


}
function onChangeByCategories(){
    let byCategoryValue = document.getElementById("byCategory").value
    console.log(byCategoryValue)

        fetch (`http://localhost:8081/api/categories/${byCategoryValue}`)
    .then (response=>response.json())
    .then (data => {
        clearByOptionOutput()
        for (let products of data){
            let anchor = document.createElement("a");
                anchor.href =
                `detailsPage.html?productId=${products.productId}`;
                anchor.text = "See details"

            let tbodyOutput =document.getElementById("tbodyOutput")
                             let row = tbodyOutput.insertRow();
                             
                             let tdName = row.insertCell();
                             tdName.innerHTML= products.productName ;
                             let tdOthers = row.insertCell();
                             tdOthers.appendChild(anchor) ;
                             
                            }
       
    })
    

}
function viewAllOption(){
   

    fetch("http://localhost:8081/api/products")
        .then (response=>response.json())
        .then (data => {
            for (let i of data){
                let anchor = document.createElement("a");
                anchor.href =
                `detailsPage.html?productId=${i.productId}`;
                anchor.text = "See details"

                let viewOutput =document.getElementById("ViewOutput")
                        let row = viewOutput.insertRow();
                        let tdID = row.insertCell();
                        tdID.innerHTML=i.productId
                        let tdName = row.insertCell(1);
                        tdName.innerHTML= i.productName ;
                        let tdUnitPrice = row.insertCell(2);
                        tdUnitPrice.innerHTML= i.unitPrice ;
                        let tdDetails =row.insertCell(3)
                        tdDetails.appendChild(anchor)
                        
            }
        })
}



function clearPreviousOptions(){
    let byCategory =document.getElementById("byCategory")

    byCategory.replaceChildren()
}

function clearByOptionOutput(){
    let tbodyOutput=document.getElementById("tbodyOutput")
    tbodyOutput.replaceChildren()
}


