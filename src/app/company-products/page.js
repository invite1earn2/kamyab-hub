"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function CompanyProducts(){

const [products,setProducts]=useState([]);
const [loading,setLoading]=useState(true);

const [editingProduct,setEditingProduct]=
useState(null);
const [selectedImage, setSelectedImage] = useState(null);

const [previewImage, setPreviewImage] = useState("");

useEffect(()=>{

loadProducts();

},[]);

async function loadProducts(){

const { data,error }=
await supabase
.from("products")
.select("*")
.order("display_order",{ascending:true});

if(error){

console.log(error);

}else{

setProducts(data||[]);

}

setLoading(false);

}

async function loadProducts(){

const { data,error }=
await supabase
.from("products")
.select("*")
.order("display_order",{ascending:true});

if(error){

console.log(error);

}else{

setProducts(data||[]);

}

setLoading(false);

}

// 👇 PASTE HERE

async function saveProduct(){

let error;
let imageUrl = editingProduct.image_url || "";

if (selectedImage) {

  const fileName =
    Date.now() + "-" + selectedImage.name;

const { data, error: uploadError } =
    await supabase.storage
      .from("product-images")
      .upload(fileName, selectedImage, {
        upsert: true,
      });

  if (uploadError) {

    console.log("Upload Error:", uploadError);

alert(uploadError.message);

    console.log(uploadError);

    return;

  }

  const {
    data: publicUrl
  } =
    supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

  imageUrl =
    publicUrl.publicUrl;

}

if(editingProduct.id){

const result=
await supabase
.from("products")
.update({

name:editingProduct.name,
price:editingProduct.price,
profit:editingProduct.profit,
image_url: imageUrl,
category:editingProduct.category,
short_description:editingProduct.short_description,
delivery_time:editingProduct.delivery_time,
status:editingProduct.status,
is_featured:editingProduct.is_featured

})
.eq("id",editingProduct.id);

error=result.error;

}else{

const result=
await supabase
.from("products")
.insert({

name:editingProduct.name,
price:editingProduct.price,
profit:editingProduct.profit,
image_url:imageUrl,
category:editingProduct.category,
short_description:editingProduct.short_description,
delivery_time:editingProduct.delivery_time,
status:editingProduct.status,
is_featured:editingProduct.is_featured,
display_order:products.length+1

});

error=result.error;

}

if(error){

alert("Failed to save product.");

console.log(error);

return;

}

alert("Product saved successfully.");

setEditingProduct(null);

loadProducts();

}
if(loading){

return(

<LoadingSpinner

title="Loading Products"

subtitle="Preparing Product Management..."

/>

);

}

async function deleteProduct(id){

const confirmDelete=
window.confirm(
"Are you sure you want to delete this product?"
);

if(!confirmDelete){

return;

}

const { error }=
await supabase
.from("products")
.delete()
.eq("id",id);

if(error){

alert("Failed to delete product.");

console.log(error);

return;

}

alert("Product deleted successfully.");

loadProducts();

}

return(

<main className="p-10">

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-4xl font-bold">

Product Management

</h1>

<p className="text-gray-600 mt-2">

Manage products, pricing and marketplace visibility.

</p>

</div>

<button
onClick={()=>
setEditingProduct({

name:"",
price:0,
profit:0,
short_description:"",
category:"",
delivery_time:"2-4 Days",
status:"active",
is_featured:false

})
}
className="bg-black text-white px-5 py-3 rounded-xl"
>

+ Add Product

</button>
</div>

<table
className="w-full border border-gray-200 rounded-xl overflow-hidden"
>

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">Order</th>

<th className="p-4 text-left">Product</th>

<th className="p-4 text-left">Category</th>

<th className="p-4 text-left">Price</th>

<th className="p-4 text-left">Profit</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Featured</th>

<th className="p-4 text-left w-48">

Actions

</th>

</tr>

</thead>

<tbody>

{

products.map((item)=>(

<tr
key={item.id}
className="border-t"
>

<td className="p-4">

{item.display_order}

</td>

<td className="p-4">

{item.name}

</td>

<td className="p-4">

{item.category}

</td>

<td className="p-4">

PKR {item.price}

</td>

<td className="p-4 text-green-600 font-semibold">

PKR {item.profit}

</td>

<td className="p-4">

{item.status}

</td>

<td className="p-4">

{item.is_featured ? "⭐ Yes" : "No"}

</td>

<td className="p-4">

<div className="flex gap-2">

<button
onClick={()=>
setEditingProduct(item)
}
className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
>

✏️ Edit

</button>

<button
onClick={()=>
deleteProduct(item.id)
}
className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
>

🗑 Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

{

editingProduct && (

<div className="mt-10 border rounded-2xl p-8 bg-white shadow">

<h2 className="text-2xl font-bold mb-6">

Edit Product

</h2>

<div className="grid md:grid-cols-2 gap-5">

<div>

<label className="block mb-2 font-medium">

Product Name

</label>

<input
value={editingProduct.name || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
name:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Selling Price

</label>

<input
type="number"
value={editingProduct.price || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
price:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Partner Profit

</label>

<input
type="number"
value={editingProduct.profit || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
profit:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Category

</label>

<input
value={editingProduct.category || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
category:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Product Image

</label>

<input
type="file"
accept="image/*"
onChange={(e)=>{

const file=e.target.files[0];

if(!file)return;

setSelectedImage(file);

setPreviewImage(URL.createObjectURL(file));

}}
className="w-full border rounded-lg p-3"
/>

</div>

{
previewImage && (

<div>

<label className="block mb-2 font-medium">

Preview

</label>

<img
src={previewImage}
alt="Preview"
className="h-40 w-40 rounded-xl border object-cover"
/>

</div>

)
}
<div className="md:col-span-2">

<label className="block mb-2 font-medium">

Short Description

</label>

<textarea
rows={3}
value={editingProduct.short_description || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
short_description:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Delivery Time

</label>

<input
value={editingProduct.delivery_time || ""}
onChange={(e)=>
setEditingProduct({
...editingProduct,
delivery_time:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Status

</label>

<select
value={editingProduct.status || "active"}
onChange={(e)=>
setEditingProduct({
...editingProduct,
status:e.target.value
})
}
className="w-full border rounded-lg p-3"
>

<option value="active">

Active

</option>

<option value="hidden">

Hidden

</option>

</select>

</div>

<div>

<label className="flex items-center gap-3 mt-8">

<input
type="checkbox"
checked={editingProduct.is_featured || false}
onChange={(e)=>
setEditingProduct({
...editingProduct,
is_featured:e.target.checked
})
}
/>

<span>

Featured Product

</span>

</label>

</div>

</div>

<div className="mt-8">

<button
onClick={saveProduct}
className="bg-black text-white px-6 py-3 rounded-xl"
>

<div className="mt-8 flex gap-4">

<button
onClick={saveProduct}
className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
>

{editingProduct.id ? "Update Product" : "Add Product"}

</button>

<button
onClick={()=>
setEditingProduct(null)
}
className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
>

Cancel

</button>

</div>
</button>

</div>

</div>

)
}
</main>

);

}