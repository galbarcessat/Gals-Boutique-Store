import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { SOCKET_EVENT_UPDATE_BOARD, socketService } from './socket.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'productsDB'
const BASE_URL = 'product'

export const boardService = {
    query,
    getBoardById,
    update,
    save,
    remove,
    // getEmptyBoard,
    // getBoardMembers,
    getNewBoard,
    duplicateBoard,
    addNewGroup,
    removeGroup,
    duplicatedGroup,
    getGroupById,
    getTaskById,
    removeTask,
    addTask,
    duplicatedTask,
    createNewComment,
    deleteComment,
    createActivity,
    getMemberById,
    getMembers,
    removeBatchTasks,
    duplicateBatchTasks,
    getLabels,
    getLabelById,
    addLabel,
    removeLabel,
    updateLabel,
    getEmptyGroup,
    getEmptyTask,
    getEmptyLabel,
    getContentColors,
    _createBoards: _createProducts,
}

_createProducts()
// General Update function
async function update(type, boardId, groupId = null, taskId = null, { key, value }) {
    try {
        const board = await getBoardById(boardId)
        const activityType = getActivityType(key)
        let groupIdx, taskIdx, activity

        switch (type) {
            case 'board':
                if (!boardId) throw new Error('Error updating')
                const oldBoard = board[key]
                board[key] = value

                if (key === 'groups' || key === 'kanbanCmpsOrder' || key === 'cmpsOrder') break
                activity = await createActivity({ type: activityType, from: oldBoard, to: value }, board._id)
                board.activities.unshift(activity)
                break

            case 'group':
                if (!groupId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                const oldGroup = board.groups[groupIdx][key]
                board.groups[groupIdx][key] = value

                activity = await createActivity({ type: activityType, from: oldGroup[key], to: value }, board._id, groupId)
                board.activities.unshift(activity)
                break

            case 'task':
                if (!taskId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
                const oldTask = board.groups[groupIdx].tasks[taskIdx][key]
                board.groups[groupIdx].tasks[taskIdx][key] = value

                activity = await createActivity({ type: activityType, from: oldTask, to: value }, boardId, groupId, taskId)
                board.activities.unshift(activity)
                break

            default:
                break
        }

        // let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
        return await storageService.put(STORAGE_KEY, board)
        // socketService.emit(SOCKET_EVENT_UPDATE_BOARD, boardId)
        return updatedBoard
    }
    catch (err) {
        console.log(err)
        throw err
    }

}
// Board functions
async function query() {
    // return httpService.get(BASE_URL, null)
    return await storageService.query(STORAGE_KEY)
}

async function getBoardById(boardId, filterBy = { txt: '', person: null }, sortBy) {
    let boards = await query()
    let board = boards.find(board => board._id === boardId)
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

async function save(board) {
    // return await httpService.post(BASE_URL, board)
    return await storageService.post(STORAGE_KEY, board)
}

async function remove(boardId) {
    // return httpService.delete(`${BASE_URL}/${boardId}`, boardId)
    return await storageService.remove(STORAGE_KEY, boardId)
}


async function _createProducts() {
    let products = utilService.loadFromStorage(STORAGE_KEY)
    // let boards = httpService.get(BASE_URL, null)
    if (!products || !products.length) {
        try {
            console.log('Fetching products from API:')
            let res = await axios.get('https://api.escuelajs.co/api/v1/products')
            let filteredProducts = res.data.filter(product =>
                product.title !== 'New Product' &&
                product.title !== 'saody' &&
                product.title !== 'Mayu' &&
                !product.title.includes('test'))

            utilService.saveToStorage(STORAGE_KEY, filteredProducts)
        } catch (error) {
            console.log('err:', err)
            throw Error
        }

        // boards.forEach(board => httpService.post(BASE_URL, board))
    }
}



function getNewBoard() {
    return {
        title: "New Board",
        isStarred: false,
        archivedAt: '',
        createdAt: Date.now(),
        createdBy: {
            _id: utilService.makeId(),
            fullname: "Gal Ben Natan",
            imgUrl: "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619973/GalImg_z8ivzb.png"
        },
        style: {
            backgroundImage: ""
        },
        labels: [
            {
                id: "l100",
                title: "",
                color: "explosive"
            },
            {
                id: "l101",
                title: "Done",
                color: "done-green"
            },
            {
                id: "l102",
                title: "Progress",
                color: "working_orange"
            },
            {
                id: "l103",
                title: "Stuck",
                color: "stuck-red"
            }
        ],
        members: [
            {
                _id: "u101",
                fullname: "Gal Ben Natan",
                imgUrl: "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619973/GalImg_z8ivzb.png"
            },
            {
                _id: "u102",
                fullname: "Omer Vered",
                imgUrl: "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619996/OmerImg_svk1xe.png"
            },
            {
                _id: "u103",
                fullname: "Nati Feldbaum",
                imgUrl: "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698620005/NatiImg_qvxcqb.png"
            }
        ],
        groups: [
            {
                id: utilService.makeId(),
                title: "Group 1",
                archivedAt: '',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        comments: [],
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        memberIds: []
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        comments: [],
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        memberIds: []
                    }
                ],
                style: "grass_green"
            },
            {
                id: utilService.makeId(),
                title: "Group 2",
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        archivedAt: '',
                        comments: [],
                        priority: "",
                        status: "",
                        memberIds: []
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        description: "description",
                        comments: [],
                        checklists: [
                            {
                                id: "YEhmF",
                                title: "Checklist",
                                todos: [
                                    {
                                        id: "212jX",
                                        title: "To Do 1",
                                        isDone: false
                                    }
                                ]
                            }
                        ],
                        memberIds: [],
                        labelIds: ["l101", "l102"],
                        byMember: {
                            _id: "u101",
                            username: "Gal",
                            fullname: "Gal Ben Natan",
                            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        style: {
                            backgroundColor: "done-green"
                        }
                    }
                ],
                style: "peach"
            }
        ],
        activities: [],
        priorities: [

            {
                id: "p100",
                title: "Critical",
                color: "blackish"
            },
            {
                id: "p101",
                title: "High",
                color: "dark_indigo"
            },
            {
                id: "p102",
                title: "Medium",
                color: "indigo"
            },
            {
                id: "p103",
                title: "Low",
                color: "bright-blue"
            },
            {
                id: "p105",
                title: "",
                color: "explosive"
            }

        ],
        cmpsOrder: [
            "side",
            "title",
            "members",
            "status",
            "priority",
            "dueDate",
            "timeline",
            "files"
        ]
    }
}

