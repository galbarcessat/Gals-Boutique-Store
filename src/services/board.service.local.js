import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { SOCKET_EVENT_UPDATE_BOARD, socketService } from './socket.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'productsDB'
const BASE_URL = 'product'

export const productService = {
    query,
    getBoardById,
    update,
    save,
    remove,
    _createProducts,
    getAllCategories
}

// _createProducts()
// General Update function
// async function update(type, boardId, groupId = null, taskId = null, { key, value }) {
//     try {
//         const board = await getBoardById(boardId)
//         const activityType = getActivityType(key)
//         let groupIdx, taskIdx, activity

//         switch (type) {
//             case 'board':
//                 if (!boardId) throw new Error('Error updating')
//                 const oldBoard = board[key]
//                 board[key] = value

//                 if (key === 'groups' || key === 'kanbanCmpsOrder' || key === 'cmpsOrder') break
//                 activity = await createActivity({ type: activityType, from: oldBoard, to: value }, board._id)
//                 board.activities.unshift(activity)
//                 break

//             case 'group':
//                 if (!groupId) throw new Error('Error updating')
//                 groupIdx = board.groups.findIndex(group => group.id === groupId)
//                 const oldGroup = board.groups[groupIdx][key]
//                 board.groups[groupIdx][key] = value

//                 activity = await createActivity({ type: activityType, from: oldGroup[key], to: value }, board._id, groupId)
//                 board.activities.unshift(activity)
//                 break

//             case 'task':
//                 if (!taskId) throw new Error('Error updating')
//                 groupIdx = board.groups.findIndex(group => group.id === groupId)
//                 taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
//                 const oldTask = board.groups[groupIdx].tasks[taskIdx][key]
//                 board.groups[groupIdx].tasks[taskIdx][key] = value

//                 activity = await createActivity({ type: activityType, from: oldTask, to: value }, boardId, groupId, taskId)
//                 board.activities.unshift(activity)
//                 break

//             default:
//                 break
//         }

//         // let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
//         return await storageService.put(STORAGE_KEY, board)
//         // socketService.emit(SOCKET_EVENT_UPDATE_BOARD, boardId)
//         return updatedBoard
//     }
//     catch (err) {
//         console.log(err)
//         throw err
//     }

// }
// Board functions
async function query() {
    return httpService.get(BASE_URL, null)
    // return await storageService.query(STORAGE_KEY)
}

async function getBoardById(boardId, filterBy = { txt: '', person: null }, sortBy) {
    let products = await query()
    let board = products.find(board => board._id === boardId)
    // let board = await storageService.get(STORAGE_KEY, boardId)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     board.groups = board.groups.map((group) => {
    //         const filteredTasks = group.tasks.filter((task) => regex.test(task.title))

    //         // If there are matching tasks or the group title matches, include the group
    //         if (filteredTasks.length > 0 || regex.test(group.title)) {
    //             if (filteredTasks.length > 0) {
    //                 group.tasks = filteredTasks
    //             }
    //             return group;
    //         }
    //         // If no matching tasks and group title doesn't match, exclude the group
    //         return null
    //     }).filter((group) => group !== null) // Remove groups without matching tasks or title
    // }

    // if (filterBy.person) {
    //     board.groups = board.groups.map((group) => {
    //         const filteredTasks = group.tasks.filter((task) => task.memberIds.includes(filterBy.person._id))

    //         if (filteredTasks.length > 0) {
    //             group.tasks = filteredTasks
    //             return group;
    //         }

    //         return null;
    //     }).filter((group) => group !== null)
    // }

    // if (sortBy) {
    //     board.groups = board.groups.sort((a, b) => {
    //         const titleA = a.title.toLowerCase();
    //         const titleB = b.title.toLowerCase();

    //         if (titleA < titleB) {
    //             return -1
    //         } else if (titleA > titleB) {
    //             return 1
    //         } else {
    //             return 0
    //         }
    //     })

    // }

    return board
}

async function save(product) {
    return await httpService.post(BASE_URL, product)
    // return await storageService.post(STORAGE_KEY, board)
}

async function update(updatedProduct) {
    return await httpService.put(`${BASE_URL}/${updatedProduct._id}`, updatedProduct)
}

async function remove(productId) {
    return httpService.delete(`${BASE_URL}/${productId}`, productId)
    // return await storageService.remove(STORAGE_KEY, boardId)
}

async function _createProducts() {
    let products = utilService.loadFromStorage(STORAGE_KEY)
    // let products = httpService.get(BASE_URL, null)

    if (!products || !products.length) {
        try {
            // console.log('Fetching products from API:')
            // let res = await axios.get('https://api.escuelajs.co/api/v1/categories')
            // console.log('res:', res.data)
            // { id: 23, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg' }
            // { id: 24, name: 'Electronics', image: 'https://i.imgur.com/ZANVnHE.jpeg' }
            // { id: 25, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg' }
            // { id: 26, name: 'Shoes', image: 'https://i.imgur.com/qNOjJje.jpeg' }
            // { id: 27, name: 'Miscellaneous', image: 'https://i.imgur.com/BG8J0Fj.jpg' }
            let test = []
            test = test.concat(dataTest.addRandomValues([
                {
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
                { id: 23, name: 'Clothes', image: 'https://i.imgur.com/QkIa5tT.jpeg' }
            ))
            test = test.concat(dataTest.addRandomValues([
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
            ], { id: 24, name: 'Electronics', image: 'https://i.imgur.com/ZANVnHE.jpeg' }))
            test = test.concat(dataTest.addRandomValues([
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
            ], { id: 25, name: 'Furniture', image: 'https://i.imgur.com/Qphac99.jpeg' }))
            test = test.concat(dataTest.addRandomValues([
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
            ], { id: 26, name: 'Shoes', image: 'https://i.imgur.com/qNOjJje.jpeg' }))
            test = test.concat(dataTest.addRandomValues([
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
            ], { id: 27, name: 'Miscellaneous', image: 'https://i.imgur.com/BG8J0Fj.jpg' }))

            // utilService.saveToStorage(STORAGE_KEY, res.data)
            utilService.saveToStorage(STORAGE_KEY, test)
        } catch (err) {
            console.log('err:', err)
            throw Error
        }

        // products.forEach(board => httpService.post(BASE_URL, board))
    }
}

function getAllCategories(products) {
    let categories = products.reduce((acc, product) => {
        if (!acc.some(cat => cat.name === product.category.name)) {
            acc.push(product.category)
        }
        return acc
    }, [])

    return categories
}

