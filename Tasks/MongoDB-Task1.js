// >mongosh
// >use MongoDB-Task1
// > db.createCollection("products"); - Collection created
// > db.mentor.insertMany(product.json) - data inserted


// 1. Find all the information about each products

Ans: db.products.find().toArray()

// 2. Find the product price which are between 400 to 800

Ans: db.products.find({ product_price: { $gt: 400, $lt: 800 } })

// 3. Find the product price which are not between 400 to 600

Ans: db.products.find({ product_price: { $not: { $gt: 400, $lt: 600 } } })

// 4. List the four product which are grater than 500 in price

Ans: db.products.find({ product_price: { $gt: 500 } }).limit(4)

// 5. Find the product name and product material of each products

Ans1: db.products.find().forEach(function (prod) { print("product name : " + prod.product_name, "         ", "product Material : " + prod.product_material) })
or
Ans2: db.products.find().forEach(function (prod) { print(prod.product_name, ",", prod.product_material) });

// 6. Find the product with a row id of 10

Ans: db.products.findOne({ id: '10' });

// 7. Find only the product name and product material

Ans: db.products.find().forEach(function (prod) { print(prod.product_name, ",", prod.product_material) });

// 8. Find all products which contain the value of soft in product material

Ans: db.products.find({ product_material: "Soft" });

// 9. Find products which contain product color indigo  and product price 492.00

And: db.products.find({ $and: [{ product_color: "indigo" }, { product_price: 492 }] }); - null
or
Ans: db.products.find({ product_color: "indigo", product_price: 490 }) - null

// 10. Delete the products which product price value are same

Ans: db.products.aggregate([
    {
        $group: { _id: "$product_price", duplicate: { $addToSet: "$_id" }, Totalcount: { $sum: 1 } }
    },
    {
        $match: {
            Totalcount: { $gt: 1 }
        }
    }]).forEach((doc) => {
        console.log(doc);
        doc.duplicate.shift();
        console.log(doc);
        db.products.deleteMany({ _id: { $in: doc.duplicate } })
    });

    // Deleted -  duplicate: [ ObjectId("6485a279a6a71171d932b904")],  [ ObjectId("6485a279a6a71171d932b908")]