async function duplicateBoard(board) {
    const duplicatedBoard = JSON.parse(JSON.stringify(board))
    // duplicatedBoard._id = utilService.makeId()
    duplicatedBoard._id = null
    duplicatedBoard.title = duplicatedBoard.title + ' copy'
    return await save(duplicatedBoard)
}

function getEmptyTask(title = '') {
    return {
        id: utilService.makeTaskId(),
        title,
        status: ``,
        priority: ``,
        description: ``,
        comments: [],
        checklists: [],
        memberIds: [],
        labelIds: [],
        dueDate: null,
        byMember: {
            _id: ``,
            username: ``,
            fullname: ``,
            imgUrl: ``
        },
        style: {
            backgroundColor: "var(--primary-background-color)"
        }
    }
}
//Activity functions
async function createActivity(action = {}, boardId, groupId = null, taskId = null) {
    let loggedInUser = userService.getLoggedinUser()
    return {
        id: 'a-' + utilService.makeId(),
        createdAt: Date.now(),
        byMember: loggedInUser ? loggedInUser : {
            _id: 'u213213123',
            fullname: 'Default user',
            imgUrl: 'https://cdn1.monday.com/dapulse_default_photo.png'
        },
        boardId,
        groupId,
        taskId,
        action,
        group: groupId ? await getGroupById(boardId, groupId) : null,
        task: taskId ? await getTaskById(boardId, groupId, taskId) : null
    }
}

function getActivityType(key) {
    switch (key) {
        case 'title':
            return 'Name'
        case 'status':
            return 'Status'
        case 'priority':
            return 'Priority'
        case 'dueDate':
            return 'Date'
        case 'timeline':
            return 'Timeline'
        case 'memberIds':
            return 'Person'
        case 'files':
            return 'File'
        case 'isStarred':
            return 'Favorite'
        case 'style':
            return 'Group Color'
        case 'comments':
            return 'Comment'
        case 'groups':
            return 'Update'
        case 'cmpsOrder':
            return 'Update'
        case 'kanbanCmpsOrder':
            return 'Update'

        default:
            throw new Error('Error updating')
    }
}

//Group functions
function getEmptyGroup() {
    return {
        id: utilService.makeGroupId(),
        title: 'New Group',
        tasks: [],
        style: "done-green",
        archivedAt: null,
    }
}

