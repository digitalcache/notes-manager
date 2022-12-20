import React, {useState, useRef, useEffect} from 'react'

export default function Checklist() {
    const taskRef = useRef()
    const [checkLists, setCheckLists] = useState([])
    const [currentList, setCurrentList] = useState({})
    useEffect(() => {
        let localChecklist = JSON.parse(localStorage.getItem('checkList'));
        if(localChecklist && localChecklist.length > 0){
            setCheckLists(localChecklist)
            setCurrentList(localChecklist[0])
        } else {
            let initialChecklist = {
                name: "Check1",
                tasks: []
            }
            localStorage.setItem("checkList", JSON.stringify([initialChecklist]))
            setCurrentList(initialChecklist)
            setCheckLists([initialChecklist])
        }
    }, [])
    const addCheckList = () => {
        if(checkLists.length > 0){
            let checklist = {
                name: `Check${checkLists.length + 1}`,
                tasks: []
            }
            
            localStorage.setItem("checkList", JSON.stringify([...checkLists, checklist]))
            setCheckLists([...checkLists, checklist])
        }
    }
    const setCurrentCheckList = (list) => {
        setCurrentList(list)
    }
    const addTask = () => {
        let taskValue = taskRef.current.value;
        if(taskValue.length > 0){
            let newTaskList;
            if(currentList.tasks.length > 0){
                newTaskList = [
                    ...currentList.tasks,
                    {
                        name: taskValue,
                        status: 'running'
                    }
                ]
            } else {
                newTaskList = [
                    {
                        name: taskValue,
                        status: 'running'
                    }
                ]
            }
            let updatedCheckList = checkLists.map(list => {
                if(list.name === currentList.name){
                    list.tasks = newTaskList
                }
                return list
            })

            setCheckLists(updatedCheckList)
            setCurrentList({
                name: currentList.name,
                tasks: newTaskList
            })
            localStorage.setItem('checkList', JSON.stringify(updatedCheckList))
        }
        taskRef.current.value = ''
    }
    const updateStatus = (task, status) => {
        let newTaskList = currentList.tasks.map(t => {
            if(t.name === task.name){
                t.status = status
            }
            return t
        })
        setCurrentList({name: currentList.name, tasks: newTaskList})
        let updatedCheckList = checkLists.map(list => {
            if(list.name === currentList.name){
                list.tasks = newTaskList
            }
            return list
        })
        setCheckLists(updatedCheckList)
        localStorage.setItem('checkList', JSON.stringify(updatedCheckList))
    }
    return (
        <div className='checklist-container'>
            <div className='checklist-items'>
                <button data-testid="add-checklist" onClick={() => addCheckList()}>Add CheckList</button>
                <ul data-testid="list-item" >
                    {checkLists.length > 0  && checkLists.map(list => {
                        return <li key={list.name} className='checklist-item' onClick={() => setCurrentCheckList(list)}>{list.name}</li>
                    })}
                </ul>
            </div>
            <div>
                <div>
                    <input ref={taskRef} className='input-task' type="text" placeholder='Enter Task'></input>
                    <button onClick={() => addTask()}>Add Task</button>
                </div>
                
                <div>
                    <ul>
                        {currentList && currentList.tasks && currentList.tasks.length > 0 && currentList.tasks.map((task) => {
                            return <li key={task.name}>
                                <div>
                                    {task.status === "running" ? <span className='task-name'>{task.name}</span> : <s className='task-name'>{task.name}</s>} 
                                
                                    {task.status === "running" && <span onClick={() => updateStatus(task, 'done')}>&#x2610;</span>}
                                    {task.status === "done" && <span onClick={() => updateStatus(task, 'running')}>&#x2713;</span>}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
