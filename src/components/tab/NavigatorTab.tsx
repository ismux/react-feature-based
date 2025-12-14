import { JSX, useState } from "react";

interface NavigatorTabProps {
    tabs: [string, string, JSX.Element][]
}

export default function NavigatorTab({ tabs }: NavigatorTabProps) {

    const notActive = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
    const active = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";

    const [activeTab, setActiveTab] = useState(tabs[0][0]);

    const findIndexByKey = (clave: string): number => {
        return tabs.findIndex(([k]) => k === clave);
    };

    return (
        <>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    {tabs.map((elem) => (
                        <li key={elem[0]} className="me-2">
                            <a href="#" className={activeTab == elem[0] ? active : notActive}
                                onClick={() => setActiveTab(elem[0])}>
                                {elem[1]}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <br />
            <div>
                {findIndexByKey(activeTab) > -1
                    ? tabs[findIndexByKey(activeTab)][2]
                    : tabs[0][2]}
            </div>
        </>
    )
}