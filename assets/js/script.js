const names = document.getElementById("name-input");
const description = document.getElementById("gorev-input");
document.getElementById("btn").addEventListener("click", creates);
document.getElementById("delete").addEventListener("click", deletes);
const list1 = document.getElementById("list");

function creates() {
   let InputValue = names.value;
   let TextValue = description.value;
   let list = list1;


   list.innerHTML += ` <tr> 
   <td> ${InputValue} </td>
   <td> ${TextValue} </td>
   <td><button class="delete-button border bg-danger text-white px-1 py-2 rounded">Delete</button></td>
   </tr>`;

   // Add event listeners to the delete buttons for each row
   const deleteButtons = document.querySelectorAll('.delete-button');
   deleteButtons.forEach(button => {
       button.addEventListener('click', () => deleteRow(button));
   });
}

function deletes() {
    // This function can be used to delete all rows if you want to keep it
    list1.innerHTML = "";
}

function deleteRow(button) {
    // Remove the parent row of the clicked button
    let row = button.parentElement.parentElement;
    row.remove();
}