async function addNewGroup(board) {

    const newGroup = getEmptyGroup()
    const updatedBoard = { ...board }
    updatedBoard.groups.push(newGroup)

    const activity = await createActivity({ type: 'Created', from: null, to: newGroup.title }, board._id, newGroup.id)
    activity.group = newGroup
    updatedBoard.activities.unshift(activity)

    const newBoard = await httpService.put(`${BASE_URL}/${board._id}`, updatedBoard)
    socketService.emit(SOCKET_EVENT_UPDATE_BOARD, updatedBoard._id)
    return newBoard
    // return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function removeGroup(board, groupId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const group = updatedBoard.groups[groupIdx]
    updatedBoard.groups.splice(groupIdx, 1)

    const activity = await createActivity({ type: 'Deleted', from: group.title, to: null }, board._id, groupId)
    board.activities.unshift(activity)

    let newBoard = await httpService.put(`${BASE_URL}/${board._id}`, updatedBoard)
    socketService.emit(SOCKET_EVENT_UPDATE_BOARD, board._id)
    return newBoard
    // return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function duplicatedGroup(board, groupId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const groupToDuplicate = updatedBoard.groups[groupIdx]
    const duplicatedGroup = JSON.parse(JSON.stringify(groupToDuplicate))
    duplicatedGroup.id = utilService.makeId()
    duplicatedGroup.title = duplicatedGroup.title + ' copy'
    updatedBoard.groups.splice(groupIdx + 1, 0, duplicatedGroup)

    const activity = createActivity(`Duplicated group ${groupToDuplicate.title}`, board._id, groupId)
    updatedBoard.activities.unshift(activity)

    return await httpService.put(`${BASE_URL}/${board._id}`, updatedBoard)
    // return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function getGroupById(boardId, groupId) {
    // const newBoard = structuredClone(board)
    const board = await getBoardById(boardId)
    return board.groups.find(group => group.id === groupId)
}

//Task functions
async function getTaskById(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    return board.groups[groupIdx].tasks[taskIdx]
}

async function addTask(boardId, groupId, task, fromBtn) {

    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)

    let pushOrUnshift = fromBtn ? 'unshift' : 'push'

    board.groups[groupIdx].tasks[pushOrUnshift](task)

    const activity = await createActivity({ type: 'Created', from: null, to: task.title }, boardId, groupId, task.id)
    activity.task = task
    board.activities.unshift(activity)

    return await httpService.put(`${BASE_URL}/${boardId}`, board)
    // return await storageService.put(STORAGE_KEY, board)
}

async function removeTask(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const group = board.groups[groupIdx]
    const task = board.groups[groupIdx].tasks[taskIdx]
    board.groups[groupIdx].tasks.splice(taskIdx, 1)

    const activity = await createActivity({ type: 'Deleted', from: task.title, to: null }, boardId, groupId, task.id)
    activity.group = group
    activity.task = task
    board.activities.unshift(activity)

    return await httpService.put(`${BASE_URL}/${boardId}`, board)
    // return await storageService.put(STORAGE_KEY, board)
}

async function removeBatchTasks(boardId, selectedTasks, actions = []) {
    const taskIds = selectedTasks.map(task => task.taskId)
    try {
        const board = await getBoardById(boardId)
        board.groups = board.groups.map(group => ({
            ...group, tasks: group.tasks.filter(t => {
                const keepTask = !taskIds.includes(t.id)
                // if (!keepTask) {
                // 	const activity = getEmptyActivity(board, t.id, actions.splice(0, 1)[0]) // splice first item, and send it to getEmptyActivity
                // 	board.activities.unshift(activity)
                // }
                return keepTask
            }),
        }))
        let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
        socketService.emit(SOCKET_EVENT_UPDATE_BOARD, boardId)
        return updatedBoard
        // return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
}

async function duplicatedTask(board, groupId, taskId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const taskToDuplicate = updatedBoard.groups[groupIdx].tasks[taskIdx]
    const duplicatedTask = JSON.parse(JSON.stringify(taskToDuplicate))
    duplicatedTask.id = utilService.makeId()
    duplicatedTask.title = duplicatedTask.title + ' copy'
    updatedBoard.groups[groupIdx].tasks.splice(taskIdx + 1, 0, duplicatedTask)

    let newBoard = await httpService.put(`${BASE_URL}/${board._id}`, updatedBoard)
    socketService.emit(SOCKET_EVENT_UPDATE_BOARD, boardId)
    return newBoard

    // return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function duplicateBatchTasks(boardId, selectedTasks, actions = []) {
    const taskIds = selectedTasks.map(task => task.taskId)
    console.log('taskIds:', taskIds)
    try {
        const board = await getBoardById(boardId)
        const updatedBoard = { ...board }

        selectedTasks.forEach(({ groupId, taskId }) => {
            const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
            const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)

            if (groupIdx !== -1 && taskIdx !== -1) {
                const taskToDuplicate = updatedBoard.groups[groupIdx].tasks[taskIdx]
                const duplicatedTask = JSON.parse(JSON.stringify(taskToDuplicate))
                duplicatedTask.id = utilService.makeId()
                duplicatedTask.title = duplicatedTask.title + ' copy'
                updatedBoard.groups[groupIdx].tasks.splice(taskIdx + 1, 0, duplicatedTask)
            }
        })
        return await httpService.put(`${BASE_URL}/${boardId}`, updatedBoard)
        // return await storageService.put(STORAGE_KEY, updatedBoard)
    } catch (err) {
        throw err
    }
}

