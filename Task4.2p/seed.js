const sampleProject = new Project({
title: "Bsc Protein Powder",
image: "https://www.bigw.com.au/medias/sys_master/images/images/h64/h1b/116407482744862.jpg",
link: "About the product",
description: "Demo description about the product"
});
sampleProject.save().then(() => console.log("Sample saved!"));