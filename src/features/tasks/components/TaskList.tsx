import { GroupedTask, statusTranslations, Task } from "../models/task"
import TaskCard from "./TaskCard";

type TaskListProps = {
    tasks: Task[]
}

const initialStatusGroups: GroupedTask = {
    Pending: [],
    OnHold: [],
    InProgress: [],
    UnderReview: [],
    Complete: [],
}

const statusStyles: { [key: string]: string } = {
    Pending: 'border-t-slate-500',
    OnHold: 'border-t-red-500',
    InProgress: 'border-t-blue-500',
    UnderReview: 'border-t-amber-500',
    Complete: 'border-t-emerald-500',
}

function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.statusDto]
            ? [...acc[task.statusDto]]
            : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.statusDto]: currentGroup };
    }, initialStatusGroups);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-light
                                        border border-slate-300
                                        bg-white p-3 border-t-8
                                        ${statusStyles[status]}`}>
                        {statusTranslations[status]}
                        </h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task.idDto} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
export default TaskList