//Label functions
async function getEmptyLabel() {
    return {
        id: utilService.makeId(),
        title: 'New label',
        color: getContentColors()[utilService.getRandomIntInclusive(0, getContentColors().length - 1)]
    }
}

async function getLabels(boardId) {
    const board = await getBoardById(boardId)
    return board.labels
}

async function getLabelById(boardId, labelId, statusOrPriorities) {
    const board = await getBoardById(boardId)
    if (statusOrPriorities === 'priorities') {
        let priority = board.priorities.find(label => label.id === labelId)
        return priority
    } else if (statusOrPriorities = 'labels') {
        let status = board.labels.find(label => label.id === labelId)
        return status
    }

}

async function addLabel(boardId, label, type) {
    const board = await getBoardById(boardId)
    board[type].push(label)
    return await httpService.put(`${BASE_URL}/${boardId}`, board)
    // return await storageService.put(STORAGE_KEY, board)
}

async function removeLabel(boardId, labelId, type) {
    const board = await getBoardById(boardId)
    const labelIdx = board[type].findIndex(label => label.id === labelId)
    board[type].splice(labelIdx, 1)
    return await httpService.put(`${BASE_URL}/${boardId}`, board)
    // return await storageService.put(STORAGE_KEY, board)
}

async function updateLabel(boardId, label, type) {
    const board = await getBoardById(boardId)
    const labelId = label.id
    const labelIdx = board[type].findIndex(label => label.id === labelId)
    board[type][labelIdx] = label
    return await httpService.put(`${BASE_URL}/${boardId}`, board)
    // return await storageService.put(STORAGE_KEY, board)
}

//Comment functions
function createNewComment(newCommentText) {
    console.log('getLoggedinUser:', userService.getLoggedinUser())
    return {
        id: utilService.makeId(),
        txt: newCommentText,
        createdAt: Date.now(),

        byMember: userService.getLoggedinUser()
        // byMember: {
        //     _id: "u101",
        //     fullname: "Gal Ben Natan",
        //     imgUrl: "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619973/GalImg_z8ivzb.png"
        // }
    }

}

function deleteComment(commentId, currTask) {
    const commentIdx = currTask.comments.findIndex(comment => commentId === comment.id)
    if (commentIdx !== -1) {
        const commentsAfterDelete = currTask.comments.filter(comment => commentId !== comment.id)
        return commentsAfterDelete
    } else {
        console.log('cant find comment')
        throw new Error('comment wasnt found,couldnt delete it')
    }

}

//Member functions
async function getMembers(boardId) {
    const board = await getBoardById(boardId)
    return board.members
}

async function getMemberById(boardId, memberId) {
    const board = await getBoardById(boardId)
    const member = board.members.find(member => member._id === memberId)
    return member
}

//General functions
function getContentColors() {
    const contentColors = [
        'grass_green',
        'done-green',
        'bright-green',
        'saladish',
        'egg_yolk',
        'working_orange',
        'dark-orange',
        'peach',
        'sunset',
        'stuck-red',
        'dark-red',
        'sofia_pink',
        'lipstick',
        'bubble',
        'purple',
        'dark_purple',
        'berry',
        'dark_indigo',
        'indigo',
        'navy',
        'bright-blue',
        'dark-blue',
        'aquamarine',
        'chili-blue',
        'river',
        'winter',
        'explosive',
        'american_gray',
        'blackish',
        'brown',
        'orchid',
        'tan',
        'sky',
        'coffee',
        'royal',
        'teal',
        'lavender',
        'steel',
        'lilac',
        'pecan'
    ]

    return contentColors
}
