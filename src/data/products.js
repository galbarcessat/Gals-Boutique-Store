import { utilService } from "../services/util.service";




[
  {
    id: 1,
    name: 'Clothes',
    image: 'https://i.imgur.com/QkIa5tT.jpeg',
    products: [
      {
        id: utilService.makeId(),
        category: 'Clothes',
        title: 'Mountain T-Shirt',
        price: 550,
        description: 'This is a cool mountain t-shirt, black color, matches your daily casual style.',
        images: [
          'https://i.imgur.com/QkIa5tT.jpeg',
          'https://i.imgur.com/jb5Yu0h.jpeg',
          'https://i.imgur.com/UlxxXyG.jpeg',
        ]
      },
      {
        id: utilService.makeId(),
        category: 'Clothes',
        title: 'Stylish red jacket',
        price: Math.floor(Math.random() * 1000) + 300, // Random price between 300 and 1300
        description: 'Upgrade your wardrobe with this trendy jacket. Comfortable and fashionable.',
        images: [
          'https://i.imgur.com/1twoaDy.jpeg',
          'https://i.imgur.com/FDwQgLy.jpeg',
          'https://i.imgur.com/kg1ZhhH.jpeg',
        ],
      },
      {
        title: 'Grey jacket',
        images: [
          'https://i.imgur.com/cHddUCu.jpeg',
          'https://i.imgur.com/CFOjAgK.jpeg',
          'https://i.imgur.com/wbIMMme.jpeg',
        ]
      },
      {
        title: 'Dark grey jacket',
        images: [
          'https://i.imgur.com/R2PN9Wq.jpeg',
          'https://i.imgur.com/IvxMPFr.jpeg',
          'https://i.imgur.com/7eW9nXP.jpeg',
        ]
      },
      {
        title: 'Black jacket',
        images: [
          'https://i.imgur.com/cSytoSD.jpeg',
          'https://i.imgur.com/WwKucXb.jpeg',
          'https://i.imgur.com/cE2Dxh9.jpeg',
        ]
      },
      {
        title: 'Black pants',
        images: [
          'https://i.imgur.com/ZKGofuB.jpeg',
          'https://i.imgur.com/GJi73H0.jpeg',
          'https://i.imgur.com/633Fqrz.jpeg',
        ]
      },
      {
        title: 'Light gray pants',
        images: ['https://i.imgur.com/mp3rUty.jpeg',
          'https://i.imgur.com/JQRGIc2.jpeg']
      },
      {
        title: 'Cool red pants',
        images: [
          'https://i.imgur.com/9LFjwpI.jpeg',
          'https://i.imgur.com/vzrTgUR.jpeg',
          'https://i.imgur.com/p5NdI6n.jpeg',
        ]
      },
      {
        title: 'Blue hat',
        images: [
          'https://i.imgur.com/R3iobJA.jpeg',
          'https://i.imgur.com/Wv2KTsf.jpeg',
          'https://i.imgur.com/76HAxcA.jpeg',
        ]
      },
      {
        title: 'Light blue hat',
        images: [
          'https://i.imgur.com/wXuQ7bm.jpeg',
          'https://i.imgur.com/BZrIEmb.jpeg',
          'https://i.imgur.com/KcT6BE0.jpeg',
        ]
      },
      {
        title: 'Red hat',
        images: [
          'https://i.imgur.com/cBuLvBi.jpeg',
          'https://i.imgur.com/N1GkCIR.jpeg',
          'https://i.imgur.com/kKc9A5p.jpeg',
        ]
      },
      {
        title: 'Black hat',
        images: [
          'https://i.imgur.com/KeqG6r4.jpeg',
          'https://i.imgur.com/xGQOw3p.jpeg',
          'https://i.imgur.com/oO5OUjb.jpeg',
        ]
      },
      {
        title: 'Green shorts',
        images: ['https://i.imgur.com/UsFIvYs.jpeg',
          'https://i.imgur.com/YIq57b6.jpeg']
      },
      {
        title: 'Grey tight shorts',
        images: [
          'https://i.imgur.com/eGOUveI.jpeg',
          'https://i.imgur.com/UcsGO7E.jpeg',
          'https://i.imgur.com/NLn4e7S.jpeg',
        ]
      },
      {
        title: 'Womens white T-shirt',
        images: [
          'https://i.imgur.com/axsyGpD.jpeg',
          'https://i.imgur.com/T8oq9X2.jpeg',
          'https://i.imgur.com/J6MinJn.jpeg',
        ]
      },
      {
        title: 'Mans white T-shirt',
        images: [
          'https://i.imgur.com/Y54Bt8J.jpeg',
          'https://i.imgur.com/SZPDSgy.jpeg',
          'https://i.imgur.com/sJv4Xx0.jpeg',
        ]
      },
      {
        title: 'Black T-shirt',
        images: [
          'https://i.imgur.com/9DqEOV5.jpeg',
          'https://i.imgur.com/ae0AEYn.jpeg',
          'https://i.imgur.com/mZ4rUjj.jpeg',
        ]
      },
    ],
  },
  {
    id: 2,
    name: 'Electronics',
    image: 'https://i.imgur.com/ZANVnHE.jpeg',
    products: [
      {
        title: 'Joystick',
        images: [
          'https://i.imgur.com/ZANVnHE.jpeg',
          'https://i.imgur.com/Ro5z6Tn.jpeg',
          'https://i.imgur.com/woA93Li.jpeg',
        ]
      },
      {
        title: 'White earphones',
        images: [
          'https://i.imgur.com/yVeIeDa.jpeg',
          'https://i.imgur.com/jByJ4ih.jpeg',
          'https://i.imgur.com/KXj6Tpb.jpeg',
        ]
      },
      {
        title: 'Black thin earphones',
        images: [
          'https://i.imgur.com/SolkFEB.jpeg',
          'https://i.imgur.com/KIGW49u.jpeg',
          'https://i.imgur.com/mWwek7p.jpeg',
        ]
      },
      {
        title: 'Cool toaster',
        images: [
          'https://i.imgur.com/keVCVIa.jpeg',
          'https://i.imgur.com/afHY7v2.jpeg',
          'https://i.imgur.com/yAOihUe.jpeg',
        ]
      },
      {
        title: 'Nice mouse',
        images: [
          'https://i.imgur.com/w3Y8NwQ.jpeg',
          'https://i.imgur.com/WJFOGIC.jpeg',
          'https://i.imgur.com/dV4Nklf.jpeg',
        ]
      },
      {
        title: 'Amazing laptop',
        images: [
          'https://i.imgur.com/OKn1KFI.jpeg',
          'https://i.imgur.com/G4f21Ai.jpeg',
          'https://i.imgur.com/Z9oKRVJ.jpeg',
        ]
      },
      {
        title: 'Grey normal laptop',
        images: [
          'https://i.imgur.com/ItHcq7o.jpeg',
          'https://i.imgur.com/55GM3XZ.jpeg',
          'https://i.imgur.com/tcNJxoW.jpeg',
        ]
      },
      {
        title: 'Red cool earphones',
        images: [
          'https://i.imgur.com/YaSqa06.jpeg',
          'https://i.imgur.com/isQAliJ.jpeg',
          'https://i.imgur.com/5B8UQfh.jpeg',
        ]
      },
      {
        title: 'Iphone xs max',
        images: [
          'https://i.imgur.com/yb9UQKL.jpeg',
          'https://i.imgur.com/m2owtQG.jpeg',
          'https://i.imgur.com/bNiORct.jpeg',
        ]
      },
      {
        title: 'Apple watch',
        images: [
          'https://i.imgur.com/LGk9Jn2.jpeg',
          'https://i.imgur.com/1ttYWaI.jpeg',
          'https://i.imgur.com/sPRWnJH.jpeg',
        ]
      },
    ],
  },
  {
    id: 3,
    name: 'Furniture',
    image: 'https://i.imgur.com/Qphac99.jpeg',
    products: [
      {
        title: 'Nice black sofa',
        images: [
          'https://i.imgur.com/Qphac99.jpeg',
          'https://i.imgur.com/dJjpEgG.jpeg',
          'https://i.imgur.com/MxJyADq.jpeg',
        ]
      },
      {
        title: 'Alon wood table',
        images: [
          'https://i.imgur.com/DMQHGA0.jpeg',
          'https://i.imgur.com/qrs9QBg.jpeg',
          'https://i.imgur.com/XVp8T1I.jpeg',
        ]
      },
      {
        title: 'Gold white table',
        images: [
          'https://i.imgur.com/NWIJKUj.jpeg',
          'https://i.imgur.com/Jn1YSLk.jpeg',
          'https://i.imgur.com/VNZRvx5.jpeg',
        ]
      },
      {
        title: 'Blue chair',
        images: [
          'https://i.imgur.com/6wkyyIN.jpeg',
          'https://i.imgur.com/Ald3Rec.jpeg',
          'https://i.imgur.com/dIqo03c.jpeg',
        ]
      },
      {
        title: 'Oak wood table',
        images: [
          'https://i.imgur.com/4lTaHfF.jpeg',
          'https://i.imgur.com/JktHE1C.jpeg',
          'https://i.imgur.com/cQeXQMi.jpeg',
        ]
      },
      {
        title: 'Computer table',
        images: [
          'https://i.imgur.com/3oXNBst.jpeg',
          'https://i.imgur.com/ErYYZnT.jpeg',
          'https://i.imgur.com/boBPwYW.jpeg',
        ]
      },
      {
        title: 'White pc chair',
        images: ['https://i.imgur.com/3dU0m72.jpeg',
          'https://i.imgur.com/zPU3EVa.jpeg']
      },
    ],
  },
  {
    id: 4,
    name: 'Shoes',
    image: 'https://i.imgur.com/qNOjJje.jpeg',
    products: [
      {
        title: 'Football silver shoes',
        images: [
          'https://i.imgur.com/qNOjJje.jpeg',
          'https://i.imgur.com/NjfCFnu.jpeg',
          'https://i.imgur.com/eYtvXS1.jpeg',
        ]
      },
      {
        title: 'High silver heels',
        images: [
          'https://i.imgur.com/62gGzeF.jpeg',
          'https://i.imgur.com/5MoPuFM.jpeg',
          'https://i.imgur.com/sUVj7pK.jpeg',
        ]
      },
      {
        title: 'Casual sandals',
        images: [
          'https://i.imgur.com/9qrmE1b.jpeg',
          'https://i.imgur.com/wqKxBVH.jpeg',
          'https://i.imgur.com/sWSV6DK.jpeg',
        ]
      },
      {
        title: 'Stylish colorful shoes',
        images: [
          'https://i.imgur.com/hKcMNJs.jpeg',
          'https://i.imgur.com/NYToymX.jpeg',
          'https://i.imgur.com/HiiapCt.jpeg',
        ]
      },
      {
        title: 'Pink vans',
        images: [
          'https://i.imgur.com/mcW42Gi.jpeg',
          'https://i.imgur.com/mhn7qsF.jpeg',
          'https://i.imgur.com/F8vhnFJ.jpeg',
        ]
      },
      {
        title: 'Space shoes',
        images: [
          'https://i.imgur.com/npLfCGq.jpeg',
          'https://i.imgur.com/vYim3gj.jpeg',
          'https://i.imgur.com/HxuHwBO.jpeg',
        ]
      },
      {
        title: 'Modern weird heels',
        images: [
          'https://i.imgur.com/HqYqLnW.jpeg',
          'https://i.imgur.com/RlDGnZw.jpeg',
          'https://i.imgur.com/qa0O6fg.jpeg',
        ]
      },
      {
        title: 'Classy shoes',
        images: [
          'https://i.imgur.com/AzAY4Ed.jpeg',
          'https://i.imgur.com/umfnS9P.jpeg',
          'https://i.imgur.com/uFyuvLg.jpeg',
        ]
      },
      {
        title: 'Purple elegant shoes',
        images: [
          'https://i.imgur.com/Au8J9sX.jpeg',
          'https://i.imgur.com/gdr8BW2.jpeg',
          'https://i.imgur.com/KDCZxnJ.jpeg',
        ]
      },
      {
        title: 'Blue simple shoes',
        images: [
          'https://i.imgur.com/sC0ztOB.jpeg',
          'https://i.imgur.com/Jf9DL9R.jpeg',
          'https://i.imgur.com/R1IN95T.jpeg',
        ]
      },
    ],
  },
  {
    id: 5,
    name: 'Miscellaneous',
    image: 'https://i.imgur.com/BG8J0Fj.jpg',
    products: [
      {
        title: 'Black modern bike',
        images: [
          'https://i.imgur.com/BG8J0Fj.jpg',
          'https://i.imgur.com/ujHBpCX.jpg',
          'https://i.imgur.com/WHeVL9H.jpg',
        ]
      },
      {
        title: 'Child black bimba',
        images: [
          'https://i.imgur.com/Ex5x3IU.jpg',
          'https://i.imgur.com/z7wAQwe.jpg',
          'https://i.imgur.com/kc0Dj9S.jpg',
        ]
      },
      {
        title: 'Orange luxury perfume',
        images: [
          'https://i.imgur.com/xPDwUb3.jpg',
          'https://i.imgur.com/3rfp691.jpg',
          'https://i.imgur.com/kG05a29.jpg',
        ]
      },
      {
        title: 'Green bagade',
        images: [
          'https://i.imgur.com/jVfoZnP.jpg',
          'https://i.imgur.com/Tnl15XK.jpg',
          'https://i.imgur.com/7OqTPO6.jpg',
        ]
      },
      {
        title: 'Transparent bag',
        images: [
          'https://i.imgur.com/Lqaqz59.jpg',
          'https://i.imgur.com/uSqWK0m.jpg',
          'https://i.imgur.com/atWACf1.jpg',
        ]
      },
      {
        title: 'Pink sunglasses',
        images: [
          'https://i.imgur.com/0qQBkxX.jpg',
          'https://i.imgur.com/I5g1DoE.jpg',
          'https://i.imgur.com/myfFQBW.jpg',
        ]
      },
      {
        title: 'Cool glass',
        images: [
          'https://i.imgur.com/TF0pXdL.jpg',
          'https://i.imgur.com/BLDByXP.jpg',
          'https://i.imgur.com/b7trwCv.jpg',
        ]
      },
    ],
  },
];



function addRandomValues(products, category) {
  let updatedProducts = products.map(product => {
    const updatedDescription = !product.description ? utilService.makeLorem(50) : product.description

    return {
      ...product,
      id: utilService.makeId(),
      category: category,
      price: utilService.getRandomIntInclusive(5, 1000),
      description: updatedDescription,
    }
  })

  console.log('updatedProducts:', updatedProducts)
  return updatedProducts
}

export const dataTest = {
  addRandomValues
}